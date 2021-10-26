export default class GotService {
  constructor() {
    this.apiBase = 'https://anapioficeandfire.com/api';
  }

  getResource = async (url) => {
    const res = await fetch(`${this.apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  async getAllBooks() {
    const books = await this.getResource('/books/');
    return books.map(this._transformBook);
  }
  async getBook(id) {
    const book = await this.getResource(`/books/${id}`);
    return this._transformBook(book);
  }
  async getAllCharacters() {
    const res = await this.getResource(`/characters?page=5&pageSize=10`);
    return res.map(this._transformCharacter);
  }
  async getCharacter(id) {
    const character = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(character);
  }
  async getAllHouses() {
    const houses = await this.getResource('/houses/');
    return houses.map(this._transformHouse);
  }
  async getHouse(id) {
    const house = await this.getResource(`/houses/${id}`);
    return this._transformHouse(house);
  }

  isSet(data) {
    if (data) {
      return data;
    } else {
      return 'no data :(';
    }
  }

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)$/;
    return item.url.match(idRegExp)[1];
  };

  _transformCharacter = (char) => {
    return {
      id: this._extractId(char),
      name: this.isSet(char.name),
      gender: this.isSet(char.gender),
      born: this.isSet(char.born),
      died: this.isSet(char.died),
      culture: this.isSet(char.culture),
    };
  };

  _transformHouse(house) {
    return {
      id: this._extractId(house),
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titlts,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons,
    };
  }
  _transformBook(book) {
    return {
      id: this._extractId(book),
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released,
    };
  }
}
