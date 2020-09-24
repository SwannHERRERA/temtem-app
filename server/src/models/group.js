const createGuts = require("../helpers/model-guts");
const name = 'Group';
const tableName = 'Group';


const selectableProps = ['id', 'name']

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
