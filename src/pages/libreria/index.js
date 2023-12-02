import React, { useState, useEffect, use } from 'react';
import AppBar from '../../components/AppBar/AppBar.jsx';
import ToolBar from '../../components/ToolBar/ToolBar.jsx';
import Styles from './libreria.module.css';
import Calendar from '../../components/Calendar/Calendar.jsx';
import '../../app/globals.css';
import { useRouter } from 'next/router';
import librosApi from '../../api/libro.js'

const Libreria = ({results}) => {
    const router = useRouter();
    const { code } = router.query;
    const [showCalendar, setShowCalendar] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const bookxPage = 12;
    const [libros, setLibros] = useState([]);
    const sortedLibrary = [...results].sort((a, b) => a.titulo.localeCompare(b.titulo));
    const [showToolBar, setShowToolBar] = useState(true);
    const [librocompleto, setLibrocompleto] = useState();
    const [idUsuario,setIdUsuario] = useState('');
    const [idLibro, setIdLibro] = useState('');

    const handleOnLoad = async () => {
        try {
            const rawLibros = await librosApi.findAll();
            setLibros(rawLibros.data);
          } catch (error) {
            console.error("Error fetching users:", error);
          }
    }

    const onReservaConfirmada = () => {
        setShowCalendar(false);
        handleOnLoad();
    };

    const handleReservar = (id_usuario, id_libro, libro) => {
        setShowCalendar(true);
        setIdLibro(id_libro);
        setIdUsuario(id_usuario)
        setLibrocompleto(libro)
    };

    const handleNext = () => {
        
        if(results.length < 12){
          return;
        }
        else {
          if (startIndex + bookxPage < results.length) {
            setStartIndex(startIndex + bookxPage);
          }
        }
    };

    const handlePrevious = () => {
      if(results.length < 12){
        return;
      }
      else{
        if (startIndex - bookxPage >= 0) {
            setStartIndex(startIndex - bookxPage);
        }
      }
    };

    const handleBuscar = () => {
      router.push(`/busqueda?code=${code}`).then(() => {
        window.location.reload();
    });
    }

    const handleReservado = () => {
        router.push(`/principal?code=${code}`);
    }

    function irDetalle(id_libro){
        router.push(`/detalle?code=${code}&id=${id_libro}`);
    }   

    const Libro = ({ id_libro, id_usuario, titulo, isbn, autor, editor, imagen, estado, libro }) => {
        return (
            <div className={Styles.libro}>
                <div className={Styles.p1}>
                    <h2 className={Styles.tituloLibro}>{titulo}</h2>
                </div>
                <div onClick={() => irDetalle(id_libro)}>
                    <div className={Styles.p2}>
                        <img src={imagen} alt={titulo} className={Styles.image} />
                    </div>
                </div>
                    <div className={Styles.p3}>
                        <p className={Styles.ISBN}>ISBN: {isbn}</p>
                        <p className={Styles.autor}>AUTOR: {autor}</p>
                        <p className={Styles.editor}>EDITOR: {editor}</p>
                        <p className={Styles.estado}>{estado}</p>
                    </div>
                
                <div className={Styles.p4}>
                    <button
                        className={Styles.buttonReserva}
                        onClick={() => handleReservar(id_usuario, id_libro, libro)}
                        disabled={estado === 'No disponible'}
                    >Reservar</button>
                </div>
            </div>
        );
    };

    useEffect(() => {
        handleOnLoad();
    }, [])

    return (
        <main className={Styles.contenedor}>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
            `}</style>
            {showCalendar && <Calendar id_usuario={idUsuario} id_libro={idLibro} libro={librocompleto} onReservaConfirmada={onReservaConfirmada} />}
            <div className={Styles.mainContent}>
                <div className={Styles.contenido}>
                    <div className={Styles.titulo}>
                        <h2 className={Styles.Bienvenida}>Busqueda - Resultados</h2>
                        <button className={Styles.buttonAdd} onClick={handleBuscar}>Volver a buscar</button>
                    </div>
                    <div className={Styles.titulo2}>
                        <h3>Resultado de busqueda</h3>
                        <button className={Styles.buttonReservas} onClick={handleReservado}>Ver mis reservas</button>
                    </div>

                    <div className={Styles.seccionlibros}>
                        {results.slice(startIndex, startIndex + bookxPage).map((libro, index) => (
                            <Libro
                                key={index}
                                id_libro={libro.id}
                                id_usuario={code}
                                titulo={libro.titulo}
                                isbn={libro.isbn13}
                                autor={libro.autor}
                                editor={libro.editorial}
                                imagen={libro["portada_url"]}
                                estado={libro.estado}
                                libro={libro}
                            />
                        ))}
                    </div>
                    <div className={Styles.Navegacion}>
                        <button className={Styles.anterior} onClick={handlePrevious}>Anterior</button>
                        <button className={Styles.siguiente} onClick={handleNext}>Siguiente</button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Libreria