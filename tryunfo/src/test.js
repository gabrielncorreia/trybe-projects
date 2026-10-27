const value01 = 10
const value02 = 10
const value03 = 10
const maxAllValue = 210;
const totalValue = value01 + value02 + value03 > maxAllValue;
const test = true && true

state = {
  cardAttr1: '0',
  cardAttr2: '0',
  cardAttr3: '0',
}

const { cardAttr1, cardAttr2, cardAttr3 } = state
const attr1 = Number(cardAttr1)
const attr2 = Number(cardAttr2)
const attr3 = Number(cardAttr3)

console.log(typeof attr1)
