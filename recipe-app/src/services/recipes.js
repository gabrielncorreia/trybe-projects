import fetchRecipe from './api';

// Route segment, API type and storage labels for each kind of recipe.
export const KINDS = {
  meal: { path: 'comidas', key: 'meals', field: 'Meal', label: 'comida', title: 'Comidas' },
  cocktail: { path: 'bebidas', key: 'drinks', field: 'Drink', label: 'bebida', title: 'Bebidas' },
};

export const apiTypeFromPath = (pathname) => (
  pathname.includes('/bebidas') ? 'cocktail' : 'meal'
);

// TheMealDB/TheCocktailDB spread ingredients over strIngredient1..20 + strMeasure1..20.
export function normalizeRecipe(raw, apiType) {
  const { field, label } = KINDS[apiType];
  const ingredients = Object.keys(raw)
    .filter((key) => key.startsWith('strIngredient') && raw[key] && raw[key].trim())
    .map((key) => ({
      name: raw[key].trim(),
      measure: (raw[key.replace('Ingredient', 'Measure')] || '').trim(),
    }));
  return {
    id: raw[`id${field}`],
    apiType,
    type: label,
    name: raw[`str${field}`],
    image: raw[`str${field}Thumb`],
    category: raw.strCategory || '',
    area: raw.strArea || '',
    alcoholicOrNot: raw.strAlcoholic || '',
    tags: raw.strTags ? raw.strTags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
    instructions: raw.strInstructions || '',
    youtube: raw.strYoutube || '',
    ingredients,
  };
}

export async function fetchRecipeById(apiType, id) {
  const response = await fetchRecipe(apiType, 'id', id);
  const list = response && response[KINDS[apiType].key];
  return list ? normalizeRecipe(list[0], apiType) : null;
}

// Default lists: TheCocktailDB no longer returns anything for an empty search.
export async function fetchDefaultList(apiType, size = 12) {
  const response = apiType === 'cocktail'
    ? await fetchRecipe(apiType, 'letter', 'm')
    : await fetchRecipe(apiType);
  return ((response && response[KINDS[apiType].key]) || []).slice(0, size);
}

export const youtubeEmbed = (url) => {
  const match = url.match(/[?&]v=([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
};

export const recipeUrl = ({ apiType, id }) => (
  `${window.location.href.split('#')[0]}#/${KINDS[apiType].path}/${id}`
);

// ---------- localStorage ----------

const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// Shape stored for favorites and done recipes (kept from the original project).
const summary = (recipe) => ({
  id: recipe.id,
  type: recipe.type,
  area: recipe.area,
  category: recipe.category,
  alcoholicOrNot: recipe.alcoholicOrNot,
  name: recipe.name,
  image: recipe.image,
});

export const getFavorites = () => read('favoriteRecipes', []);
export const isFavorite = (id) => getFavorites().some((recipe) => recipe.id === id);

export function toggleFavorite(recipe) {
  const favorites = getFavorites();
  const exists = favorites.some(({ id }) => id === recipe.id);
  write('favoriteRecipes', exists
    ? favorites.filter(({ id }) => id !== recipe.id)
    : [...favorites, summary(recipe)]);
  return !exists;
}

export const removeFavorite = (id) => {
  write('favoriteRecipes', getFavorites().filter((recipe) => recipe.id !== id));
};

export const getDone = () => read('doneRecipes', []);

export function markDone(recipe) {
  const date = new Date();
  const done = getDone().filter(({ id }) => id !== recipe.id);
  write('doneRecipes', [...done, {
    ...summary(recipe),
    doneDate: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    tags: recipe.tags,
  }]);
  const progress = read('inProgressRecipes', { cocktails: {}, meals: {} });
  const bucket = recipe.apiType === 'cocktail' ? 'cocktails' : 'meals';
  delete progress[bucket][recipe.id];
  write('inProgressRecipes', progress);
}

// Checked ingredient names for a recipe being cooked.
export function getChecked(apiType, id) {
  const progress = read('inProgressRecipes', { cocktails: {}, meals: {} });
  const list = progress[apiType === 'cocktail' ? 'cocktails' : 'meals'][id];
  return Array.isArray(list) ? list.filter((item) => typeof item === 'string') : [];
}

export function saveChecked(apiType, id, checked) {
  const progress = read('inProgressRecipes', { cocktails: {}, meals: {} });
  const bucket = apiType === 'cocktail' ? 'cocktails' : 'meals';
  progress[bucket] = { ...progress[bucket], [id]: checked };
  write('inProgressRecipes', progress);
}

export async function copyLink(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
