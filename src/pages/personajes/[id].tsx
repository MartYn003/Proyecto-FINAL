import React from 'react'
import { getCharacter } from '../../services/marvel/marvel.service';
import LayoutGeneral from '../../components/layouts/layout-general';
import {Typography, Card, CardContent, CardMedia, Box, Grid} from '@mui/material';
import Link from 'next/link';

const personajeDetail = (character) => {

    console.log(character)
    return (
        <LayoutGeneral>
            <Card sx={{ maxWidth: 800, margin: 'auto', marginTop: 5, boxShadow: 3 }}>
                <CardMedia
                    component="img"
                    height="400"
                    image={`${character.character.thumbnail.path}.${character.character.thumbnail.extension}`}
                    alt={character.name}
                />
                <CardContent>
                    <Typography variant="h4" component="div" gutterBottom>
                        {character.character.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        {character.character.description || "Descripción no disponible."}
                    </Typography>

                    <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
                        Información Adicional:
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="text.primary">
                                ID: {character.character.id}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body2" color="text.primary">
                                Modificado: {new Date(character.character.modified).toLocaleDateString()}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
                        Cómics Asociados:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {character.character.comics.available} cómics disponibles
                    </Typography>
                    <Box component="ul" sx={{ paddingLeft: 2 }}>
                        {character.character.comics.items.map((comic) => (
                            <li key={comic.resourceURI}>
                                <Link href={comic.resourceURI}>
                                    {comic.name}
                                </Link>
                            </li>
                        ))}
                    </Box>

                    <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
                        Eventos Asociados:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {character.character.events.available} eventos disponibles
                    </Typography>
                    <Box component="ul" sx={{ paddingLeft: 2 }}>
                        {character.character.events.items.map((event) => (
                            <li key={event.resourceURI}>
                                <Link href={event.resourceURI}>
                                    {event.name}
                                </Link>
                            </li>
                        ))}
                    </Box>

                    <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
                        Series Asociadas:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {character.character.series.available} series disponibles
                    </Typography>
                    <Box component="ul" sx={{ paddingLeft: 2 }}>
                        {character.character.series.items.map((series) => (
                            <li key={series.resourceURI}>
                                <Link href={series.resourceURI}>
                                    {series.name}
                                </Link>
                            </li>
                        ))}
                    </Box>

                    <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
                        Historias Asociadas:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {character.character.stories.available} historias disponibles
                    </Typography>
                    <Box component="ul" sx={{ paddingLeft: 2 }}>
                        {character.character.stories.items.map((story) => (
                            <li key={story.resourceURI}>
                                <Link href={story.resourceURI}>
                                    {story.name}
                                </Link>
                            </li>
                        ))}
                    </Box>
                </CardContent>
            </Card>
        </LayoutGeneral>
    )
}

export async function getServerSideProps({query: {id}}){

    const character = await getCharacter(id)
return{

    props: {
        character,
    }
    };
    
};

export default personajeDetail

