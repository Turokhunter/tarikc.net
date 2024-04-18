import styled from "styled-components";
import { Nav, Navbar } from "react-bootstrap";

export const StyledNavMain = styled(Nav.Link)`
  padding-bottom: 0px;
  font-weight: bold;
`;

export const StyledNavBrand = styled(Navbar.Brand)`
  font-family: monospace;
  --font-mono: "Fira Mono", monospace;
  font-size: 2.5rem;
  margin-left: -16px;
  font-weight: 700;
  @media (max-width: 724px) {
    font-size: 1.5rem;
  }
`;

export const StyledNavSub = styled(Nav.Link)`
  color: rgba(0, 0, 0, 1);
  padding-top: 0px;
  padding-bottom: 0px;
`;

export const StyledP = styled.p`
 padding-left:5px
 padding-right:5px
`;
