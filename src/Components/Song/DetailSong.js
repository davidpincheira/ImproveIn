import React, {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import axios from 'axios'
import '../../App.css';

function DetailSong() {
  const { id } = useParams()
  const [bands, setBands] = useState([])
  const [albums, setAlbumns] = useState([]) 

  const fechtData = () => {
    const songBand = axios.get(`https://my-json-server.typicode.com/improvein/dev-challenge/bands/${id}`)
    const albumBand = axios.get(`https://my-json-server.typicode.com/improvein/dev-challenge/albums?bandId=${id}`)
    
    axios.all([songBand, albumBand]).then(
      axios.spread((...allData)=> {
        const allDataBand = allData[0].data
        const allDataAlbum = allData[1].data
        console.log(allDataBand)
        setBands(allDataBand)
        setAlbumns(allDataAlbum)
      })
    )
  }

  useEffect(() => {
    fechtData()
  }, [])

  return (
    <div>
      <h3>Name: {bands.name}</h3>
      <h4>Genre: {bands.genreCode}</h4>
      <h4>Year: {bands.year}</h4>
      {
        bands.members ? bands.members.length : null
      }
      <h4>Albums:</h4>
      {        
        albums.map(item => 
          <p>{item.name} ({item.year})</p>
        )
      }
      
    </div>
  )
}

export default DetailSong;