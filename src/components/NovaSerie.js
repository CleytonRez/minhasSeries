// Imports
import React, { useState } from "react";
import './NovaSerie.css'
import axios from 'axios'
import { Redirect } from "react-router-dom";

// Componente que Adiciona uma Nova Serie a Lista.
const NovaSerie = () => {

    // Estado contendo o Nome da Série.
    const [name, setName] = useState('')

    // Estado que Faz o botao Setado leve a pagina da Lista. Muda de False -> True e True -> False.
    const [success, setSuccess] = useState(false)

    // Funcao  que Captura as Letras no Input.
    const onChange = evt => {
        setName(evt.target.value)
    }

    // Funcao que Add a Serie a Lista.
    const save = () => {

        // .post que salva na API o Nome.
        axios.post('/api/series', {
            name
        })
            .then(res => {
                setSuccess(true)
            })
    }

    // Se o Estado success for True ele retorna a pagina da Lista/ Tabela.
    if (success) {
        return <Redirect to='/series' />
    }

    // Retorna A pagina para Adicionar uma Nova Série.
    return (
        <div className='novaSerie'>
            <div className='container'>
                <h1>Nova Série</h1>
                <form>
                    <div className='form-group'>
                        <label htmlFor='name'>Nome</label>
                        <input type='text' value={name} onChange={onChange} className='form-control' id='name' placeholder='Nome da Série' />
                    </div>
                    <br />
                    <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
                </form>
            </div >
        </div>
    )
}

// Exporta o Componente.
export default NovaSerie