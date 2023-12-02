import React, { useState, useEffect } from 'react';
import library from '../../data/library.json';
import styles from './biblioteca.module.css';
import AppBar from '../../components/AppBar/AppBar';
import ToolBar from '../../components/ToolBar/ToolBar';
import '../../app/globals.css';
import { useRouter } from 'next/router';
import Link from 'next/link';

import librosApi from '../../api/libro.js'

function obtenerIniciales(titulo) {
    const palabras = titulo.split(' ');
    if (palabras.length >= 2) {
      const primeraInicial = palabras[0].charAt(0).toUpperCase();
      const segundaInicial = palabras[1].charAt(0).toUpperCase();
      return primeraInicial + segundaInicial;
    } else if (palabras.length === 1) {
      return palabras[0].charAt(0).toUpperCase();
    } else {
      return '';
    }
  }

export default function BookSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchOptions, setSearchOptions] = useState({
    title: false,
  });
  const [libros, setLibros] = useState([]);

  const handleOnLoad = async () => {
    try {
      const rawLibros = await librosApi.findAll();
      setLibros(rawLibros.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  const [noResultsMessage, setNoResultsMessage] = useState('');
  const handleSearch = () => {
    const results = libros.filter((book) => {
      if (!searchOptions.title) {
        return book.titulo.toLowerCase().includes(searchTerm.toLowerCase());
      }

      const titleMatch = searchOptions.title && book.titulo.toLowerCase().includes(searchTerm.toLowerCase());


      return titleMatch 
    }).slice(0, 3); 

    setSearchResults(results);

    if (results.length === 0) {
      setNoResultsMessage('Lo sentimos, no se encontraron resultados.');
    } else {
      setNoResultsMessage('');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setSearchOptions({
      title: false,
    });
    setNoResultsMessage('');
  };

  useEffect(() => {
    if (searchTerm !== '') {
      handleSearch();
      handleOnLoad();
    }
  }, [searchTerm]);

  const [showToolBar, setShowToolBar] = useState(true);

  const router = useRouter();
  const { code } = router.query;


  return (
    
    <div >
          <AppBar />
          <div className={styles.BarraLateral}>
          {showToolBar && <ToolBar b1={"Principal"} b2={"Perfil"} b3={"Biblioteca"} l1={`/principal_adm?code=${code}`} l2={`/miperfil_adm?code=${code}`} l3={`libreria_adm/?code=${code}`} />}
        </div>    
        <div className={styles.contenido}>
        <div className={styles.div1}>
        <div className={styles.div2}>
            <header className={styles.header}>
            <h1 className={styles.titulo}>Biblioteca</h1>
            <Link href= {`/crear_recurso?code=${code}`} className = {styles.button1}>Añadir un nuevo recurso</Link>
            </header>
            <hr className="line" />
            <br />
        </div>


      <div className={styles.seccion1}>
        <label className={styles.keyword}>Ingresa la palabra clave</label>
        <input className={styles.textbar} type="text" placeholder="" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
        <button className={styles.limpiar} onClick={clearSearch}>
          Limpiar
        </button>
      </div>

      {searchResults.length > 0 && (
        <div>
          <ul className={styles.resultados}>
            {searchResults.map((book, index) => (
              <li key={index}>
                <div className={styles.contenedorLibro}>
                  <div className={styles.seccionTitulo}>
                    <p className={styles.inicialesCirculo}>
                      {obtenerIniciales(book.titulo)}
                    </p>
                    <p className={styles.libro_titulo}>{book.titulo}</p>
                  </div>
                  <img className={styles.libro_imagen} src={book['portada_url']} alt={`Portada de ${book.titulo}`} />
                  <p className={styles.libro_ISBN}>ISBN: {book.isbn13}</p>
                  <p className={styles.libro_autor}>Autor: {book.autor}</p>
                  <p className={styles.libro_editor}>Editor: {book.editorial}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {noResultsMessage && (
        <p className={styles.noResults}>{noResultsMessage}</p>
      )}
        </div>
        </div>
        
       
    </div>
  );
}