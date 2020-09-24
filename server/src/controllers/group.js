const Joi = require('@hapi/joi');
const { Group } = require('../models');
const groupSchema = Joi.object({
  name: Joi.string().required(),
});

async function add(req, res, next) {
  try {
    const group = req.body;
    await groupSchema.validate(group);
    res.json(await Group.create(group));
  } catch (err) {
    next(err);
  }
}
async function update(req, res, next) {
  try {
    const id = req.params.id;
    const group = req.body;
    await groupSchema.validate(group);
    res.json(await Group.update(id, group));    
  } catch (err) {
    next(err);
  }

}
async function remove(req, res, next) {
  const id = req.params.id;
  res.json(await Group.destroy(id))
}

async function read(req, res, next) {
  const id = req.params.id;
  res.json(await Group.findOne({id}))

}
async function readAll(req, res, next) {
  res.json(await Group.findAll())
}

module.exports = { 
  add,
  update,
  remove,
  read,
  readAll
};
