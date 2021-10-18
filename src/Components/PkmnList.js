import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
export default function PkmnList({ pokeList, loading }) {
    if (loading) {
        return <h2>Loading...</h2>;
    }
    return (
        <Stack spacing={0.5} direction="column" className='list-group mb-4'>
            {pokeList?.map((element, index) => (<Link to={`/${element.name}`} className='list-group-item'><Button variant="contained" sx={{ width: 150 }}>{element.name}</Button></Link>))}
        </Stack>
    )
}