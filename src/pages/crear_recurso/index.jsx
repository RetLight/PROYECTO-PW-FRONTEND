import React, { useState, useEffect } from 'react';
import './Nuevolibro.css';

import AppBar from '../../components/Appbar/AppBar';
import ToolBar from '../../components/ToolBar/ToolBar';
import '../../app/globals.css';
import { useRouter } from 'next/router';
import base from '../../api/base.js'
import libroApi from '../../api/libro.js'




function NuevoLibro() {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('insertar');
    const [formatoSeleccionado, setFormatoSeleccionado] = useState('');
    const [autorSeleccionado, setAutorSeleccionado] = useState('');
    const [editorialSeleccionado, setEditorialSeleccionado] = useState('');
    const [categoriaSeleccionado, setCategoriaSeleccionado] = useState('');
    const [anioSeleccionado, setAnioSeleccionado] = useState('');
    const [idiomaSeleccionado, setIdiomaSeleccionado] = useState('');
    const [nro_paginasSeleccionado, setNro_paginasSeleccionado] = useState('');
    const [isbn13Seleccionado, setIsbn13Seleccionado] = useState('');
    const [portada_urlSeleccionado, setPortada_urlSeleccionado] = useState('');
    const [tituloSeleccionado, setTituloSeleccionado] = useState('');
    const [estadoSeleccionado, setEstadoSeleccionado] = useState('');
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [showToolBar, setShowToolBar] = useState(true);
    const [librosList, setLibrosList] = useState([]);
    const router = useRouter();
    const { code } = router.query;

        const handleOnLoad = async () => {
            try{
                const rawLibros = await libroApi.findAll();
                setLibrosList(rawLibros.data);
            }catch (error){
                console.error("Error fetching users:", error);
            }
        }


    const handleLibroSelect = (event) => {
        const selectedBookId = event.target.value;
        const selectedBook = librosList.find((libro) => libro.id === Number(selectedBookId));

        if (selectedBook) {
            // Actualizar el estado del autor seleccionado
            setAutorSeleccionado(selectedBook.autor);
            setEditorialSeleccionado(selectedBook.editorial);
            setCategoriaSeleccionado(selectedBook.categoria);
            setAnioSeleccionado(selectedBook.anio);
            setIdiomaSeleccionado(selectedBook.idioma);
            setNro_paginasSeleccionado(selectedBook.nro_paginas);
            setIsbn13Seleccionado(selectedBook.isbn13);
            setPortada_urlSeleccionado(selectedBook.portada_url);
            setTituloSeleccionado(selectedBook.titulo);
            setEstadoSeleccionado(selectedBook.estado);
            setFormatoSeleccionado(selectedBook.formato);

        } else {
            // Si no se selecciona ningún libro, borrar el autor seleccionado
            setAutorSeleccionado('');
            setAutorSeleccionado('');
            setEditorialSeleccionado('');
            setCategoriaSeleccionado('');
            setAnioSeleccionado('');
            setIdiomaSeleccionado('');
            setNro_paginasSeleccionado('');
            setIsbn13Seleccionado('');
            setPortada_urlSeleccionado('');
            setTituloSeleccionado('');
            setEstadoSeleccionado('');
            setFormatoSeleccionado('');
        }
    };
    const [LibroData, setLibroData] = useState({
        formato: "",
        autor: "",
        editorial: "",
        categoria: "",
        anio: null,
        idioma: "",
        nro_paginas: null,
        isbn13: "",
        portada_url: "",
        titulo: "",
        estado: "",
        createdAt: new Date(),
        updatedAt: new Date()
    });

    const [registroCompleto, setRegistroCompleto] = useState(false);

    useEffect(() => {
        handleOnLoad();
        if (registroCompleto) {
            handleResetCampos();
        }
    }, [registroCompleto]);



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLibroData({
            ...LibroData,
            [name]: value,
        });
    };

    const handleSave = async () => {
        try {
        
            const response = await libroApi.create(LibroData);

            if (response) {
                setRegistroCompleto(true);
            }
        } catch (error) {
            console.error('Error al agregar el libro:', error);
        }
    };

    const handleClose = () => {
        setRegistroCompleto(false);
    };

    const handleResetCampos = () => {
        setLibroData({
            formato: "",
            autor: "",
            editorial: "",
            categoria: "",
            anio: "",
            idioma: "",
            nro_paginas: "",
            isbn13: "",
            portada_url: "",
            titulo: "",
            estado: "",
            createdAt: new Date(),
            updatedAt: new Date()
        });
    };
    const handleDelete = async () => {
        try {
            if (!selectedBookId) {
                console.error('ID del libro no válido.');
                return;
            }

            const response = await base.remove(`/libro/${selectedBookId}`);

            if (response && response.status === 200) {
             
                setLibrosList((prevLibros) => prevLibros.filter((libro) => libro.id !== selectedBookId));
                setSelectedBookId(''); 
                setTituloSeleccionado('');
                setRegistroCompleto(true);
                
            } else {
                console.error('Error al eliminar el libro.');
            }
        } catch (error) {
            console.error('Error al eliminar el libro:', error);
        }
    };



    const handleUpdate = async () => {
        try {
            if (!selectedBookId) {
                console.error('ID del libro no válido.');
                return;
            }

            const libroActualizado = {
                    id: selectedBookId,
                    formato: formatoSeleccionado,
                    autor: autorSeleccionado,
                    editorial: editorialSeleccionado,
                    categoria: categoriaSeleccionado,
                    anio: anioSeleccionado,
                    idioma: idiomaSeleccionado,
                    nro_paginas: nro_paginasSeleccionado,
                    isbn13: isbn13Seleccionado,
                    portada_url: portada_urlSeleccionado,
                    titulo: tituloSeleccionado,
                    estado: estadoSeleccionado,
            };

            console.log(libroActualizado)
            const resp = await libroApi.update(libroActualizado);

            if (resp)
            console.log("Datos actualizados!");
            else
                console.log("Ha habido un error al actualizar!");
        } catch (error) {
            console.error('Error al actualizar el libro:', error);
        }
    };


    if (opcionSeleccionada === 'insertar') {
        return (

            <div className="container">
                <AppBar />
                <div className='BarraLateral'>
                    {showToolBar && <ToolBar b1={"Principal"} b2={"Perfil"} b3={"Biblioteca"} l1={`/principal_adm?code=${code}`} l2={`/miperfil_adm?code=${code}`} l3={`/libreria_adm?code=${code}`} />}
                </div>


                <div className='.mainContent'>

                    <div className='contenido'>
                        <div className='lineaytexto'>
                            <h2>Hola, Renzo</h2>
                            <hr className='linea' />
                        </div>



                        <div className="barraHor">
                            <ul className="listaGeneral">
                                <li className="OpcionInsertLibro" onClick={() => setOpcionSeleccionada('insertar')}>INSERTAR NUEVO LIBRO</li>
                                <li className="OpcionModifLibro" onClick={() => setOpcionSeleccionada('modificar')}>MODIFICAR LIBRO</li>
                                <li className="OpcionElimLibro" onClick={() => setOpcionSeleccionada('eliminar')}>ELIMINAR LIBRO</li>
                            </ul>
                            <div className="BarraSelec"></div>
                        </div>
                        <form>
                            <div className="contenedorDos">
                                <div className="imagen-container">
                                    <img src="/images/biblioteca.jpg" alt="Foto biblioteca" />
                                    {registroCompleto && (
                                        <div className="mensajeRegistroCompleto">
                                            <div className="mensajeContenedor">
                                                <h2>Registro Completo</h2>
                                                <p>El recurso ha sido grabado con éxito</p>
                                                <button onClick={handleClose} className='boton-ok'>OK</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="contenedorTres">
                                    <div className="textoRecuadro">
                                        <label>Formato</label>
                                        <input
                                            type="text"
                                            id="formato"
                                            name="formato"
                                            value={LibroData.formato}
                                            onChange={handleInputChange}
                                            required
                                            disabled={registroCompleto}
                                        />
                                    </div>
                                    <div className="textoRecuadro">
                                        <label className="autor">Autor, autores</label>
                                        <input
                                            type="text"
                                            id="autor"
                                            name="autor"
                                            value={LibroData.autor}
                                            onChange={handleInputChange}
                                            required
                                            disabled={registroCompleto}
                                        />
                                    </div>
                                    <div className="textoRecuadro">
                                        <label>Editorial</label>
                                        <input
                                            type="text"
                                            id="editorial"
                                            name="editorial"
                                            value={LibroData.editorial}
                                            onChange={handleInputChange}
                                            required
                                            disabled={registroCompleto}
                                        />
                                    </div>
                                    <div className="textoRecuadro">
                                        <label>Categoria</label>
                                        <input
                                            type="text"
                                            id="categoria"
                                            name="categoria"
                                            value={LibroData.categoria}
                                            onChange={handleInputChange}
                                            required
                                            disabled={registroCompleto}
                                        />
                                    </div>
                                    <div className="textoRecuadro">
                                        <label>anio</label>
                                        <input
                                            type="text"
                                            id="anio"
                                            name="anio"
                                            value={LibroData.anio}
                                            onChange={handleInputChange}
                                            required
                                            disabled={registroCompleto}
                                        />
                                    </div>
                                    <div className="textoRecuadro">
                                        <label>Idioma</label>
                                        <input
                                            type="text"
                                            id="idioma"
                                            name="idioma"
                                            value={LibroData.idioma}
                                            onChange={handleInputChange}
                                            required
                                            disabled={registroCompleto}
                                        />
                                    </div>
                                    <div className="textoRecuadro">
                                        <label>Nro_paginas</label>
                                        <input
                                            type="text"
                                            id="nro_paginas"
                                            name="nro_paginas"
                                            value={LibroData.nro_paginas}
                                            onChange={handleInputChange}
                                            required
                                            disabled={registroCompleto}
                                        />
                                    </div>
                                    <div className="textoRecuadro">
                                        <label>Isbn13</label>
                                        <input
                                            type="text"
                                            id="isbn13"
                                            name="isbn13"
                                            value={LibroData.isbn13}
                                            onChange={handleInputChange}
                                            required
                                            disabled={registroCompleto}
                                        />
                                    </div>
                                    <div className="textoRecuadro">
                                        <label>Portada_url</label>
                                        <input
                                            type="text"
                                            id="portada_url"
                                            name="portada_url"
                                            value={LibroData.portada_url}
                                            onChange={handleInputChange}
                                            required
                                            disabled={registroCompleto}
                                        />
                                    </div>
                                    <div className="textoRecuadro">
                                        <label>Titulo</label>
                                        <input
                                            type="text"
                                            id="titulo"
                                            name="titulo"
                                            value={LibroData.titulo}
                                            onChange={handleInputChange}
                                            required
                                            disabled={registroCompleto}
                                        />
                                    </div>
                                    <div className="textoRecuadro">
                                        <label>Estado</label>
                                        <input
                                            type="text"
                                            id="estado"
                                            name="estado"
                                            value={LibroData.estado}
                                            onChange={handleInputChange}
                                            required
                                            disabled={registroCompleto}
                                        />
                                    </div>


                                    <button type="button" onClick={handleSave} disabled={registroCompleto}>
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        );
        //Sección de modificar
    } else if (opcionSeleccionada === 'modificar') {

        return (
            <div className="container-modificar">


                <div className="container">
                    <AppBar />
                    <div className='BarraLateral'>
                        {showToolBar && <ToolBar b1={"Principal"} b2={"Perfil"} b3={"Biblioteca"} l1={`/principal_adm?code=${code}`} l2={`/miperfil_adm?code=${code}`} l3={`/libreria_adm?code=${code}`} />}
                    </div>


                    <div className='.mainContent'>
                        <div className='contenido'>
                            <div className='lineaytexto'>
                                <h2>Hola,Juliana</h2>
                                <hr className='linea' />
                            </div>


                            <div className="barraHor">
                                <ul className="listaGeneral">
                                    <li className="OpcionInsertLibro" onClick={() => setOpcionSeleccionada('insertar')}>INSERTAR NUEVO LIBRO</li>
                                    <li className="OpcionModifLibro" onClick={() => setOpcionSeleccionada('modificar')}>MODIFICAR LIBRO</li>
                                    <li className="OpcionElimLibro" onClick={() => setOpcionSeleccionada('eliminar')}>ELIMINAR LIBRO</li>
                                </ul>
                                <div className="BarraSelecModif"></div>
                            </div>
                            <form>
                                <div className="contenedorDos">
                                    <div className="imagen-container">
                                        <img src="/images/biblioteca.jpg" alt="Foto biblioteca" />
                                        {registroCompleto && (
                                            <div className="mensajeRegistroCompleto">
                                                <div className="mensajeContenedor">
                                                    <h2>Modificación Completa</h2>
                                                    <p>El recurso ha sido modificado con éxito</p>
                                                    <button onClick={handleClose} className='boton-ok'>OK</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="contenedorTres">
                                        <div className="textoRecuadro">
                                            <label>Libro:</label>
                                            <select onChange={handleLibroSelect}>
                                                <option value="">Selecciona un libro</option>
                                                {librosList.map((libro) => (
                                                    <option key={libro.id} value={libro.id}>
                                                        {libro.titulo}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="textoRecuadro">
                                            <label >Formato:</label>
                                            <input type="text" placeholder={formatoSeleccionado} onChange={e => setFormatoSeleccionado(e.target.value)}/>
                                        </div>
                                        <div className="textoRecuadro">
                                            <label >Autor:</label>
                                            <input type="text" placeholder={autorSeleccionado} onChange={e => setAutorSeleccionado(e.target.value)}/>
                                        </div>
                                        <div className="textoRecuadro">
                                            <label >Editorial:</label>
                                            <input type="text" placeholder={editorialSeleccionado} onChange={e => setEditorialSeleccionado(e.target.value)} />
                                        </div>

                                        <div className="textoRecuadro">
                                            <label >Categoria:</label>
                                            <input type="text" placeholder={categoriaSeleccionado} onChange={e => setCategoriaSeleccionado(e.target.value)}/>


                                        </div>
                                        <div className="textoRecuadro">
                                            <label >Anio:</label>
                                            <input type="text" placeholder={anioSeleccionado} onChange={e => setAnioSeleccionado(e.target.value)}/>


                                        </div>
                                        <div className="textoRecuadro">
                                            <label >Idioma:</label>
                                            <input type="text" placeholder={idiomaSeleccionado} onChange={e => setIdiomaSeleccionado(e.target.value)} />


                                        </div>
                                        <div className="textoRecuadro">
                                            <label >NroPaginas:</label>
                                            <input type="text" placeholder={nro_paginasSeleccionado} onChange={e => setNro_paginasSeleccionado(e.target.value)} />



                                        </div>
                                        <div className="textoRecuadro">
                                            <label >ISBN13:</label>
                                            <input type="text" placeholder={isbn13Seleccionado} onChange={e => setIsbn13Seleccionado(e.target.value)}/>



                                        </div>
                                        <div className="textoRecuadro">
                                            <label >PortadaUrl:</label>
                                            <input type="text" placeholder={portada_urlSeleccionado} onChange={e => setPortada_urlSeleccionado(e.target.value)}/>



                                        </div>
                                        <div className="textoRecuadro">
                                            <label >Titulo:</label>
                                            <input type="text" placeholder={tituloSeleccionado} onChange={e => setTituloSeleccionado(e.target.value)}/>



                                        </div>
                                        <div className="textoRecuadro">
                                            <label >Estado:</label>
                                            <input type="text" placeholder={estadoSeleccionado} onChange={e => setEstadoSeleccionado(e.target.value)}/>



                                        </div>
                                        <button type="button" onClick={handleUpdate} disabled={registroCompleto}>
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        );
        //Seccion eliminar
    } else if (opcionSeleccionada === 'eliminar') {
        return (
            <div className="container-modificar">
                <div className="container">
                    <AppBar />
                    <div className='BarraLateral'>
                    {showToolBar && <ToolBar b1={"Principal"} b2={"Perfil"} b3={"Biblioteca"} l1={`/principal_adm?code=${code}`} l2={`/miperfil_adm?code=${code}`} l3={`/libreria_adm?code=${code}`} />}
                    </div>


                    <div className='.mainContent'>
                        <div className='contenido'>
                            <div className='lineaytexto'>
                                <h2>Hola,Juliana</h2>
                                <hr className='linea' />
                            </div>
                            <div className="barraHor">
                                <ul className="listaGeneral">
                                    <li className="OpcionInsertLibro" onClick={() => setOpcionSeleccionada('insertar')}>INSERTAR NUEVO LIBRO</li>
                                    <li className="OpcionModifLibro" onClick={() => setOpcionSeleccionada('modificar')}>MODIFICAR LIBRO</li>
                                    <li className="OpcionElimLibro" onClick={() => setOpcionSeleccionada('eliminar')}>ELIMINAR LIBRO</li>
                                </ul>
                                <div className="BarraSelecElim"></div>
                            </div>
                            <form>
                                <div className="contenedorDos">
                                    <div className="imagen-container">
                                        <img src="/images/biblioteca.jpg" alt="Foto biblioteca" />
                                        {registroCompleto && (
                                            <div className="mensajeRegistroCompleto">
                                                <div className="mensajeContenedor">
                                                    <h2>Eliminación Completa</h2>
                                                    <p>El recurso ha sido eliminado con éxito</p>
                                                    <button onClick={handleClose} className='boton-ok'>OK</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="contenedorTres">
                                        <div className="textoRecuadro">
                                            <label>Libro:</label>
                                            <select onChange={handleLibroSelect}>
                                                <option value="">Selecciona un libro</option>
                                                {librosList.map((libro) => (
                                                    <option key={libro.id} value={libro.id}>
                                                        {libro.titulo}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>
                                        <button type="button" onClick={handleDelete} disabled={registroCompleto}>
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NuevoLibro;
