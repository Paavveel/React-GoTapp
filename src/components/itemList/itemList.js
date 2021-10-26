import React, { Component } from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const ListContainer = styled.ul`
  .list-group-item {
    cursor: pointer;
  }
`;

export default class ItemList extends Component {
  gotService = new GotService();

  state = {
    charList: null,
    error: false,
  };

  componentDidMount() {
    this.gotService
      .getAllCharacters()
      .then((charList) => {
        this.setState({ charList, error: false });
      })
      .catch(() => this.onError());
  }

  componentDidCatch() {
    this.setState({ charList: null, error: true });
  }

  onError = () => {
    this.setState({ charList: null, error: true });
  };

  renderItem = (arr) => {
    return arr.map((item, i) => {
      return (
        <li
          key={i}
          className='list-group-item'
          onClick={() => this.props.onCharSelected(41 + i)}
        >
          {item.name}
        </li>
      );
    });
  };

  render() {
    const { charList, error } = this.state;

    if (!charList) {
      return <Spinner />;
    }
    if (error) {
      return <ErrorMessage />;
    }

    const items = this.renderItem(charList);

    return <ListContainer className='list-group'>{items}</ListContainer>;
  }
}
