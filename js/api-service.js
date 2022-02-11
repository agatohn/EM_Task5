export default class ApiService {
  BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

  constructor() {
    this.number = 0;
    this.StartFromItem = 0;
  }

  fetchTenPokemons() {
    const queryParams = new URLSearchParams({
      limit: this.number,
      offset: this.StartFromItem,
    });

    return fetch(`${this.BASE_URL}?${queryParams}`).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    });
  }

  fetchPokemon(pokemonName) {
    return fetch(`${this.BASE_URL}/${pokemonName}`).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    });
  }

  set query(qValue) {
    this.number =
      Number(qValue.split('-')[1].trim()) - Number(qValue.split('-')[0].trim());
    this.StartFromItem = Number(qValue.split('-')[0].trim());
  }
}
