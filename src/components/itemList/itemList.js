import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const ListContainer = styled.ul`
  .list-group-item {
    cursor: pointer;
  }
`;

const ItemList = ({ getData, renderItem, onItemSelected }) => {
  const [itemList, updateList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getData()
      .then((data) => {
        updateList(data);
        setLoading(false);
      })
      .catch(onError);
  }, [getData]);

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const renderItems = (arr) => {
    return arr.map((item) => {
      const { id } = item;
      const label = renderItem(item);
      return (
        <li
          key={id}
          className='list-group-item'
          onClick={() => onItemSelected(id)}
        >
          {label}
        </li>
      );
    });
  };

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorMessage />;
  }

  const items = renderItems(itemList);

  return <ListContainer className='list-group'>{items}</ListContainer>;
};

export default ItemList;
