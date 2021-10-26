import React from 'react';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';
import GotService from '../../services/gotService';
import RowBlock from '../rowBlock';

export default class CharacterPage extends React.Component {
  gotService = new GotService();

  state = {
    selectedChar: 130,
    error: false,
  };

  onCharSelected = (id) => {
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
        onCharSelected={this.onCharSelected}
        getData={this.gotService.getAllCharacters}
        renderItem={(item) => item.name}
      />
    );
    const charDetails = <CharDetails charId={this.state.selectedChar} />;

    return <RowBlock left={itemList} right={charDetails} />;
  }
}
