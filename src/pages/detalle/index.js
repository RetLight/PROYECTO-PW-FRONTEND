import React, { useState, useEffect } from 'react';
import AppBar from '../../components/Appbar/AppBar';
import ToolBar from '../../components/ToolBar/ToolBar';
import '../../app/globals.css';
import styles from '../detalle/Detallelibro.module.css';

import libroApi from '../../api/libro.js'
import { useRouter } from 'next/router';

function DetalleLibro() {
    const [showToolBar, setShowToolBar] = useState(true);
    const [selectedBook, setSelectedBook] = useState(null);
    const router = useRouter();
    const { code } = router.query;
    
    const { id } = router.query;

    
    const commonDescription = "In hac habitasse platea dictumst. Aliquam quis commodo diam. Aenean eu nunc sed mi dapibus auctor. Proin tristique arcu nec ex facilisis ullamcorper. Morbi auctor odio ex, auctor laoreet nulla placerat in. Phasellus dignissim, dolor viverra cursus fermentum, nunc ante viverra augue, condimentum sollicitudin ligula turpis non purus. Morbi at libero sed massa ultrices laoreet faucibus eget neque. Integer ac neque eget risus egestas gravida vitae eu nibh. Mauris id leo ex. Donec vitae semper lorem. Ut sollicitudin felis magna, congue dictum orci pulvinar sit amet. Integer a ipsum sem. Vivamus tincidunt mauris in sapien iaculis, nec aliquam justo posuere. Aliquam fermentum erat nisl, ac mattis risus luctus a. Duis nec libero bibendum, accumsan justo non, fermentum nisl. Phasellus tincidunt elit vel venenatis porttitor."
    
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                
                const response = await libroApi.findOne(id);
             
                if (response && response.data) {
                    const bookName = response.data.titulo;
                    const bookDetails = {
                        libro: bookName,
                        descripcion: commonDescription
                    };
                    
                   setSelectedBook(bookDetails)
                    
                } else {
                    console.error('No se encontraron detalles para el libro con ID:', id);
                }
            } catch (error) {
                console.error('Error al obtener detalles del libro:', error);
            }
        };

        fetchBooks();
    }, [id]);

    return (
        <div>
            <AppBar />
            <div className={styles.BarraLateral}>
                {showToolBar && (
                    <ToolBar
                        b1={"Principal"}
                        b2={"Perfil"}
                        b3={"Biblioteca"}
                        l1={`/principal?code=${code}`}
                        l2={`/miperfil?code=${code}`}
                        l3={`/busqueda?code=${code}`}
                    />
                )}
            </div>

            {selectedBook && (
                <div className={styles.RecuadroDetalles}>
                    <div></div>
                    <h1>Detalles del Libro</h1>
                    <div className={styles.InicialCirculo}>
                        {selectedBook.libro && selectedBook.libro.charAt(0)}
                    </div>
                    <p className={styles.nombreLibro}> {selectedBook.libro}</p>
                    <p className={styles.Descripcion}> {commonDescription}</p>
                    
                  
                </div>
            )}
        </div>
    );
}

export default DetalleLibro;