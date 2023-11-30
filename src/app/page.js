'use client'
import styles from './page.module.css'
import Link from 'next/link'
import { useEffect, useState } from 'react' 
import { useRouter } from 'next/navigation'  
import Imput from '../components/Imput/Imput.jsx'
import usuariosApi from '../api/usuario.js'

export default function Home() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');  
  const [password, setPassword] = useState('');  
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [usuarios, setUsuarios] = useState([])

  const handleOnLoad = async () => {
    try {
      const rawUsuarios = await usuariosApi.findAll();
      setUsuarios(rawUsuarios.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  

  const handleClick = () => {
    if (usuario.trim() === "" || password.trim() === "") {
      setMensajeError("Faltan agregar datos");
      alert("Faltan agregar datos");
      setMostrarModal(true);
      return;
    }

    ///const adminEncontrado = adminData.find(user => user.Correo === usuario && user.Contraseña === password);

    if (usuario === "admin@gmail.com" && password === "admin") {
      router.push(`/homeAdmin?code=${"71791793"}`); 
      return; 
    }

    const usuarioEncontrado = usuarios.find(user => user.email === usuario && user.password === password);
    
    if(usuarioEncontrado){
      router.push(`/home?code=${usuarioEncontrado.NroDocumento}`); 
    }else{
      setMensajeError("Acceso denegado");
      alert('Acceso denegado');
      setMostrarModal(true);
    }
  }

  const closeModal = () => {
    setMostrarModal(false);
  };

  const handleClick2 = () => {
        router.push('/registro');
  }

  useEffect(() => {
    handleOnLoad();
  },[])

  return (
    <main className={styles.container}>
      <div className={styles.all}>
        <h1 className={styles.titulo}>Sistema de reserva de libro</h1>
        <div className={styles.datos}>
          <div className={styles.form_box}>
            <Imput className={styles.ingreso} user={"Usuario o Correo"} onChange={e => setUsuario(e.target.value)} />
          </div>
          <div className={styles.form_box}>
            <Imput className={styles.ingreso} user={"Contraseña"} type="password" onChange={e => setPassword(e.target.value)} />
          </div>
        </div>
        <div className={styles.parrafo1}>
        <p className={styles.parrafo}><Link className={styles.lnk} href='/' text="Olvidé mi contraseña" >Olvidé mi contraseña</Link> </p>
        </div>
        <div className={styles.btn}>
          <div className={styles.a}>
              <button className={styles.registrousuario} onClick={handleClick2}>Registro usuario</button> 
              <button className={styles.ingresar} onClick={handleClick}> Ingresar </button>
          </div>
        </div>
      </div>
      {mostrarModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>
              &times;
            </span>
            <p>{mensajeError}</p>
          </div>
        </div>
      )}
    </main>
  )
}
