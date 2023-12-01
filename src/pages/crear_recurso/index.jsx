import React, { useState,useEffect} from 'react';
import './Nuevolibro.css';
import libros from '../../data/libros.json';
import AppBar from '../../components/Appbar/AppBar';
import ToolBar from '../../components/ToolBar/ToolBar';
import '../../app/globals.css';
import { useRouter } from 'next/router';



function NuevoLibro() {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('insertar');
    const [autorSeleccionado, setAutorSeleccionado] = useState('');
    const [isbnSeleccionado, setIsbnSeleccionado] = useState('');
    const [tipoSeleccionado, setTipoSeleccionado] = useState('');
    const [selectedBookId, setSelectedBookId] = useState(''); 
    const [showToolBar, setShowToolBar] = useState(true);
    const router = useRouter();
    const { code } = router.query;

    
    const handleLibroSelect = (event) => {
    const selectedBookId = event.target.value;
        const selectedBook = libros.find((libro) => libro.id === Number(selectedBookId));
        setSelectedBookId(selectedBookId);

        if (selectedBook) {
            // Actualizar el estado del autor seleccionado
            setAutorSeleccionado(selectedBook.autor);
            setIsbnSeleccionado(selectedBook.isbn);
            setTipoSeleccionado(selectedBook.tipo);
        } else {
            // Si no se selecciona ningún libro, borrar el autor seleccionado
            setAutorSeleccionado('');
            setIsbnSeleccionado('');
            setTipoSeleccionado('');

        }
    };
    const [LibroData, setLibroData] = useState({
        titulo: '',
        autor: '',
        isbn: '',
        tipo: '',
    });

    const [registroCompleto, setRegistroCompleto] = useState(false);
   
    useEffect(() => {
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
            const response = await fetch('/api/AddLibro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(LibroData),
            });

            if (response.status === 200) {
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
            titulo: '',
            autor: '',
            isbn: '',
            tipo: '',
        });
    };
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/DeleteLibro?id=${selectedBookId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setRegistroCompleto(true);
            }
        } catch (error) {
            console.error('Error al eliminar el libro:', error);
        }
    };

    
   
    if (opcionSeleccionada === 'insertar') {
        return (
            
            <div className="container">
                <AppBar />
                <div className='BarraLateral'>
                    {showToolBar && <ToolBar b1={"Principal"} b2={"Perfil"} b3={"Biblioteca"} l1={`/homeAdmin?code=${code}`} l2={`/perfilAdmin?code=${code}`} l3={`/biblioteca?code=${code}`} />}
                </div>
              
                
                <div className='.mainContent'>
                    
                    <div className='contenido'>
                        <div className='lineaytexto'>
                            <h2>Hola,Juliana</h2>
                            <hr className='linea'/>
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
                                        <label>Título</label>
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
                                        <label>ISBN</label>
                                        <input
                                            type="text"
                                            id="isbn"
                                            name="isbn"
                                            value={LibroData.isbn}
                                            onChange={handleInputChange}
                                            required
                                            disabled={registroCompleto}
                                        />
                                    </div>
                                    <div className="textoRecuadro">
                                        <label>Tipo</label>
                                        <input
                                            type="text"
                                            id="tipo"
                                            name="tipo"
                                            value={LibroData.tipo}
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
                        {showToolBar && <ToolBar b1={"Principal"} b2={"Perfil"} b3={"Biblioteca"} l1={`/libreria?code=${'1234'}`} l2={`/libreria?code=${'1234'}`} l3={`/libreria?code=${'1234'}`} />}
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
                                        {libros.map((libro) => (
                                            <option key={libro.id} value={libro.id}>
                                                {libro.titulo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="textoRecuadro">
                                    <label >Autor:</label>
                                    <input type="text" placeholder={autorSeleccionado}/>
                                   
                                            
                                   
                                </div>
                                <div className="textoRecuadro">
                                    <label >ISBN:</label>
                                    <input type="text" placeholder={isbnSeleccionado} />

                                    
                                </div>
                                <div className="textoRecuadro">
                                    <label >Tipo:</label>
                                    <input type="text" placeholder={tipoSeleccionado} />

                                  
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
                </div>
                
        );
        //Seccion eliminar
    } else if (opcionSeleccionada === 'eliminar') {
        return (
            <div className="container-modificar">
                <div className="container">
                    <AppBar />
                    <div className='BarraLateral'>
                        {showToolBar && <ToolBar b1={"Principal"} b2={"Perfil"} b3={"Biblioteca"} l1={`/libreria?code=${'1234'}`} l2={`/libreria?code=${'1234'}`} l3={`/libreria?code=${'1234'}`} />}
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
                                        {libros.map((libro) => (
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
