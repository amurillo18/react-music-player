import React, {  useEffect, useState } from "react";
import axios from 'axios'
import './Profile.css'

const PROFILE_ENDPOINT = "https://api.spotify.com/v1/me/";
const TOP_ARTIST_ENDPOINT = "https://api.spotify.com/v1/me/top/artists ";

function Profile(props){
  
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState(null);
  const [topArtists, setTopArtists] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);
  
  const getTopArtists = () => {
    axios
      .get(TOP_ARTIST_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setTopArtists(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  

  const handleGetProfile = () => {
    axios
      .get(PROFILE_ENDPOINT, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      getTopArtists();
  };

  return (
    <>
    <button className="profile" onClick={handleGetProfile}>Get Profile</button>
    {profile && (
      <>
        
              <h1 className="header__name">{profile.display_name}</h1>
              <div className="header__inner">
            {profile.images.length && profile.images[0].url && (
              <img className="header__img" src={profile.images[0].url} alt="Avatar"/>
            )}
            <div>
              <p className="header__follower">
                <span>
                  {profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}
                </span>
              </p>
            </div>

            {topArtists && topArtists.length ? (
              <div>
        {topArtists.map((topArtists, i) => (
          <li className="grid__item" key={i}>
            <div className="grid__item__inner">
              {topArtists.images[0] && (
                <div className="grid__item__img">
                  <img src={topArtists.images[0].url} alt={topArtists.name} />
                </div>
              )}
              <h3 className="grid__item__name overflow-ellipsis">{topArtists.name}</h3>
              <p className="grid__item__label">Artist</p>
            </div>
          </li>
        ))}
        </div>
    ) : (
      <p className="empty-notice">No artists available</p>
    )}
          </div>
        
      </>
    )}
  </>
  );

}


export default Profile