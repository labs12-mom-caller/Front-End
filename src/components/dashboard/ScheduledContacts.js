/* eslint-disable no-inner-declarations */
import React from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Link } from '@reach/router';
import { FaEllipsisV } from 'react-icons/fa';
import { db } from '../../firebase';
import UpcomingCalls from '../UpcomingCalls';

const ScheduledContacts = ({ user }) => {
  const [contacts, setContacts] = React.useState([]);
  const { uid } = user;
  console.log(contacts, 'boyy');
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userContacts = await db
          .collection('contacts')
          .where('user1', '==', db.doc(`users/${uid}`))
          .get();
        console.log(userContacts, 'userContacts');
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
      <TableHeader style={{ display: 'flex' }}>
        <div style={{ marginLeft: '2%' }}>Name</div>
        <div style={{ marginLeft: '10%' }}>Upcoming Call</div>
      </TableHeader>
      {contacts &&
        contacts.map(c => {
          return (
            <div style={{ display: 'flex' }}>
              <CallLink to={`/contact/${c.id}`} key={c.id}>
                <LinkWrapper>
                  <Display>{c.user2.displayName}</Display>
                  <Display>
                    {moment(c.next_call, 'X')
                      .tz(c.time_zone)
                      .format(`MMMM Do`)}
                  </Display>
                  <Display style={{ marginLeft: '5%' }}>
                    {moment(c.next_call, 'X')
                      .tz(c.time_zone)
                      .format(`h:mm A`)}
                  </Display>
                  <Display />
                </LinkWrapper>
              </CallLink>
              <div
                style={{
                  width: '10%',
                  alignSelf: 'center',
                }}
              >
                <Hotdog />
              </div>
            </div>
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
`;

const CallLink = styled(Link)`
  color: #7d7d7d;
  width: 90%;
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  border-bottom: 1px solid #7d7d7d;
  padding: 22px 16px;
  width: 119%;
`;

const Display = styled.div`
  width: 30%;
  /* text-align: center; */
  font-family: Roboto;
`;

const Hotdog = styled(FaEllipsisV)`
  width: 6px;
  font-family: Roboto;
  margin-left: 40%;
  color: #7d7d7d;
  height: 19px;

  &:hover {
    color: #ff6f61;
    cursor: pointer;
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
