import { React, useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import logoCadastro from './assets/cadastro.png'



function App() {

  const baseUrl = 'https://jsonplaceholder.typicode.com/posts';

  const [data, setData] = useState([]);
  const [modalIncluir, setModalIncluir] = useState(false);

  const [clienteSelecionado, setClienteSelecionado] = useState({
    id: '',
    nome: '',
    email: '',
    cpf: '',
    telefone: ''
  })

  // eslint-disable-next-line no-unused-vars
  const openCloseModalIncluir = () => {
    setModalIncluir(!modalIncluir);
  }
  const handleChange = e => {
    const { name, value } = e.target;
    setClienteSelecionado({
      ...clienteSelecionado, [name]: value
    });
    console.log(clienteSelecionado)
  }

  const pedidoGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data)
      }).catch(error => {
        console.log(error);
      })
  }

  const pedidoPost = async () => {
    delete clienteSelecionado.id;
    await axios.post(baseUrl, clienteSelecionado)
      .then(response => {
        setData(data.concat(response.data));
        openCloseModalIncluir();
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
        <button className='btn btn-success' onClick={() => openCloseModalIncluir()}>Incluir novo Cliente</button>
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

      <Modal isOpen={modalIncluir}>
        <ModalHeader>Incluir Novo Cliente</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Nome: </label>
            <input type='text' className='form-control' name='nome' onChange={{ handleChange }} />
            <label>Email: </label>
            <input type='text' className='form-control' name='email' onChange={{ handleChange }} />
            <label>CPF: </label>
            <input type='text' className='form-control' name='cpf' onChange={{ handleChange }} />
            <label>Telefone: </label>
            <input type='text' className='form-control' name='telefone' onChange={{ handleChange }} />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => pedidoPost()}> Incluir </button>
          <button className='btn btn-danger' onClick={() => openCloseModalIncluir()}> Cancelar </button>
        </ModalFooter>
      </Modal>

    </div >
  );
}

export default App;
