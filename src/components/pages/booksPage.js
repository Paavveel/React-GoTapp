import React from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class BooksPage extends React.Component {
  gotService = new GotService();

  state = {
    selectedBook: 1,
    error: false,
  };

  onItemSelected = (id) => {
    this.setState({ selectedBook: id });
  };

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllBooks}
        renderItem={(item) => item.name}
      />
    );
    const charDetails = (
      <ItemDetails
        itemId={this.state.selectedBook}
        getData={this.gotService.getBook}
      >
        <Field field='numberOfPages' label='NumberOfPages' />
        <Field field='publisher' label='Publisher' />
        <Field field='released' label='Released' />
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={charDetails} />;
  }
}
