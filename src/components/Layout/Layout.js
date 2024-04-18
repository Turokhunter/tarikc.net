import React from "react";
import Header from "../Header";
import Footer from "../Footer";

import Container from "react-bootstrap/Container";

const Layout = ({ user, children }) => {
  return (
    <>
      <Container>
        <Header />
        {children}
        <Footer user={user} />
      </Container>
    </>
  );
};

export default Layout;
