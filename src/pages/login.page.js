import React from "react";
import "./login.styles.scss";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="outer">
      <div className="inner">
        <form>
          <h3>Log in</h3>
          <hr />
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <Link to='/chat-room' type="submit" className="btn btn-dark btn-lg btn-block">
            Sign in
          </Link>
          <p className="forgot-password text-right">
            New Member ? <Link to='/sign-up' className="signup">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
