import { useEffect, useRef, useState } from "react";
import { data, options } from "./data";
import play from "./assets/right-arrow-svgrepo-com (1).svg";
import pause from "./assets/pause-solid.svg";
import arrow from "./assets/right-arrow-angle-svgrepo-com.svg";
import { RangeSlider } from "./RangeSlider";
import volume_high from "./assets/volume-high-solid.svg";
import volume_off from "./assets/volume-xmark-solid.svg";
import volume_low from "./assets/volume-low-solid.svg";
import repeat from "./assets/repeat-solid.svg";
import repeat_one from "./assets/9021633_repeat_once_bold_icon.svg";
import shuffle from "./assets/shuffle-solid.svg";

type Music = {
  name: string;
  cover: string;
  audio: string;
  artist: string;
  color: string[];
  id: string;
};

export default function App() {
  const [isOpen, setOpen] = useState<boolean | null>(null);
  const [activeItem, setActiveItem] = useState<Music>(data[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(50);
  const [showVolume, setShowVolume] = useState(false);
  const [isRepeat, setRepeat] = useState("repeat");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark");

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
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
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
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        audioRef.current?.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current?.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, []);

  // Cập nhật khi activeItem thay đổi
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [activeItem]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    switch (theme) {
      case "dark":
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);

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

  const handleRepeat = () => {
    setRepeat((value) => {
      switch (value) {
        case "repeat":
          return "repeat_one";
        case "repeat_one":
          return "shuffle";
        default:
          return "repeat";
      }
    });
  };

  const getRepeatIcon = () => {
    switch (isRepeat) {
      case "repeat":
        return repeat;
      case "repeat_one":
        return repeat_one;
      case "shuffle":
        return shuffle;
      default:
        return repeat;
    }
  };

  const EndedAudio = () => {
    if (audioRef.current) {
      switch (isRepeat) {
        case "repeat":
          return handleNext();
        case "repeat_one":
          return audioRef.current.play();
        case "shuffle":
          return handleShuffle();
        default:
          return handleNext();
      }
    }
  };

  const handleShuffle = () => {
    const num = randomNumber();
    setActiveItem(data[num]);
  };

  const randomNumber = () => {
    const random = Math.floor(Math.random() * data.length);
    if (random === data.findIndex((item) => item.name === activeItem.name)) {
      return randomNumber();
    }
    return random;
  };

  const controls = [
    { src: getRepeatIcon(), className: "", onClick: handleRepeat },
    {
      src: arrow,
      className: "rotate-180  hover:w-10",
      onClick: handlePrevious,
    },
    {
      src: isPlaying ? pause : play,
      className: " hover:w-10",
      onClick: handlePlayPause,
    },
    { src: arrow, className: " hover:w-10", onClick: handleNext },
  ];

  const onWindowMatch = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  });

  return (
    <div
      className={`xl:flex items-start overflow-hidden min-h-screen max-h-full dark:bg-slate-900 dark:text-gray-100 duration-100`}
    >
      <div
        className={`nav flex flex-col xl:basis-full order-2 ${
          isOpen === null
            ? ""
            : isOpen
            ? "xl:animate-appearXL xl:translate-x-48"
            : "xl:animate-disappearXL"
        }`}
      >
        <div className="content flex justify-around items-center p-5 my-3 ">
          <p
            className={`text-[#363636] dark:text-gray-100 font-bold text-2xl ${
              isOpen === null
                ? ""
                : isOpen
                ? "animate-appear2 "
                : "animate-disappear2"
            } xl:animate-none`}
          >
            Music
          </p>
          <div className="flex space-x-3">
            <div
              className={`flex space-x-3 bg-gray-100 p-2 rounded-lg dark:bg-slate-800 ${
                isOpen === null
                  ? ""
                  : isOpen
                  ? "animate-appear2 "
                  : "animate-disappear2"
              } xl:animate-none`}
            >
              {options.map((opt) => (
                <button
                  key={opt.text}
                  onClick={() => setTheme(opt.text)}
                  className={`text-2xl grid place-content-center ${
                    theme === opt.text && "text-sky-600"
                  }`}
                >
                  <ion-icon name={opt.icon}></ion-icon>
                </button>
              ))}
            </div>
            <div
              className="border-2 border-[#414141] hover:bg-[#414141] dark:border-gray-100 hover:text-white hover:cursor-pointer rounded-lg flex p-2 space-x-2 text-sm z-30"
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
        </div>
        <div className="song-controller flex flex-col items-center space-y-3">
          <div
            className={` w-1/2 lg:w-1/3 xl:w-1/5 mt-5 xl:mt-10  ${
              isOpen === null
                ? ""
                : isOpen
                ? "animate-appear3"
                : "animate-disappear3"
            } xl:animate-none`}
          >
            <img
              src={activeItem.cover}
              alt=""
              className={`rounded-full animation-spin-slow ${
                isPlaying ? "" : "animation-paused"
              }`}
            />
          </div>
          <div
            className={`flex flex-col items-center space-y-3 ${
              isOpen === null
                ? ""
                : isOpen
                ? "animate-appear4"
                : "animate-disappear4"
            } xl:animate-none`}
          >
            <p className="text-[#363636] dark:dark:text-gray-100 text-2xl font-bold pt-10">
              {activeItem.name}
            </p>
            <p className="text-[#646464] dark:dark:text-gray-100 text-xl">
              {activeItem.artist}
            </p>
          </div>
        </div>
        <div
          className={`flex flex-col items-center mt-5 xl:mt-7 space-y-10 ${
            isOpen === null
              ? ""
              : isOpen
              ? "animate-appear4"
              : "animate-disappear4"
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
            <audio
              src={activeItem.audio}
              ref={audioRef}
              onEnded={EndedAudio}
              controls
            />
            <p>{formatDuration(duration)}</p>
          </div>
          <div className="flex justify-around cursor-pointer transition p-3 md:w-1/2 ">
            {controls.map((control, index) => (
              <div
                key={index}
                className="flex justify-center dark:invert items-center w-20 h-20 "
                onClick={control.onClick}
              >
                <img
                  src={control.src}
                  className={`w-8 transition-all duration-300 ${control.className}`}
                />
              </div>
            ))}
            <div className="flex justify-center items-center w-20 h-20 ">
              <img
                src={
                  volume == 0
                    ? volume_off
                    : volume <= 50
                    ? volume_low
                    : volume_high
                }
                onClick={() => setShowVolume(!showVolume)}
                className={`w-8 transition-all duration-300 dark:invert z-10`}
              />
              <div
                className={` bg-slate-700 p-2 rounded-full flex -rotate-90 md:rotate-0 justify-around items-center space-x-2 
                  w-60 md:w-56 absolute -translate-y-24 md:translate-y-0 md:translate-x-20 transition-opacity duration-300 ${
                    showVolume ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
              >
                <div className="md:w-10 w-8"></div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setVolume(Number(e.target.value));
                  }}
                  className="md:w-2/3"
                />
                <p className="text-white font-semibold text-xl rotate-90 md:rotate-0 w-8 text-center">
                  {volume}
                </p>
              </div>
            </div>
          </div>
          {/* <div
            className={`bg-slate-800 p-2 rounded-full flex -rotate-90 justify-around items-center space-x-2 w-2/3 md:w-1/3 xl:w-1/5 fixed${
              showVolume ? "" : "hidden"
            }`}
          >
            <img
              src={
                volume == 0
                  ? volume_off
                  : volume <= 50
                  ? volume_low
                  : volume_high
              }
              onClick={() => setVolume((v) => (v > 0 ? 0 : 100))}
              className={`w-8 transition-all duration-300 invert`}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setVolume(Number(e.target.value));
              }}
              className="md:w-2/3"
            />
            <p className="text-white font-semibold text-xl">{volume}</p>
          </div> */}
        </div>
      </div>
      <div
        className={`sidebar ${
          isOpen === null
            ? " -translate-x-full"
            : isOpen
            ? "animate-appear"
            : "animate-disappear -translate-x-full"
        } xl:w-1/5 shadow-2xl pr-3 min-h-dvh absolute top-0 bg-white dark:bg-slate-800 overflow-hidden z-10
        `}
      >
        <p className="text-[#363636] dark:text-gray-100 font-bold text-2xl p-5 mt-5 ">
          Library
        </p>
        {data.map((d) => (
          <div
            key={d.name}
            className={`flex items-center space-x-5 hover:bg-[#eccce0] p-5 text-[#646464] hover:text-[#646464] dark:text-gray-100 hover:dark:text-slate-600 cursor-pointer ${
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
