import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";

const SignUp = (props) => {
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const [firstName, setFirstName] = useState(String);
  const [lastName, setLastName] = useState(String);
  const [data, setData] = useState({});

  const handleChange = (event) => {
    if (event.id === "email") {
      setEmail(event.value);
    } else if (event.id === "password") {
      setPassword(event.value);
    } else if (event.id === "firstname") {
      setFirstName(event.value);
    } else {
      setLastName(event.value);
    }
  };

  useEffect(() => {
    setData(
      JSON.parse(
        JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        })
      )
    );
  }, [email, password, firstName, lastName]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.signUp(data);
  };

  const { auth, authError } = props;

  if (!auth.isEmpty) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="container">
        <form onSubmit={(event) => handleSubmit(event)} className="white">
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => handleChange(event.target)}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => handleChange(event.target)}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              value={firstName}
              onChange={(event) => handleChange(event.target)}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              value={lastName}
              onChange={(event) => handleChange(event.target)}
              required
            />
          </div>
          <button className="btn pink lighten-1 zz-depth-0">Sign up</button>
          <div className="red-text center">
            {authError ? <p>{authError}</p> : null}
          </div>
        </form>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
