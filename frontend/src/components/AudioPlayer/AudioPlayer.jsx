import React, { useEffect, useRef, useState } from "react";
import { IoPlaySkipBack } from "react-icons/io5";
import { IoPlaySkipForward } from "react-icons/io5";
import { FaPauseCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../store/player";
import { FaPlay } from "react-icons/fa6";

const AudioPlayer = () => {
  const [isSongPlaying, setisSongPlaying] = useState(false);
  const [Duration, setDuration] = useState(0);
  const [CurrentTime, setCurrentTime] = useState();
  const dispatch = useDispatch();
  const PlayerDivState = useSelector((state) => state.player.isPlayerDiv);
  const songPath = useSelector((state) => state.player.songPath);
  const img = useSelector((state) => state.player.img);

  const audioRef = useRef();
  const duration = audioRef.current.duration;
  const formatTime = (time) => {
    const minute = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minute}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const closeAudioPlayerDiv = (e) => {
    e.preventDefault();
    dispatch(playerActions.closeDiv());
    dispatch(playerActions.changeImage(""));
    dispatch(playerActions.changeSong(""));
  };

  const handlePlayPodcast = (e) => {
    setisSongPlaying(!isSongPlaying);
    if (isSongPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.CurrentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const Backward = () => {
    if (audioRef.current) {
      let newTime = Math.max(CurrentTime - 10, 0);
      audioRef.current.CurrentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const Forward = () => {
    if (audioRef.current) {
      let newTime = Math.min(CurrentTime + 10, duration);
      audioRef.current.CurrentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleSeek = (e) => {
    if (audioRef.current) {
      const newTime = (e.target.value / 100) * Duration;
      audioRef.current.CurrentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    handlePlayPodcast();
    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.addEventListener("timeupdate", handleTimeUpdate);
      currentAudio.addEventListener("loadedmetadata", handleLoadedMetadata);
    }
  }, [songPath]);

  return (
    <div
      className={`${
        PlayerDivState ? "hidden" : "fixed"
      } bottom-0 left-0 w-[100%] bg-zinc-900 text-zinc-300 p-4 rounded flex items-center gap-4`}
    >
      <div className="hidden md:block w-1/3">
        <img
          src={img}
          alt="image loading"
          className={`size-12 rounded-full object-cover`}
        />
      </div>

      <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center gap-4 text-xl">
          <button onClick={Backward}>
            <IoPlaySkipBack />
          </button>
          <button onClick={handlePlayPodcast}>
            {isSongPlaying ? <FaPauseCircle /> : <FaPlay />}
          </button>
          <button onClick={Forward}>
            <IoPlaySkipForward />
          </button>
        </div>

        <div className="w-full flex items-center justify-center mt-3">
          <input
            type="range"
            min="0"
            max="100"
            className="w-full hover:cursor-pointer"
            value={(CurrentTime / Duration) * 100 || 0}
            onChange={handleSeek}
          />
        </div>

        <div className="w-full flex items-center justify-between text-sm">
          <span>{formatTime(CurrentTime)}</span>
          <span>{formatTime(Duration)}</span>
        </div>
      </div>
      <div className="w-1/3 flex items-center justify-end">
        <button onClick={closeAudioPlayerDiv}>
          <ImCross />
        </button>
      </div>
      <audio ref={audioRef} src={songPath} />
    </div>
  );
};

export default AudioPlayer;
