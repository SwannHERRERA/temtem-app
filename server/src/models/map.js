const createGuts = require("../helpers/model-guts");
const name = 'Map';
const tableName = 'Map';


const selectableProps = ['id', 'name', 'image_path']

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  })
  return {
    ...guts,
  }
}
