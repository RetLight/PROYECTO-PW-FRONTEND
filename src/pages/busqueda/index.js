// Busqueda.js
import React, { useState , useEffect} from 'react';
import Libreria from '../libreria/index.js';  // Importa Libreria.js si aún no lo has hecho

import '../../app/globals.css';
import Style from '../busqueda/busqueda.module.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AppBar from '../../components/AppBar/AppBar';
import ToolBar from '../../components/ToolBar/ToolBar';
import { useRouter } from 'next/router';
import librosApi from '../../api/libro.js'
import { useAmp } from 'next/amp.js';


const Busqueda = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false); 
  const [screen, setScreen] = useState('busqueda');
  const [isSearchButtonDisabled, setIsSearchButtonDisabled] = useState(true);
  const [searchByTitle, setSearchByTitle] = useState(false);
  const [searchByAuthor, setSearchByAuthor] = useState(false);
  const [searchBySeries, setSearchBySeries] = useState(false);
  const [searchByISBN, setSearchByISBN] = useState(false);
  const [selectedResourceType, setSelectedResourceType] = useState('');
  const [showToolBar, setShowToolBar] = useState(true);
  const router = useRouter();
  const { code } = router.query;
  const [libros, setLibros] = useState([]);


  const handleOnLoad = async () => {
    try {
      const response = await librosApi.findAll();
      setLibros(response.data)
      console.log(libros)
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
     
      }catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  const handleSearch = async () => {
    try {
      if (!searchByTitle && searchTerm.trim() === '') {
        // Si no se selecciona ningún checkbox y no hay término de búsqueda, mostrar mensaje de no resultados
        setNoResults(true);
        return;
      }
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
  
      // Filtra los resultados de acuerdo a las opciones seleccionadas o, por defecto, por título
      const matchingBooks = libros.filter(book => {
        if (
          (!searchByTitle && !searchByAuthor && !searchBySeries && !searchByISBN) ||
          (searchByTitle && book.titulo.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (searchByAuthor && book.autor.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (searchBySeries && book.serie.toLowerCase().includes(lowerCaseSearchTerm)) ||
          (searchByISBN && book.ISBN.toLowerCase().includes(lowerCaseSearchTerm))
        ) {
          return true;
        }
        return false;
      });
      
      
      setResults(matchingBooks);
      setScreen('libreria');
      setNoResults(matchingBooks.length === 0);
    } catch (error) {
      console.error('Error al realizar la solicitud a la API:', error);
    }
  };

  const handleMostrartodo = async() =>{

      setResults(libros);
      setScreen('libreria');
  }
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    setIsSearchButtonDisabled(inputValue.trim() === '' && !searchByTitle && !searchByAuthor && !searchBySeries && !searchByISBN);
  };

  const handleChipClick = (resourceType) => {
    setSelectedResourceType(resourceType);
  };
  

  const handleCheckboxChange = (param) => {
    switch (param) {
      case 'title':
        setSearchByTitle(true);
        setSearchByAuthor(false);
        setSearchBySeries(false);
        setSearchByISBN(false);
        break;
      case 'author':
        setSearchByTitle(false);
        setSearchByAuthor(true);
        setSearchBySeries(false);
        setSearchByISBN(false);
        break;
      case 'series':
        setSearchByTitle(false);
        setSearchByAuthor(false);
        setSearchBySeries(true);
        setSearchByISBN(false);
        break;
      case 'isbn':
        setSearchByTitle(false);
        setSearchByAuthor(false);
        setSearchBySeries(false);
        setSearchByISBN(true);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleOnLoad();
}, [])

  return (
    <div>
      <AppBar />
      
      <div className={Style.BarraLateral}>
          {showToolBar && <ToolBar b1={"Principal"} b2={"Perfil"} b3={"Biblioteca"} l1={`/principal?code=${code}`} l2={`/miperfil?code=${code}`} l3={`/busqueda?code=${code}`} />}
      </div>
      <div className={Style.searchContainer}>
        <h1>Busqueda</h1>
        <hr></hr>
        {screen === 'busqueda' && (
          <>
            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '36.8rem' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField type="text" 
              htmlFor="searchInput" 
              id="searchInput" 
              label="Titulo del Libro" 
              variant="outlined" 
              value={searchTerm}
              onChange={handleInputChange}
              className={Style.searchInput} />
            </Box>
            {selectedResourceType && (
              <div>
                <Box
                  component="form"
                  sx={{
                    '& > :not(style)': { m: 1, width: '392px' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField type="text" 
                  label="Tipo de Recurso" 
                  variant="outlined" 
                  value={selectedResourceType}
                  onChange={handleInputChange}
                  className={Style.searchInput} readOnly />
                </Box>
              </div>
            )}


          <div className={Style.checkboxContainer}>
            <label>
              <input type="checkbox" checked={searchByTitle} onChange={() => handleCheckboxChange('title')} />
              Título
            </label>
            <label>
              <input type="checkbox" checked={searchByAuthor} onChange={() => handleCheckboxChange('author')} />
              Autor
            </label>
            <label>
              <input type="checkbox" checked={searchBySeries} onChange={() => handleCheckboxChange('series')} />
              Serie
            </label>
            <label>
              <input type="checkbox" checked={searchByISBN} onChange={() => handleCheckboxChange('isbn')} />
              ISBN
            </label>
          </div>

          <div className={Style.chipContainer}>
        {/* Chips para los tipos de recurso */}
        <div
          className={`${Style.chip} ${selectedResourceType === 'Articulo cientifico' && Style.selected}`}
          onClick={() => handleChipClick('Articulo cientifico')}
        >
          Articulo cientifico
        </div>
        <div
          className={`${Style.chip} ${selectedResourceType === 'Novela' && Style.selected}`}
          onClick={() => handleChipClick('Novela')}
        >
          Novela
        </div>
        <div
          className={`${Style.chip} ${selectedResourceType === 'Revista' && Style.selected}`}
          onClick={() => handleChipClick('Revista')}
        >
          Revista
        </div>
        <div
          className={`${Style.chip} ${selectedResourceType === 'Libro' && Style.selected}`}
          onClick={() => handleChipClick('Libro')}
        >
          Libro
        </div>
      </div>

          <button
            className={Style.button1}
            onClick={handleSearch}
            disabled={isSearchButtonDisabled}
          >
            Buscar
          </button>
          <button
            className={Style.button1}
            onClick={handleMostrartodo}
          >
            Mostar todo
          </button>
        </>
      )}

      {screen === 'libreria' && <Libreria results={results} />}   
    </div>
    </div>
  );
};

export default Busqueda;