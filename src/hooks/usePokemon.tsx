import { useEffect } from 'react'
import { useState } from 'react'
import { fetchAllPokemos } from '../helpers/fetchApi'
import { Pokemon } from '../interfaces/fetchAllPokemonResponse'

export const usePokemon = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [pokemons, setPokemons] = useState<Pokemon[]>([])

	useEffect(() => {
		fetchAllPokemos().then((pokemons) => {
			setIsLoading(false)
			setPokemons(pokemons)
		})
	}, [])

	return { isLoading, pokemons }
}
