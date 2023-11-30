import Styles from './estilos.module.css'
import Link from 'next/link';
const Barra = (props) => {
    return(
        <div className={Styles.container}>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
            `}</style>
            <div className={Styles.aux}></div>
            <div className={Styles.menu}>
                <p className={Styles.enlace1} style={{margin: '0px'}}><Link className={Styles.lnk} href={props.l1} text="Principal" style={{textDecoration: 'none', paddingLeft: '45px', paddingRight:'45px', paddingTop: '20px', paddingBottom: '20px' }}>{props.b1}</Link></p>
            </div>
            <div className={Styles.menu}>
                <p className={Styles.enlace2} style={{margin: '0px'}}><Link className={Styles.lnk} href={props.l2} text="Perfil" style={{textDecoration: 'none',paddingLeft: '57px', paddingRight:'57px', paddingTop: '20px', paddingBottom: '20px'}}>{props.b2}</Link></p>
            </div>
            <div className={Styles.menu}>
                <p className={Styles.enlace3} style={{margin: '0px'}}><Link className={Styles.lnk} href={props.l3} text="Biblioteca" style={{textDecoration: 'none',paddingLeft: '45px', paddingRight:'45px', paddingTop: '20px', paddingBottom: '20px'}}>{props.b3}</Link></p>
            </div>
            <div className={Styles.texto}>SAC v1.0.1-alpha</div>
        </div>
    );
};

export default Barra;