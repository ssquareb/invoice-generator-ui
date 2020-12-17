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
import '../../docs/css/login.css';
import {API_URL} from '../config/app.config';
class AdminLogin extends React.Component {
  constructor (props) {
    super (props);
    this.state = {email: '', password: ''};
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
    if (this.state.email == '' || this.state.password == '') {
      document.getElementById ('login').innerHTML = 'Please enter valid inputs';
    } else {
      fetch (`${API_URL}v1/auth/login`, {
        method: 'post',

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify ({
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then (res => res.json ())
        .then (res => {
          let token = res.tokens.access.token;
          localStorage.setItem ('token', 'Bearer ' + token);
          this.props.history.push ('/users');
        })
        .catch (err => {
          console.log (err);
        });
    }
  };

  render () {
    return (
      <div className="form">
        <h1>Admin Login</h1>
        <div>
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
          <p id="login" />
          <Button onClick={() => this.handleSubmit ()}>SignIn</Button>
          <Button onClick={() => this.props.history.push ('/register')}>
            SignUp
          </Button>
        </div>

      </div>
    );
  }
}

export default withRouter (AdminLogin);
