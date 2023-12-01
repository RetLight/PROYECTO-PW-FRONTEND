import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import Styles from '../Calendar/estilos.module.css';
import Advise from '../Advise/ConfirmarReserva.jsx';

export default function Calendar({id_usuario, id_libro, libro, onReservaConfirmada}) {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [isVisible, setIsVisible] = useState(true);
    const [showAdvise, setShowAdvise] = useState(false);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleCancel = () => {
        setIsVisible(false);
    };

    const handleAcept = () => {
        //const updatedDate = selectedDate.add(30, 'day');
        setSelectedDate(selectedDate);
        setIsVisible(false);
        setShowAdvise(true);
    };

    const handleOK = () => {
        setShowAdvise(false);
        onReservaConfirmada();
    };

    return (
      <div className={Styles.all}>
          {isVisible && (
              <>
                  <div className={Styles.overlay}></div>
                  <div className={Styles.calendarioModal}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateCalendar 
                              value={selectedDate}
                              onChange={handleDateChange}
                              minDate={dayjs()}
                          />
                          <div className={Styles.btn}>
                              <button className={Styles.cancelar} onClick={handleCancel}>Cancelar</button>
                              <button className={Styles.aceptar} onClick={handleAcept}>Aceptar</button>
                          </div>
                      </LocalizationProvider>   
                  </div>
              </>
          )}
        {showAdvise && (
                <Advise 
                    fecha_reserva={selectedDate.toDate().toString()}
                    fecha_devolucion={selectedDate.add(30, 'day').toDate().toString()}
                    onOK={handleOK}
                    id_usuario={id_usuario}
                    id_libro={id_libro}
                    libro={libro}
                    onReservaConfirmada={onReservaConfirmada}
                />
        )}
      </div>
  );
}
