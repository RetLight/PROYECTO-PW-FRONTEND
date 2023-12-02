// src/pages/_app.js
import React from 'react';
import '../../src/app/globals.css'; // Asegúrate de ajustar la ruta a tus estilos globales
import { UsuarioProvider } from '../userContext/userContext.js'; // La ruta podría ser diferente dependiendo de dónde esté ubicado tu UsuarioContext

function MyApp({ Component, pageProps }) {
  return (
    <UsuarioProvider>
      <Component {...pageProps} />
    </UsuarioProvider>
  );
}

export default MyApp;
