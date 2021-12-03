// Imports.
import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Redirect } from "react-router-dom";
import { Badge } from "reactstrap";

// Componente que Mostra e Edita as Infos da Série.
const InfoSerie = ({ match }) => {

    // Estado contendo o Nome da Serie.
    const [form, setForm] = useState({})

    // Estado que Faz o botao Setado leve a pagina da Lista. Muda de False -> True e True -> False.
    const [success, setSuccess] = useState(false)

    const [mode, setMode] = useState('EDIT')

    // Estado contendo as informacoes da Serie.
    const [data, setData] = useState({})
    console.log(data)
    const [genres, setGenres] = useState([])

    const [genreId, setGenreId] = useState('')

    // Efeito que Permite Editar as Infos da Serie.
    useEffect(() => {
        axios
            .get('/api/series/' + match.params.id)
            .then(res => {
                setData(res.data)
                setForm(res.data)
            })

    }, [match.params.id])

    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setGenres(res.data.data)
                const genres = res.data.data
                const encontrado = genres.find(value => data.genre === value.name)
                if (encontrado && form) {
                    setGenreId(encontrado.id)
                }
            })

    }, [data])
    // Custom header
    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }


    // Funcao  que Captura as Letras no Input.
    const onChange = field => evt => {

        setForm({
            ...form,
            [field]: evt.target.value
        })
    }

    const seleciona = value => () => {
        setForm({
            ...form,
            status: value
        })
    }


    // Funcao que Add a Serie a Lista.
    const save = () => {

        // .put que salva na API o Nome.
        axios.put('/api/series/' + match.params.id, {
            ...form,
            //genre_id: genreId
        })
            .then(res => {
                setSuccess(true)
            })
    }

    // Se o Estado success for True ele retorna a pagina da Lista/ Tabela.
    if (success) {
        //  return <Redirect to='/series' />
    }

    // Retorna A pagina com as Infos da Serie.
    return (

        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{ background: 'rgba(0,0,0,0.7)' }}>
                    <div className='h-100 container'>
                        <div className='row h-100 align-items-center'>
                            <div className='col-3'>
                                <img alt={data.name} className='img-fluid img-thumbnail' src={data.poster}></img>
                            </div>
                            <div className='col-8'>
                                <h1 className='font-weight-light text-white '>{data.name}</h1>
                                <div className='lead text-white'>
                                    {data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge>}
                                    {data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para Assistir</Badge>}
                                    Gênero: {data.genre_name}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div>
                <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
            </div>

            {
                mode === 'EDIT' &&
                <div className='container'>
                    <h1>Nova Série</h1>
                    <pre>{JSON.stringify(form)}</pre>
                    <button className='btn btn-primary' onClick={() => setMode('INFO')}>Cancelar Edição</button>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Nome</label>
                            <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Nome da Série' />
                        </div>
                        <br />
                        <div className='form-group'>
                            <label htmlFor='name'>Comentarios</label>
                            <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='name' placeholder='Nome da Série' />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='name'>Gênero</label>
                            <select class="form-control" onChange={onChange('genre_id')}>
                                {genres.map(genre => <option key={genre.id} value={genre.id} select={genre.id === form.genre}>{genre.name}</option>)}
                            </select>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="status" id="assistido" value="ASSISTIDO" onClick={seleciona('ASSISTIDO')} />
                            <label className="form-check-label" htmlFor="assistido">
                                Assistido
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="status" id="paraAssistir" value="PARA_ASSISTIR" onClick={seleciona('PARA_ASSISTIR')} />
                            <label className="form-check-label" htmlFor="paraAssistir">
                                Para Assistir
                            </label>
                        </div>
                        <br />
                        <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
                    </form>
                </div >
            }
        </div>
    )
}


export default InfoSerie