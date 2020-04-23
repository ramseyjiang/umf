import React, { useState, useEffect } from 'react';
import { useUserContext } from '../../contexts/UserContext';
import UserModal from "./UserModal";
import { Container, Table, Button } from 'react-bootstrap';

const UserList = () => {
  const { userApi } = useUserContext();
  const [openUserModal, setOpenUserModal] = useState(false);

  const openModal = () => {
    setOpenUserModal(true);
  }

  const closeModal = () => {
    setOpenUserModal(false);
  }

  useEffect(()=>{
    userApi.getUserList();
  }, []);

  return (
    <Container className="users rounded user-list">
      <UserModal show={openUserModal} onHide={closeModal} user={userApi.state.user} />
        <div>
          <Button variant="primary" className="btn btn-sm" onClick={()=> {userApi.initUser(); openModal();}}><small>Create new user</small></Button>
          <h6 className="text-right"><small>Total users is {userApi.state.counter}</small></h6>
        </div>
        <Table>
          <thead>
            <tr>
              <th>Username</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Is Admin?</th>            
              <th>Email</th>
              <th>CreatedAt</th>
              <th>UpdatedAt</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {userApi.state.listUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.is_admin ? 'Yes' : 'No'}</td>
                <td>{user.email}</td>
                <td>{user.created_at}</td>
                <td>{user.updated_at}</td>
                <td>
                  <Button variant="primary" className="btn btn-sm" onClick={() => {userApi.editUser(user); openModal();}}>Update</Button>{' '}
                  <Button variant="danger" className="btn btn-sm" onClick={() => userApi.deleteUser(user.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  };
  
  export default UserList;