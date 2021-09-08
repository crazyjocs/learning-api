import React, { useState, useEffect } from 'react';
import './App.css';
import useScript from './hooks/useScript';
//import axios from 'axios';

const api_key = "aa1fJ6CZt7LgUGbp77B56cNW61378cdd";
const api_url ="https://muse.ai/api/files/videos";

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useScript('https://muse.ai/static/js/embed-player.min.js');

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
          setIsLoaded(true);
          console.log(result);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )

  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>

        {items && !!items.length && items.map(item => (
          <li key={item.svid}>
            <h2>Title: <span>{item.title}</span></h2>
            <div className="videoElement">
              <div className="muse-video-player"
                data-video={item.svid}
                data-links="0"
                data-logo="0"
                data-sizing="fill"
                data-style="minimal">
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default App;
