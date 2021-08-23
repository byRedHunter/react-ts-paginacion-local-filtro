import { Pokemon } from '../interfaces/fetchAllPokemonResponse'

export const filterPokemon = (
	listPokemon: Pokemon[],
	search: string
): Pokemon[] => {
	return listPokemon.filter((poke) =>
		poke.name.toLowerCase().includes(search.toLowerCase())
	)
}
