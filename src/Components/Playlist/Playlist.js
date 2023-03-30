
import React, {  useEffect, useState } from "react";
import axios from 'axios'
import './Playlist.css'

const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const Playlist = () => {
  

    const [token, setToken] = useState("");
    const [data, setData] = useState({});
  
    useEffect(() => {
      if (localStorage.getItem("accessToken")) {
        setToken(localStorage.getItem("accessToken"));
      }
    }, []);
  
    const handleGetPlaylists = () => {
      axios
        .get(PLAYLISTS_ENDPOINT, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
        
    };
  
    return (
      <div className="playlist-container">
        <button className="playlist" onClick={handleGetPlaylists}>Get Playlists</button>
        <br></br>
         <h3>Playlists</h3> 
         <ul className="list">{data?.items ? data.items.map((item) => <li >{item.name}</li>) : null}</ul>
      </div>
    );
  
}
export default Playlist