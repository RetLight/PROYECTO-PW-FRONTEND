import * as React from 'react';
import { useState } from 'react';
import Styles from './estilos.module.css';
import reservaApi from '../../api/reserva.js';
import librosApi from '../../api/libro.js';

export default function Advise(props) {
    const [isVisibleOK, setIsVisibleOK] = useState(true);

    const handleOK = async () => {
        setIsVisibleOK(false);

        try {
            const reserva = {
                fecha_reserva: props.fecha_reserva,
                fecha_devolucion: props.fecha_devolucion,
                createdAt: new Date(),
                updatedAt: new Date(),
                idUsuario: props.id_usuario,
                idLibro: props.id_libro,
            }

            const resp = await reservaApi.create(reserva);

            if (resp)
                console.log("Reserva guardada!");
            else
                alert("Ha habido un error al guardar!");
        } catch (error) {
            console.error("Error en la carga de reservas:", error); 
        }

        try{
            const estado = {
                id: props.id_libro,
                formato: props.libro.formato,
                autor: props.libro.autor,
                editorial: props.libro.editorial,
                categoria: props.libro.categoria,
                anio: props.libro.anio,
                idioma: props.libro.idioma,
                nro_paginas: props.libro.nro_paginas,
                isbn13: props.libro.isbn13,
                portada_url: props.libro.portada_url,
                titulo: props.libro.titulo,
                estado: "No disponible",
            }

            console.log(estado);

            const resp = await librosApi.update(estado);

            if (resp)
                console.log("Datos actualizados!");
            else
                console.log("Ha habido un error al actualizar!");
        } catch (error) {
            console.error("Error en la carga de usuarios:", error); 
        }
    };

    return (
        isVisibleOK ? (
            <div className={Styles.all}>
                <div className={Styles.aviso}>
                    <h2 className={Styles.titulo}>Reserva completada</h2>
                    <p className={Styles.parrafo}>La reserva del recurso se ha realizado con éxito. Este debe ser devuelto hasta el día {props.vencimiento}</p>
                    <button className={Styles.ok} onClick={handleOK}>OK</button>
                </div>
            </div>
        ) : null
    );
}
