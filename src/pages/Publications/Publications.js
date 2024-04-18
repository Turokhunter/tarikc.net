import React from "react";
import Layout from "../../components/Layout";
import Authors from "./Authors";
import Materials from "./Materials";
import { SectionTitle } from "../../styles";
import { Row, Col } from "react-bootstrap";
import { StyledImage, PubTitle, VisDiv } from "./styles";
import { CitationChart } from "./CitationChart";

const Papers = ({ papers }) => {
  return (
    <>
      {papers.map((pub) => (
        <Row id={pub.hashLink}>
          <Col md={2}>
            <StyledImage src={pub.image} thumbnail />
          </Col>
          <Col md={8}>
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
    <Layout user={user} fluid>
      <VisDiv>
        <CitationChart
          jounalPapers={user.publications.journal}
          conferencePapers={user.publications.conference}
          otherTypes={user.publications.others}
        />
      </VisDiv>
      <div>
        <SectionTitle id="journal">Journal Publications</SectionTitle>
        <Papers papers={user.publications.journal} />
      </div>
      <div>
        <SectionTitle id="conference">Conference Publications</SectionTitle>
        <Papers papers={user.publications.conference} />
      </div>
      <div>
        <SectionTitle id="others">Other Publications</SectionTitle>
        <Papers papers={user.publications.others} />
      </div>
    </Layout>
  );
};

export default Publications;
