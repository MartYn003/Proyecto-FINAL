import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Link from 'next/link';

const ComicCard = ({ comic }) => {
    
    return (
        <Card
            sx={{
                width: 300,
                height: 350, 
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.05)', 
                },
            }}
        >
            <CardMedia
                component="img"
                height="140"
                image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} // Asumiendo que cada cómic tiene 'thumbnail' con 'path' y 'extension'
                alt={comic.title}
            />
            <CardContent>
                <Typography variant="h5" component="div">
                    {comic.title}
                </Typography>
                <Link href={`/comics/${comic.id}`} passHref>
                    <Button 
                        variant="contained" 
                        sx={{
                            backgroundColor: 'blue', // Color de fondo
                            color: 'white', // Color del texto
                            '&:hover': {
                                backgroundColor: 'darkblue', // Color de fondo al hacer hover
                            },
                            marginRight: 1, // Espaciado a la derecha
                        }}
                    >
                        Ver detalle
                    </Button>
                </Link>
                
            </CardContent>
        </Card>
    );
};

export default ComicCard;