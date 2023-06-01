import { Form, Button, FloatingLabel } from "react-bootstrap";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";

function SignInForm() {
  const [passError, setPassError] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const emialRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    setLoading(true);

    const email = emialRef.current.value;
    const password = passwordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3AbBTqHOLSTMDbMunfXa_oG8FAq8PlX4",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          history.replace("/homePage");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = data.error.message;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        if (err.message === "INVALID_PASSWORD") {
          setPassError(true);

          setTimeout(() => {
            setPassError(false);
          }, 2000);
        } else {
          alert(err.message);
        }
      });
  };

  const authSwitchHandlerInSignUp = () => {
    history.replace("/signup-page");
  };
  return (
    <React.Fragment>
      <Form
        onSubmit={submitHandler}
        className="shadow-lg p-3 mb-5 bg-light rounded border border-3"
        style={{ width: "30%" }}
      >
        <Form.Text className="signup" style={{ fontSize: "50px" }}>
          Sign in
        </Form.Text>
        <Form.Group className="Input">
          <FloatingLabel
            controlId="floatingEmail"
            label="Email"
            className="border border-info"
            style={{ borderRadius: "7px" }}
          >
            <Form.Control type="email" placeholder="Email" ref={emialRef} />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="Input">
          <FloatingLabel
            controlId="floatingPassword"
            label="Password"
            className="border border-info"
            style={{ borderRadius: "7px" }}
          >
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </FloatingLabel>
        </Form.Group>

        {passError && <p className="error">invalid Password!</p>}

        {!loading ? (
          <Form.Group className="submitbutton">
            <Button variant="primary" type="submit">
              Log in
            </Button>
          </Form.Group>
        ) : (
          <p className="validate">validating your details..</p>
        )}
      </Form>
      <span>
        <button className="switchAuth" onClick={authSwitchHandlerInSignUp}>
          Don't have an account? SignUp
        </button>
      </span>
    </React.Fragment>
  );
}

export default SignInForm;
