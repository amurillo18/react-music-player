
import './App.css';
import Player from './Components/Player/Player.js'
import { Route, Routes, BrowserRouter as Router, Link } from "react-router-dom"
import Profile from './Components/Profile/Profile.js'
import Playlist from './Components/Playlist/Playlist.js'
import { useEffect} from 'react'


function App() {

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
  const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000";
  const SPACE_DELIMITER = "%20";
  const SCOPES = [
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-read-private",
    "streaming",
    "user-read-email",
    "user-read-private"
    ];
  const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};

    // const [accessToken, setToken] = useState("")
// check URL for the hash and extract the token and storethe state in the local storage
    useEffect(() => {
      if (window.location.hash) {
        const { access_token, expires_in, token_type } =
          getReturnedParamsFromSpotifyAuth(window.location.hash);
  
        localStorage.clear();
  
        localStorage.setItem("accessToken", access_token);
        localStorage.setItem("tokenType", token_type);
        localStorage.setItem("expiresIn", expires_in);
      }
    });
  
    const handleLogin = () => {
      window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    };
// removes token from local storage
    const logout = () => {
        
        window.localStorage.removeItem("accessToken")
    }

  return (
    <Router> 
      <nav className='header'>
        <Link to="/">Home</Link>
        <Link to="/playlist">Playlist</Link>
        <Link to="/profile">Profile</Link>
       </nav>
       <h1>React Music </h1>
       {!localStorage.getItem("accessToken") ?
                    <button onClick={handleLogin}>Login to Spotify</button>
                    : <button onClick={logout}>Logout</button>}
        
      <Routes>
        <Route  path="/" element={<Player  token={localStorage.getItem("accessToken")}/>}/>
        <Route  path="/playlist" element={<Playlist/>}/>
        <Route  path="/profile" element={<Profile token={localStorage.getItem("accessToken")}/>}/>
       </Routes>
    <div className='footer'>
      This music player was built by April Murillo
    </div>
      
     </Router>
  );
}

export default App;
