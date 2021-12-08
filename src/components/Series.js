// Imports.
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';

// Componente que retorna um Titulo "Genero".
const Series = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('/api/series')
            .then(res => {
                setData(res.data.data)
            })
    }, [])

    // Funcao do botão que deleta uma Serie.
    const deleteSerie = id => {
        axios
            .delete('api/series/' + id)
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
                    <button className='btn btn-danger' onClick={() => deleteSerie(record.id)}>Remover</button>
                    <Link to={'/series/' + record.id} className='btn btn-warning'>Info</Link>
                </td>
            </tr>
        )
    }

    // Se a Tabela for igual a 0 itens, ele retorna uma Tela sem a Tabela.
    if (data.length === 0) {
        return (
            <div className='container'>
                <h1>Séries</h1>
                <br />
                <div><Link to='/series/novo' className='btn btn-primary'>Nova Série</Link></div>
                <br />
                <div className='aler alert-warning' role='alert'>
                    Você não possui Séries criadas.
                </div>
            </div>
        )
    }

    // Retorna o Menu com Tabela das Séries.
    return (
        <div className="container">
            <h1>Séries</h1>
            <br />
            <div><Link to='/series/novo' className='btn btn-primary'>Nova Série</Link></div>
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

export default Series