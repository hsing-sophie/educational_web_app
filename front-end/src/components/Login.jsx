import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";

export default function Login() {
  const history = useHistory();
  const eye = <FontAwesomeIcon icon={faEye} />;
  const { register, handleSubmit, errors } = useForm();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:9001/getregistereduser`, { data })
      .then((response) => {
        const user = response.data.user;
        const userType = response.data.user.usertype;
        console.log("response", response.data.user);
        if (userType === "learner") {
          history.push({ pathname: "/learner", state: { user } });
        } else if (userType === "educator") {
          history.push({ pathname: "/educator", state: { user } });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <div className="form-group">
          <input
            name="email"
            autoComplete="off"
            ref={register({
              required: true,
              minLength: 5,
              maxLength: 255 /*pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i*/,
            })}
            className="form-control"
            placeholder="Email"
            //value={input.email}
            //onChange={handleChange}
          ></input>
          {/* errors will return when field validation fails  */}
          {errors.email && errors.email.type === "required" && (
            <span>Email is required</span>
          )}
          {errors.email && errors.email.type === "minLength" && (
            <span>MinLength of the email is 5</span>
          )}
          {errors.email && errors.email.type === "maxLength" && (
            <span>MaxLength of the email is 255</span>
          )}
          {/*errors.email && errors.email.type === "pattern" && (<span>Email can have </span>)*/}

          <div className="password-wrapper">
            <input
              name="password"
              autoComplete="off"
              ref={register({ required: true, minLength: 5, maxLength: 255 })}
              type={passwordShown ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              //value={input.password}
              //onChange={handleChange}
            ></input>
            <i onClick={togglePasswordVisiblity}>{eye}</i>
          </div>
          {errors.password && errors.password.type === "required" && (
            <span>Password is required</span>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <span>MinLength of the password is 5</span>
          )}
          {errors.password && errors.password.type === "maxLength" && (
            <span>MaxLength of the password is 255</span>
          )}
          <input type="submit" value="Login" />
        </div>
      </form>
      <p>New user?</p>
      <Link to="/register">Register</Link>
    </div>
  );
}
