import React, { useState, useEffect } from 'react';

interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ message, onClose }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(true);

    return () => setIsActive(false);
  }, []);

  return (
    <div className={`modal-overlay ${isActive ? 'active' : ''}`}>
      <div className={`modal-content ${isActive ? 'active' : ''}`}>
        <img src="assets/icons/error-octagon.svg" alt="Icono de Error"/>
        <h2>Ups...</h2>
        <p>{message}</p>
        <button className="modal-button-close" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

export default ErrorModal;
