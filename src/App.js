/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { SiMongodb } from 'react-icons/si';
import { SiExpress } from 'react-icons/si';
import { FaReact } from 'react-icons/fa';
import { GrNode } from 'react-icons/gr';
import { AiFillFileAdd } from 'react-icons/ai';
import { AiOutlineRead } from 'react-icons/ai';
import { GrRefresh } from 'react-icons/gr';
import { RiDeleteBin2Fill } from 'react-icons/ri';
function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [listOfFriends, setListOfFriends] = useState([]);

  const addFriend = () => {
    Axios.post('https://c-r-u-d-mern.herokuapp.com/addfriend', {
      name: name, //data que envia a atravez del body en un objeto
      age: age, //envia data al backend
    }).then((response) => {
      setListOfFriends([
        ...listOfFriends, //agrega a la lista los nuevos amigos
        { _id: response.data._id, name: name, age: age },
      ]);
    });
  };
  const updateFriend = (id) => {
    //se le pasa el id como parametro
    const newAge = prompt('INGRESAR NUEVA EDAD:'); //se guarda la nueva edad ingresada
    Axios.put('https://c-r-u-d-mern.herokuapp.com/update', {
      newAge: newAge,
      id: id,
    }).then(
      //se envia la nueva edad y el id del amigo
      () => {
        setListOfFriends(
          listOfFriends.map((value) => {
            //value es cada elemento de la lista
            //muestra la nueva lista con la edad actualizada
            return value._id === id
              ? { _id: id, name: value.name, age: newAge }
              : value;
          })
        );
      }
    );
  };
  const deleteFriend = (id) => {
    Axios.delete(`https://c-r-u-d-mern.herokuapp.com/delete/${id}`).then(() => {
      setListOfFriends(
        listOfFriends.filter((value) => {
          //filtra de los valores(elementos de la lista)los que no cumplan con la condicion de abajo
          return value._id !== id; //boolean
        })
      );
    });
  };
  useEffect(() => {
    //para que renderize la lista cuando cargue la pagina
    Axios.get('https://c-r-u-d-mern.herokuapp.com/read')
      .then((response) => {
        //recibe la respuesta(data) del backend
        setListOfFriends(response.data);
      })
      .catch(() => {
        console.log('error');
      });
  }, []);
  return (
    <div className="App">
      <h1>
        <SiMongodb id="mongo" />
        <SiExpress />
        <FaReact id="react" />
        <GrNode id="mongo" />
        <AiFillFileAdd id="add" />
        <AiOutlineRead id="read" />
        <GrRefresh />
        <RiDeleteBin2Fill id="borrar" />
      </h1>
      <div className="inputs">
        <input
          type="text"
          placeholder="NOMBRE"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="EDAD"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <button onClick={addFriend}>Agregar</button>
      </div>
      <div className="listOfFriends">
        {listOfFriends.map((value, key) => {
          //value es cada elemento de la lista
          return (
            <div key={key} className="friendContainer">
              <div className="friend">
                <h3>Nombre: {value.name}</h3>
                <h3 id="edad">Edad: {value.age}</h3>
              </div>
              <button
                id="update"
                onClick={() => {
                  //toma el id a cambiar
                  updateFriend(value._id);
                }}
              >
                EDITAR
              </button>
              <button
                id="deleteBtn"
                onClick={() => {
                  //toma el id a eliminar
                  deleteFriend(value._id);
                }}
              >
                BORRAR
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
