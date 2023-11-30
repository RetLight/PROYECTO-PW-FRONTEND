import Styles from '../../pages/libreria/libreria.module.css'
const Libro = ({ titulo, isbn, autor, editor, imagen }) => {
    return (
      <div className={Styles.libro}>
        <h2 className={Styles.tituloLibro}>{titulo}</h2>
        <img src={imagen} alt={titulo} className={Styles.image}/>
        <h3 className={Styles.isbn}>{isbn}</h3>
        <p className={Styles.autor}>{autor}</p>
        <p className={Styles.editor}>{editor}</p>
        <button className={Styles.buttonReserva}>Reservar</button>
      </div>
    );
  };

  export default Libro;