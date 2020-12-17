import React from 'react';
import {withRouter} from 'react-router-dom';
import {
  Container,
  Row,
  Form,
  FormGroup,
  FormControl,
  FormLabel,
  Button,
  Alert,
  Table,
} from 'react-bootstrap';
import {API_URL} from '../config/app.config';

class CreateUser extends React.Component {
  constructor (props) {
    super (props);
    const {
      user = {
        userId: '',
        name: '',
        planName: '',
        planStart: '',
        planEnd: '',
        address: '',
        location: '',
        mobile: '',
      },
      update = false,
    } = this.props.location.state;
    this.state = {user, update};
  }
  handleChange = event => {
    if (event.target.name === 'plaStart') {
      this.setState ({
        user: Object.assign ({}, this.state.user, {
          [event.target.name]: event.target.value,
        }),
      });
    }

    this.setState ({
      user: Object.assign ({}, this.state.user, {
        [event.target.name]: event.target.value,
      }),
    });
  };

  upsert = () => {
    const apiUrl = this.state.update
      ? `${API_URL}v1/users/${this.state.user.userId}`
      : `${API_URL}v1/users`;
    const method = this.state.update ? 'PATCH' : 'post';
    const {
      userId,
      name,
      planName,
      planStart,
      planEnd,
      address,
      location,
      mobile,
    } = this.state.user;
    const bodyJson = Object.assign (
      {},
      {name, planName, planStart, planEnd, address, location, mobile}
    );
    const value = this.state.update
      ? bodyJson
      : Object.assign ({}, bodyJson, {userId});
    var body = JSON.stringify (value);
    fetch (apiUrl, {
      method: method,
      body: body,
      headers: {
        Authorization: localStorage.getItem ('token'),
        'Content-Type': 'application/json',
      },
    })
      .then (response => {
        if (response.status === 201 || response.status === 200) {
          this.props.history.push ('/users');

          response.json ();
        } else if (response.status === 400) {
          document.getElementById ('createUser').innerHTML =
            'UserId Already taken';
        }
      })
      .then (() => {
        this.setState ({
          user: {
            userId: '',
            name: '',
            planName: '',
            planStart: '',
            planEnd: '',
            address: '',
            location: '',
            mobile: '',
          },
          update: false,
        });
      });
  };
  render () {
    return (
      <div>
        <Row>
          <Form>
            {!this.state.update &&
              <FormGroup>
                <FormLabel>UserId</FormLabel>
                <FormControl
                  type="text"
                  name="userId"
                  placeholder="UserId"
                  onChange={this.handleChange}
                  value={this.state.user.userId}
                  className="input"
                />
              </FormGroup>}
            <p id="createUser" />
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormControl
                type="text"
                name="name"
                placeholder="Name"
                onChange={this.handleChange}
                value={this.state.user.name}
                className="input"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>PlanName</FormLabel>
              <FormControl
                type="text"
                name="planName"
                value={this.state.user.planName}
                onChange={this.handleChange}
                placeholder="PlanName"
                className="input"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>PlanStart</FormLabel>
              <FormControl
                type="date"
                name="planStart"
                placeholder="PlanStart"
                onChange={this.handleChange}
                value={this.state.user.planStart}
                className="input"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>PlanEnd</FormLabel>
              <FormControl
                type="date"
                name="planEnd"
                placeholder="PlanEnd"
                onChange={this.handleChange}
                value={this.state.user.planEnd}
                className="input"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Address</FormLabel>
              <FormControl
                type="text"
                name="address"
                placeholder="Address"
                onChange={this.handleChange}
                value={this.state.user.address}
                className="input"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Location</FormLabel>
              <FormControl
                type="text"
                name="location"
                placeholder="Location"
                onChange={this.handleChange}
                value={this.state.user.location}
                className="input"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Mobile</FormLabel>
              <FormControl
                type="text"
                name="mobile"
                placeholder="Mobile"
                onChange={this.handleChange}
                value={this.state.user.mobile}
                className="input"
              />
            </FormGroup>

            {
              <Button onClick={this.upsert}>
                {this.state.update === true ? 'Update' : 'Create'}
              </Button>
            }
          </Form>
        </Row>
      </div>
    );
  }
}
export default withRouter (CreateUser);
