export default function fetchPlanets() {
  const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
  return fetch(URL).then((r) => r
    .json()
    .then((json) => (r.ok ? Promise.resolve(json) : Promise.reject(json))));
}
