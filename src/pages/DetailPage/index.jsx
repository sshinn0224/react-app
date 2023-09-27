import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const DetailPage = () => {
  const params = useParams()
  const pokemonId = params.id
  console.log(params)

  useEffect(() => {
    fetchPokemonData()
  }, [])

  async function fetchPokemonData() {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`

    try {
      const { data } = await axios.get(url)
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  return <div>DetailPage</div>
}

export default DetailPage
