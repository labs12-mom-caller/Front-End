import React, { useState } from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import {
  Container,
  Section,
  Img,
  H2,
  Info,
  Line,
} from '../styles/Scheduler/index';
import { Button, Label, Select, Stripe } from '../styles/Form/index';
import { db } from '../firebase';

import scheduleSvg from '../assets/svg/undraw_schedule_pnbk.svg';

const SchedulePaidCall = ({ userId, contactId, frequency, user }) => {
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payError, setPayError] = useState(false);
  const [subId, setSubId] = useState('');

  const initialState = {
    timezone: moment.tz.guess(),
    hour: '1',
    minute: '00',
    period: 'PM',
    day: 'Sunday',
  };

  const [time, setTime] = useState(initialState);

  const onToken = async token => {
    try {
      setLoading(true);
      let stripeId = user.stripe_id || '';
      if (!user.stripe_id) {
        const response = await axios.post(
          'https://us-central1-recaller-14a1f.cloudfunctions.net/stripe/newcustomer',
          {
            email: user.email,
            displayName: user.displayName,
          },
        );

        await db.doc(`/users/${userId}`).update({
          stripe_id: response.data.stripe_id,
        });

        stripeId = response.data.stripe_id;
      }
      const planId =
        frequency === 'Bi-Weekly'
          ? 'plan_F20stdpdPhbPlz'
          : 'plan_F20svaxc8pnQWp';

      const resp = await axios.post(
        `https://us-central1-recaller-14a1f.cloudfunctions.net/stripe/newsubscription`,
        {
          stripeId,
          planId,
          tokenId: token.id,
        },
      );
      if (resp.data && resp.data.status === 'active') {
        setSubId(resp.data.id);
        setLoading(false);
        setPaid(true);
      } else {
        setLoading(false);
        setPayError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = e => {
    setTime({
      ...time,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const selectedTime = `${time.hour}:${time.minute} ${time.period}`;
    let nextCall = moment
      .tz(`${time.day} ${selectedTime}`, 'dddd h:mm A', time.timezone)
      .utc()
      .toDate();
    if (
      nextCall <
      moment()
        .tz(time.timezone)
        .toDate()
    ) {
      nextCall = moment
        .tz(nextCall, time.timezone)
        .add(1, 'w')
        .toDate();
    }
    try {
      const docRef = await db.collection('contacts').add({
        call_frequency: frequency,
        call_type: 'paid',
        next_call: nextCall,
        timezone: time.timezone,
        scheduled_day: time.day,
        scheduled_time: selectedTime,
        user1: db.collection('users').doc(userId),
        user2: db.collection('users').doc(contactId),
        created_at: moment().toDate(),
        updated_at: moment().toDate(),
        canceled: false,
        stripe_sub: subId,
      });
      await axios.put(
        `https://us-central1-recaller-14a1f.cloudfunctions.net/stripe/newsubscription/${subId}`,
        {
          contactId: docRef.id,
        },
      );
      navigate(`/confirmation/${docRef.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <Section>
          <Img src={scheduleSvg} alt='Woman looking at schedule' />
        </Section>
        <Section>
          <H2>Schedule a call</H2>
          <Info>
            ReCaller will only call you and your loved one at your selected
            time.
          </Info>
          <Label htmlFor='day'>Choose a day of the week</Label>
          <Select id='day' value={time.day} onChange={handleChange}>
            <option value='Sunday' defaultValue>
              Sunday
            </option>
            <option value='Monday'>Monday</option>
            <option value='Tuesday'>Tuesday</option>
            <option value='Wednesday'>Wednesday</option>
            <option value='Thursday'>Thursday</option>
            <option value='Friday'>Friday</option>
            <option value='Saturday'>Saturday</option>
          </Select>
          <Label htmlFor='selected_time'>
            Select the time you&apos;d like the call
          </Label>
          <Line>
            <Select value={time.hour} id='hour' onChange={handleChange}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </Select>
            <Select value={time.minute} id='minute' onChange={handleChange}>
              <option>00</option>
              <option>05</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>25</option>
              <option>30</option>
              <option>35</option>
              <option>40</option>
              <option>45</option>
              <option>50</option>
              <option>55</option>
            </Select>
            <Select value={time.period} id='period' onChange={handleChange}>
              <option>AM</option>
              <option>PM</option>
            </Select>
          </Line>
          <Label htmlFor='timezone'>What&apos;s your time zone?</Label>
          <Select id='timezone' value={time.timezone} onChange={handleChange}>
            <option>{time.timezone}</option>
            <option value='US/Alaska'>Alaska</option>
            <option value='US/Aleutian'>Aleutian</option>
            <option value='US/Arizona'>Arizona</option>
            <option value='US/Central'>Central</option>
            <option value='US/East-Indiana'>East-Indiana</option>
            <option value='US/Eastern'>Eastern</option>
            <option value='US/Hawaii'>Hawaii</option>
            <option value='US/Indiana-Starke'>Indiana-Starke</option>
            <option value='US/Michigan'>Michigan</option>
            <option value='US/Mountain'>Mountain</option>
            <option value='US/Pacific'>Pacific</option>
            <option value='US/Pacific-New'>Pacific-New</option>
          </Select>
          <Stripe
            token={res => onToken(res)}
            description='Thank you for becoming a Pro User'
            name='ReCaller'
            image='https://raw.githubusercontent.com/labs12-mom-caller/Front-End/master/public/favicon.ico'
            stripeKey={process.env.REACT_APP_STRIPEKEY}
          />
          <Button
            type='button'
            onClick={handleSubmit}
            disabled={!paid}
            className='submitBtn'
          >
            {loading ? <Loader type='ThreeDots' /> : 'Save & Continue'}
          </Button>
          <div style={{ visibility: payError ? 'visible' : 'hidden' }}>
            Issue with payment. Please try again
          </div>
        </Section>
      </Container>
    </>
  );
};

SchedulePaidCall.propTypes = {
  userId: PropTypes.string,
  contactId: PropTypes.string,
  frequency: PropTypes.string,
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
    stripe_id: PropTypes.string,
  }),
};

export default SchedulePaidCall;
