import { Typography, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import LayoutGeneral from '../../components/layouts/layout-general'
import { getComic } from '../../services/marvel/marvel.service'
import Link from 'next/link';


const ComicDetail = (comic) => {
    console.log(comic)

    const isInStock = comic.comic.stock > 0;

    return (
        <div>
            <LayoutGeneral>

                {comic ? (
                    <Card sx={{ width: 1300, display: 'flex', boxShadow: 3, my: 10 }}>

                        <CardMedia
                            component="img"
                            height="400"
                            image={`${comic.comic.thumbnail.path}.${comic.comic.thumbnail.extension}`}
                            alt={comic.comic.title}
                            sx={{ width: 250, objectFit: 'cover', mr: 10 }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <CardContent>
                                <Typography variant="h2" component="div">
                                    {comic.comic.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {comic.comic.description || "Descripción no disponible."}
                                </Typography>
                                <Typography variant="h6" component="div" sx={{ marginTop: 3 }}>
                                    Personajes:
                                </Typography>
                                <Box component="ul" sx={{ paddingLeft: 3 }}>
                                    {comic.comic.characters.items.length > 0 ? (
                                        comic.comic.characters.items.map((character) => (
                                            <li key={character.resourceURI}>
                                                <Link href={`/personajes/${character.resourceURI.split('/').pop()}`}>
                                                    <Typography variant="body1" color="primary">
                                                        {character.name}
                                                    </Typography>
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            No hay personajes asociados a este cómic.
                                        </Typography>
                                    )}
                                </Box>
                                <Typography variant="h6" color="primary" sx={{ marginTop: 2 }}>
                                    Precio: ${comic.comic.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Stock: {comic.comic.stock}
                                </Typography>
                                <Link href={`/checkout`} passHref>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: 'blue', 
                                            color: 'white', 
                                            '&:hover': {
                                                backgroundColor: 'darkblue', 
                                            },
                                            marginRight: 1,
                                            mt: 2 
                                        }}
                                        disabled={!isInStock}
                                    >
                                        Comprar
                                    </Button>
                                </Link>
                            </CardContent>
                        </Box>

                    </Card>
                ) : (
                    <Typography variant="h6" align="center" color="error">
                        No se encontró el cómic.
                    </Typography>
                )}

            </LayoutGeneral>
        </div>
    )
}

export async function getServerSideProps({ query: { id } }) {

    const comic = await getComic(id)
    return {

        props: {
            comic,
        }
    };

};

export default ComicDetail
