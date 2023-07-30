import React, { useEffect, useState } from 'react'

export default function App() {
  const [data, setData] = useState(null);
  const [nbr, setNbr] = useState(null);

  /*useEffect(() => {
    fetch("http://localhost:9000/api/psplusgames")
    .then((res) => res.json())
    .then(data => console.log(data));
  }, [])*/

  const testa = () => {
    fetch("http://localhost:9000/api/psplusgames")
      .then((res) => res.json())
      .then(response => {
        setData(response);
        console.log(data)
      })
  }

  const testa2 = () => {
    const randomNbr = getRandomNumber(0, data.length);
    fetch(`http://localhost:9000/api/platprices?name=${data[randomNbr]}`)
      .then(res => res.json())
      .then(ans => {
        console.log(ans)
      })
  }

  const testa3 = () => {
    console.log(data)
  }

  const getRandomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <div>
      App
      <button onClick={() => testa()}>fetch scraper</button>
      <button onClick={() => testa2()}>get platprices value</button>
      <button onClick={() => testa3()}>get fetched value</button>
    </div>
  )
}

