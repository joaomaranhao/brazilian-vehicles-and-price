import Head from 'next/head'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

interface Car {
  Valor: string
  Marca: string
  Modelo: string
  AnoModelo: number
  Combustivel: string
  CodigoFipe: string
  MesReferencia: string
  TipoVeiculo: number
  SiglaCombustivel: string
}

const Home: NextPage = () => {
  const url = 'https://parallelum.com.br/fipe/api/v1/'
  const [vehicle, setVehicle] = useState(false)
  const [brands, setBrands] = useState([])
  const selectVehicle = (vehicle): void => {
    setVehicle(vehicle)
  }
  const [brandCode, setBrandCode] = useState('')
  const [models, setModels] = useState([])
  const [modelCode, setModelCode] = useState('')
  const [years, setYears] = useState([])
  const [yearCode, setYearCode] = useState('')
  const [price, setPrice] = useState<Car>()

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
    reset()
    if (vehicle) {
      getBrands()
    }
  }, [vehicle])

  const getModels = async (): Promise<any> => {
    const models = await http(`${url + vehicle}/marcas/${brandCode}/modelos`)
    return setModels([...models.modelos])
  }

  useEffect(() => {
    setModelCode('')
    setYears([])
    if (brandCode) {
      getModels()
    }
  }, [brandCode])

  const getYears = async (): Promise<any> => {
    const years = await http(`${url + vehicle}/marcas/${brandCode}/modelos/${modelCode}/anos`)
    return setYears([...years])
  }

  useEffect(() => {
    setYearCode('')
    if (modelCode) {
      getYears()
    }
  }, [modelCode])

  const getPrice = async (): Promise<any> => {
    if (vehicle && brandCode && modelCode && yearCode) {
      try {
        const price = await http(`${url + vehicle}/marcas/${brandCode}/modelos/${modelCode}/anos/${yearCode}`)
        return setPrice({ ...price })
      } catch (err) {
        return new Error(err)
      }
    }
  }

  const reset = (): void => {
    setBrands([])
    setBrandCode('')
    setModels([])
    setModelCode('')
    setYears([])
    setYearCode('')
    setPrice(undefined)
  }

  return (
    <div>
      <Head>
        <title>Tabela FIPE | Consulta de preços de veículos</title>

      </Head>
      <div className="container lg">
        <Navbar />

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

      <div className={years.length > 0 ? 'block' : 'hidden'}>
        <label htmlFor="cars">Selecione o ano:</label>

        <select value={yearCode} onChange={(e) => setYearCode(e.target.value)}>
          <option></option>
          {years.map((year) => {
            return <option value={year.codigo} key={year.codigo}>{year.nome}</option>
          })}
        </select>
      </div>

      <button onClick={async () => {
        await getPrice()
      }}>Consultar</button>
      <button onClick={() => {
        reset()
        setVehicle(false)
      }}>Reset</button>

      {price
        ? <div><table>
      <tr>
        <th>Marca</th>
        <th>Modelo</th>
        <th>Ano</th>
        <th>Preço</th>
      </tr>
      <tr>
        <td>{price.Marca}</td>
        <td>{price.Modelo}</td>
        <td>{price.AnoModelo}</td>
        <td>{price.Valor}</td>
      </tr>
      </table>
      <span>Tabela atualizada em {price.MesReferencia}</span></div>
        : <table></table>
      }
      </div>
    </div>
  )
}

export default Home
