# Star Wars Planets

A searchable, filterable table of every planet in the Star Wars films.

**Live demo:** https://gabrielncorreia.github.io/starwars-planets/

![Planets table](docs/planets.png)

## Features

- Filter planets by name as you type
- Numeric filters on population, orbital period, diameter, rotation period and surface water, with "greater than", "less than" and "equal to"
- Sort by any numeric column, ascending or descending

## Stack

React with Hooks and the Context API for state, and the [SWAPI](https://swapi.info/) Star Wars API.

## About the project

Built individually at [Trybe](https://www.betrybe.com/). The tests in `src/App.test.js` cover the filters and sorting.

The API used during the course is no longer online, so in 2026 I moved the app to [swapi.info](https://swapi.info/), which serves the same planet data.

## Running locally

Requires Node.js. From the project folder:

```sh
npm install
npm start     # app at http://localhost:3000
npm test      # run the test suite
```
