import * as React from 'react';
import { useState } from 'react';
import Styles from './estilos.module.css';

export default function Advise(props) {
    const [isVisibleOK, setIsVisibleOK] = useState(true);

    const handleOK = async () => {
        setIsVisibleOK(false);

        try {
            const response = await fetch('http://localhost:3002/update-reserva', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: props.code,
                    setISBN13: props.setISBN13,
                    reserva: props.reserva
                })
            });

            const data = await response.json();

            if (data.message === "Reserva actualizada") {
                console.log("Reserva actualizada exitosamente!");
            } else {
                console.error("Error al actualizar.");
            }
        } catch (error) {
            console.error("Error al comunicarse con el servidor:", error); 
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
