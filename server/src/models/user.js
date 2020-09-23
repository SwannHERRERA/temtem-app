const bcrypt = require("bcrypt");
const createGuts = require("../helpers/model-guts");

const name = "User";
const tableName = "User";

const selectableProps = ["id", "email"];

const SALT_ROUNDS = 10;
const hashPassword = (password) => bcrypt.hash(password, SALT_ROUNDS);
const verifyPassword = (password, hash) => bcrypt.compare(password, hash);

// Always perform this logic before saving to db. This includes always hashing
// the password field prior to writing so it is never saved in plain text.
const beforeSave = (user) => {
  if (!user.password) return Promise.resolve(user);

  // `password` will always be hashed before being saved.
  return hashPassword(user.password)
    .then((hash) => ({ ...user, password: hash }))
    .catch((err) => `Error hashing password: ${err}`);
};

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  // Augment default `create` function to include custom `beforeSave` logic.
  const create = (props) => beforeSave(props).then((user) => guts.create(user));

  const verify = (email, password) => {
    const matchErrorMsg = "Username or password do not match";

    knex
      .select('*')
      .from(tableName)
      .where({ email })
      .timeout(guts.timeout)
      .first()
      .then((user) => {
        if (!user) throw matchErrorMsg;

        return user;
      })
      .then((user) => Promise.all([user, verifyPassword(password, user.password)]))
      .then(([user, isMatch]) => {
        if (!isMatch) throw matchErrorMsg;

        return user;
      });
  };
  
  return {
    ...guts,
    create,
    verify,
  };
};
