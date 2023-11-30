import React, { useState, useEffect } from 'react';
import AppBar from '../../components/AppBar/AppBar.jsx';
import ToolBar from '../../components/ToolBar/ToolBar.jsx';
import Styles from './libreria.module.css';
import library from '../../data/library.json';
import Calendar from '../../components/Calendar/Calendar.jsx';
import '../../app/globals.css';
import { useRouter } from 'next/router';

export default function BookLibrary() {
    const router = useRouter();
    const { code } = router.query;
    const [showCalendar, setShowCalendar] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const bookxPage = 12;
    const sortedLibrary = [...library].sort((a, b) => a.titulo.localeCompare(b.titulo));
    const [getISBN13, setISBN13] = useState("");
    const [showToolBar, setShowToolBar] = useState(true); 

    const handleReservar = (isbn) => {
        setShowCalendar(true);
        setISBN13(isbn);
    };

    const handleNext = () => {
        if (startIndex + bookxPage < sortedLibrary.length) {
            setStartIndex(startIndex + bookxPage);
        }
    };

    const handlePrevious = () => {
        if (startIndex - bookxPage >= 0) {
            setStartIndex(startIndex - bookxPage);
        }
    };

    const handleBuscar = () => {
        router.push(`/busqueda?code=${code}`);
    }

    const handleReservado = () => {
        router.push(`/home?code=${code}`);
    }

    const Libro = ({ titulo, isbn, autor, editor, imagen, estado}) => {
        return (
            <div className={Styles.libro}>
                <div className={Styles.p1}>
                    <h2 className={Styles.tituloLibro}>{titulo}</h2>
                </div>
                <div className={Styles.p2}>
                    <img src={imagen} alt={titulo} className={Styles.image}/>
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
                        onClick={() => handleReservar(isbn)}
                        disabled={estado === 'No disponible'}
                    >Reservar</button>
                </div>
            </div>
        );
    };

    return (
        <main className={Styles.contenedor}>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
            `}</style>
            {showCalendar && <Calendar code={code} setISBN13={getISBN13}/>}
            <header className={Styles.cabecera}>
                <AppBar toggleToolBar={() => setShowToolBar(prevState => !prevState)} />
            </header>
            <div className={Styles.mainContent}>
                <div className={Styles.BarraLateral}>
                    {showToolBar && <ToolBar b1={"Principal"} b2={"Perfil"} b3={"Biblioteca"} l1={`/home?code=${code}`} l2={`/perfilUsuario?code=${code}`} l3={`/busqueda?code=${code}`} />}
                </div>
                <div className={Styles.contenido}>
                    <div className={Styles.titulo}>
                        <h2 className={Styles.Bienvenida}>Busqueda - Resultados</h2>
                        <button className={Styles.buttonAdd} onClick={handleBuscar}>Volver a buscar</button>
                    </div>
                    <div className={Styles.titulo2}>
                        <h3>Resultado de busqueda</h3>
                        <button className={Styles.buttonReservas} onclick={handleReservado}>Ver mis reservas</button>
                    </div>
                    
                    <div className={Styles.seccionlibros}>
                        {sortedLibrary.slice(startIndex, startIndex + bookxPage).map((libro, index) => (
                            <Libro
                                key={index}
                                titulo={libro.titulo}
                                isbn={libro.ISBN13}
                                autor={libro.autor}
                                editor={libro.editorial}
                                imagen={libro["imagen-portada-url"]}
                                estado={libro.estado}
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
}
