import React from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';
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
        userContacts.forEach(async doc => {
          try {
            const user2Snap = await db
              .doc(`users/${doc.data().user2.id}`)
              .get();
            const contact = {
              user2: {
                ...user2Snap.data(),
                id: user2Snap.id,
              },
              call_frequency: doc.data().call_frequency,
              next_call: doc.data().next_call,
              time_zone: doc.data().timezone,
              id: doc.id,
            };
            setContacts(contacts => [...contacts, contact]);
          } catch (err) {
            console.log(err);
          }
        });
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
      {contacts &&
        contacts.map(c => {
          return (
            <Contact key={c.id}>
              <ContactLink to={`/contact/${c.id}`} key={c.id}>
                <LinkWrapper>
                  <Display>{firstNameOnly(c.user2.displayName)}</Display>
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
                </LinkWrapper>
              </ContactLink>
            </Contact>
          );
        })}
    </>
  );
};

const TableHeader = styled.div`
  display: flex;
  padding: 5px;
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
  margin-left: 1rem;
  margin-right: 5.5rem;

  @media (max-width: 1025px) {
    margin-right: 8rem;
  }
`;

const Upcoming = styled.div`
  width: 76%;
  font-size: 1.6rem;
  padding: 2px;
`;

const Contact = styled.div`
  display: flex;
  border-bottom: 1px solid #7d7d7d;
`;

const ContactLink = styled(Link)`
  color: #7d7d7d;
  width: 100%;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 22px 16px;
`;

const Display = styled.div`
  width: 30%;
  font-size: 1.3rem;
  font-family: Roboto;
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
