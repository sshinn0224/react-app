import { useEffect, useState } from 'react'
import axios from 'axios'
import PokeCard from '../../components/PokeCard'
import AutoComplete from '../../components/AutoComplete'

function MainPage() {
  // const [pokemons, setPokemons] = useState([])
  // const [offset, setOffset] = useState(0)
  // const [limit, setLimit] = useState(20)

  const [allPokemons, setAllPokemons] = useState([])
  const [displayedPokemons, setDisplayedPokemons] = useState([])

  const limitNum = 20
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`

  // const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    fetchPokeData()
  }, [])

  // useEffect(() => {
  //   handleSearchInput(debouncedSearchTerm)
  // }, [debouncedSearchTerm])

  const filterDisplayedPokemonData = (allPokemons, displayedPokemons = []) => {
    const limit = displayedPokemons.length + limitNum

    const array = allPokemons.filter((pokemon, index) => index + 1 <= limit)
    return array
  }

  const fetchPokeData = async () => {
    try {
      const response = await axios.get(url)
      setAllPokemons(response.data.results)
      // 실제 화면에 보여줄 리스트
      setDisplayedPokemons(filterDisplayedPokemonData(response.data.results))
    } catch (e) {
      console.log(e)
    }
  }

  // const handleSearchInput = async (searchTerm) => {
  //   if (searchTerm.length > 0) {
  //     try {
  //       const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
  //       const pokemonData = { url: `https://pokeapi.co/api/v2/pokemon/${response.data.id}`, name: searchTerm }
  //       console.log(pokemonData)
  //       setPokemons([pokemonData])
  //     } catch (error) {
  //       setPokemons([])
  //       console.log(error)
  //     }
  //   } else {
  //     fetchPokeData(true)
  //   }
  // }

  return (
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50">
        <AutoComplete
          allPokemons={allPokemons}
          setDisplayedPokemons={setDisplayedPokemons}
        />
      </header>
      <section className="flex flex-col justify-content overflow-auto items-center z-0">
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-content px-2 max-w4xl">
          {displayedPokemons.length > 0 ? (
            displayedPokemons.map(({ url, name }) => (
              <PokeCard
                key={url}
                url={url}
                name={name}
              />
            ))
          ) : (
            <h2 className="font-medium text-lg text-slate-900 mb-1">포케몬이 없습니다.</h2>
          )}
        </div>
      </section>
      <div className="text-center">
        {allPokemons.length > displayedPokemons.length && displayedPokemons.length !== 1 && (
          <button
            onClick={() => setDisplayedPokemons(filterDisplayedPokemonData(allPokemons, displayedPokemons))}
            className="bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white"
          >
            더 보기
          </button>
        )}
      </div>
    </article>
  )
}

export default MainPage
