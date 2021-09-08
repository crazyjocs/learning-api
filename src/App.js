import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'


function App() {

  const api_key = "aa1fJ6CZt7LgUGbp77B56cNW61378cdd"

  const [videos, setVideos] = useState({})

  useEffect(() => {

    async function fetchData() {
      const resp = await axios.get('https://muse.ai/api/files/videos', {
        headers: {
          'Key': `${api_key}`
        }
      }).catch(err => err)
      resp.data.forEach((element, index) => {
        const tempData = [  element.filename,  element.url]
        setVideos(oldArray => [...oldArray, tempData])
      });
        console.log(videos);
      //setVideos(oldArray => [...oldArray, newVideo]);
    }

    fetchData()
  }, []);

  const listVideoDetails = videos.map((video) =>
    <li>{video}</li>
  );

  return (
    <div className="App">
      <ul>{listVideoDetails}</ul>
      {/* <video
        id="video"
        src={videos}
        controlsList="nodownload"
        playsInline={true}
        autoPlay={true}
      ></video> */}
    </div>
  );
}

export default App;
