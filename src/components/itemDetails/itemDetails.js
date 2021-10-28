import React, { useState, useEffect } from 'react';
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

const ItemDetails = ({ itemId, getData, children }) => {
  const [items, setItems] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const updateItem = () => {
      if (!itemId) {
        return;
      }
      setLoading(true);

      getData(itemId)
        .then((data) => {
          setItems(data);
          setLoading(false);
        })
        .catch(onError);
    };
    updateItem();
  }, [itemId, getData]);

  const onError = () => {
    setError(true);
  };

  if (loading) {
    return (
      <ItemBlock className='rounded'>
        <Spinner />
      </ItemBlock>
    );
  }

  if (!items && error) {
    return <ErrorMessage />;
  } else if (!items) {
    return (
      <SelectMessage>Please select in the left side to show more</SelectMessage>
    );
  }

  const { name } = items;
  return (
    <ItemBlock className='rounded'>
      <h4>{name}</h4>
      <ul className='list-group list-group-flush'>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { items });
        })}
      </ul>
    </ItemBlock>
  );
};

export default ItemDetails;
