import { isValidCard } from './rules';

const card = {
  cardName: 'Shivan Dragon',
  cardDescription: 'Flying',
  cardImage: 'https://example.com/dragon.jpg',
  cardAttr1: '90',
  cardAttr2: '90',
  cardAttr3: '30',
};

it('accepts a complete card at the point limit', () => {
  expect(isValidCard(card)).toBe(true);
});

it('rejects a card over the total, out of range, empty or missing text', () => {
  expect(isValidCard({ ...card, cardAttr3: '31' })).toBe(false);
  expect(isValidCard({ ...card, cardAttr1: '91', cardAttr3: '0' })).toBe(false);
  expect(isValidCard({ ...card, cardAttr2: '-1' })).toBe(false);
  expect(isValidCard({ ...card, cardAttr2: '' })).toBe(false);
  expect(isValidCard({ ...card, cardName: '   ' })).toBe(false);
});
