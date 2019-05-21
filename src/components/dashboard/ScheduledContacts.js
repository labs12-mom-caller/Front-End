import React from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link } from '@reach/router';
import { FaUserLock, FaUserEdit } from 'react-icons/fa';
import { db } from '../../firebase';

import { firstNameOnly } from '../../app/utils';

const ScheduledContacts = ({ user }) => {
  const [contacts, setContacts] = React.useState([]);
  const { uid } = user;
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userContacts = await db
          .collection('contacts')
          .where('user1', '==', db.doc(`users/${uid}`))
          .get();

        const user1Results = await userContacts.docs.map(async doc => {
          try {
            const user2Snap = await doc.data().user2.get();
            return {
              user2: {
                ...user2Snap.data(),
                id: user2Snap.id,
              },
              call_frequency: doc.data().call_frequency,
              next_call: doc.data().next_call,
              time_zone: doc.data().timezone,
              id: doc.id,
            };
          } catch (err) {
            return console.log(err);
          }
        });

        const user2Contacts = await db
          .collection('contacts')
          .where('user2', '==', db.doc(`users/${uid}`))
          .get();

        const user2Results = await user2Contacts.docs.map(async doc => {
          try {
            const user1Snap = await doc.data().user1.get();
            return {
              user1: {
                ...user1Snap.data(),
                id: user1Snap.id,
              },
              call_frequency: doc.data().call_frequency,
              next_call: doc.data().next_call,
              time_zone: doc.data().timezone,
              id: doc.id,
            };
          } catch (err) {
            return console.log(err);
          }
        });

        const mergedResults = [...user1Results, ...user2Results];

        const results = await Promise.all(mergedResults);

        console.log(results);

        results.sort((a, b) => {
          return (
            moment(a.next_call, 'x').utc() - moment(b.next_call, 'x').utc()
          );
        });

        setContacts(contacts => results);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [uid]);

  return (
    <>
      <TableHeader>
        <Name>Name</Name>
        <Upcoming>Upcoming Call</Upcoming>
      </TableHeader>
      <ContactsWrapper>
        {contacts &&
          contacts.map(c => {
            return (
              <Contact key={c.id}>
                <ContactLink to={`/contact/${c.id}`} key={c.id}>
                  <LinkWrapper>
                    <Display>
                      {c.user1
                        ? firstNameOnly(c.user1.displayName)
                        : firstNameOnly(c.user2.displayName)}
                    </Display>
                    <Display>
                      {moment(c.next_call, 'X')
                        .tz(c.time_zone)
                        .format(`MMMM Do`)}
                    </Display>
                    <Display>
                      {moment(c.next_call, 'X')
                        .tz(c.time_zone)
                        .format(`h:mm A`)}
                    </Display>
                    {c.user1 ? <UserLock /> : <UserEdit />}
                  </LinkWrapper>
                </ContactLink>
              </Contact>
            );
          })}
      </ContactsWrapper>
    </>
  );
};

const TableHeader = styled.div`
  display: flex;
  padding: 5px 20px;
  align-items: center;
  height: 28px;
  border: 1px solid #cecece;
  background-color: #cecece;
  color: #7d7d7d;
  font-family: Roboto;
  font-size: 0.9rem;
  font-weight: 400;
  width: 100%;
`;

const Name = styled.div`
  width: 24%;
  font-size: 1.6rem;
  padding: 2px;
`;

const Upcoming = styled.div`
  width: 76%;
  font-size: 1.6rem;
  padding: 2px 20px;
`;

const Contact = styled.div`
  display: flex;
  border-bottom: 1px solid #7d7d7d;
`;

const ContactLink = styled(Link)`
  color: #7d7d7d;
  width: 100%;
  transition: all .3s ease
  &:hover {
    color: #ff6f61;
    &,
    svg {
      color: #ff6f61;
    }
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 60px;
  padding: 0 20px;
`;

const Display = styled.div`
  width: 30%;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: Roboto;
`;

const UserLock = styled(FaUserLock)`
  width: 25px;
  color: #7d7d7d;
  height: 25px;
  transition: all 0.3s ease;
`;

const UserEdit = styled(FaUserEdit)`
  width: 25px;
  color: #7d7d7d;
  height: 25px;
  transition: all 0.3s ease;
`;

const ContactsWrapper = styled.div`
  overflow-x: auto;
  overflow-y: scroll;
  width: 100%;
  height: 372px;
  display: flex;
  flex-direction: column;

  ::-webkit-scrollbar {
    appearance: none;
  }

  ::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 10px;
  }
`;

export default ScheduledContacts;

ScheduledContacts.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,

    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};
