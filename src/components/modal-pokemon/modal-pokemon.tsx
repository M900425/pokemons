import './modal-pokemon.scss';
import type { PokemonDetails } from '../../types/pokemon-types';
import { HiArrowLeft } from "react-icons/hi2";

interface ModalP {
    isOpen: boolean;
    pokemon?: PokemonDetails;
    onClose: () => void;
}

const typeColors: { [key: string]: string } = {
    fire: "#F57D31",
    water: "#6493EB",
    grass: "#74CB48",
    electric: "#F9CF30",
    flying: "#A890F0",
    poison: "#A040A0",
    normal: "#AAA67F",
    bug: "#A7B723",
    ground: "#E0C068",
    fairy: "#EE99AC",
    fighting: "#C03028",
    psychic: "#FB5584",
    rock: "#B8A038",
    ice: "#98D8D8",
    ghost: "#70559B",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B7B9D0",
};

export default function ModalPokemon({ isOpen, pokemon, onClose }: ModalP) {
    if (!pokemon) return null;

    return (
        <div 
            className={`modal-pokemon ${isOpen ? 'is-open' : ''}`} 
            style={{ backgroundColor: pokemon.types.length ? typeColors[pokemon.types[0].toLowerCase()] : "#fff" }}
        >
            <div className="modal-content">
                <div className='global-info'>
                    <button className="close-btn" onClick={onClose}>
                        <HiArrowLeft size={21} color='#fff'/>
                    </button>
                    <h2 className="modal-pokemon-name">{pokemon.name}</h2>
                </div>
                <p className='number'>{pokemon.number}</p>
                <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
                <div className='data'>
                    <ul className='types'>
                    {pokemon.types.map((type) => (
                        <li 
                            key={type} 
                            style={{ 
                                backgroundColor: typeColors[type.toLowerCase()] || "#777", 
                                color: "#fff",
                            }}
                        >
                            {type}
                        </li>
                        ))}
                    </ul>
                    <h3 style={{ color: pokemon.types.length ? typeColors[pokemon.types[0].toLowerCase()] : "#fff" }}>About</h3>
                    <ul className='details'>
                        <li>
                            <p>{pokemon.weight} kg</p>
                            <h4>Weight</h4>
                        </li>
                        <li>
                            <p>{pokemon.height} m</p>
                            <h4>Height</h4>
                        </li>
                        <li>
                            <ul>
                                {pokemon.moves.map((move) => (
                                <li key={move}>{move}</li>
                                ))}
                            </ul>
                            <h4>Moves</h4>
                        </li>
                    </ul>
                    <p className='descripton'>{pokemon.description}</p>
                    <h3 className='stats' style={{ color: pokemon.types.length ? typeColors[pokemon.types[0].toLowerCase()] : "#fff" }}>Base Stats</h3>
                    <ul className='stats-data'>
                        {pokemon.stats.map((stat) => (
                            <li>
                                <div className='data-values'>
                                    <h5 key={stat.name} style={{ color: pokemon.types.length ? typeColors[pokemon.types[0].toLowerCase()] : "#fff" }}>{stat.name}</h5>
                                    <p key={stat.value}>{stat.value.toString().padStart(3, "0")}</p>
                                </div>
                                <div className='data-progressbar' style={{
                                    backgroundColor: pokemon.types.length
                                    ? `${typeColors[pokemon.types[0].toLowerCase()]}B3`
                                    : "rgba(255,255,255,0.3)",}}>
                                    <div style={{
                                        width: `${(stat.value / 150) * 100}%`,
                                        height: "100%",
                                        backgroundColor: pokemon.types.length ? typeColors[pokemon.types[0].toLowerCase()] : "#777"}}>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}