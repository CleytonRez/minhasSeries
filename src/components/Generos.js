// Imports.
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

// Componente que retorna um Titulo "Genero".
const Generos = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('/api/genres')
            .then(res => {
                setData(res.data.data)
            })
    }, [])

    // Funcao do botão que deleta um Genero.
    const deleteGenero = id => {
        axios
            .delete('api/genres/' + id)
            .then(res => {
                const filtrado = data.filter(item => item.id !== id)
                setData(filtrado)
            })

    }

    // Funcao que Adiciona As Informacoes na Tabela.
    const renderizalinha = record => {
        return (
            <tr key={record.id}>
                <th scope='row'>{record.id}</th>
                <td>{record.name}</td>
                <td>
                    <button className='btn btn-danger' onClick={() => deleteGenero(record.id)}>Remover</button>
                    <Link to={'/generos/' + record.id} className='btn btn-warning'>Editar</Link>
                </td>
            </tr>
        )
    }

    // Se a Tabela for igual a 0 itens, ele retorna uma Tela sem a Tabela.
    if (data.length === 0) {
        return (
            <div className='container'>
                <h1>Gênero</h1>
                <br />
                <div><Link to='/generos/novo' className='btn btn-primary'>Novo Gênero</Link></div>
                <br />
                <div className='aler alert-wairning' role='alert'>
                    Você não possui genêros criados.
                </div>
            </div>
        )
    }

    // Retorna o Menu com a Tabela de Generos.
    return (
        <div className="container">
            <h1>Generos</h1>
            <br />
            <div><Link to='/generos/novo' className='btn btn-primary'>Novo Gênero</Link></div>
            <br />
            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Nome</th>
                        <th scope='col'>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderizalinha)}
                </tbody>
            </table>
        </div >
    )
}

export default Generos