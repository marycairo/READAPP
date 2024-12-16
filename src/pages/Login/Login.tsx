/* eslint-disable @typescript-eslint/no-explicit-any */
import './Login.css';
import { Logo } from '../../components/Logo/Logo';
import { Box, TextField, Button, InputLabel, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { userService } from '../../services/userService';
import { formToJSON } from '../../utils/serializer';
import { handleError, ErrorResponse } from '../../utils/error-handler';
import ErrorModal from '../../components/ErrorModal/ErrorModal';

export const Login = () => {
  const [formValues, setFormValues] = useState({ userName: '', password: '', showPassword: false });
  const [formErrors, setFormErrors] = useState<{ userName?: string; password?: string }>({});
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const validateForm = (formValues: { userName: string; password: string }) => {
    const errors: { userName?: string; password?: string } = {};

    if (!formValues.userName) {
      errors.userName = 'El nombre de usuario es obligatorio.';
    } else if (!/^[a-zA-Z0-9]+$/.test(formValues.userName)) {
      errors.userName = 'El nombre de usuario solo puede contener letras y números.';
    }

    if (!formValues.password) {
      errors.password = 'La contraseña es obligatoria.';
    }
    return errors;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const togglePasswordVisibility = () => {
    setFormValues((prevValues) => ({ ...prevValues, showPassword: !prevValues.showPassword }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = validateForm(formValues);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      await userService.login(formToJSON(formValues));
      setRedirect(true);
    } catch (error: any) {
      handleError(error as ErrorResponse, setErrorMessage);
      setShowModal(true);
    } finally{
      setIsLoading(false);
    };
  }

  const closeModal = () => setShowModal(false);

  if (redirect) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="layout-content layout-content--login gradient">
      <Logo />
      <Box className="login-form" component="form" onSubmit={handleSubmit} noValidate>

        <InputLabel className="input-label input-label--login" htmlFor="userName">
          Usuario
        </InputLabel>

        <TextField
          className="text-field"
          fullWidth
          id="userName"
          name="userName"
          autoFocus
          required
          value={formValues.userName}
          onChange={handleChange}
           slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            },
          }}
        />
        
        <div>
          {formErrors.userName && (
            <div className="error-message-container">
                <p className="error-message">
                  <img src="assets/icons/warning.svg" alt="Icono de Aviso" className="warning-icon" />
                  {formErrors.userName}
                </p>
            </div>
            )}
        </div>

        <InputLabel className="input-label input-label--login" htmlFor="password">
          Contraseña
        </InputLabel>

        <TextField
          className="text-field"
          fullWidth
          id="password"
          name="password"
          type={formValues.showPassword ? 'text' : 'password'}
          required
          value={formValues.password}
          onChange={handleChange}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {formValues.showPassword ? <Visibility/> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <div>
          {formErrors.password && (
            <div className="error-message-container">
                <p className="error-message">
                  <img src="assets/icons/warning.svg" alt="Icono de Aviso" className="warning-icon" />
                  {formErrors.password}
                </p>
            </div>
            )}
        </div>

        <Button
          className="button-gradient"
          type="submit"
          variant="contained"
          disabled={isLoading} 
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" /> 
          ) : (
          'Ingresar'
          )}
        </Button>
      </Box>

      <div className="version">
        Version: Administración 
      </div>

      {showModal && <ErrorModal message={errorMessage} onClose={closeModal} />}
    </div>
  );
}

export default Login