import React, { useState, useEffect } from "react";
import { Form, Button, Toast, ToastContainer, Spinner } from "react-bootstrap";
import authService from "../../services/auth.service";
import { useHistory } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../context/context";
import { setUser } from "../../context/actions";

export default function Login() {
  const history = useHistory();
  const dispatch: any = useAuthDispatch();
  const { user, token } = useAuthState();
  const [validated, setValidated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (user && token) {
      history.replace("/home");
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    let isValidForm = form.checkValidity();
    setValidated(true);
    if (isValidForm) {
      setIsLoading(true);
      const response = authService.login(username, password);
      if (response.status === 201 && response.access_token) {
        dispatch(
          setUser({
            user: username,
            token: response.access_token,
          })
        );
        history.replace("/home");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-100 v-100">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3 required" controlId="formBasicEmail">
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
        <Form.Group className="mb-3 required" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
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
            "Login"
          )}
        </Button>
      </Form>
    </div>
  );
}
