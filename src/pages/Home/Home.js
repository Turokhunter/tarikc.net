import React from "react";
import Layout from "../../components/Layout";
import { SectionTitle, Paragraph } from "../../styles";
import { Col, Image, Row } from "react-bootstrap";
import Media from "../../components/Media";
import "./styles.css";

const Cards = ({ items }) => {
  return (
    <div className="card-row">
      {items.map((item, index) => (
        <div
          className="card-high"
          key={index}
          style={{
            backgroundImage: `url(${item.image}`,
            backgroundPosition: item.position,
          }}
        >
          <div className="card-content">
            <h2 className="cardheader">{item.title}</h2>
            <p className="card-p">{item.summary}</p>
            <a href={item.link}>Details</a>
          </div>
        </div>
      ))}
    </div>
  );
};

const Home = ({ user }) => {
  return (
    <Layout user={user}>
      <Row>
        <Col md="auto">
          <Image src={user.basics.picture} width={360} />
          <Media media={user.basics} />
        </Col>
        <Col>
          <div>
            <SectionTitle>About Me</SectionTitle>
            <Paragraph>{user.basics.summary}</Paragraph>
          </div>
        </Col>
      </Row>
      <Row>
        <SectionTitle>Selected Papers</SectionTitle>
        <Cards items={user.selectedpapers} />
      </Row>
      <Row>
        <SectionTitle>Selected Projects</SectionTitle>
        <Cards items={user.selectedprojects} />
      </Row>
    </Layout>
  );
};

export default Home;
