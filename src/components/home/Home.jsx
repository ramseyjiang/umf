import React from "react";
import { Container, ListGroup } from "react-bootstrap";

const Home = () => {
	const contents = {
		0: 'Allow User to Sign Up —> Any one can sign up',
		1: 'Allow Signed Up Users to be able to login. ',
		2: 'Allow Logged in users to log out.',
		3: 'List Users —> Any user (both Admin and normal user) can see list of users (provided they are logged in).',
		4: "Update a user —> Only an Admin User can Update any user's details (provided the Admin is logged in).",
		5: 'Delete a user —> Only an Admin User can Delete any user (provided the Admin is logged in).',
		6: 'Fields you should have against the User table are : id, email, username, firstName, lastName  password, created_at, updated_at, is_admin —> Required Fields',
		7: 'The fields created_at, updated_at should record Date and time as to when the record was created and updated.',
		8: 'Rebuild the Laravel auth default, make a user can login using username and password.',
		9: 'Deploy codes on AWS for preview and upload codes to GitHub for review.',
	}

	const colors = {
		0: 'success', 1:'danger', 2: 'warning', 3:'info', 4:'dark'
	}
  
  return (
    <>
      <Container className="home rounded">
				<h3 className="text-center">User Stories</h3>
        <div className="row">
          <div className="col-12">
            <ListGroup>
						{Object.keys(contents).map((key, index) => (
							<ListGroup.Item key={index} variant={colors[key%5]}>{contents[key]}</ListGroup.Item>
						))}
            </ListGroup>
          </div>
        </div>
      </Container>
    </>
  );
}
  
export default Home;