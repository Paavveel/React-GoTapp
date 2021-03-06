import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Block = styled.div`
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

const RandomChar = () => {
  const [char, setChar] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const gotService = new GotService();
    const updateChar = () => {
      const id = Math.floor(Math.random() * 140 + 25);

      gotService
        .getCharacter(id)
        .then((char) => {
          setChar(char);
          setLoading(false);
        })
        .catch(onError);
    };
    updateChar();
    const timerId = setInterval(updateChar, 2000);

    return () => clearInterval(timerId);
  }, []);

  const onError = () => {
    setError(true);
    setLoading(false);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <View char={char} /> : null;

  return (
    <Block className='rounded'>
      {errorMessage}
      {spinner}
      {content}
    </Block>
  );
};

const View = ({ char }) => {
  const { name, gender, born, died, culture } = char;
  return (
    <React.Fragment>
      <h4>Random Character: {name}</h4>
      <ul className='list-group list-group-flush'>
        <li className='list-group-item d-flex justify-content-between'>
          <Term>Gender </Term>
          <span>{gender}</span>
        </li>
        <li className='list-group-item d-flex justify-content-between'>
          <Term>Born </Term>
          <span>{born}</span>
        </li>
        <li className='list-group-item d-flex justify-content-between'>
          <Term>Died </Term>
          <span>{died}</span>
        </li>
        <li className='list-group-item d-flex justify-content-between'>
          <Term>Culture </Term>
          <span>{culture}</span>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default RandomChar;
