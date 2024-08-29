export const data = [
  {
    name: "Beaver Creek",
    cover:
      "https://cms.chillhop.com/media/919/squarel1f3f4b923f3877c4c2da054eb5b3b53f009866a9.jpg",
    artist: "Aso, Middle School, Aviino",
    audio: "https://mp3.chillhop.com/serve.php/?mp3=10075",
    color: ["#205950", "#2ab3bf"],
    id: "uuidv4()",
  },
  {
    name: "Daylight",
    cover:
      "https://cms.chillhop.com/media/705/squareld019a313218305f3629dcfe384a0de95da01267a.jpg",
    artist: "Aiguille",
    audio: "https://mp3.chillhop.com/serve.php/?mp3=9272",
    color: ["#EF8EA9", "#ab417f"],
    id: "uuidv4()",
  },
  {
    name: "Keep Going",
    cover:
      "https://cms.chillhop.com/media/2284/squarele1e03c73e037bfff564859d1296790454041ac3a.jpg",
    artist: "Swørn",
    audio: "https://mp3.chillhop.com/serve.php/?mp3=9222",
    color: ["#CD607D", "#c94043"],
    id: "uuidv4()",
  },
  {
    name: "Nightfall",
    cover:
      "https://cms.chillhop.com/media/5884/squarel6acdccd13d84220cc009a3f5073a1a41550c17cb.jpg",
    artist: "Aiguille",
    audio: "https://mp3.chillhop.com/serve.php/?mp3=9148",
    color: ["#EF8EA9", "#ab417f"],
    id: "uuidv4()",
  },
  {
    name: "Reflection",
    cover:
      "https://cms.chillhop.com/media/5000/squarelcd04019ad86a69702fe55867d38a5b13dff95d73.jpg",
    artist: "Swørn",
    audio: "https://mp3.chillhop.com/serve.php/?mp3=9228",
    color: ["#CD607D", "#c94043"],
    id: "uuidv4()",
  },
  {
    name: "Under the City Stars",
    cover:
      "https://cms.chillhop.com/media/26/squareld66fa0e72de4a66f5072c4a3216d009ca909a874.jpg",
    artist: "Aso, Middle School, Aviino",
    audio: "https://mp3.chillhop.com/serve.php/?mp3=10074",
    color: ["#205950", "#2ab3bf"],
    id: "uuidv4()",
  },
  {
    name: "Dark SoulS III: The Ringed City",
    cover:
      "https://steamuserimages-a.akamaihd.net/ugc/1302053624129022292/547A97A72B1BC1C278CB551F7A111624BBD76B1E/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    artist: "Dark Soul",
    audio:
      "https://vgmsite.com/soundtracks/dark-souls-iii-the-ringed-city-extended-soundtrack/qyofrigv/04%20-%20Slave%20Knight%20Gael%20%28Extended%29.mp3",
    color: ["#205950", "#2ab3bf"],
    id: "uuidv4()",
  },
  //ADD MORE HERE
];

type IconName = "moon" | "sunny" | "desktop";

export const options = [
  { icon: "sunny" as IconName, text: "light" },
  { icon: "moon" as IconName, text: "dark" },
  { icon: "desktop-outline" as IconName, text: "system" },
];
