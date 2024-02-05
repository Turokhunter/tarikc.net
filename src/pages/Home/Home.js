import React from "react";
import Layout from "../../components/Layout";
import { SectionTitle, Paragraph, CardStyle } from "../../styles";
import { Col, Image, Row, Card } from "react-bootstrap";
import Media from "../../components/Media";
import {
  MyCard,
  CardImage,
  CardHeaderSmall,
  CardBody,
  CardFooter,
} from "../../styles";

const Cards = ({ items }) => {
  return (
    <CardStyle>
      {items.map((item, index) => (
        <MyCard key={index} style={{ width: "22rem" }}>
          <CardImage variant="top" height={190} src={item.image} />
          <CardHeaderSmall>{item.title}</CardHeaderSmall>
          <CardBody>{item.summary}</CardBody>
          <CardFooter>
            <Card.Link href={item.link}>Details</Card.Link>
          </CardFooter>
        </MyCard>
      ))}
    </CardStyle>
  );
};

const Home = ({ user }) => {
  return (
    <Layout user={user}>
      <Row>
        <Col md="auto">
          <Image src="CrnovrsaninTarik_Northeastern_Photo.jpg" width={360} />
          <Media media={user.basics} />
        </Col>
        <Col>
          <div>
            <SectionTitle>About Me</SectionTitle>
            <Paragraph>{user.basics.summary}</Paragraph>
          </div>
        </Col>
      </Row>
      <SectionTitle style={{ display: "flex", justifyContent: "left" }}>
        Selected Papers
      </SectionTitle>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Cards items={user.selectedpapers} />
      </Row>
      {/* <Row>
        <div>
          <SectionTitle>Selected Projects</SectionTitle>
          <Cards items={user.selectedprojects} />
        </div>
      </Row> */}
    </Layout>
  );
};

export default Home;
