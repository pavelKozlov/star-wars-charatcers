import { API_ENDPOINT } from '../../constants/appConstants.js';

const PROPS_TO_IGNORE = ['url'];

const stripPerson = ({name, birth_year, homeworld, species, films}) => ({
  name,
  birthYear: birth_year,
  homeWorld: homeworld.name,
  species: species.length > 0 ? species[0].name : '',
  firstFilmTitle: films.length > 0 ? films[0].title : ''
});

const stripPeople = (data) =>
  data.map((item) => stripPerson(item));

const parseItem = async (item, resolveResource) =>
  new Promise((resolve, reject) => {
    let promisesCount = 0;

    const checkCompleteness = (completedCount) => {
      promisesCount -= completedCount;
      if (promisesCount === 0) {
        resolve(item);
      }
    };
    for (let [key, value] of Object.entries(item)) {
      if (PROPS_TO_IGNORE.includes(key)) {
        continue;
      }
      if (typeof value === 'string' && value.includes(API_ENDPOINT)) {
        promisesCount++;
        resolveResource(value)
          .then((result) => {
            item[key] = result;
            checkCompleteness(1);
          })
          .catch((e) => reject(e));
      } else if (Array.isArray(value) && value.length > 0 && value[0].includes(API_ENDPOINT)) {
        promisesCount += value.length;

        Promise.all(value.map((resource) => resolveResource(resource)))
          .then((result) => {
            item[key] = result;
            checkCompleteness(value.length);
          })
          .catch((e) => reject(e));
      }
    }
  });

const parseResources = async (data, resolveResource) =>
  Promise.all(data.map((item) => parseItem(item, resolveResource)));

export const peopleUtils = {
  stripPeople,
  parseResources,
};
