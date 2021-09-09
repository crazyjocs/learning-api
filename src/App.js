import React, { useState, useEffect } from 'react'
import './App.css'
//import useScript from './hooks/useScript'
import ReactPlayer from 'react-player'
//import axios from 'axios';

const api_key = "aa1fJ6CZt7LgUGbp77B56cNW61378cdd"
const api_url ="https://muse.ai/api/files/videos"

function App() {

  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://muse.ai/api/files/videos", {
      headers : {
        'Key' : `${api_key}`
      }
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          console.log(result)
          setItems(result)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )

  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <ul>
        {items && !!items.length && items.map(item => (
          <li key={item.svid}>
            <h2>Title: <span>{item.title}</span></h2>
            <div className='player-wrapper'>
              <ReactPlayer
                className='react-player'
                url={item.url}
                width='100%'
                height='100%'
                controls='true'
              />
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default App;
