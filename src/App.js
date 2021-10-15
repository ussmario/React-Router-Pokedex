import './App.css';
import React, { useState, useEffect } from 'react';
import PokemonList from "./Components/PokemonList";
import PokemonDetails from "./Components/PokemonDetails";
import { Switch, Route, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function App() {

  const [pokeList, setPokeList] = useState([]);
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    async function callPokeList() {
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`);//setState offset var for future changes
      let json = await res.json();
      setPokeList(json.results);
    };
    callPokeList();
  }, []);

  function addFavorite(name) {
    console.log("adding favorite", name)
    setFavorites([...favorites, { name }]);
    console.log("favorites:", favorites)
  }

  function removeFavorite(name) {
    console.log("removing favorite", name)
    setFavorites(favorites.filter(favorite => favorite.name !== name))
    console.log("favorites:", favorites)
  }


  function isFavorite(name) {
    let isFav = favorites.some(favorite => favorite.name === name)
    console.log("is favorite", name, isFav)
    return (isFav)
  }

  const favoriteFuncs = { addFavorite, removeFavorite, isFavorite };

  console.log(pokeList)

  const buttonStyle = { width: 150, backgroundColor: "green" }

  return (
    <div className="App">
      <header className="App-header">
        Pokedex
      </header>
      <div className="main-app">
        Main App
      </div>
      <div className="poke-list" >
        <Stack spacing={0.5} direction="column" sx={{mt:2}}>
          <Link to="/"><Button variant="contained" sx={buttonStyle}>Home</Button></Link>
          <Link to="/favorites"><Button variant="contained" sx={buttonStyle}>Favorites</Button></Link><br /><br />
        </Stack>
        <Switch>
          {/* <Route path="/favorites">
            <PokemonList pokeList={favorites} />
          </Route> */}
          <Route path="/">
            <PokemonList pokeList={pokeList} />
          </Route>
        </Switch>
        {/* <PokemonList pokeList={onlyFavorites ? favoritesList : pokeList}/> */}
      </div>
      <div className="pokemon">
        {/*Pokemon*/}
        <Switch>
          <Route path="/favorites">
            <PokemonList pokeList={favorites} />
          </Route>
          <Route path={`/:pokemonName`}>
            <PokemonDetails favoriteFuncs={favoriteFuncs} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;

// Mandatory Users Stories
// As a user I:

// Want to be presented with a list of the first 10 Pokemon from the series on the main page - DONE
// Show the details of selected Pokemon in a nested route - DONE
// Want be able to select Pokemon as “favorites” so that I can access them later. -DONE
// Want a link with a /favorites route that leads to all of the cards that I have favored.

// Stretch Goals
// Paginate the initial list to allow for browsing a larger selection of Pokemon
// Search for a Pokemon via its name, retain ability to view details and add it to favorites
// Use Material UI to style cards.

// Deadline:
// 14:00 CST Friday Oct 15