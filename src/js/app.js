import { get } from './http.js'
import { $, Fragment, Element } from './utils/index.js'
import {
  createNumberButton,
  createGameTypeButton,
  createCartItem
} from './components/index.js'

let games = {}
let selectedGame = {}
let currentBet = {
  numbers: []
}

const cart = {
  items: null,
  total: 0
}

const $betTypeName = $('[data-js=bet-type-name]')
const $betTypeDescription = $('[data-js=bet-type-desc]')
const $numbersRangeContainer = $('[data-js=numbers-range-container]')
const $gameTypeButtonContainer = $('[data-js=game-type-button-container]')
const $btnCompleteGame = $('[data-js=btn-complete-game]')
const $btnClearGame = $('[data-js=btn-clear-game]')

const $cartItemsContainer = $('[data-js=cart-items-container]')
const $cartTotalAmount = $('[data-js=cart-total-amount]')

function requestGames (callback) {
  get('src/js/games.json', callback)
}

function calculateTotalAmount (items) {
  const total =  !!items
    ? items.reduce((acc, current) => acc + current.price, 0)
    : 0
  cart.total= total

  return total
}

function setValueAmountDisplay (amount) {
  $cartTotalAmount.textContent = amount
}

export function app () {
  function init() {
    requestGames(response => {
      games = response
      games.types = games.types.map(game => ({
        ...game,
        selected: game.type === 'Mega-Sena'
      }))
      selectedGame = games.types.find(game => game.selected)

      console.log('Games: ', games)
      console.log('selectedGame: ', selectedGame)

      const { type, description, range } = selectedGame
      setBetTypeName(type)
      setBetTypeDescription(description)
      gameTypeButtonsRender(games.types)
      rangeNumbersRender(range)

      $cartItemsContainer.appendChild(cartItemsRender(cart.items))
      console.log(cart.items)

      const amount = calculateTotalAmount(cart.items)
      setValueAmountDisplay(amount)
      console.log('Cart: ', cart)
    })

    initEvents()
  }

  function initEvents () {
    $btnCompleteGame.addEventListener('click', handleCompleteGame)
    $btnClearGame.addEventListener('click', handleClearGame)
  }

  function setBetTypeName (typeName) {
    $betTypeName.textContent = typeName
  }

  function setBetTypeDescription (description) {
    $betTypeDescription.textContent = description
  }

  function cartItemsRender (items) {
    if(!items) {
      return document.createElement('p')
        .appendChild(
          document.createTextNode('Nenhuma aposta adicionada.')
        )
    }

    const $fragment = Fragment()
    items.forEach(item => {
      $fragment.appendChild(createCartItem(item))
    })

    return $fragment
  }

  function rangeNumbersRender (range) {
    $numbersRangeContainer.innerHTML = ''
    const $fragment = Fragment();
    [...new Array(range)].map((_, index) => index + 1)
      .forEach((number) => {
        const $numberButton = createNumberButton(number)
        $numberButton.addEventListener('click', handleSelectNumber(number))
        $fragment.appendChild($numberButton)
      })

    $numbersRangeContainer.appendChild($fragment)
  }

  function gameTypeButtonsRender (games) {
    $gameTypeButtonContainer.innerHTML = ''
    const $fragment = Fragment()
    games.forEach(game => {
      const $item = Element('li')
      const $button = createGameTypeButton(game)
      $button.addEventListener('click', handleSelectGameType(game.type))
      $item.appendChild($button)
      $fragment.appendChild($item)
    })

    $gameTypeButtonContainer.appendChild($fragment)
  }

  function clearNumbersCurrentBet () {
    currentBet.numbers = []
  }

  function handleSelectGameType (type) {
    return (e) => {
      e.preventDefault()
      games.types = games.types.map(game => ({
        ...game,
        selected: game.type === type
      }))
      selectedGame = games.types.find(game => game.type === type)

      clearNumbersCurrentBet()
      setBetTypeName(type)
      setBetTypeDescription(selectedGame.description)
      gameTypeButtonsRender(games.types)
      rangeNumbersRender(selectedGame.range)
    }
  }

  function handleSelectNumber(number) {
    return (e) => {
      const hasNumber = currentBet.numbers.find(item => item === number)
      if(hasNumber) {
        currentBet.numbers = currentBet.numbers.filter(item => item !== hasNumber)
        e.target.style.background = '#adc0c4'
        console.log(currentBet)
        return;
      }

      if(currentBet.numbers.length === selectedGame['max-number']) {
        return;
      }
      currentBet.numbers.push(number)
      e.target.style.background = selectedGame.color
      console.log(currentBet)
    }
  }

  function getRandomNumber (range) {
    return Math.ceil(Math.random() * +range)
  }

  function getRandomNumbersBet (range, max_number) {
    let randomNumbers = []
    while(randomNumbers.length < max_number) {
      const random = getRandomNumber(range)
      const index = randomNumbers.indexOf(random)

      if(index === -1) {
        randomNumbers.push(!!random ? random : getRandomNumber(range))
      } else {
        randomNumbers = randomNumbers.filter(item => item !== index)
      }
    }

    return randomNumbers
  }

  function handleClearGame () {
    clearNumbersButton()
    clearNumbersCurrentBet()
  }

  function handleCompleteGame () {
    const { range } = selectedGame
    const max_number = selectedGame['max-number']


    if(currentBet.numbers.length){
      clearNumbersButton()
      currentBet.numbers = getRandomNumbersBet(range, max_number)
      fillGame(currentBet.numbers)
      return;
    }

    currentBet.numbers = getRandomNumbersBet(range, max_number)
    fillGame(currentBet.numbers)
  }

  function fillGame (numbers) {
    numbers.forEach(number => {
      const $numberButton = $(`[data-number=${number < 10 ? `"0${number}"` : `"${number}"`}]`)
      $numberButton.style.background = selectedGame.color
    })
  }

  function clearNumbersButton () {
    const $buttons = $numbersRangeContainer.querySelectorAll('button')
    $buttons.forEach(button => button.style.background = '#adc0c4')
  }

  return init
}

