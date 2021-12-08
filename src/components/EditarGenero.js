// Imports
import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Redirect } from "react-router-dom";
import './EditarGenero.css'

// Componente que Edita o Genero.
const EditarGenero = ({ match }) => {
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)

    // Efeito que busca o genero pelo ID para Editar..
    useEffect(() => {
        axios
            .get('/api/genres/' + match.params.id)
            .then(res => {
                setName(res.data.name)
            })
    }, [match.params.id])

    // Funcao que Seta as informacoes no Estado.
    const onChange = evt => {
        setName(evt.target.value)
    }

    // Componente que Salva o Genero.
    const save = () => {
        axios.put('/api/genres/' + match.params.id, {
            name
        })
            .then(res => {
                setSuccess(true)
            })
    }

    // Se o Estado success for True ele retorna a pagina da Lista.
    if (success) {
        return <Redirect to='/generos' />
    }

    // Retorna o Menu de Editar Genero.
    return (
        <div className='editGenero'>
            <div className='container'>
                <br/>
                <h1>Editar Gênero</h1>
                <br/>
                <form>
                    <div className='form-group'>
                        <label htmlFor='name'>Nome</label>
                        <input type='text' value={name} onChange={onChange} className='form-control' id='name' placeholder='Nome do Gênero' />
                    </div>
                    <br/>
                    <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
                </form>
                </div >
        </div>
    )
}


export default EditarGenero