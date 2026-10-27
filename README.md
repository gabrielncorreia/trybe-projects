# Trybe projects

Projects I built while learning to program at the [Trybe](https://www.betrybe.com/) bootcamp, collected in one repository. Each folder was its own repository before, and its commit history came with it.

**Try them all at [gabrielncorreia.github.io/trybe-projects](https://gabrielncorreia.github.io/trybe-projects/).** My current work is on my [portfolio](https://gabrielncorreia.github.io/).

| Folder | Project | Stack |
| --- | --- | --- |
| [trybewarts](trybewarts) | Group project: a school admission form | HTML, CSS, JavaScript |
| [movie-cards-library](movie-cards-library) | My first React project: movie cards from a JSON file | React |
| [tryunfo](tryunfo) | Card-game deck builder, restyled as Magic cards | React |
| [trybetunes](trybetunes) | Album and song search with audio previews and favorites | React, React Router |
| [trybewallet](trybewallet) | Expense wallet with live currency conversion | React, Redux |
| [trivia](trivia) | Group project: a timed quiz game with a ranking | React, Redux |
| [starwars-planets](starwars-planets) | Star Wars planets table with filters and sorting | React, Context API |
| [recipe-app](recipe-app) | Group project: food and drink recipes with cooking progress | React, Context API |

## How it is deployed

A GitHub Actions workflow ([pages.yml](.github/workflows/pages.yml)) builds every React app, copies Trybewarts as it is, adds [index.html](index.html) as the landing page and publishes the result to GitHub Pages. The apps keep their original 2021–2022 toolchains, so the build runs with `NODE_OPTIONS=--openssl-legacy-provider`.

To run one app locally:

```sh
cd trybetunes
npm ci
NODE_OPTIONS=--openssl-legacy-provider npm start
```
