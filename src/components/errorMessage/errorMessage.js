import React from 'react';
import styled from 'styled-components';
import img from './error.jpg';

const ErrorImg = styled.img`
  width: 100%;
`;

const ErrorMessage = () => {
  return (
    <>
      <ErrorImg src={img} alt='Error' />
      <span>Something goes wrong</span>
    </>
  );
};

export default ErrorMessage;
