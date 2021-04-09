import Head from 'next/head'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const uri = 'https://parallelum.com.br/fipe/api/v1/'
  const [vehicles, setVehicle] = useState('')
  const selectVehicle = (vehicle): void => {
    setVehicle(vehicle)
  }

  return (
    <div>
      <Head>
        <title>Tabela FIPE | Consulta de preços de veículos</title>
      </Head>
      <h1>Tabela FIPE</h1>
    <button onClick={() => selectVehicle('carros')}>Carro</button>
    <button onClick={() => selectVehicle('motos')}>Moto</button>
    <button onClick={() => selectVehicle('caminhoes')}>Caminhão</button>
    </div>
  )
}

export default Home
