import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import authService from "../../services/auth.service";
import { useHistory } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../context/context";

export default function Login() {
  const history = useHistory();
  const dispatch = useAuthDispatch();
  const { user, token } = useAuthState();
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(false);
  const [password, setPassword] = useState(false);

  useEffect(() => {
    if (user && token) {
      history.replace("/home");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    let isValidForm = form.checkValidity();
    setValidated(true);
    if (isValidForm) {
      setIsLoading(true);
      const response = await authService.login(username, password);
      if (response.status === 201 && response.access_token) {
        dispatch({
          type: "SET_USER",
          payload: {
            user: username,
            token: response.access_token,
          },
        });
        history.replace("/home");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 v-100">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail" value>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            required
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button disabled={isLoading} variant="primary" type="submit">
          {isLoading ? (
            <Spinner
              animation="border"
              className="d-flex justify-content-center align-self-center"
              size={"sm"}
            />
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
    </div>
  );
}
