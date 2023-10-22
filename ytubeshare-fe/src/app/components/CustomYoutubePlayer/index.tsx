import React from 'react';
import YouTube from 'react-youtube';

function VideoPlayer({videoId}) {
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
    },
  };

  const onReady = (event) => {
    // event.target.playVideo();
  };

  return (
    <YouTube videoId={videoId} opts={opts} onReady={onReady} />
  );
}

export default VideoPlayer;