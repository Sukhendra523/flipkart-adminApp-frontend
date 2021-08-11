import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Layout from "../../Layout";
import Input from "../../UI/Input";
import { /*isUserLoggedIn,*/ login } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  if (auth.authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <Container className="pt-5">
        <Row className="mt-5">
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={userLogin}>
              <Input
                label="Email address"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                errorMessage=""
              />
              <Input
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                errorMessage=""
              />

              <Button variant="primary" type="submit">
                Sign In
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Signin;
