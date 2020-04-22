import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import Routes from '../Routes';

const Layout = () => (
  <>
    <Header />
    <Container fluid>
      <Routes />
    </Container>
    <Footer />
  </>
);

export default Layout;
