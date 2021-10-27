import React from 'react';
import ItemList from '../itemList';
import CharDetails, { Field } from '../charDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class HousePage extends React.Component {
  gotService = new GotService();

  state = {
    selectedChar: 130,
    error: false,
  };

  onItemSelected = (id) => {
    this.setState({ selectedChar: id });
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
        getData={this.gotService.getAllCharacters}
        renderItem={(item) => item.name}
      />
    );
    const charDetails = (
      <CharDetails charId={this.state.selectedChar}>
        <Field field='gender' label='Gender' />
        <Field field='born' label='Born' />
        <Field field='died' label='Died' />
        <Field field='culture' label='Culture' />
      </CharDetails>
    );

    return <RowBlock left={itemList} right={charDetails} />;
  }
}
