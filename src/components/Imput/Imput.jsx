import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Styles from './estilos.module.css'

export default function Imput(props) {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '40ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField className={Styles.modificado}
        id="outlined-basic" 
        label={props.user}
        variant="outlined" 
        type={props.type || "text"} 
        onChange={props.onChange}
        sx={{
            '& .MuiInputLabel-root': {
                color: '#6750A4', // Cambia el color de la etiqueta a rojo
            },
            '& .MuiInputLabel-root.Mui-focused': {
                color: '#6750A4', // Mantiene el color de la etiqueta en rojo cuando el campo está enfocado
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#6750A4', // Cambia el color del borde a morado
              },
              '&:hover fieldset': {
                borderColor: '#6750A4', // Cambia el color del borde a morado en el estado hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#6750A4', // Cambia el color del borde a morado cuando está enfocado
              },
            },
          }}
      />
    </Box>
  );
}
