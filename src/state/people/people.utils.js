const stripPerson = ({name, birth_year, homeworld, species, films}) => ({
  name: name,
  birthYear: birth_year,
  homeWorld: homeworld.name,
  species: species.length > 0 ? species[0].name : '',
  firstFilmTitle: films[0].title
});

const stripPeople = (data) =>
  data.map((item) => stripPerson(item));

export {
  stripPeople,
}
