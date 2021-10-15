import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';


export default function PokemonDetails({favoriteFuncs}) {
    const { pokemonName } = useParams();
    const [pokemon, setPokemon] = useState({});
    const [checked, setChecked] = useState(favoriteFuncs.isFavorite(pokemonName));

    useEffect(() => {
        async function callPokeDetails() {
            let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);//setState offset var for future changes
            let json = await res.json();
            setPokemon(json);
        };
        callPokeDetails();
        setChecked(favoriteFuncs.isFavorite(pokemonName));
    }, [pokemonName]);

   
    const handleChange = () => {
        if(checked){
            favoriteFuncs.removeFavorite(pokemonName)
        }else{
            favoriteFuncs.addFavorite(pokemonName)
        }
        setChecked(!checked);
    };

    return (
        <>
            <label>
                <input type="checkbox" checked={checked} onChange={handleChange}/>
                Favorites
            </label>
            <hr />
            <div>
                {JSON.stringify(pokemon)}
            </div>
        </>


    )



}