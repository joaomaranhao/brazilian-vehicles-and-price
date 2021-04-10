import Head from 'next/head'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const uri = 'https://parallelum.com.br/fipe/api/v1/'
  const [vehicle, setVehicle] = useState(false)
  const [brands, setBrands] = useState([])
  const selectVehicle = (vehicle): void => {
    setVehicle(vehicle)
  }

  const getBrands = async (): Promise<void> => {
    const response = await fetch(`${uri + vehicle}/marcas`)
    const data = await response.json()
    return setBrands([...data])
  }

  useEffect(() => {
    if (vehicle) {
      getBrands()
      console.log(brands)
    }
  }, [vehicle])

  return (
    <div>
      <Head>
        <title>Tabela FIPE | Consulta de preços de veículos</title>
      </Head>
      <h1>Tabela FIPE</h1>

      <div>
        <button onClick={() => selectVehicle('carros')}>Carro</button>
        <button onClick={() => selectVehicle('motos')}>Moto</button>
        <button onClick={() => selectVehicle('caminhoes')}>Caminhão</button>
      </div>

      <div className={vehicle ? 'block' : 'hidden'}>
        <label htmlFor="cars">Selecione a marca:</label>

        <select name="cars" id="cars">
          <option>Marca</option>
          {brands.map((brand) => {
            return <option value={brand.nome} key={brand.codigo}>{brand.nome}</option>
          })}
        </select>
      </div>
    </div>
  )
}

export default Home
