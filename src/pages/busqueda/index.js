import React, { useState } from 'react';
import styles from './busqueda.module.css';
import AppBar from '../../components/AppBar/AppBar';
import ToolBar from '../../components/ToolBar/ToolBar';
import '../../app/globals.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BookSearch(){

    const [showToolBar, setShowToolBar] = useState(true);
    const router = useRouter();
    const { code } = router.query;



    return (
        <div>
          <AppBar />
          <div className={styles.BarraLateral}>
            {showToolBar && <ToolBar b1={"Principal"} b2={"Perfil"} b3={"Biblioteca"} l1={`/home?code=${code}`} l2={`/perfilUsuario?code=${code}`} l3={`/busqueda?code=${'code'}`} />}
          </div>
          <div className={styles.contenido}>
          <div className={styles.div1}>
            <div className={styles.div2}>
              <header>
                    <h1 className={styles.h1}>Búsqueda</h1>
                </header>
                <hr className={styles.line} />
                <br />
            </div>
            <div className={styles.Seccion}>
              <article className={styles.Buscar}>
                <div className={styles.barra1}>
                  <label>Ingresa la palabra clave</label>
                  <input className={styles.textbar} type="text" placeholder=''/>
                </div>
                  <br />
                  <div className={styles.barra1}>
                  <label>Tipo de recurso</label>
                  <input className={styles.textbar2} type="text" placeholder=''/>
                </div>
              </article>

              <article className={styles.Filtro}>
                <h2 className={styles.titulo2}>Incluir búsqueda en</h2>
                <label>
                    <input className={styles.checkbox} type="checkbox"/>
                    Titulo
                </label>
                <label>
                    <input className={styles.checkbox}
                        type="checkbox"
                    />
                    Autor
                </label>
                <label>
                    <input className={styles.checkbox}
                        type="checkbox"
                    />
                    Número de Serie
                </label>
                <label>
                    <input className={styles.checkbox}
                        type="checkbox"
                    />
                    ISBN
                </label>
              </article>
            </div>

            <div className={styles.cards}>
                <div class={styles.card}>
                <p>Articulo Cientifico</p>
                </div>
                <div class={styles.card}>
                <p>Novela</p>
                </div>
                <div class={styles.card}>
                <p>Revista</p>
                </div>
                <div class={styles.card}>
                <p>Libro</p>
                </div>
                
            </div>
            <div className={styles.footer}>
            <button className={styles.button}>Limpiar</button>
            <Link href={`/libreria?code=${code}`}className={styles.button2}>Buscar</Link>
            </div>
          </div>
          </div>
        </div>
        
    )
}
