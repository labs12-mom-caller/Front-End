import React from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const NextCall = ({ contact }) => {
  console.log(contact);
  return (
    <Container>
      <header>
        <h3>Next Call</h3>
      </header>
      <main>
        <Date>
          {' '}
          {moment(contact.next_call, 'X')
            .tz(contact.timezone)
            .format('MMMM Do, YYYY')}
        </Date>
        <Time>
          {moment(contact.next_call, 'X')
            .tz(contact.timezone)
            .format('LT')}
        </Time>
      </main>
    </Container>
  );
};

const Date = styled.div`
  font-size: 20px;
`;

const Time = styled.div`
  font-size: 24px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    margin: 10px auto;

    div {
      margin: 5px;
    }
  }
`;

export default NextCall;

NextCall.propTypes = {
  contact: PropTypes.object,
};
