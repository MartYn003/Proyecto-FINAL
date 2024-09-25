import React from 'react';
import { useRouter } from 'next/router';
import LayoutCompra from '../components/layouts/layout-checkout'; // Asegúrate de tener este layout
import { Box, Typography, Paper } from '@mui/material';

const ConfirmacionCompra = () => {
    const router = useRouter();
    const { comicName, comicImage, customerData, addressData, price } = router.query;

    // Verifica si comicName o customerData están vacíos y redirige a Home
    if (!comicName || !customerData) {
        router.push('/');
        return null; 
    }

    // Deserializa customerData y addressData
    const parsedCustomerData = typeof customerData === 'string' ? JSON.parse(customerData) : {};
    const parsedAddressData = typeof addressData === 'string' ? JSON.parse(addressData) : {};

    return (
        <LayoutCompra>
            <Box sx={{ backgroundColor: 'green', color: 'white', padding: '20px' }}>
                <Typography variant="h4" align="center">¡Que disfrutes tu compra!</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                    <Typography variant="h5">{comicName}</Typography>
                    {/* <img src={comicImage} alt={comicName} style={{ width: '300px', height: 'auto' }} /> */}
                </Box>
            </Box>
            <Paper sx={{ margin: '20px', padding: '20px' }}>
                <Typography variant="h6">Datos Personales:</Typography>
                <Typography>Nombre: {parsedCustomerData.name}</Typography>
                <Typography>Apellido: {parsedCustomerData.lastname}</Typography>
                <Typography>Email: {parsedCustomerData.email}</Typography>
                
                <Typography variant="h6" sx={{ marginTop: '10px' }}>Dirección de Entrega:</Typography>
                <Typography>{parsedAddressData.address1}</Typography>
                <Typography>{parsedAddressData.city}, {parsedAddressData.state}, {parsedAddressData.zipCode}</Typography>
                
                <Typography variant="h6" sx={{ marginTop: '10px' }}>Precio Pagado: ${price}</Typography>
            </Paper>
        </LayoutCompra>
    );
};

export default ConfirmacionCompra;
