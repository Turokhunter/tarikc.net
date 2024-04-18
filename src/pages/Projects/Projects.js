import React from "react";
import { useState } from "react";
import Layout from "../../components/Layout";
import { Figure, Row, Col, Button, Modal } from "react-bootstrap";
import { CardRow } from "./styles";

import {
  MyCard,
  CardImage,
  CardHeader,
  CardBody,
  CardFooter,
  CardPill,
  Paragraph,
} from "../../styles";

// import { ProfileLink } from './styles';

const Html = ({ ele }) => {
  if (ele.p) {
    return (
      <Col xs={18} md={12}>
        <p style={{ color: "#212121" }}>{ele.p}</p>
      </Col>
    );
  } else if (ele.link) {
    var link = ele.link;
    return (
      <Col xs={18} md={12}>
        {link.text}
        <Button variant="link" href={link.url}>
          {link.linkText}
        </Button>
      </Col>
    );
  } else if (ele.image) {
    var image = ele.image;
    return (
      <Col xs={12} md={8}>
        <Figure>
          <Figure.Image
            height={image.height ? image.height : "100%"}
            width={image.width ? image.width : "100%"}
            src={image.src}
          />
          <Figure.Caption>{image.caption}</Figure.Caption>
        </Figure>
      </Col>
    );
  } else if (ele.video) {
    var video = ele.video;
    return (
      <Col md="auto">
        <iframe
          title={video.src}
          width={video.width ? video.width : "100%"}
          height={video.height ? video.height : "100%"}
          src={video.src}
          frameBorder="0"
          allow={video.allow}
          allowFullScreen
        ></iframe>
      </Col>
    );
  } else if (ele && ele.length > 1) {
    return (
      <>
        {ele.map((entry) => (
          <Html ele={entry} />
        ))}
      </>
    );
  } else {
    return <p>else</p>;
  }
};

const Card = ({ entry }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <MyCard style={{ width: 350, cursor: "pointer" }} onClick={handleShow}>
        <CardImage src={entry.image} alt="" />
        <CardHeader>{entry.title}</CardHeader>
        <CardBody>{entry.shortDesc}</CardBody>
        <CardFooter>
          {entry.tags && entry.tags.map((tag) => <CardPill>{tag}</CardPill>)}
        </CardFooter>
      </MyCard>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{entry.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {entry.html.map((html) => (
            <Row className="justify-content-md-center">
              <Html ele={html} />
            </Row>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const Projects = ({ user }) => {
  return (
    <Layout user={user}>
      {user.projects.map((section) => (
        <>
          <Row>
            <h1>{section.title}</h1>
          </Row>
          <Row>
            <Paragraph>{section.summary}</Paragraph>
          </Row>
          <CardRow>
            {section.entries.map((entry) => (
              <Card entry={entry} key={entry.title} />
              // <Entry entry={entry} />
            ))}
          </CardRow>
        </>
      ))}
    </Layout>
  );
};

export default Projects;
