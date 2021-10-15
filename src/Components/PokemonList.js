import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
export default function PokemonList({ pokeList }) {
    return (
    <Stack spacing={0.5} direction="column">
        {pokeList.map((element, index) => (<Link to={`/${element.name}`}><Button variant="contained" sx={{width:150}}>{element.name}</Button></Link>))}
    </Stack>
    )
}