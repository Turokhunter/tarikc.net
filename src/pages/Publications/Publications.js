import React from "react";
import Layout from "../../components/Layout";
import Authors from "./Authors";
import Materials from "./Materials";
import { SectionTitle } from "../../styles";
import { Row, Col } from "react-bootstrap";
import { StyledImage, PubTitle } from "./styles";

const Papers = ({ papers }) => {
  return (
    <>
      {papers.map((pub) => (
        <Row>
          <Col xs={3} md={2}>
            <StyledImage src={pub.image} thumbnail />
          </Col>
          <Col xs={12} md={8}>
            <PubTitle>{pub.title}</PubTitle>
            <p>
              <Authors names={pub.authors} />. <i>{pub.venue}.</i> {pub.year}.
            </p>
            <p>
              <Materials
                bibTex={[pub.bibTex, pub.urlId]}
                materials={pub.materials}
                award={pub.award}
              />
            </p>
          </Col>
        </Row>
      ))}
    </>
  );
};

const Publications = ({ user }) => {
  return (
    <Layout user={user}>
      <div>
        <SectionTitle id="journal">Journal Publications</SectionTitle>
        <Papers papers={user.publications.journal} />
      </div>
      <div>
        <SectionTitle id="conference">Conference Publications</SectionTitle>
        <Papers papers={user.publications.conference} />
      </div>
    </Layout>
  );
};

export default Publications;
