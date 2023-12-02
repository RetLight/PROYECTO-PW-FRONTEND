import { useEffect, useState } from "react";
import styles from './PerfilUsuario.css';
import AppBar from '../../components/AppBar/AppBar';
import ToolBar from '../../components/ToolBar/ToolBar';
import usuariosApi from '../../api/usuario.js';
import { useRouter } from 'next/router';
import Imput from '../../components/Imput/Imput.jsx';

function PerfilUsuario() {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('datosPersonalesUser');
  const [showToolBar, setShowToolBar] = useState(true);
  const router = useRouter();
  const { code } = router.query;
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [tipo_documento, setTipoDoc] = useState('');
  const [NroDni, setNroDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [initialData, setInitialData] = useState({});
  const id = code;

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await usuariosApi.findAll();
        setInitialData(data);
        setNombre(data.nombre || '');
        setApellidos(data.apellidos || '');
        setTipoDoc(data.tipo_documento || '');
        setNroDni(data.NroDni || '');
        setEmail(data.email || '');
        setPassword(data.password || '');
      } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleUpdate = async () => {
    try {
      const updatedUserData = {
        id,
        nombre,
        apellidos,
        tipo_documento,
        NroDni,
        email,
        password,
      };

      const url = `https://renzot-2023-prograweb-as-api.azurewebsites.net/usuario`;
      console.log(updatedUserData)

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
    }
  };

  const [userPhoto, setUserPhoto] = useState('/images/julianaAdmin.png');

  const handleUserPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (opcionSeleccionada === 'datosPersonalesUser') {
    return (
      <div>
        <div className='BarraSuperior'>
          <AppBar />
        </div>
        <div className='BarraLateral'>
          {showToolBar && <ToolBar b1={"Principal"} b2={"Perfil"} b3={"Biblioteca"} l1={`/principal?code=${code}`} l2={`/miperfil?code=${code}`} l3={`/busqueda?code=${code}`} />}
        </div>
        <div className='trabajito'>
          <div className='tituloTexto'>
            <h2>Mi Perfil</h2>
            <hr />
          </div>
          <div className='barraHor'>
            <ul className='listaGeneral'>
              <li className="OpcionDatosPerso" onClick={() => setOpcionSeleccionada('datosPersonalesUser')} style={{ color: '#6750A4', fontWeight: 700 }}>DATOS PERSONALES</li>
              <li className="OpcionCuenta" onClick={() => setOpcionSeleccionada('cuentaUser')}>CUENTA</li>
            </ul>
            <div className='BarraSelec'></div>
          </div>
          <form>
            <div className='contenedorDos'>
            <div>
              <img src={userPhoto} className="FotoUsuario" />
              <input className="mensajeArchivo" type="file" accept="image/*" onChange={handleUserPhotoChange} />
            </div>
            <div className='contenedorTres'>
              <div className='contenedorCuatro'>
                <div className={styles.input_container}>
                  <Imput className={styles.ingreso} user="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>
                <div className={styles.input_container}>
                  <Imput className={styles.ingreso} user="Tipo Documento" value={tipo_documento} onChange={e => setTipoDoc(e.target.value)} />
                </div>
                <div className={styles.input_container}>
                  <Imput className={styles.ingreso} user="Apellidos" value={apellidos} onChange={e => setApellidos(e.target.value)} />
                </div>
                <div className={styles.input_container}>
                  <Imput className={styles.ingreso} user="Nro de documento" value={NroDni} onChange={e => setNroDni(e.target.value)} />
                </div>
              </div>
              <button type="button" onClick={handleUpdate}>Guardar</button>
            </div>
            </div>
          </form>
        </div>
      </div>
    );
  } else if (opcionSeleccionada === 'cuentaUser') {
    return (
      <div>
        <div className='BarraSuperior'>
          <AppBar />
        </div>
        <div className='BarraLateral'>
          {showToolBar && <ToolBar b1={"Principal"} b2={"Perfil"} b3={"Biblioteca"} l1={`/principal?code=${code}`} l2={`/miperfil?code=${code}`} l3={`/busqueda?code=${code}`} />}
        </div>
        <div className='trabajito'>
          <div className='tituloTexto'>
            <h2>Mi Perfil</h2>
            <hr />
          </div>
          <div className='barraHor'>
            <ul className='listaGeneral'>
              <li className="OpcionDatosPerso" onClick={() => setOpcionSeleccionada('datosPersonalesUser')}>DATOS PERSONALES</li>
              <li className="OpcionCuenta" onClick={() => setOpcionSeleccionada('cuentaUser')} style={{ color: '#6750A4', fontWeight: 700 }}>CUENTA</li>
            </ul>
            <div className="BarraSelecCuenta"></div>
          </div>
          <form>
            <div className='contenedorDos'>
            <div>
              <img src={userPhoto} alt="Foto del usuario" />
            </div>
            <div className='contenedorTres'>
              <div className='contenedorCuatro'>
                <div className={styles.input_container}>
                  <Imput className={styles.ingreso} user="Correo Electrónico" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className={styles.input_container}>
                  <Imput className={styles.ingreso} user="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
              </div>
              <button type="button" onClick={handleUpdate}>Guardar</button>
            </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PerfilUsuario;