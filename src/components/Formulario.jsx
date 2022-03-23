import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import Error from './Error'


const InputSubmit = styled.input`
  background-color: #9497FF;
  border: none;
  width: 100%;
  padding: 10px;
  color: #FFF;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color .3s ease;
  margin-top: 30px;
  &:hover {
    background-color: #7A7DFE;
    cursor: pointer;
  }
`

const Formulario = ({ setMonedas }) => {
  // hooks
  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)
  const [moneda, SelectMonedas] = useSelectMonedas('Elige tu Moneda', monedas);
  const [criptomoneda, SelectCriptomonedas] = useSelectMonedas('Elige tu Criptomoneda', criptos);

  // methods
  const handleSubmit = (e) => { 
    e.preventDefault()
    if ([moneda, criptomoneda].includes('')) {
      setError(true)
      return
    }
    setError(false)
    setMonedas({
      moneda,
      criptomoneda,
    })

  }

  useEffect(() => {
    const consultarApi = async () => { 
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
      const repuesta = await fetch(url)
      const resultado = await repuesta.json()
      const arrayCriptos = resultado.Data.map( crypto => {
        return {
          id: crypto.CoinInfo.Name,
          nombre: crypto.CoinInfo.FullName
        }
      })
      setCriptos(arrayCriptos)
    }
    consultarApi()
  }, [])

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form 
        onSubmit={handleSubmit}
      >
        <SelectMonedas />
        <SelectCriptomonedas />
        <InputSubmit 
          type="submit"
          value='Cotizar'
        />
      </form>
    </>
  )
}

export default Formulario