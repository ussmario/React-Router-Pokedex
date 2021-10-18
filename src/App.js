import './App.css';
import React, { useState, useEffect } from 'react';
import PkmnList from "./Components/PkmnList";
import PkmnDeets from "./Components/PkmnDeets";
import Pagination from "./Components/Pagination";
import { Switch, Route, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function App() {
  const [pokeList, setPokeList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pkmnPerPage] = useState(10);


  useEffect(() => {
    async function fetchPkmn() {
      setLoading(true);
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=898&offset=0`);//setState offset var for future changes
      let json = await res.json();
      setPokeList(json.results);
      setLoading(false);
    };
    fetchPkmn();
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
    return (isFav)
  }

  const favoriteFuncs = { addFavorite, removeFavorite, isFavorite };

  const indexOfLastPkmn = currentPage * pkmnPerPage;
  const indexOfFirstPkmn = indexOfLastPkmn - pkmnPerPage;
  const currentPkmn = pokeList.slice(indexOfFirstPkmn, indexOfLastPkmn);
  console.log("these are the :" + currentPkmn)

  const paginate = pageNumber => setCurrentPage(pageNumber);

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
        <Stack spacing={0.5} direction="column" sx={{ mt: 2 }}>
          <Link to="/"><Button variant="contained" sx={buttonStyle}>Home</Button></Link>
          <Link to="/favorites"><Button variant="contained" sx={buttonStyle}>Favorites</Button></Link><br /><br />
        </Stack>
        <Switch>
          {/* <Route path="/favorites">
            <PokemonList pokeList={favorites} />
          </Route> */}
          <Route path="/">
            <PkmnList pokeList={pokeList} />
          </Route>
        </Switch>
        {/* <PokemonList pokeList={onlyFavorites ? favoritesList : pokeList}/> */}
        <div className='container mt-5'>
          <h1 className='text-primary mb-3'>Pkmn</h1>
          <PkmnList pkmn={currentPkmn} loading={loading} />
          <Pagination
            pkmnPerPage={pkmnPerPage}
            totalPkmn={pokeList.length}
            paginate={paginate}
          />
        </div>
      </div>
      <div className="pokemon">
        {/*Pokemon*/}
        <Switch>
          <Route path="/favorites">
            <PkmnList pokeList={favorites} />
          </Route>
          <Route path={`/:pkmnName`}>
            <PkmnDeets favoriteFuncs={favoriteFuncs} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}