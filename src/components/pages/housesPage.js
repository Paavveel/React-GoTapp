import React from 'react';
import ItemList from '../itemList';
import ItemDetails, { Field } from '../itemDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class HousesPage extends React.Component {
  gotService = new GotService();

  state = {
    selectedHouse: 1,
    error: false,
  };

  onItemSelected = (id) => {
    this.setState({ selectedHouse: id });
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
        getData={this.gotService.getAllHouses}
        renderItem={(item) => item.name}
      />
    );
    const charDetails = (
      <ItemDetails
        itemId={this.state.selectedHouse}
        getData={this.gotService.getHouse}
      >
        <Field field='regio' label='Region' />
        <Field field='words' label='Words' />
        <Field field='titles' label='Titles' />
        <Field field='ancestralWeapons' label='AncestralWeapons' />
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={charDetails} />;
  }
}
