import React, { useState, useEffect } from 'react'
import patternMobile from '../assets/images/pattern-divider-mobile.svg'
import patternDesktop from '../assets/images/pattern-divider-desktop.svg'
import dice from '../assets/images/icon-dice.svg'
import '../API/API.css'
function API() {

  const Base_Url = '	https://api.adviceslip.com/advice'

  const [apiData, setApiData] = useState({
    id: null,
    advice: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error,setError] = useState()

  const fetchAdvice = async () => {
    setIsLoading(true)

    try{
      const response = await fetch(`${Base_Url}`)
      const advice = await response.json()
      setApiData({ id: advice.slip.id, advice: advice.slip.advice })
    }catch (error) {
        setError(error)
    }
    finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAdvice();
  }, [])

  const Generate = () => {
    fetchAdvice();
  }

  return (
    <div className='advice_container'>
      {
        isLoading ?
          <div className='loading'>Loading...</div>
          :
          <>
            <span>Advice #{apiData.id}</span>

            <p>{apiData.advice}</p>

            <img src={patternMobile} alt="" />

            <div className='img_container'>
              <img src={dice} alt="" onClick={Generate} />
            </div>
          </>
      }

    </div>
  )
}

export default API
