import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import styled from 'styled-components';

const NoMatchText = styled.h3`
  text-align: center;
  font-size: 24px;
  color: #fff;
  margin: 0;
`;

const NoMatchPage = () => {
  return (
    <Container>
      <Row>
        <Col>
          <NoMatchText>404 - Not found</NoMatchText>
        </Col>
      </Row>
    </Container>
  );
};

export default NoMatchPage;
