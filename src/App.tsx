import { useState } from "react";
import './App.scss';
import Modal from './modal-window/modal';
import PokemonsLst from "./pokemons-lst/pokemons-lst";
import ModalPokemon from "./modal-pokemon/modal-pokemon";
import type { PokemonDetails } from "./pokemon-types"; // <- окремий файл для типу

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchBy, setSearchBy] = useState<"number" | "name">("number");
    const [page, setPage] = useState(1);
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | undefined>(undefined);
    const pokemonsPerPage = 12;

    const openModal = () => setIsModalOpen(true);

    return (
        <div className='whole-program'>
            <div className='container'>
                <header>
                    <div>
                        <svg width="24" height="24">
                            <use xlinkHref="/sprite.svg#icon-pokeball"></use>
                        </svg>
                        <h1 className='title'>Pokédex</h1>
                    </div>
                    <div>
                        <form className='header-form'>
                            <svg width="16" height="16">
                                <use xlinkHref="/sprite.svg#icon-search"></use>
                            </svg>
                            <input 
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => {
                                    let value = e.target.value;
                                    if (searchBy === "number") {
                                        value = value.replace(/[^0-9#]/g, '');
                                    } else if (searchBy === "name") {
                                        value = value.replace(/[^a-zA-Z]/g, '');
                                    }
                                    setSearchQuery(value);
                                }}
                            />
                        </form>
                        <button className='open-modal' type='button' onClick={openModal}>
                            <svg width="16" height="16">
                                <use xlinkHref="/sprite.svg#icon-tag"></use>
                            </svg>
                        </button>
                    </div>
                </header>

                <div className='pokemon-found'>
                    <PokemonsLst 
                        searchQuery={searchQuery} 
                        searchBy={searchBy} 
                        page={page} 
                        pokemonsPerPage={pokemonsPerPage}
                        onSelectPokemon={(pokemon) => setSelectedPokemon(pokemon)}
                    />

                    <div className="buttons">
                        <button className="back" onClick={() => setPage(prev => Math.max(prev - 1, 1))}>
                            Back
                        </button>
                        <button className="next" onClick={() => setPage(prev => prev + 1)}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
            <Modal 
                isOpen={isModalOpen} 
                searchBy={searchBy} 
                setSearchBy={setSearchBy} 
            />
            <ModalPokemon 
                isOpen={!!selectedPokemon} 
                pokemon={selectedPokemon} 
                onClose={() => setSelectedPokemon(undefined)}
            />
        </div>
        
    );
}

export default App;