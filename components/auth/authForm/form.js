import React, { useRef, useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import "./form.css";

function AuthForm() {
  const emialInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordRef = useRef();

  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading]=useState(false);

  const authSubmitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emialInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredconfirmPassword = confirmPasswordRef.current.value;

    if (enteredPassword!==enteredconfirmPassword) {
      setConfirmPasswordError(true);

      setTimeout(()=>{
        setConfirmPasswordError(false);
      },2000)
      return;
    }

    setIsLoading(true);

    if (isLogin) {
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3AbBTqHOLSTMDbMunfXa_oG8FAq8PlX4",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
            setIsLoading(false);
          if (response.ok) {
            alert('Your new account is created')
            return response.json();
          } else {
            return response.json().then((data) => {
              let errorMessage = data.error.message;
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <React.Fragment>
      <Form
        onSubmit={authSubmitHandler}
        className="shadow-lg p-3 mb-5 bg-light rounded"
        style={{ width: "30%" }}
      >
        <Form.Text className="signup" style={{ fontSize: "50px" }}>
          Sign up
        </Form.Text>
        <Form.Group className="Input">
          <FloatingLabel
            controlId="floatingEmail"
            label="Email"
            className="border border-info"
            style={{ borderRadius: "7px" }}
          >
            <Form.Control
              type="email"
              placeholder="Email"
              ref={emialInputRef}
            />
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
              ref={passwordInputRef}
            />
          </FloatingLabel>
        </Form.Group>

        <Form.Group className="Input">
          <FloatingLabel
            controlId="floatingConfirmPassword"
            label="Confirm Password"
            className="border border-info"
            style={{ borderRadius: "7px" }}
          >
            <Form.Control
              type="password"
              placeholder="Confirm password"
              ref={confirmPasswordRef}
            />
          </FloatingLabel>
        </Form.Group>

        {confirmPasswordError && (
          <p className="error">Password doesn't match!</p>
        )}

        {!isLoading ? <Form.Group className="submitbutton">
          <Button variant="primary" type="submit">
            Create account
          </Button>
        </Form.Group> : <p className="validate">validating the user!</p>}
      </Form>

      <span>
        <button className="switchAuth">Have an account? Login</button>
      </span>
    </React.Fragment>
  );
}
export default AuthForm;
