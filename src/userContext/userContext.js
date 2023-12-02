// UsuarioContext.js
import React, { createContext, useContext, useState } from 'react';

const UsuarioContext = createContext();

export const useUsuario = () => useContext(UsuarioContext);

export const UsuarioProvider = ({ children }) => {
  const [usuarioId, setUsuarioId] = useState(null);

  return (
    <UsuarioContext.Provider value={{ usuarioId, setUsuarioId }}>
      {children}
    </UsuarioContext.Provider>
  );
};
