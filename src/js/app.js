import { get } from './http.js'

let games = {}

export function app () {
  function init() {
    requestGames(response => {
      games = response
      console.log(games)
    })
  }

  function requestGames (callback) {
    get('src/js/games.json', callback)
  }

  return init
}

