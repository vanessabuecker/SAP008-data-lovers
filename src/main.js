import data from "./data/pokemon/pokemon.js";
import { printCards, selectNameAz, selectNameZa, pokeCalc } from './data.js'

const buttonClean = document.getElementById("newSearch");
const orderPokemon = document.getElementById("order");
const result = document.getElementById("result");
const searchName = document.getElementById("findPokemon");
const selectType = document.getElementById("pokeType");
const selectRarity = document.getElementById("rarity");
const spanCloseAbout = document.getElementById("closeAbout");
const modalContentElementAbout = document.getElementById('modal_content_about');
const modalElementAbout = document.getElementById('modal_about');
const divCalc = document.querySelector(".divCalc")

displayCard()

buttonClean.addEventListener("click", newSearch);
orderPokemon.addEventListener("change", pokemonOrder);
selectRarity.addEventListener("change", displayCard);
selectType.addEventListener("change", displayCard);
searchName.addEventListener("keypress", displayCard);
spanCloseAbout.addEventListener("click", hideModalAbout);
selectType.addEventListener("change", displayCalc);

function displayCard() {
  result.innerHTML = printCards(data, selectRarity.value, selectType.value, searchName.value)
}

function newSearch() {
  window.location.reload();
}

function pokemonOrder() {
  const order = orderPokemon.value;

  if (order === "name-az") {
    selectNameAz(data.pokemon);
    displayCard();
    moreInfo()

  } else if (order === "name-za") {
    selectNameZa(data.pokemon);
    displayCard();
    moreInfo()
  }
}

function displayCalc() {
  const select = selectType.value
  const pokemonData = data.pokemon.filter((pokemon) => pokemon.type.includes(select))
  const pokeLenght = data.pokemon.length

  for (let pokemons = 0; pokemons <= pokemonData.length; pokemons++) {
    let result = pokeCalc(pokeLenght, pokemons)
    divCalc.innerHTML = `There are a total of: <b> ${pokemons}</b> Pokémons type <b>${select[0].toUpperCase() + select.substr(1)}</b>. <br/>This represents an average of <b> ${result}%</b> of all Pokémons.`
  }
}

function hideModalAbout() {
  const modalElement = document.querySelector('#modal_about');
  modalElement.classList.remove('show-modal');
}

let buttonAction = function (index) {
  return function () {
    const pokemonData = data.pokemon

    modalElementAbout.classList.add('show-modal');

    modalContentElementAbout.innerHTML =
      ` <figure class= "pokeData">
         <img class="poke-img-info" src='${pokemonData[index].img}' alt=${pokemonData[index].name}>
          <h4 id="title">  ${pokemonData[index].name[0].toUpperCase() + pokemonData[index].name.substring(1)}</h4>
        </figure>
       <div class="pokeMoreInfo">
        <span class="pokeInfoAbout">${pokemonData[index].about}</span>
       </div> `
  }
};

function moreInfo() {
  var cardOnClick = document.getElementsByClassName("boxImg");
  for (var i = 0; i < cardOnClick.length; i++) {
    cardOnClick[i].addEventListener('click', buttonAction(i), false);
  }
}

moreInfo()

