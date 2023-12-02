import * as React from 'react';
import Styles from './estilos.module.css';
import library from '../../data/library.json';
import reservas from '../../data/reservas.json';
import { Style } from '@mui/icons-material';

export default function Book({ reserva, usuario}) {
    //const bookDetails = library.find(book => book.ISBN13 === codISBN13);
    //const bookTitle = bookDetails ? bookDetails.titulo : "Libro no encontrado";
    //const bookImage = bookDetails ? bookDetails['imagen-portada-url'] : null;
/*
    const userReservas = reservas.find(reserva => reserva.NroDocumento === NroDocumento);
    let bookDate = "Fecha no disponible";
    if (userReservas) {
        const bookIndex = userReservas.libros.indexOf(codISBN13);
        if (bookIndex !== -1) {
            bookDate = userReservas.fechas[bookIndex];
        }
    }
    */

    //<h2>{(reserva.usuario.nombre[0] || '') + (reserva.usuario.apellidos[0] || '')}</h2>
    return (
        <>
        <div className={Styles.container}>
            <div className={Styles.libro}>
                <div className={Styles.user}>
                    
                </div>
                <div className={Styles.Contenido}>
                    <div className={Styles.titulo}>{reserva.libro.titulo}</div>
                    <div className={Styles.fecha}>{reserva.libro.fecha_reserva}</div>
                </div>
                <div className={Styles.imagen}>
                    {reserva.libro.portada_url && <img src={reserva.libro.portada_url} alt={reserva.libro.titulo} />}
                </div>
            </div>
        </div>
        </>
    );
}
