import Head from 'next/head'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'

const Home: NextPage = () => {
  const url = 'https://parallelum.com.br/fipe/api/v1/'
  const [vehicle, setVehicle] = useState(false)
  const [brands, setBrands] = useState([])
  const selectVehicle = (vehicle): void => {
    setVehicle(vehicle)
  }
  const [brandCode, setBrandCode] = useState(undefined)
  const [models, setModels] = useState([])
  const [modelCode, setModelCode] = useState(undefined)

  const http = async (request: RequestInfo): Promise<any> => {
    const response = await fetch(request)
    const body = await response.json()
    return body
  }

  const getBrands = async (): Promise<any> => {
    const brands = await http(`${url + vehicle}/marcas`)
    return setBrands([...brands])
  }

  useEffect(() => {
    if (vehicle) {
      getBrands()
    }
  }, [vehicle])

  const getModels = async (): Promise<any> => {
    const models = await http(`${url + vehicle}/marcas/${brandCode}/modelos`)
    return setModels([...models.modelos])
  }

  useEffect(() => {
    if (brandCode) {
      getModels()
    }
  }, [brandCode])

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

        <select value={brandCode} onChange={(e) => setBrandCode(e.target.value)}>
          <option></option>
          {brands.map((brand) => {
            return <option value={brand.codigo} key={brand.codigo}>{brand.nome}</option>
          })}
        </select>
      </div>

      <div className={models.length > 0 ? 'block' : 'hidden'}>
        <label htmlFor="cars">Selecione o modelo:</label>

        <select value={modelCode} onChange={(e) => setModelCode(e.target.value)}>
          <option></option>
          {models.map((model) => {
            return <option value={model.codigo} key={model.codigo}>{model.nome}</option>
          })}
        </select>
      </div>

    </div>
  )
}

export default Home
