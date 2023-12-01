import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./registro.module.css";
import usuariosApi from '../../api/usuario.js';
import Imput from '../../components/Imput/Imput.jsx';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [tipo_documento, setTipoDoc] = useState('');
  const [NroDni, setNroDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [rol, setRol] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const router = useRouter();

  const handleOnLoad = async () => {
    try {
      const rawUsuarios = await usuariosApi.findAll();
      setUsuarios(rawUsuarios.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const handleSignin = async () => {
    if (nombre.trim() && apellidos.trim() && tipo_documento.trim() && NroDni.trim() && email.trim() && password.trim()) {
      if(password === repeatedPassword){
        const registro = {
          nombre: nombre,
          apellidos: apellidos,
          tipo_documento: tipo_documento,
          NroDni: NroDni,
          email: email,
          password: password,
          rol: rol,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        
        console.log(registro)
        try {
          const resp = await usuariosApi.create(registro);
          if (resp) {
            alert("Registro exitoso!");
            router.push('/');
          } else {
            alert("Ha habido un error");
          }
          await handleOnLoad();
        } catch (error) {
          console.error("Error during sign up:", error);
          alert("Error al registrarse.");
        }
      } else {
        alert("Las contraseñas no coinciden");
      }
    } else {
      alert("Faltan registrar sus datos");
    }
  }

  useEffect(() => {
    handleOnLoad();
  }, []);

  return (
    <>
      <div className={styles.title}>Sistema de Reserva de Libros</div>
      <div className={styles.subtitle}>Registro de Usuario</div>
      <div className={styles.container}>
        <div className={styles.center_container}>
          <div className={styles.columnizquierda}>
            <div className={styles.columna_subtitulo}>Datos personales</div>
            <div className={styles.input_container}>
              <Imput className={styles.ingreso} user="Nombres" onChange={e => setNombre(e.target.value)} />
            </div>
            <div className={styles.input_container}>
              <Imput className={styles.ingreso} user="Apellidos" onChange={e => setApellidos(e.target.value)} />
            </div>
            <div className={styles.input_container}>
              <Imput className={styles.ingreso} user="Tipo de documento" onChange={e => setTipoDoc(e.target.value)} />
            </div>
            <div className={styles.input_container}>
              <Imput className={styles.ingreso} user="Nro de documento" onChange={e => setNroDni(e.target.value)} />
            </div>
          </div>
          <div className={styles.columnderecha}>
            <div className={styles.columna_subtitulo}>Datos de la cuenta</div>
            <div className={styles.input_container}>
              <Imput className={styles.ingreso} user="Correo Electrónico" onChange={e => setEmail(e.target.value)} />
            </div>
            <div className={styles.input_container}>
              <Imput className={styles.ingreso} user="Contraseña" type="password" onChange={e => setPassword(e.target.value)} />
            </div>
            <div className={styles.input_container}>
              <Imput className={styles.ingreso} user="Repetir contraseña" type="password" onChange={e => setRepeatedPassword(e.target.value)} />
            </div>
            <div className={styles.button_container}>
              <button className={styles.registerButton} onClick={handleSignin}>Registrar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Registro;
