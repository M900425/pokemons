export interface PokemonDetails {
    number: string;
    name: string;
    image: string;
    types: string[];
    weight: number;
    height: number;
    moves: string[];
    stats: { name: string; value: number }[];
    description: string;
}