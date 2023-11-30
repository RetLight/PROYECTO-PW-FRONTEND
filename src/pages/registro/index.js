import { useState } from "react";
import { useRouter } from "next/router";
import styles from "./registro.module.css";

const Registro = () => {
  const router = useRouter();

  const [formState, setFormState] = useState({
    Nombres: "",
    Apellidos: "",
    TipoDocumento: "",
    NroDocumento: "",
    Correo: "",
    Contraseña: ""
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const onRegistrarButtonClick = async () => {

    const allFieldsFilled = Object.values(formState).every(field => field !== "");
  
    if (allFieldsFilled) {
      await fetch('../../api/addUser', {
        method: 'POST',
        body: JSON.stringify(formState),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      router.push(`/home?code=${formState.NroDocumento}`);
    } else {
      alert("Faltan registrar sus datos");
    }
  };

  return (
    <div className={styles.contornoregistrarParent}>
      <button className={styles.contornoregistrar} />
      <div className={styles.nombres}>Nombres</div>
      <div className={styles.apellidos}>Apellidos</div>
      <input className={styles.ingresarnombres} type="text" name="Nombres" value={formState.Nombres} onChange={handleChange} />
      <input className={styles.ingresarapellidos} type="text" name="Apellidos" value={formState.Apellidos} onChange={handleChange} />
      <div className={styles.tipoDeDocumento}>Tipo de documento</div>
      <div className={styles.nroDeDocumento}>Nro de documento</div>
      <input className={styles.ingresardocumentos} type="text" name="TipoDocumento" value={formState.TipoDocumento} onChange={handleChange} />
      <input className={styles.ingresarnrodocumento} type="text" name="NroDocumento" value={formState.NroDocumento} onChange={handleChange} />
      <div className={styles.sistemaDeReserva}>
        Sistema de reserva de Libros
      </div>
      <div className={styles.registroDeUsuario}>Registro de usuario</div>
      <div className={styles.datosPersonales}>Datos Personales</div>
      <div className={styles.correoElectronico}>Correo Electronico</div>
      <div className={styles.password}>Password</div>
      <input className={styles.ingresarcorreoelectronico} type="text" name="Correo" value={formState.Correo} onChange={handleChange} />
      <input className={styles.ingresarpassword} type="password" name="Contraseña" value={formState.Contraseña} onChange={handleChange} />
      <div className={styles.ingresePasswordNuevamente}>
        Ingrese password nuevamente
      </div>
      <input className={styles.ingresarcontradenuevo} type="password" />
      <div className={styles.datosDeLa}>Datos de la cuenta</div>
      <button
        className={styles.registrarbutton}
        onClick={onRegistrarButtonClick}
      >
        Registrar
      </button>
    </div>
  );
};

export default Registro;