import { React, useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import logoCadastro from './assets/cadastro.png'



function App() {

  const baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  const [data, setData] = useState([]);

  const pedidoGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data)
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    pedidoGet();
  })



  return (
    <div className="cliente__container">
      <br />
      <h3>Cadastro Clientes</h3>
      <header className="App-header">
        <img src={logoCadastro} alt="Cadastro" />
        <button className='btn btn-success'>Incluir novo Cliente</button>
      </header>
      <table className='table table-bordered '>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>CPF</th>
            <th>Telefone</th>


          </tr>
        </thead>

        <tbody>
          {data.map(pessoa => (
            <tr key={pessoa.id}>
              <td>{pessoa.id}</td>
              <td>{pessoa.title}</td>
              <td>{pessoa.body}</td>
              <td>{pessoa.email}</td>
              <td>{pessoa.telefone}</td>
              <th><button className='btn btn-primary'>Editar</button></th>
              <th><button className='btn btn-danger'>Excluir</button></th>


            </tr>
          ))}
        </tbody>
      </table>
    </div >
  );
}

export default App;
