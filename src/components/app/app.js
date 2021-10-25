import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import styled from 'styled-components';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';

const Button = styled.button`
  padding: 12px;
  background-color: #1e2edb;
  border: none;
  border-radius: 4px;
  color: #fff;
  margin-bottom: 40px;
  outline: none;
  box-shadow: 0px 0px 30px rgba(256, 256, 256, 0.1);
  cursor: pointer;
  :focus {
    outline: none;
  }
`;

export default class App extends React.Component {
  state = {
    showRandomChar: true,
    error: false,
  };

  toggleRandomChar = () => {
    this.setState((state) => {
      return { showRandomChar: !state.showRandomChar };
    });
  };

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }
    const char = this.state.showRandomChar ? <RandomChar /> : null;
    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              {char}
              <Button onClick={this.toggleRandomChar}>
                Toggle random character
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md='6'>
              <ItemList />
            </Col>
            <Col md='6'>
              <CharDetails />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
