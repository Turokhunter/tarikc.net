import styled from "styled-components";
import { Card } from "react-bootstrap";

export const SectionTitle = styled.h3`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

export const Paragraph = styled.p`
  white-space: pre-wrap;
  padding-left: 1em;
  padding-right: 1em;
`;

export const CardStyle = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

export const Pill = styled.span`
  display: inline-block;
  margin-right: 0.75rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem 1rem;
  border-radius: 2px;
  font-weight: bold;
`;

export const CardImg = styled(Card.Img)`
  object-fit: cover;
`;

export const MyCard = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  padding: 10px 10px 20px 10px;
  box-shadow: 0 7px 20px 5px #00000088;
  transition: transform 0.4s ease-out;
  &:hover {
    box-shadow: 0 7px 50px 10px #000000aa;
    transform: scale(1.02);
  }
`;
export const CardImage = styled.img`
  position: relative;
  width: auto;
  height: 200px;
  object-fit: cover;
  object-position: center top;
`;
export const CardHeader = styled.h4`
  position: relative;
  padding: 10px 4px;
  font-weight: bold;
`;

export const CardHeaderSmall = styled.h5`
  position: relative;
  padding: 10px 4px;
`;
export const CardBody = styled.p`
  position: relative;
  padding: 4px;
  color: #212121;
`;
export const CardFooter = styled.div`
  position: absolute;
  display: Flex;
  gap: 0.5rem;
  padding: 6px 0px 10px 0px;
  bottom: 0px;
`;

export const CardPill = styled.span`
  color: white;
  background-color: #0277bd;
  border-radius: 16px;
  padding: 1px 10px;
`;
