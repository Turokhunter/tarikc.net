import styled from "styled-components";
import { Image, Row } from "react-bootstrap";

export const StyledImage = styled(Image)`
  transition: transform 0.2s;
  &:hover {
    position: relative;
    transform: scale(2);
    z-index: 1;
  }
`;

export const PubTitle = styled.a`
  font-weight: 800;
  color: #000;
  text-decoration: none;
  &:hover {
    color: #377eb8;
    text-decoration: none;
  }
`;
export const PubRow = styled(Row)`
  padding: 10px 0px;
`;
export const AwardStyle = styled.span`
  color: #e41a1c;
  font-weight: 600;
`;

export const PubMaterial = styled.a`
  color: #000;
  text-decoration: none;
`;
