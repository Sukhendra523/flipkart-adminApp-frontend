import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { signup } from "../../../actions";
import Layout from "../../Layout";
import Input from "../../UI/Input";

const Signup = () => {
  const auth = useSelector((state) => state.auth);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const userSignup = (event) => {
    event.preventDefault();

    const user = { firstName, lastName, email, password };
    dispatch(signup(user));
  };

  if (auth.authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <Container>
        <Row className="mt-5">
          <Col md={6}>
            <Input
              label="First Name"
              type="text"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              errorMessage={error}
            />
          </Col>
          <Col md={6}>
            <Input
              label="Last Name"
              type="text"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              errorMessage={error}
            />
          </Col>
        </Row>
        <Form onSubmit={userSignup}>
          <Input
            label="Email address"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            errorMessage={error}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            errorMessage={error}
          />
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
        {user.loading && <p>Loading....................................</p>}
        {user.message && <p>{user.message}</p>}
      </Container>
    </Layout>
  );
};

export default Signup;
