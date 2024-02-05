import React from "react";

import { Link, useLocation } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { StyledNavMain, StyledNavSub, StyledNavBrand } from "./styles";

const items = [
  {
    name: "Home",
    path: "/",
    subpath: [
      {
        name: "Bio",
        path: "/",
      },
      {
        name: "Resume",
        path: "/resume.pdf",
      },
      {
        name: "C.V.",
        path: "/cv.pdf",
      },
    ],
  },
  {
    name: "Publications",
    path: "/publications",
    subpath: [
      {
        name: "Journal",
        path: "/publications#journal",
      },
      {
        name: "Conference",
        path: "/publications#conference",
      },
    ],
  },
  {
    name: "Projects",
    path: "/projects",
    subpath: [
      {
        name: "Research",
        path: "/projects#research",
      },
      {
        name: "3D Design",
        path: "/projects#design",
      },
      {
        name: "Side Work",
        path: "/projects#side",
      },
    ],
  },
  {
    name: "Publicity",
    path: "/publicity",
    subpath: [
      {
        name: "Awards",
        path: "/publicity#awards",
      },
      {
        name: "Press",
        path: "/publicity#press",
      },
    ],
  },
];

const Header = () => {
  const location = useLocation();

  return (
    // <Navbar expand = "lg" bg="light" variant="light" fixed= "top">

    <Navbar fluid="true" expand="lg">
      <StyledNavBrand href="/">Dr. Tarik Crnovrsanin</StyledNavBrand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          {items.map((i, idx) => (
            <Nav.Item key={idx} className="flex-column">
              <StyledNavMain
                style={{ color: "#000000" }}
                element={Link}
                href={i.path}
                key={i.name}
              >
                {i.name}
              </StyledNavMain>
              {i.subpath.map((j) => (
                <StyledNavSub element={Link} href={j.path} key={j.name}>
                  {j.name}
                </StyledNavSub>
              ))}
            </Nav.Item>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
