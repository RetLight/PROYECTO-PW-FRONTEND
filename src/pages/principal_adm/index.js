import { useEffect, useState } from 'react';
import AppBar from '../../components/AppBar/AppBar';
import ToolBar from '../../components/ToolBar/ToolBar';
import Styles from './home.module.css';
import '../../app/globals.css';
import Book from '../../components/Book/Book';
import reservasApi from '../../api/reserva.js';
import { useRouter } from 'next/router';
import usuariosApi from '../../api/usuario.js';

export default function InicioUsuario() {
    const router = useRouter();
    const { code } = router.query;

    const [showToolBar, setShowToolBar] = useState(true);
    const [showAllUltimas, setShowAllUltimas] = useState(false);
    const [showAllProximas, setShowAllProximas] = useState(false);
    const [reservas, setReservas] = useState([]);
    const [reservasUsuario, setReservasUsuario] = useState([]);
    const [usuario, setUsuario] = useState([null]); // Cambiado a null

    useEffect(() => {
        const handleOnLoad = async () => {
            try {
                const rawReservas = await reservasApi.findAll();
                console.log("rawReservas", rawReservas);
                setReservas(rawReservas.data);
                setReservasUsuario(rawReservas.data.filter(reserva => reserva.idUsuario == code));
            } catch (error) {
                console.error("Error fetching reservas:", error);
            }
            try {
                const rawUsuario = await usuariosApi.findOne(code);
                setUsuario(rawUsuario.data); // Asegúrate de que esto es un objeto
                console.log(usuario)
            } catch (error) {
                console.error("Error fetching users:", error);
            }
            
        };
        
        handleOnLoad();
    }, [code]); // Agregado usuarioId como dependencia

    useEffect(()=>{
        console.log("reservas", reservas);
        if(reservasUsuario.length != 0){
            console.log("reservasUsuario", reservasUsuario);
        }
    },[reservasUsuario, reservas])
    const nombres = usuario?.nombre; // Corregido para acceder de manera segura

    return (
        <main className={Styles.contenedor}>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
            `}</style>
            <header className={Styles.cabecera}>
                <AppBar toggleToolBar={() => setShowToolBar(prevState => !prevState)} />
            </header>
            <div className={Styles.mainContent}>
                <div className={Styles.BarraLateral}>
                    {showToolBar && <ToolBar b1={"Principal"} b2={"Perfil"} b3={"Biblioteca"} l1={`/principal_adm?code=${code}`} l2={`/miperfil_adm?code=${code}`} l3={`/libreria_adm?code=${code}`} />}
                </div>
                <div className={Styles.contenido}>
                    <h2 className={Styles.Bienvenida}>Bienvenido, {nombres}</h2>
                        
                        {!showAllProximas && (
                            <div className={Styles.UltimasReservas}>
                                <div className={Styles.r1}>
                                    <h2 className={Styles.texto1}>Ultimas reservas</h2>
                                    <section className={Styles.librosR}>
                                        {showAllUltimas 
                                            ? reservasUsuario.map((reserva, index) => (
                                                <Book key={index} reserva={reserva} />
                                            ))
                                            : reservasUsuario.slice(0, 2).map((reserva, index) => (
                                                <Book key={index} reserva={reserva}/>
                                            ))
                                        }
                                    </section>
                                {showAllUltimas 
                                    ? <button className={Styles.btnVermas} onClick={() => setShowAllUltimas(false)}>Ver menos</button>
                                    : <button className={Styles.btnVertodo} onClick={() => setShowAllUltimas(true)}>Ver todo</button>
                                }
                                </div>
                            </div>
                        )}

                        {!showAllUltimas && (
                            <div className={Styles.ProximosVencer}>
                                <div className={Styles.r2}>    
                                    <h2 className={Styles.texto2}>Proximos a vencer</h2>
                                    <section className={Styles.librosP}>
                                        {showAllProximas 
                                            ? reservasUsuario.map((reserva, index) => (
                                                <Book key={index} reserva={reserva}/>
                                            ))
                                            : reservasUsuario.slice(0, 2).map((reserva, index) => (
                                                <Book key={index} reserva={reserva}/>
                                            ))
                                        }
                                    </section>
                                    {showAllProximas 
                                        ? <button className={Styles.btnVermas} onClick={() => setShowAllProximas(false)}>Ver menos</button>
                                        : <button className={Styles.btnVertodo} onClick={() => setShowAllProximas(true)}>Ver todo</button>
                                    }
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </main>
    );
}
