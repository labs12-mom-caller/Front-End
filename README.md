# ![logo](https://raw.githubusercontent.com/labs12-mom-caller/Front-End/master/public/favicon.ico)

# ReCaller

Recaller is an app that allows users to schedule calls between themselves and their loved ones. The app programmatically calls both the user and their loved one and records their call. It uses the Deepgram API to make a transcription of the call and then sends it to both parties by email. Previous recordings and transcripts are accessible online.

Domain: https://lambda-recaller.com
Deployment: https://recaller-14a1f.firebaseapp.com/<br>
Trello: https://trello.com/b/TjTMyqlH <br>
Wireframe: https://balsamiq.cloud/snv27r3/pj8mhnh/r2278

## Table of Contents

- [Team](#team)
- [Motivation](#Motivation)
- [Features](#Features)
- [Installation](#Installation)
- [Using ReCaller](#Using-ReCaller)
- [Data Model](#Data-Model)
- [API](#API)
- [Built With](#built-with)
- [Testing](#Testing)

## Team

| Members         | Github                            |
| --------------- | --------------------------------- |
| Dylan Dislers   | https://github.com/dislersd       |
| Jon Palacio     | https://github.com/bangarangler   |
| Kevin Smith     | https://github.com/keveightysev   |
| Michael Checo   | https://github.com/MichaelCheco   |
| Shawn Antonucci | https://github.com/shawnantonucci |

## Motivation

Quentin’s Mom always bugs him saying, “How come you never call me?” Well, he’s had enough. A couple of his friends have told him he should sign up for Mom Caller so that’s what he did. Now, his monthly Mom caller subscription calls both him AND his mom at random times every week — no way for him to forget (and no way to bail since both people are being called at the same time)! His mom is thrilled. Even better, the subscription is free for short and randomly timed calls and paid for pre-schedule and long calls (and moms can get the subscription for their children). His mom loves it because after every call she gets sent a recording and a transcript of the call through her email. She’s always up to date now and Quentin feels like an awesome son.

## Features

- Deepgram voice recognition
- Transcription
- Automated calling
- Call recording

Recaller is an app that allows users to schedule calls between themselves and their loved ones. The app programmatically calls both the user and their loved one and records their call. It uses the Deepgram API to make a transcription of the call and then sends it to both parties by email. Previous recordings and transcripts are accessible online.

## Mission statement:

We believe in connecting families and friends. In order to facilitate this, we will build an app that allows you to schedule phone calls and have a transcript of your conversations to remember details from your calls. By offering calls, automation, and flexible configuration we work to ensure families stay in touch.

## Installation

Install the app in a local dev environment by running `yarn` from the root of
the folder, and in the `./functions` folder. This installs all dependencies.
You will need a `.env` file in the `./` directory.

### Instructions for .env Variables:

#### Client

The client will need 6 environment variables.

Follow the instructions [here](https://firebase.google.com/docs/web/setup) to create a Firebase account & project. Once your project is set up, go to your project's settings page to find your "Web API Key"; that value (as a string) will be your `REACT_APP_FIREBASE_KEY`.

```
REACT_APP_APIKEY={insert web API Key here}
REACT_APP_AUTHDOMAIN={insert your App's Domain here}
REACT_APP_DATABASEURL={insert your Databse url here}
REACT_APP_PROJECTID={insert your App's Project ID here}
REACT_APP_STORAGEBUCKET={insert your App's storage bucket url here}
REACT_APP_MESSAGINGSENDERID={Insert your App's message sender ID here}
REACT_APP_STRIPEKEY={Insert your Stripe public key here}
```

#### Cloud Functions

This app uses Firebase Cloude Functions to run its backend functions in a Node.js environment. To set the environtmental variables, you will need to have the Firebase CLI installed, and then run the following after your Firebase project has been initialized locally:

```
firebase functions:config:set deepgram.username="YOUR DEEPGRAM USERNAME" deepgram.password="YOUR DEEPGRAM PASSWORD" stripe.secret="YOUR STRIPE SECRET KEY" twilio.token="YOUR TWILIO TOKEN" twilio.sid="YOUR TWILIO SID" sendgrid.key="YOUR SENDGRID KEY"
```

## Using ReCaller

Users can schedule calls at the time of signing up or after they've already created an account. Creating a new scheduled call ('Contact') consists of providing information for user 2 and then choosing a plan and time of call. options for contacts are listed below.

| Type of Call | Maximum Duration of Call | Frequency of Call | Price        |
| ------------ | ------------------------ | ----------------- | ------------ |
| Free         | Up to 10 minutes         | Bi-Weekly         | Free         |
| Free         | Up to 10 minutes         | Monthly           | Free         |
| Paid         | Up to 30 minutes         | Bi-Weekly         | \$5/month    |
| Paid         | Up to 30 minutes         | Monthly           | \$2.50/month |

Contact information can be viewed from the dashboard, and contacts can be rescheduled from the single contact page.

After a call has occurred, a preview of the recording appears on the dashboard. The preview is linked to a full record of the call, which includes an audio player for the full audio from the call, as well as a transcription of the call itself.

Users can update their accounts from the "Update Account" link.

Users can review their billing information from the "Billing" link, which lists previous receipts and upcoming charges for each individually scheduled contact.

## Data Model

This project uses three Firestore collections for its data.

### Users Collection

The documents in this collection are records for each user.

| Field Name  | Description                           | Type   |
| ----------- | ------------------------------------- | ------ |
| displayName | User's full name                      | string |
| email       | User's email address                  | string |
| phoneNumber | User's phone number                   | string |
| photoUrl    | URL to a photo of user                | string |
| uid         | UID for user's Authentication account | string |

### Contacts Collection

The documents in this collection are records of the recurring call information between two users

| Field Name     | Description                                                          | Type               |
| -------------- | -------------------------------------------------------------------- | ------------------ |
| call_frequency | Frequency of call between users, i.e. Bi-Weekly or Weekly            | string             |
| call_type      | If a call is free or paid                                            | string             |
| canceled       | whether a call has been canceled                                     | boolean            |
| created_at     | When contact was created                                             | timestamp          |
| next_call      | The next scheduled call for contact                                  | timestamp          |
| selected_times | An array of timestamps that free contact users select during sign up | array              |
| scheduled_day  | Day of the week that paid users choose during sign up                | string             |
| scheduled_time | Time of day that paid users choose during sign up                    | string             |
| stripe_sub     | Stripe subscription ID number for paid contacts                      | string             |
| timezone       | Timezone that user selects during sign up                            | string             |
| updated_at     | Time of last document update                                         | timestamp          |
| user1          | Reference to user who created the contact                            | document reference |
| user2          | Reference to user that user 1 selected during sign up                | document reference |

### Calls Collection

The documents in this collection are references to previous calls generated by contacts

| Field Name    | Description                                             | Type               |
| ------------- | ------------------------------------------------------- | ------------------ |
| audio         | URL to audio file of call                               | string             |
| call_duration | Duration of phone call in seconds                       | string             |
| call_time     | Time that call was made                                 | timestamp          |
| contact_ref   | Reference to contact document                           | document reference |
| deepgram      | Response data from Deepgram API call                    | map                |
| fetched       | Whether call recording has been fetched and transcribed | boolean            |
| simplified    | A simplified version of Deepgram transcript             | array              |
| twilio        | Twilio ID of the call                                   | string             |

## API

### Authentication

Authentication is prcessed by Firebase Authentication, and accessed by the client using the `firebase.auth()` function. New users can either sign in with their Google account if they have one, or they can create a new account. The client creates new accounts using the [`signup`](./src/app/utils.js) function

### Reading/Writing Data

User accounts and new contacts are written to the database using the `firebase.firestore()` function in React. This function is also used to fetch user, contact, and call information from Firestore to be displayed to the user.

### User 2 Creation

As part of scheduling contacts, users choose who the contact will be with. If an account does not exist for the person they choose, the front end will create a new document in the `users` Firestore collection. The [`userTwo`](./functions/tasks/userTwo.js) Cloud Function is a Pub/Sub function that will create an authentication account for the user and then email user (using the SendGrid API) 2 to let the user know an account was created for them.

### Contact Email

When a contact between two users is finalized, the [`contactEmail`](./functions/tasks/contactEmail.js) Cloud Pub/Sub Function runs. This function uses the SendGrid API to send an email to both users to inform them of the scheduled time of the first call for the contact.

### Caller

The [`caller`](./functions/tasks/caller.js) Cloud Function is a Pub/Sub function that listens to a Google Cloud Scheduler function that runs every five minutes. When the function runs, it checks the `contacts` Firestore collection for any contact that has the current time scheduled as `next_call`. For each contact found, the Twilio API makes a call to the user who scheduled the call. If user answers, it automatically calls user 2 on the contact. Once user 2 answers, the call begins recording. A new document is created in the `calls` Firestore collection that references the Twilio call ID, the contact document reference, and the time the call was made.

The call to user 2 is made by passing the URL below (for paid calls) to the Twilio API

```
https://handler.twilio.com/twiml/{TwiML Bin SID}?BuddyPhone={User 2 Phone Number}
```

This endpoint uses a TwiML bin using the XML below to call user 2, limit the call length, record the call, and then pass the recording information back to our endpoint

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial record="record-from-answer-dual" timeLimit="1800" recordingStatusCallback="https://us-central1-recaller-14a1f.cloudfunctions.net/twilio">
    <Number>{{BuddyPhone}}</Number>
  </Dial>
  <Pause length="1500" />
  <Say>You have five minutes left.</Say>
</Response>
```

Once the call is connected, the contact document is updated by adding 2 or 4 weeks (depending on call plan) to `next_call`.

### Handling the Twilio Recording

The [`twilio`](./functions/tasks/twilio.js) Cloud Function is an HTTP function that receives the call information sent from Twilio when a recorded call is completed.

On request, it creates a file in Cloud Storage, fetches the file using the recorded file URL from Twilio, then pipes the fetched file with a write stream.

Once the file is finished writing to Cloud Storage, a public URL is generated. The URL is posted to Deepgram's API for transcription.

On response from the Deepgram API, the Twilio file is deleted. The Deepgram response is simplified using the [`simplifyTranscript`](./functions/tasks/helpers/simplifyTranscript.js) function.

The call document is then updated with the URL for the audio recording, the Deepgram response, and the simplified transcript.

Finally, an email is sent to both users on the call using the SendGrid API. This email includes the audio recording, the simplified transcript, and information about the call.

## Built With

### Backend

- [Firebase](https://firebase.google.com/) - This project uses the Authentication, Firestore, Cloud Storage, Hosting, and Cloud Functions services
- [Twilio](https://www.twilio.com/) - To make and record calls
- [Deepgram](https://www.deepgram.com/) - For transcribing calls that have been recorded
- [SendGrid](https://sendgrid.com/) - Sending emails
- [Stripe](https://stripe.com/) - Processing subscription payments for each call
- [axios](https://github.com/axios/axios) - Fetching a call recording from Twilio and piping the file to Cloud Storage

### Frontend

- [React](https://reacjs.org/) - This app was built using React
- [Firebase](https://firebase.google.com/) - Accessing authentication, storage, and Firestore database
- [Reach Router](https://reach.tech/router) - Routing components
- [Styled Components](https://www.styled-components.com/) - Custom styling components library
- [Formik](https://jaredpalmer.com/formik/) - Styling forms based on validation
- [Yup](https://github.com/jquense/yup) - Form validation
- [Moment Timezone](https://momentjs.com/timezone/) - Formatting timestamps
- [axios](https://github.com/axios/axios) - Making HTTP requests to our custom Stripe API
- [Material UI](https://material-ui.com/) - Modals
- [React Icons](https://react-icons.netlify.com/#/) - Icon Library
- [React Loader Spinner](https://github.com/mhnpd/react-loader-spinner) - Loading animations
- [React Slick](https://react-slick.neostack.com/) - Carousel for mobile view of free scheduler
- [React Stripe Checkout](https://github.com/azmenak/react-stripe-checkout) - Process Stripe payments - [useAutoScroll](https://github.com/kamry-bowman/useAutoScroll) - Custom React Hook for scrolling on the Landing Page

## Testing

This library uses Jest for testing. For the client side, we make use of the React-Testing-Library.

Tests can be run in the client by moving into /client and running yarn test.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
