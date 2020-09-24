const createGuts = require("../helpers/model-guts");
const name = 'Temtem';
const tableName = 'Temtem';


const selectableProps = ['id', 'name', 'type1', 'type2']

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
