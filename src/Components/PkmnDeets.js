import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';



export default function PokemonDetails({ favoriteFuncs }) {
    const { pkmnName } = useParams();
    const [pkmn, setPkmn] = useState();
    const [checked, setChecked] = useState(favoriteFuncs.isFavorite(pkmnName));

    useEffect(() => {
        async function callPokeDetails() {
            let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pkmnName}`);
            let json = await res.json();
            setPkmn(json);
        };
        callPokeDetails();
        setChecked(favoriteFuncs.isFavorite(pkmnName));
    }, [pkmnName, favoriteFuncs]);


    const handleChange = () => {
        if (checked) {
            favoriteFuncs.removeFavorite(pkmnName)
        } else {
            favoriteFuncs.addFavorite(pkmnName)
        }
        setChecked(!checked);
    };

    function capitalize(str) {
        return str[0].toUpperCase() + str.substring(1)
    }

    if (!pkmn) {
        return (<h1>Loading</h1>)
    }
    return (
        <Box sx={{ mx: "auto", width: "100%" }}>
            <Card sx={{ margin: 5 }}>
                <CardMedia
                    component="img"
                    // height="140"
                    sx={{ width: "25vw", display: "inline-flex", mx: "auto" }}
                    image={pkmn?.sprites?.other["official-artwork"].front_default}
                    alt="pkmn sprite"
                />
                <CardContent sx={{ mx: "auto", display: "table" }}>
                    <Typography gutterBottom variant="h2" component="div">
                        {capitalize(pkmn.name)}
                    </Typography>

                    <Typography gutterBottom variant="h5" component="div">
                        <label>
                            <input type="checkbox" checked={checked} onChange={handleChange} />
                            Favorite
                        </label>
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        <h3>Type(s): {pkmn.types.map((type, index) => <div key={index + 1000}>{capitalize(type.type.name)}</div>)}</h3>
                        <h3>PokeDex Entry #: {pkmn.id}</h3>
                        <h3>Ability: {capitalize(pkmn.abilities[0].ability.name)}</h3>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );



}