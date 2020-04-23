import React, { useState } from "react";
import { Container, Form, Button, Alert } from 'react-bootstrap';
import InputText from '../form/InputText';
import { useAuthContext } from "../../contexts/AuthContext";
import { useUserContext } from '../../contexts/UserContext';
import RenderLoading from '../widgets/RenderLoading';

export default function Register(props) {
  const { authApi } = useAuthContext();
  const { userApi } = useUserContext();
  const [user, setUser] = useState(userApi.state.user);

  const handleChange = e => {
    let value = e.target.name !== 'is_admin' ? e.target.value : e.target.checked
    setUser({ ...user, [e.target.name]: value });
  };

  const handleRegister = () => {
    authApi.loading(); 
    authApi.register(user);                   
  }

  const handleSubmit = e => {
    e.preventDefault(); 
    if(userApi.state.operate === 'INIT'){
      handleRegister();
    } else {
      userApi.state.operate === 'CREATE' ? userApi.createUser(user) : userApi.updateUser(user);
      props.hideModal();
    }                  
  }

  return (
    <>
    { authApi.state.loading && (<RenderLoading />)}
    { !authApi.state.loading && 
      <Container className={props.isModal ? "justify-content-center bg-light rounded": "justify-content-center col-6 register bg-light rounded"}>
        { authApi.state.error && <Alert variant='danger'>{authApi.state.error}</Alert>}
        <Form onSubmit={handleSubmit} method="post" className="auth-padding">
          <InputText placeholder="Please input username" type="text" label="Username" name="username" min="2" max="16" value={user.username} onChange={handleChange} disabled={userApi.state.operate === 'Update'}/>
          <Form.Check type="checkbox" label="Is an admin?" name="is_admin" checked={user.is_admin === 1 ? 'checked' : null } onChange={handleChange} />
          <InputText placeholder="Please input first name" type="text" label="First Name" name="first_name" min="2" max="16" value={user.first_name} onChange={handleChange}/>
          <InputText placeholder="Please input last name" type="text" label="Last Name" name="last_name" min="2" max="16" value={user.last_name} onChange={handleChange} disabled={userApi.state.operate === 'Update'}/>
          <InputText placeholder="Please input email" type="email" label="Email" name="email" value={user.email} onChange={handleChange}/>
          <InputText placeholder="Please input password" type="password" label="Password" name="password" min="6" max="16" value={user.password} onChange={handleChange}/>
          <Button variant="primary" type="submit" className="btn btn-sm">Submit</Button>
        </Form>
      </Container> }
    </>
  );
}