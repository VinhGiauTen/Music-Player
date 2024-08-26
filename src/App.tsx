import { useState } from "react";
import { data } from "./data";

export default function App() {
  const [isShow, setShow] = useState(false);

  return (
    <div className={"grid relative " + isShow ? "grid-cols-2" : "grid-cols-1"}>
      <div
        className={`flex justify-around items-center p-5 my-5   ${
          isShow ? "animate-appear2 translate-x-1/4" : ""
        }`}
      >
        <p className="text-[#363636] font-bold text-2xl">Music</p>
        <div
          className="border-2 border-[#414141] hover:bg-[#414141] hover:text-white hover:cursor-pointer flex p-2 space-x-2 text-sm z-10"
          onClick={() => setShow(!isShow)}
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
      {isShow && (
        <div
          className={
            "xl:w-1/5 " + isShow ? "animate-appear" : "animate-disappear"
          }
        >
          <p className="text-[#363636] font-bold text-2xl px-5">Library</p>
          {data.map((d) => (
            <div
              key={d.name}
              className="flex items-center space-x-5 bdg-[#8a89c5] hover:bg-[#eccce0] p-5"
            >
              <img src={d.cover} alt="cover" className="w-1/2" />
              <div className="text-[#646464]">
                <p>{d.name}</p>
                <p className="text-xs">{d.artist}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
