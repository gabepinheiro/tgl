export const getCurrencyFormatted = (amount) =>
new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
  .format(amount)
