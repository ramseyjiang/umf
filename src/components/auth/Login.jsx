import React, { useState } from "react";
import { Container, Form, Button, Alert } from 'react-bootstrap';
import RenderLoading from '../widgets/RenderLoading';
import InputText from '../form/InputText';
import { useAuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const { authApi } = useAuthContext();
  const [login, setLogin] = useState({
    username: '',
    password: ''
  });

  const handleChange = e => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = e => {
    authApi.loading(); 
    e.preventDefault(); 
    authApi.login(login);
  }

  return (
    <>
    { authApi.state.loading && (<RenderLoading />)}
    { !authApi.state.loading && 
      <Container className="justify-content-center col-6 login bg-light rounded">
        { authApi.state.error && <Alert variant='danger'>{authApi.state.error}</Alert>}
        <Form onSubmit={handleLogin} method="post" className="auth-padding">
          <InputText placeholder="Please input username" type="text" label="Username" name="username" min="2" max="16" value={login.username} onChange={handleChange} required="true"/>
          <InputText placeholder="Please input password" type="password" label="Password" name="password" min="6" max="16" value={login.password} onChange={handleChange} required="true"/>
          <Button variant="primary" type="submit" className="btn btn-sm">Login</Button>
        </Form>
      </Container> }
    </>
  );
}