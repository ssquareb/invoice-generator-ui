import React from 'react';
import '../../docs/css/login.css';
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

class AdminRegister extends React.Component {
  constructor (props) {
    super (props);
    this.state = {ame: '', email: '', password: ''};
    this.handleChange = this.handleChange.bind (this);
  }
  handleChange (event) {
    let name = event.target.name;
    let value = event.target.value;
    this.setState ({
      [name]: value,
    });
  }
  handleSubmit = () => {
    if (
      this.state.name == '' ||
      this.state.email == '' ||
      this.state.password == ''
    ) {
      document.getElementById ('register').innerHTML =
        'Please enter valid inputs';
    } else {
      fetch (`${API_URL}v1/auth/register`, {
        method: 'post',

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then (res => {
          if (res.status === 201) {
            document.getElementById ('register').innerHTML = 'Created';
            this.props.history.push ('/');
          } else if (res.status === 400) {
            document.getElementById ('register').innerHTML =
              'Email already taken';
          }
        })
        .catch (err => {
          console.log (err);
        });
    }
  };
  render () {
    return (
      <div className="form">
        <h1>Admin Register</h1>
        <FormGroup>
          <FormLabel>Name</FormLabel>
          <FormControl
            type="text"
            name="name"
            placeholder="Name"
            onChange={this.handleChange}
            value={this.state.name}
            className="input"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Email</FormLabel>
          <FormControl
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
            value={this.state.email}
            className="input"
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Password"
            className="input"
          />
        </FormGroup>
        <p id="register" />
        <Button onClick={() => this.props.history.push ('/')}>Back</Button>
        <Button onClick={() => this.handleSubmit ()}>Create</Button>
      </div>
    );
  }
}

export default AdminRegister;
