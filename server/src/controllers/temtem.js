const Joi = require('@hapi/joi');
const { Temtem } = require('../models');
const temtemType = ['Neutral', 'Wind', 'Earth', 'Water', 'Fire', 'Electric', 'Mental', 'Digital', 'Melee', 'Crystal', 'Toxic'];
const temteSchema = Joi.object({
  name: Joi.string().required(),
  type1: Joi.string().valid(...temtemType).required(),
  type2: Joi.string().valid(...temtemType),
  image: Joi.string().uri()
});

async function add(req, res, next) {
  try {
    const temtem = req.body;
    await temteSchema.validate(temtem);
    res.json(await Temtem.create(temtem));
  } catch (err) {
    next(err);
  }
}
async function update(req, res, next) {
  try {
    const id = req.params.id;
    const temtem = req.body;
    await temteSchema.validate(temtem);
    res.json(await Temtem.update(id, temtem));    
  } catch (err) {
    next(err);
  }

}
async function remove(req, res, next) {
  const id = req.params.id;
  res.json(await Temtem.destroy(id))
}

async function read(req, res, next) {
  const id = req.params.id;
  res.json(await Temtem.findOne({id}))

}
async function readAll(req, res, next) {
  res.json(await Temtem.findAll())
}

module.exports = { 
  add,
  update,
  remove,
  read,
  readAll
};
