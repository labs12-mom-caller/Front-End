import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { db } from '../firebase';

class UpdateAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: ' ',
      phoneNumber: ' ',
      photoUrl: ' ',
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const form = {
      displayName: this.state.displayName,
      phoneNumber: this.state.phoneNumber,
      photoUrl: this.state.photoUrl,
    };

    db.push(form);
    this.setState({
      displayName: '',
      phoneNumber: '',
      photoUrl: '',
    });
  };

  render() {
    const userDocRef = db.collection('users').doc(`${this.props.user.uid}`);

    console.log(userDocRef);

    const getDoc = userDocRef
      .get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          console.log('Document data:', doc.data());
          db.collection('users')
            .doc(`${this.props.user.uid}`)
            .update({
              displayName: this.state.displayName,
              phoneNumber: this.state.phoneNumber,
              photoUrl: this.state.photoUrl,
            })
            .then(function() {
              console.log('Document successfully updated!');
            });
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });

    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md='6'>
            <form onSubmit={this.onSubmit}>
              <p className='h5 text-center mb-4'>Update Information</p>
              <div className='grey-text'>
                <MDBInput
                  label='Phone Number'
                  icon='phone'
                  onChange={e => this.handleChange(e)}
                  value={this.state.phoneNumber}
                  group
                  type='phone'
                  validate
                  error='wrong'
                  success='right'
                />
                <MDBInput
                  label='Displayname'
                  name='displayName'
                  onChange={e => this.handleChange(e)}
                  value={this.state.displayName}
                  icon='user-circle'
                  group
                  type='password'
                  validate
                />
                <div className='input-group'>
                  <div className='input-group-prepend'>
                    <span
                      className='input-group-text'
                      id='inputGroupFileAddon01'
                    >
                      Upload Picture
                    </span>
                  </div>
                  <div className='custom-file'>
                    <input
                      type='file'
                      name='photoURL'
                      className='custom-file-input'
                      id='inputGroupFile01'
                      aria-describedby='inputGroupFileAddon01'
                    />
                    <label
                      className='custom-file-label'
                      htmlFor='inputGroupFile01'
                    >
                      Choose file
                    </label>
                  </div>
                </div>
              </div>
              <div className='text-center'>
                <MDBBtn>Submit</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default UpdateAccount;
