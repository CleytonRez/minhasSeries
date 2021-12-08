import React, { useState } from "react";
import './NovoGenero.css'
import axios from 'axios'
import { Redirect } from "react-router-dom";

// Componente que Adiciona um Novo Genero a Tabela/Lista.
const NovoGenero = () => {

    // Estado contendo o Nome do Genero.
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
        axios.post('/api/genres', {
            name
        })
            .then(res => {
                setSuccess(true)
            })
    }

    // Se o Estado success for True ele retorna a pagina da Lista/ Tabela.
    if (success) {
        return <Redirect to='/generos' />
    }

    // Retorna A pagina para Adicionar um Novo Genero.
    return (
        <div className='novoGenero'>
            <div className='container'>
                <h1>Novo Gênero</h1>
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


export default NovoGenero