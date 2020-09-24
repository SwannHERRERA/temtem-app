const Joi = require('@hapi/joi');
const { Map } = require('../models');
const mapSchema = Joi.object({
  name: Joi.string().required(),
  image_path: Joi.string().uri(),
});

async function add(req, res, next) {
  try {
    const map = req.body;
    await mapSchema.validate(map);
    res.json(await Map.create(map));
  } catch (err) {
    next(err);
  }
}
async function update(req, res, next) {
  try {
    const id = req.params.id;
    const map = req.body;
    await mapSchema.validate(map);
    res.json(await Map.update(id, map));    
  } catch (err) {
    next(err);
  }

}
async function remove(req, res, next) {
  const id = req.params.id;
  res.json(await Map.destroy(id))
}

async function read(req, res, next) {
  const id = req.params.id;
  res.json(await Map.findOne({id}))

}
async function readAll(req, res, next) {
  res.json(await Map.findAll())
}

module.exports = { 
  add,
  update,
  remove,
  read,
  readAll
};
