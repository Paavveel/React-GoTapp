import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const ListContainer = styled.ul`
  .list-group-item {
    cursor: pointer;
  }
`;

export default class ItemList extends Component {
  state = {
    itemList: null,
    error: false,
  };

  componentDidMount() {
    const { getData } = this.props;

    getData()
      .then((itemList) => {
        this.setState({ itemList, error: false });
      })
      .catch(() => this.onError());
  }

  componentDidCatch() {
    this.setState({ itemList: null, error: true });
  }

  onError = () => {
    this.setState({ itemList: null, error: true });
  };

  renderItem = (arr) => {
    return arr.map((item) => {
      const { id } = item;
      const label = this.props.renderItem(item);
      return (
        <li
          key={id}
          className='list-group-item'
          onClick={() => this.props.onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  };

  render() {
    const { itemList, error } = this.state;

    if (!itemList) {
      return <Spinner />;
    }
    if (error) {
      return <ErrorMessage />;
    }

    const items = this.renderItem(itemList);

    return <ListContainer className='list-group'>{items}</ListContainer>;
  }
}
