import { ChangeEvent, useState } from 'react'
import Loading from '../components/Loading'
import { usePokemon } from '../hooks/usePokemon'
import { Pokemon } from '../interfaces/fetchAllPokemonResponse'
import { filterPokemon } from '../helpers/filterPokemon'

const HomePage = () => {
	const { isLoading, pokemons } = usePokemon()
	const [currentPage, setCurrentPage] = useState(0)
	const [search, setSearch] = useState('')

	const filteredPokemos = (): Pokemon[] => {
		if (search.length === 0) return pokemons.slice(currentPage, currentPage + 5)

		// si hay algo en la caja de texto
		const filtered = filterPokemon(pokemons, search)

		return filtered.slice(currentPage, currentPage + 5)
	}

	const nextPage = () => {
		if (filterPokemon(pokemons, search).length > currentPage + 5)
			setCurrentPage(currentPage + 5)
	}
	const prevPage = () => {
		if (currentPage > 0) setCurrentPage(currentPage - 5)
	}

	const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		setCurrentPage(0)
		setSearch(target.value)
	}

	return (
		<section className='py-4'>
			<h1 className='text-success mb-3'>Listado de Pokémons</h1>

			<div className='row mb-2'>
				<div className='col-12'>
					<input
						autoComplete='off'
						type='text'
						name='search'
						className='form-control border text-light'
						placeholder='Buscar pokémon'
						value={search}
						onChange={handleInputChange}
					/>
				</div>
			</div>

			<div className='row mb-4'>
				<div className='btn-group'>
					<button
						className='btn btn-primary'
						disabled={currentPage === 0}
						onClick={prevPage}
					>
						Anterior
					</button>
					<button
						className='btn btn-primary'
						disabled={filterPokemon(pokemons, search).length <= currentPage + 5}
						onClick={nextPage}
					>
						Siguiente
					</button>
				</div>
			</div>

			<div className='row'>
				<div className='table-responsive'>
					<table className='table'>
						<thead>
							<tr>
								<td style={{ width: 80 }}>ID</td>
								<td style={{ width: 150 }}>Nombre</td>
								<td>Imágen</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td colSpan={3}>{isLoading && <Loading />}</td>
							</tr>
							{filteredPokemos().map(({ id, name, pic }) => (
								<tr key={id}>
									<td>{id}</td>
									<td>{name}</td>
									<td>
										<img src={pic} alt={name} style={{ height: 75 }} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	)
}

export default HomePage
