import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, TextField, Typography, Paper, Snackbar, Stepper, Step, StepLabel } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import LayoutCheckout from '../components/layouts/layout-checkout';

const steps = ['Datos Personales', 'Dirección de Entrega', 'Datos del Pago'];

const Checkout = () => {
    const router = useRouter();
    const { comicName, comicImage, price } = router.query;

    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('/api/checkout.route', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customer: {
                        name: data.name,
                        lastname: data.lastname,
                        email: data.email,
                        address: {
                            address1: data.address1,
                            city: data.city,
                            state: data.state,
                            zipCode: data.zipCode,
                        },
                    },
                    payment: {
                        cardNumber: data.cardNumber,
                        cardName: data.cardName,
                        expirationDate: data.expirationDate,
                        securityCode: data.securityCode,
                    },
                    price,
                }),
            });

            if (response.ok) {
                const responseData = await response.json();
                router.push({
                    pathname: '/confirmacion-compra',
                    query: {
                        comicName: responseData.comicName,
                        comicImage: responseData.comicImage,
                        customerData: JSON.stringify(data), // Enviar todos los datos del cliente
                        price, // Precio pagado
                    },
                });
            } else {
                const errorData = await response.json();
                setSnackbarMessage(errorData.message || 'Error en el proceso de compra');
                setOpenSnackbar(true);
            }
        } catch (err) {
            setSnackbarMessage('Error en la conexión');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <LayoutCheckout>
        <Box sx={{ padding: '20px', mx: 10, my: 5}}>
            <Typography variant="h4" align="center">Checkout</Typography>
            <Paper sx={{ marginTop: '20px', padding: '20px' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === 0 && (
                    <form onSubmit={handleSubmit(handleNext)}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Nombre es obligatorio' }}
                            render={({ field }) => (
                                <TextField
                                    label="Nombre"
                                    fullWidth
                                    error={!!errors.name}
                                    
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="lastname"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Apellido es obligatorio' }}
                            render={({ field }) => (
                                <TextField
                                    label="Apellido"
                                    fullWidth
                                    error={!!errors.lastname}
                                    
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: 'Email es obligatorio',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Email no es válido',
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    error={!!errors.email}
                                    
                                    {...field}
                                />
                            )}
                        />
                        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
                            Siguiente
                        </Button>
                    </form>
                )}

                {activeStep === 1 && (
                    <form onSubmit={handleSubmit(handleNext)}>
                        <Controller
                            name="address1"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Dirección es obligatoria' }}
                            render={({ field }) => (
                                <TextField
                                    label="Dirección"
                                    fullWidth
                                    error={!!errors.address1}
                                    
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="city"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Ciudad es obligatoria' }}
                            render={({ field }) => (
                                <TextField
                                    label="Ciudad"
                                    fullWidth
                                    error={!!errors.city}
                                    
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="state"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Provincia es obligatoria' }}
                            render={({ field }) => (
                                <TextField
                                    label="Provincia"
                                    fullWidth
                                    error={!!errors.state}
                                    
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="zipCode"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Código postal es obligatorio' }}
                            render={({ field }) => (
                                <TextField
                                    label="Código Postal"
                                    fullWidth
                                    error={!!errors.zipCode}
                                    
                                    {...field}
                                />
                            )}
                        />
                        <Button onClick={handleBack} variant="outlined" sx={{ marginTop: '20px', marginRight: '10px' }}>
                            Atrás
                        </Button>
                        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
                            Siguiente
                        </Button>
                    </form>
                )}

                {activeStep === 2 && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="cardNumber"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Número de tarjeta es obligatorio' }}
                            render={({ field }) => (
                                <TextField
                                    label="Número de Tarjeta"
                                    fullWidth
                                    error={!!errors.cardNumber}
                                    
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="cardName"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Nombre en la tarjeta es obligatorio' }}
                            render={({ field }) => (
                                <TextField
                                    label="Nombre como aparece en la tarjeta"
                                    fullWidth
                                    error={!!errors.cardName}
                                    
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="expirationDate"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Fecha de expiración es obligatoria' }}
                            render={({ field }) => (
                                <TextField
                                    label="Fecha de Expiración (MM/AA)"
                                    fullWidth
                                    error={!!errors.expirationDate}
                                    
                                    {...field}
                                />
                            )}
                        />
                        <Controller
                            name="securityCode"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Código de seguridad es obligatorio' }}
                            render={({ field }) => (
                                <TextField
                                    label="Código de Seguridad"
                                    type="password"
                                    fullWidth
                                    error={!!errors.securityCode}
                                    
                                    {...field}
                                />
                            )}
                        />
                        <Button onClick={handleBack} variant="outlined" sx={{ marginTop: '20px', marginRight: '10px' }}>
                            Atrás
                        </Button>
                        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '20px' }}>
                            Confirmar Compra
                        </Button>
                    </form>
                )}
            </Paper>

            {/* Snackbar para manejar errores */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Box>
        </LayoutCheckout>
    );
};

export default Checkout;
