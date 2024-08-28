import { useEffect, useRef, useState } from "react";
import { data } from "./data";
import play from "./assets/right-arrow-svgrepo-com (1).svg";
import pause from "./assets/pause-solid.svg";
import arrow from "./assets/right-arrow-angle-svgrepo-com.svg";
import { RangeSlider } from "./RangeSlider";

type Music = {
  name: string;
  cover: string;
  audio: string;
  artist: string;
  color: string[];
  id: string;
};

export default function App() {
  const [isOpen, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<Music>(data[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Hàm chuyển sang bài hát tiếp theo
  const handleNext = () => {
    const currentIndex = data.findIndex(
      (item) => item.name === activeItem.name
    );
    if (currentIndex < data.length - 1) setActiveItem(data[currentIndex + 1]);
    else setActiveItem(data[0]);
  };

  // Hàm chuyển sang bài hát trước đó
  const handlePrevious = () => {
    const currentIndex = data.findIndex(
      (item) => item.name === activeItem.name
    );
    if (currentIndex > 0) setActiveItem(data[currentIndex - 1]);
    else setActiveItem(data[data.length - 1]);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
      setCurrentTime(Number(e.target.value));
    }
  };

  function formatDuration(durationSeconds: number) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  // Hàm xử lý khi click vào một item
  const handleItemClick = (item: Music) => {
    setActiveItem(item);
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className={`xl:flex items-start ${isOpen ? "" : ""}`}>
      <div
        className={`nav flex flex-col xl:basis-full order-2 ${
          isOpen ? "xl:animate-appearXL xl:ml-72" : "xl:animate-disappearXL"
        }`}
      >
        <div className="content flex justify-around items-center p-5 my-3 ">
          <p
            className={`text-[#363636] font-bold text-2xl ${
              isOpen ? "animate-appear2 " : "animate-disappear2"
            } xl:animate-none`}
          >
            Music
          </p>
          <div
            className="border-2 border-[#414141] hover:bg-[#414141] hover:text-white hover:cursor-pointer flex p-2 space-x-2 text-sm z-10"
            onClick={() => setOpen(!isOpen)}
          >
            <p>Library</p>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="music"
              className="svg-inline--fa fa-music fa-w-16 w-5"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M470.38 1.51L150.41 96A32 32 0 0 0 128 126.51v261.41A139 139 0 0 0 96 384c-53 0-96 28.66-96 64s43 64 96 64 96-28.66 96-64V214.32l256-75v184.61a138.4 138.4 0 0 0-32-3.93c-53 0-96 28.66-96 64s43 64 96 64 96-28.65 96-64V32a32 32 0 0 0-41.62-30.49z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="song-controller flex flex-col items-center space-y-3">
          <img
            src={activeItem.cover}
            alt=""
            className={`rounded-full w-1/2 xl:w-1/5 mt-10  ${
              isOpen
                ? "animate-appear3 xl:animate-none"
                : "animate-disappear3 xl:animate-none"
            } ${isPlaying ? "animate-spin-slow xl:animate-spin-slow" : ""}`}
          />
          <div
            className={`flex flex-col items-center space-y-3 ${
              isOpen ? "animate-appear4" : "animate-disappear4"
            } xl:animate-none`}
          >
            <p className="text-[#363636] text-2xl font-bold pt-10">
              {activeItem.name}
            </p>
            <p className="text-[#646464] text-xl">{activeItem.artist}</p>
          </div>
        </div>
        <div
          className={`flex flex-col items-center mt-10 space-y-10 ${
            isOpen ? "animate-appear4" : "animate-disappear4"
          } xl:animate-none`}
        >
          <div className="flex space-x-5 xl:w-1/2 w-5/6 justify-center items-center pt-10">
            <p>{formatDuration(currentTime)}</p>
            <div className="w-3/4">
              <RangeSlider
                color={activeItem.color[0]}
                color1={activeItem.color[1]}
                max={duration || 100}
                value={currentTime || 0}
                handleChange={handleSeek}
              />
            </div>
            <audio src={activeItem.audio} ref={audioRef} />
            <p>{formatDuration(duration)}</p>
          </div>
          <div className="flex justify-around cursor-pointer transition p-3 xl:w-1/2 w-4/5">
            <div
              className="flex justify-center items-center w-20 h-20"
              onClick={handlePrevious}
            >
              <img
                src={arrow}
                className="rotate-180 w-8 hover:w-10 transition-all duration-300"
              />
            </div>
            <div
              className="flex justify-center items-center w-20 h-20"
              onClick={handlePlayPause}
            >
              <img
                src={isPlaying ? pause : play}
                className="w-8 hover:w-10 transition-all duration-300"
              />
            </div>
            <div
              className="flex justify-center items-center w-20 h-20"
              onClick={handleNext}
            >
              <img
                src={arrow}
                className="w-8 hover:w-10 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`sidebar ${
          isOpen ? "animate-appear" : "animate-disappear -translate-x-full"
        } xl:w-1/5 shadow-2xl pr-3 min-h-dvh absolute top-0 bg-white
        `}
      >
        <p className="text-[#363636] font-bold text-2xl p-5 mt-5 ">Library</p>
        {data.map((d) => (
          <div
            key={d.name}
            className={`flex items-center space-x-5 hover:bg-[#eccce0] p-5 text-[#646464] hover:text-[#646464] cursor-pointer ${
              activeItem.name === d.name ? "bg-[#8a89c5] text-white " : ""
            } transition-all  `}
            onClick={() => handleItemClick(d)}
          >
            <img src={d.cover} alt="cover" className="w-1/2 xl:w-1/4" />
            <div className="">
              <p>{d.name}</p>
              <p className="text-xs">{d.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
