
import React, { useState, useEffect } from 'react';
import './Player.css';
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // icons for next and previous track
import { IconContext } from "react-icons"; // for customizing the icons
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
//import axios from 'axios';



const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

// const PLAY_ENDPOINT = "https://api.spotify.com/v1/me/player/play";
// const PAUSE_ENDPOINT = "https://api.spotify.com/v1/me/player/pause";
// const PREVIOUS_ENDPOINT = "https://api.spotify.com/v1/me/player/previous";
// const NEXT_ENDPOINT = "https://api.spotify.com/v1/me/player/next";




function Player(props) {

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);
  
    useEffect(() => {
        
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(props.token); },
                volume: 0.5
            });

            setPlayer(player);
            

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
                
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', ( state => {
                
                if (!state) {
                    return;
                }
                

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                
                
                player.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                });

            }));

            player.connect();
        
            


        };
        // eslint-disable-next-line
    }, []);

    // const handlePlay = () => {
    //     axios
    //       .put(PLAY_ENDPOINT, {
    //         headers: {
    //           Authorization: "Bearer " + token,
    //         },
    //       })
    //     //   .then((response) => {
    //     //     setProfile(response.data);
    //     //   })
    //     //   .catch((error) => {
    //     //     console.log(error);
    //     //   });

    //   };

    //   const handlePause = () => {
    //     axios
    //       .put(PAUSE_ENDPOINT, {
    //         headers: {
    //           Authorization: "Bearer " + token,
    //         },
    //       })
    //     //   .then((response) => {
    //     //     setProfile(response.data);
    //     //   })
    //     //   .catch((error) => {
    //     //     console.log(error);
    //     //   });

    //   };

    //   const handleNext = () => {
    //     axios
    //       .put(NEXT_ENDPOINT, {
    //         headers: {
    //           Authorization: "Bearer " + token,
    //         },
    //       })
    //     //   .then((response) => {
    //     //     setProfile(response.data);
    //     //   })
    //     //   .catch((error) => {
    //     //     console.log(error);
    //     //   });

    //   };
      

    
 

    

    if (!is_active) { 
        return (
            <>
                <div className="container">
                    <div className="main-wrapper">
                        <b> Instance not active. Transfer your playback using your Spotify app </b>
                    </div>
                </div>
            </>)
    } else {
        return (
            <>
                <div className="player-container">
                    <h2>Playing Now</h2>
                        <img src={current_track.album.images[0].url} className="music-cover" alt=""  />

                            <div className="title">{current_track.name}</div>
                            <div className="artist">{current_track.artists[0].name}</div>

                            <button className="audio-controls"  >
                                <IconContext.Provider value={{size: "3em", color: "#27AE60" }} >
                                    <BiSkipPrevious onClick={() => { player.previousTrack() }}/>
                                </IconContext.Provider>
                            </button>

                            <button type='button' className="audio-controls"    >
                                { is_paused ? 
                                <IconContext.Provider value={{size: "3em", color: "#27AE60" }} >
                                    <AiFillPlayCircle type='button' onClick={() => { player.togglePlay()}}/>
                                </IconContext.Provider>
                                :
                                 <IconContext.Provider value={{size: "3em", color: "#27AE60" }} >
                                    <AiFillPauseCircle onClick={() => { player.togglePlay()}}/>
                                 </IconContext.Provider> }
                            </button>

                            <button className="audio-controls"  >
                                <IconContext.Provider value={{size: "3em", color: "#27AE60" }} >
                                    <BiSkipNext onClick={() => { player.nextTrack() }}/>
                                </IconContext.Provider>
                            </button>
                        </div>
            </>
        );
    }
}


export default Player