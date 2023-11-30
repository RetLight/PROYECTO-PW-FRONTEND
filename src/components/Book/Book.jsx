import * as React from 'react';
import Styles from './estilos.module.css';
import library from '../../data/library.json';
import reservas from '../../data/reservas.json';
import { Style } from '@mui/icons-material';

export default function Book({ NroDocumento, inicialNombre, codISBN13 }) {
    const bookDetails = library.find(book => book.ISBN13 === codISBN13);
    const bookTitle = bookDetails ? bookDetails.titulo : "Libro no encontrado";
    const bookImage = bookDetails ? bookDetails['imagen-portada-url'] : null;

    const userReservas = reservas.find(reserva => reserva.NroDocumento === NroDocumento);
    let bookDate = "Fecha no disponible";
    if (userReservas) {
        const bookIndex = userReservas.libros.indexOf(codISBN13);
        if (bookIndex !== -1) {
            bookDate = userReservas.fechas[bookIndex];
        }
    }

    return (
        <div className={Styles.container}>
            <div className={Styles.libro}>
                <div className={Styles.user}>
                    <h2>{inicialNombre}</h2>
                </div>
                <div className={Styles.Contenido}>
                    <div className={Styles.titulo}>{bookTitle}</div>
                    <div className={Styles.fecha}>{bookDate}</div>
                </div>
                <div className={Styles.imagen}>
                    {bookImage && <img src={bookImage} alt={bookTitle} />}
                </div>
            </div>
        </div>
    );
}
