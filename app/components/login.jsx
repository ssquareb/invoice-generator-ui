import React from 'react';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.email === '' || this.state.password === '') {
      document.getElementById('valid').innerHTML = 'please enter valid inputs';
    } else {
      fetch('http://localhost:9000/v1/auth/login', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        //make sure to serialize your JSON body
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then(res => {
          console.log(res.json);
        })
        .catch(err => {
          console.log('error');
        });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h3>Login</h3>
          Email:
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br />
          Password:
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <button>Submit</button>
          <button type="reset">Reset</button>
        </form>
        <p id="valid" />
      </div>
    );
  }
}
export default Login;
