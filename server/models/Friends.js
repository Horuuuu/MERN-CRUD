const mongoose = require('mongoose');
//frinedschema es el nombre de la bd
//esquema de la bd
const FriendSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
});
//nombre de la coleccion
//friendmodel se usa para operaciones crud en la tabla friends
const FriendModel = mongoose.model('friends', FriendSchema);

module.exports = FriendModel;
