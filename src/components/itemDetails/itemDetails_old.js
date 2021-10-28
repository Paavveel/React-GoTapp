import React, { Component } from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const ItemBlock = styled.div`
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

const Field = ({ items, field, label }) => {
  return (
    <li className='list-group-item d-flex justify-content-between'>
      <Term>{label}</Term>
      <span>{items[field]}</span>
    </li>
  );
};
export { Field };
export default class ItemDetails extends Component {
  state = {
    items: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  onItemDetailsLoaded = (items) => {
    this.setState({ items, loading: false });
  };

  onError = () => {
    this.setState({ items: null, error: true });
  };

  updateItem = () => {
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }

    this.setState({ loading: true });

    getData(itemId)
      .then((item) => this.onItemDetailsLoaded(item))
      .catch(() => this.onError());
  };

  render() {
    const { items, loading, error } = this.state;
    if (!items && error) {
      return <ErrorMessage />;
    } else if (!items) {
      return (
        <SelectMessage>
          Please select in the left side to show more
        </SelectMessage>
      );
    }

    if (loading) {
      return (
        <ItemBlock className='rounded'>
          <Spinner />
        </ItemBlock>
      );
    }

    const { name } = items;
    return (
      <ItemBlock className='rounded'>
        <h4>{name}</h4>
        <ul className='list-group list-group-flush'>
          {React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, { items });
          })}
        </ul>
      </ItemBlock>
    );
  }
}
