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
  font-size: 28px;
`;

const Container = styled.div`
  main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    div {
      margin: 12px;
    }
  }
`;

export default NextCall;

NextCall.propTypes = {
  contact: PropTypes.object,
};
