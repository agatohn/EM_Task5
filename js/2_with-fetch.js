import ApiService from './api-service.js';
import getRefs from './get-refs.js';
import cardTemplate from './Card-template.js';
import modalTemplate from './modal-template.js';

const refs = getRefs();
const api = new ApiService();

refs.form.addEventListener('submit', onFetch);
refs.gallery.addEventListener('click', onCardClick);

function onFetch(e) {
  e.preventDefault();
  refs.gallery.removeEventListener('cloick', onFetch);
  refs.gallery.innerHTML = '<div class="loader"></div>';
  const input = e.currentTarget.elements.query.value;
  api.query = input;
  api.fetchTenPokemons().then(getEachPokemonData).catch(onFetchError);
}

async function getEachPokemonData({ results }) {
  const promises = results.map(pokemon =>
    api.fetchPokemon(pokemon.name).then(pokemon => ({
      name: pokemon.name,
      weight: pokemon.weight,
      height: pokemon.height,
      id: pokemon.id,
      img: pokemon.sprites.other.home.front_shiny,
    })),
  );

  const result = await Promise.all(promises).catch(onFetchError);
  savePokemonData(result);
  renderPokemonsList(result);
}

function onFetchError(error) {
  alert(`No pokemons! Error : ${error.message}`);
}

function savePokemonData(data) {
  localStorage.setItem('pokemons', JSON.stringify([...data]));
}

function renderPokemonsList(data) {
  let str = '';
  let counter = 0;
  data.forEach(element => {
    if (counter < data.length - 1) {
      counter += 1;
      return (str += cardTemplate(element));
    } else {
      str += cardTemplate(element);
      refs.gallery.innerHTML = str;
    }
  });
}
function onCardClick(e) {
  const currentCardId = Number(e.target.closest('.gallery-item').id);
  const pokemonsArr = JSON.parse(localStorage.getItem('pokemons'));
  const pokemonDetails = pokemonsArr.find(item => item.id === currentCardId);
  renderModal(pokemonDetails);
  toggleModal();
}

function renderModal(element) {
  refs.modal.innerHTML = modalTemplate(element);
}

function toggleModal() {
  if (refs.modal.classList.contains('is-hidden')) {
    console.log('add');
    window.addEventListener('keydown', closeModalEsc);
    window.addEventListener('click', closeModalBackdropClick);
  } else {
    console.log('remove');
    window.removeEventListener('keydown', closeModalEsc);
    window.removeEventListener('click', closeModalBackdropClick);
  }
  console.log('toggle');
  refs.modal.classList.toggle('is-hidden');
  refs.body.classList.toggle('no-scroll');
}

function closeModalBackdropClick(e) {
  if (e.target === refs.modal) {
    toggleModal();
  }
  return;
}
function closeModalEsc(evt) {
  if (evt.code == 'Escape') {
    toggleModal();
  }
  return;
}

function LSGet(name) {
  return JSON.parse(localStorage.getItem(name));
}

function SSSet(name, data) {
  sessionStorage.setItem(name, JSON.stringify([...data]));
}
