import { useEffect, useState } from "react";
import "./pokemons-lst.scss";
import type { PokemonDetails } from "../pokemon-types";

interface Pokemon {
  id: string;
  name: string;
  image: string;
  detailsUrl: string;
}

interface StatData {
  base_stat: number;
  stat: { name: string };
}

interface TypeData {
  slot: number;
  type: { name: string };
}

interface MoveData {
  move: { name: string };
}

interface FlavorTextEntry {
  flavor_text: string;
  language: { name: string };
}

interface PokemonsLstProps {
  searchQuery: string;
  searchBy: "number" | "name";
  page: number;
  pokemonsPerPage: number;
  onSelectPokemon: (pokemon: PokemonDetails) => void;
}

export default function PokemonsLst({
  searchQuery,
  searchBy,
  page,
  pokemonsPerPage,
  onSelectPokemon
}: PokemonsLstProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchResult, setSearchResult] = useState<Pokemon | null>(null);

  // завантаження списку для пагінації
  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const offset = (page - 1) * pokemonsPerPage;
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${pokemonsPerPage}&offset=${offset}`
        );
        const data = await response.json();

        const listWithImages: Pokemon[] = await Promise.all(
          data.results.map(async (p: { name: string; url: string }) => {
            const detailRes = await fetch(p.url);
            const detailData = await detailRes.json();
            return {
              id: `#${detailData.id.toString().padStart(3, "0")}`,
              name: p.name,
              image: detailData.sprites.front_default,
              detailsUrl: p.url
            };
          })
        );

        setPokemons(listWithImages);
      } catch (err) {
        console.error(err);
      }
    };

    if (!searchQuery) {
      setSearchResult(null);
      loadPokemons();
    }
  }, [page, pokemonsPerPage, searchQuery]);

  // обробка пошуку напряму по API
  useEffect(() => {
    const searchPokemon = async () => {
      if (!searchQuery) return;

      try {
        let query = searchQuery.trim().toLowerCase();

        if (searchBy === "number") {
          // прибираємо "#" і нулі
          query = query.replace("#", "").replace(/^0+/, "");
        }

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${query}`
        );

        if (!response.ok) {
          setSearchResult(null);
          return;
        }

        const data: {
          stats: StatData[];
          types: TypeData[];
          moves: MoveData[];
          name: string;
          sprites: { front_default: string };
          weight: number;
          height: number;
          id: number;
        } = await response.json();

        const pokemon: Pokemon = {
          id: `#${data.id.toString().padStart(3, "0")}`,
          name: data.name,
          image: data.sprites.front_default,
          detailsUrl: `https://pokeapi.co/api/v2/pokemon/${data.id}/`
        };

        setSearchResult(pokemon);
      } catch (err) {
        console.error("Search failed:", err);
        setSearchResult(null);
      }
    };

    if (searchQuery) {
      searchPokemon();
    }
  }, [searchQuery, searchBy]);

  const handleClick = async (pokemon: Pokemon) => {
    try {
      const response = await fetch(pokemon.detailsUrl);
      const data: {
        stats: StatData[];
        types: TypeData[];
        moves: MoveData[];
        name: string;
        sprites: { front_default: string };
        weight: number;
        height: number;
        id: number;
      } = await response.json();

      const speciesResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${data.id}/`
      );
      const speciesData = await speciesResponse.json();

      const descriptionEntry = (speciesData.flavor_text_entries as FlavorTextEntry[]).find(
        (entry) => entry.language.name === "en"
      );

      const pokemonDetails: PokemonDetails = {
        number: `#${data.id.toString().padStart(3, "0")}`,
        name: data.name,
        image: data.sprites.front_default,
        weight: data.weight,
        height: data.height,
        types: data.types.map((t) => t.type.name),
        moves: data.moves.slice(0, 2).map((m) => m.move.name),
        stats: data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
        description: descriptionEntry
          ? descriptionEntry.flavor_text.replace(/\n|\f/g, " ")
          : ""
      };

      onSelectPokemon(pokemonDetails);
    } catch (err) {
      console.error("Failed to load pokemon details:", err);
    }
  };

  return (
    <ul className="pokemon-list">
      {searchResult ? (
        <li key={searchResult.id} className="pokemon-item">
          <button onClick={() => handleClick(searchResult)}>
            <p className="number">{searchResult.id}</p>
            <div className="pokemoninfo">
              <img src={searchResult.image} alt={searchResult.name} />
              <p className="name">{searchResult.name}</p>
            </div>
          </button>
        </li>
      ) : (
        pokemons.map((pokemon) => (
          <li key={pokemon.id} className="pokemon-item">
            <button onClick={() => handleClick(pokemon)}>
              <p className="number">{pokemon.id}</p>
              <div className="pokemoninfo">
                <img src={pokemon.image} alt={pokemon.name} />
                <p className="name">{pokemon.name}</p>
              </div>
            </button>
          </li>
        ))
      )}
    </ul>
  );
}