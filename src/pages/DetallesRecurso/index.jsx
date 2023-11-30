import React, { useState, useEffect } from 'react';
import AppBar from '../../components/Appbar/AppBar';
import ToolBar from '../../components/ToolBar/ToolBar';
import '../../app/globals.css';
import styles from '../DetallesRecurso/Detallelibro.module.css';
import detalles from '../../data/detalles.json';

function DetalleLibro() {
    const [showToolBar, setShowToolBar] = useState(true);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleBookSelect = (event) => {
        const bookId = event.target.value;
        const book = detalles.find((book) => book.id === parseInt(bookId));
        setSelectedBook(book);
    };

    return (
        <div>
            <AppBar />
            <div className={styles.BarraLateral}>
                {showToolBar && (
                    <ToolBar
                        b1={"Principal"}
                        b2={"Perfil"}
                        b3={"Biblioteca"}
                        l1={`/libreria?code=${'1234'}`}
                        l2={`/libreria?code=${'1234'}`}
                        l3={`/libreria?code=${'1234'}`}
                    />
                )}
                <div className={styles.SelectContainer}>
                <select onChange={handleBookSelect}>
                    <option value="">Selecciona un libro</option>
                    {detalles.map((book) => (
                        <option key={book.id} value={book.id}>
                            {book.libro}
                        </option>
                    ))}
                </select>
                </div>
                </div>

            {selectedBook && (
                <div className={styles.RecuadroDetalles}>
                    <h1>Detalles del Libro</h1>
                    <div className={styles.InicialCirculo}>
                        {selectedBook.libro.charAt(0)}
                    </div>
                    <p className={styles.nombreLibro}> {selectedBook.libro}
                    </p>
                    <p className={styles.Descripcion}> {selectedBook.descripcion}</p>
                    <div className={styles.ReservadoContainer}>
                        <p className={styles.Reservado}>Reservado por: {selectedBook.nombre}</p>
                    </div>
                    <div className={styles.TipoContainer}>
                        <span className={styles.TipoLabel}>Tipo:</span>
                        <div className={styles.Tipo}>{selectedBook.tipo}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DetalleLibro;