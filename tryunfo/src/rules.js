export const RARITIES = ['common', 'uncommon', 'rare', 'mythic rare'];
export const MAX_VALUE = 90;
export const MAX_TOTAL = 210;

const ATTRIBUTES = ['cardAttr1', 'cardAttr2', 'cardAttr3'];

export function attributeTotal(card) {
  return ATTRIBUTES.reduce((sum, name) => sum + Number(card[name]), 0);
}

export function attributesInRange(card) {
  return ATTRIBUTES.every((name) => {
    const value = Number(card[name]);
    return card[name] !== '' && value >= 0 && value <= MAX_VALUE;
  });
}

export function hasRequiredText(card) {
  return ['cardName', 'cardDescription', 'cardImage']
    .every((name) => card[name].trim() !== '');
}

export function isValidCard(card) {
  return hasRequiredText(card)
    && attributesInRange(card)
    && attributeTotal(card) <= MAX_TOTAL;
}
