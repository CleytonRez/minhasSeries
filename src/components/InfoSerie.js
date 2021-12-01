// Imports.
import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Redirect } from "react-router-dom";

// Componente que Mostra e Edita as Infos da Série.
const InfoSerie = ({ match }) => {

    // Estado contendo o Nome da Serie.
    const [name, setName] = useState('')

    // Estado que Faz o botao Setado leve a pagina da Lista. Muda de False -> True e True -> False.
    const [success, setSuccess] = useState(false)

    // Estado contendo as informacoes da Serie.
    const [data, setData] = useState({})

    // Efeito que Permite Editar as Infos da Serie.
    useEffect(() => {
        axios
            .get('/api/series/' + match.params.id)
            .then(res => {
                setData(res.data)
            })
    }, [match.params.id])


    // Funcao  que Captura as Letras no Input.
    const onChange = evt => {
        setName(evt.target.value)
    }

    // Funcao que Add a Serie a Lista.
    const save = () => {

        // .post que salva na API o Nome.
        axios.put('/api/series/' + match.params.id, {
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

    // Retorna A pagina com as Infos da Serie.
    return (

        <div>
            <header>
                <div className='h-100' style={{ backgroud: 'rgba(0,0,0,0,7)' }}>
                    <div className='row'>
                        <div className='col-3'>
                            <img className='img-fluid' src={data.poster}></img>
                        </div>
                        <div className='col-8'>
                            titulo
                        </div>
                    </div>
                </div>
            </header>


            <div className='container'>
                <h1>Info Série</h1>
                <pre>{JSON.stringify(data)}</pre>
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


export default InfoSerie