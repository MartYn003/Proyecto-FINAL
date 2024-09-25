import { NextPage, GetStaticProps } from 'next'
import LayoutGeneral from '../components/layouts/layout-general'
import  { getComics } from '../services/marvel/marvel.service'
import Grid from '@mui/material/Grid';
import ComicCard from '../components/Card/ComicCard';
import { Box } from '@mui/material';

const HomePage: NextPage<{ comics: any[] }> = ({ comics }) => {

    console.log(comics)
    return (
        <LayoutGeneral>
            <Box sx={{ my: 5, mx: 20 }}> 
            <Grid container spacing={2}>
                {comics.map((comic) => (
                    <Grid item xs={12} sm={6} md={4} key={comic.id}>
                        <ComicCard comic={comic} />
                    </Grid>
                ))}
            </Grid>
            </Box>
        </LayoutGeneral>
    )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
        const comics = await getComics();

    console.log(comics)

    return{

        props: {
            comics,
        }
        };
        
};
export default HomePage
