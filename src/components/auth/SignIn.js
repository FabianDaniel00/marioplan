import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signIn } from "../../store/actions/authActions";

const SignIn = (props) => {
  const [email, setEmail] = useState(String);
  const [password, setPassword] = useState(String);
  const [data, setData] = useState({});

  const { authError, auth } = props;

  const handleChange = (event) => {
    if (event.id === "email") {
      setEmail(event.value);
    } else {
      setPassword(event.value);
    }
  };

  useEffect(() => {
    setData(
      JSON.parse(
        JSON.stringify({
          email,
          password,
        })
      )
    );
  }, [email, password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.signIn(data);
  };

  if (!auth.isEmpty) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="container">
        <form onSubmit={(event) => handleSubmit(event)} className="white">
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => handleChange(event.target)}
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => handleChange(event.target)}
            />
          </div>
          <button className="btn pink lighten-1 z-depth-0">Login</button>
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
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
