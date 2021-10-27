import React, { Component } from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

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

const SelectMessage = styled.span`
  color: #fff;
  text-align: center;
  font-size: 26px;
`;

const Field = ({ item, field, label }) => {
  return (
    <li className='list-group-item d-flex justify-content-between'>
      <Term>{label}</Term>
      <span>{item[field]}</span>
    </li>
  );
};
export { Field };
export default class CharDetails extends Component {
  gotService = new GotService();

  state = {
    item: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  onCharDetailsLoaded = (item) => {
    this.setState({ item, loading: false });
  };

  onError = () => {
    this.setState({ item: null, error: true });
  };

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.setState({ loading: true });

    this.gotService
      .getCharacter(charId)
      .then((item) => this.onCharDetailsLoaded(item))
      .catch(() => this.onError());
  };

  render() {
    const { item, loading, error } = this.state;
    if (!item && error) {
      return <ErrorMessage />;
    } else if (!item) {
      return <SelectMessage>Please select a character</SelectMessage>;
    }

    if (loading) {
      return (
        <CharBlock className='rounded'>
          <Spinner />
        </CharBlock>
      );
    }

    const { name } = item;
    return (
      <CharBlock className='rounded'>
        <h4>{name}</h4>
        <ul className='list-group list-group-flush'>
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { item });
          })}
        </ul>
      </CharBlock>
    );
  }
}
