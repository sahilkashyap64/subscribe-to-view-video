import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import 'videojs-overlay/dist/videojs-overlay.css';
import overlay from 'videojs-overlay';

const options = {
  fill: true,
  fluid: true,
  responsive: true,
  preload: 'auto',
  controls: true,
};
   // html for the registration form
  

export const VideoPlayer2 = ({ src = '', type = 'application/x-mpegURL' ,registered,subscribed}) => {
  var shouldplay=registered && subscribed;
  var overlayContent="";
  if(!registered){ 
    overlayContent='<div id="regForm" class="registration-form"><h1 class="registration-form">To view the video, please signup.</h1></div>';
  } else{
    if(!subscribed){ 
      overlayContent='<div id="regForm" class="registration-form"><h1 class="registration-form">To view the video, please subscribe.</h1></div>';
    }
  }
  
      
  // console.log("videojssubscrided",subscribed);
  // console.log("shouldplay",shouldplay);
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);
  videojs.registerPlugin('overlay', overlay);
  useEffect(() => {
    const vjsPlayer = videojs(videoRef.current, options);
    setPlayer(vjsPlayer);

    return () => vjsPlayer.dispose();
  }, []);

  useEffect(() => {
    if (player !== null) {
      player.src({ src, type });
      
      if(!shouldplay){
        player.controls(true);
        player.overlay({
          content: overlayContent,
          overlays: [
            {
              align: "top",
              content: overlayContent,
              start: 3
            }
          ]
        });
      }
      
    }
  }, [src, type, player]);


  useEffect(() => {

    const vjsPlayer = videojs(videoRef.current, options);
    
    // Events:
    vjsPlayer.on('seeking', function() {
      console.log('seeking');
    });



  }, []);

  useEffect(() => {

    const vjsPlayer = videojs(videoRef.current, options);
    if(!shouldplay){vjsPlayer.on('timeupdate', function() {
      // use my player.currentTime() to get the current position
   // you can't be sure the event will fire at 5 seconds, so check for
   // when the currentTime exceeds 3
   if (vjsPlayer.currentTime() > 3) {
     console.log("3 secs up");
     vjsPlayer.pause();
     
     // hide the player controls
     vjsPlayer.controls(false);
   }
   });}
    



  }, [src]);
  


  

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video ref={videoRef} className="video-js">
        <p className="vjs-no-js">
          To view this video please enable JavaScript, and consider upgrading to
          a web browser that
          <a href="https://videojs.com/html5-video-support/">
            supports HTML5 video
          </a>
        </p>
      </video>
    </div>
  );
};

VideoPlayer2.propTypes = {
  src: PropTypes.string.isRequired,
  type: PropTypes.string,
  registered: PropTypes.bool,
  subscribed: PropTypes.bool,
};

VideoPlayer2.defaultProps = {
  
  type: 'application/x-mpegURL',
  registered: false,
  subscribed: false,
};


export default VideoPlayer2;