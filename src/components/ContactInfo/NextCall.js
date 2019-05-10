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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    'header'
    'main'
    'main'
    '.';

  header {
    grid-area: header;
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-items: center;
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    grid-area: main;
    margin-top: 10px;

    div {
      margin: 5px;
    }
  }
`;

export default NextCall;

NextCall.propTypes = {
  contact: PropTypes.object,
};
