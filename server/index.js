const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends'); //exporta variable con modelo Friends.js
require('dotenv').config();
//middlewares
app.use(express.json()); //para recibir json del frontend
app.use(cors()); //ayuda la conxion con frontend
//Conexion a la base de datos
mongoose.connect(
  //antes del ? nombre de la bd
  'mongodb://localhost:27017/mern?readPreference=primary&appname=MongoDB%20Compass&ssl=false',
  { useNewUrlParser: true }
);
//Rutas
//insertar
app.post('/addfriend', async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const friend = new FriendModel({
    //inserta en la BD
    name: name,
    age: age,
  });
  await friend.save();
  res.send(friend);
});
//listar
app.get('/read', async (req, res) => {
  //find busca algo especifico en la DB
  FriendModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result); //envia el resultado de la busqueda
    }
  });
});
//editar
app.put('/update', async (req, res) => {
  const newAge = req.body.newAge; //cambia la edad
  const id = req.body.id; //a travez del id
  try {
    //busca en el modelo el id pasado por la variable id
    await FriendModel.findById(id, (error, friendToUpdate) => {
      friendToUpdate.age = Number(newAge); //cambia la edad de la bd por la nueva
      friendToUpdate.save();
    });
  } catch (err) {
    console.log(err);
  }
  res.send('EDITADO');
});
//eliminar
app.delete('/delete/:id', async (req, res) => {
  //no se pasa un objeto
  const id = req.params.id; //se elimina el objeto que tiene el ID a travez del parametro
  await FriendModel.findByIdAndRemove(id).exec(); //funcion de mongoose y .exec que ejecuta
  res.send('item eliminado');
});
app.listen(process.env.PORT || 3001, () => {
  console.log('CONECTADO');
});
