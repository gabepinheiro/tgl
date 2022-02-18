function createNumberButton (number) {
  const $button = document.createElement('button')
  $button.classList.add('number-button')
  const newNumber = number < 10 ? `0${number}` : number
  $button.setAttribute('data-number', newNumber)
  $button.appendChild(document.createTextNode(String(newNumber)))

  return $button
}

export { createNumberButton }
