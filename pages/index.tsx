import Head from 'next/head'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { FaCarSide, FaMotorcycle, FaTruck } from 'react-icons/fa'

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
  const [vehicle, setVehicle] = useState('')
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

      <div>
        <h1 className="text-3xl font-semibold ml-4 mt-8 mb-4">Quer saber o preço do seu próximo automóvel?</h1>
        <p className="ml-4 mb-8">Selecione o veículo e clique em buscar!</p>

        <div className="flex w-80 justify-between mx-auto mb-8">
          <button onClick={() => selectVehicle('carros')}
          className={`border-2 border-gray-500 rounded-2xl bg-gray-100 px-6 py-4 text-gray-600 shadow-lg
          hover:bg-blue-500 hover:text-gray-50 hover:border-blue-200 active:outline-none focus:outline-none
          ${vehicle === 'carros' ? 'bg-blue-500 text-gray-50 border-blue-200' : ''}`}>
            <FaCarSide />
          </button>
          <button onClick={() => selectVehicle('motos')}
          className={`border-2 border-gray-500 rounded-2xl bg-gray-100 px-6 py-4 text-gray-600 shadow-lg
          hover:bg-blue-500 hover:text-gray-50 hover:border-blue-200 active:outline-none focus:outline-none
          ${vehicle === 'motos' ? 'bg-blue-500 text-gray-50 border-blue-200' : ''}`}>
            <FaMotorcycle />
          </button>
          <button onClick={() => selectVehicle('caminhoes')}
          className={`border-2 border-gray-500 rounded-2xl bg-gray-100 px-6 py-4 text-gray-600 shadow-lg
          hover:bg-blue-500 hover:text-gray-50 hover:border-blue-200 active:outline-none focus:outline-none
          ${vehicle === 'caminhoes' ? 'bg-blue-500 text-gray-50 border-blue-200' : ''}`}>
            <FaTruck />
          </button>
        </div>
      </div>

      <div className={vehicle ? 'flex flex-col items-center' : 'hidden'}>
        <label htmlFor="cars">Selecione a marca:</label>

        <select value={brandCode} onChange={(e) => setBrandCode(e.target.value)}
        className="bg-gray-100 rounded-lg p-2 text-center active:outline-none focus:outline-none w-3/4 mb-2">
          <option></option>
          {brands.map((brand) => {
            return <option value={brand.codigo} key={brand.codigo}>{brand.nome}</option>
          })}
        </select>
      </div>

      <div className={models.length > 0 ? 'flex flex-col items-center' : 'hidden'}>
        <label htmlFor="cars">Selecione o modelo:</label>

        <select value={modelCode} onChange={(e) => setModelCode(e.target.value)}
        className="bg-gray-100 rounded-lg p-2 text-center active:outline-none focus:outline-none w-3/4 mb-2">
          <option></option>
          {models.map((model) => {
            return <option value={model.codigo} key={model.codigo}>{model.nome}</option>
          })}
        </select>
      </div>

      <div className={years.length > 0 ? 'flex flex-col items-center' : 'hidden'}>
        <label htmlFor="cars">Selecione o ano:</label>

        <select value={yearCode} onChange={(e) => setYearCode(e.target.value)}
        className="bg-gray-100 rounded-lg p-2 text-center active:outline-none focus:outline-none w-3/4">
          <option></option>
          {years.map((year) => {
            return <option value={year.codigo} key={year.codigo}>{year.nome}</option>
          })}
        </select>
      </div>

      <div className="flex justify-between w-56 mx-auto mt-8">
        <button onClick={async () => {
          await getPrice()
        }} className="bg-blue-600 text-gray-100 px-6 py-2 font-semibold
        hover:bg-blue-500 duration-200 active:outline-none focus:outline-none">Consultar</button>
        <button onClick={() => {
          reset()
          setVehicle('')
        }} className="bg-blue-600 text-gray-100 px-6 py-2 font-semibold
        hover:bg-blue-500 duration-200 active:outline-none focus:outline-none">Reset</button>
      </div>

      {price
        ? <div>
            <table className=' container lg mt-8 mx-auto max-w-4xl w-2/3 whitespace-nowrap rounded-lg
            bg-white divide-y divide-gray-300 overflow-hidden'>
              <thead className="bg-gray-50">
                <tr className="text-gray-600 text-left">
                  <th className="font-semibold text-sm uppercase px-4 py-4">Marca</th>
                  <th className="font-semibold text-sm uppercase px-4 py-4">Modelo</th>
                  <th className="font-semibold text-sm uppercase px-4 py-4">Ano</th>
                  <th className="font-semibold text-sm uppercase px-4 py-4">Preço</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-4">{price.Marca}</td>
                  <td className="px-4 py-4">{price.Modelo}</td>
                  <td className="px-4 py-4">{price.AnoModelo}</td>
                  <td className="px-4 py-4">{price.Valor}</td>
                </tr>
              </tbody>
            </table>
            <span className="block text-xs ml-auto text-right mr-3 mb-3">Tabela atualizada em {price.MesReferencia}</span>
          </div>
        : <table></table>
      }
      </div>
    </div>
  )
}

export default Home
