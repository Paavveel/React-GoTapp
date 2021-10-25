import React, { Component } from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService';

const CharBlock = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  h4 {
    margin-bottom: 20px;
    text-align: center;
  }
`;

const Term = styled.span`
  font-weight: bold;
`;

const ErrorSpan = styled.span`
  color: #fff;
  text-align: center;
  font-size: 26px;
`;
export default class CharDetails extends Component {
  gotService = new GotService();

  state = {
    char: null,
  };

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.gotService.getCharacter(charId).then((char) => {
      this.setState({ char });
    });
  };

  render() {
    if (!this.state.char) {
      return <ErrorSpan>Please select a character</ErrorSpan>;
    }

    const { name, gender, born, died, culture } = this.state.char;
    return (
      <CharBlock className='rounded'>
        <h4>{name}</h4>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item d-flex justify-content-between'>
            <Term>Gender</Term>
            <span>{gender}</span>
          </li>
          <li className='list-group-item d-flex justify-content-between'>
            <Term>Born</Term>
            <span>{born}</span>
          </li>
          <li className='list-group-item d-flex justify-content-between'>
            <Term>Died</Term>
            <span>{died}</span>
          </li>
          <li className='list-group-item d-flex justify-content-between'>
            <Term>Culture</Term>
            <span>{culture}</span>
          </li>
        </ul>
      </CharBlock>
    );
  }
}
