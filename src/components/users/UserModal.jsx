import React from 'react';
import Register from '../auth/Register';
import { Modal } from 'react-bootstrap';

const UserModal = (props) => {
	return (
		<>
		  <Modal show={props.show} onHide={props.onHide} >
        <Modal.Header closeButton>
	        <Modal.Title>Edit a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Register isModal="true" user={props.user} hideModal={props.onHide}/>
        </Modal.Body>
      </Modal>
		</>
	);
}

export default UserModal;