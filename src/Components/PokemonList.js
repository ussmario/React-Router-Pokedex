import {Link, useParams} from 'react-router-dom';

export default function PokemonList({pokeList}){



    return(
        <ul>
            {pokeList.map((element, index)=> (<li key={index}><Link to={`/${element.name}`}>{element.name}</Link></li>))}
        </ul>
    )

}