const cityDivContainer = document.querySelector(".city-container");
const cityButtons = document.querySelector(".city-buttons");
const backgroundImageContainer = document.querySelector(".background-image");
const heroCityEnglishName = document.querySelector("#hero-city-english-name");
const heroCityKoreanName = document.querySelector("#hero-city-korean-name");
let heroCityInnerImg = document.querySelector(".hero-city-inner-img");
let heroCityAboutText = document.querySelector(".hero-city-about-text");

const attractionDivContainer = document.querySelector(".attraction-container");
const cities = [
  {
    name: "seoul",
    koreanName: "서울",
    code: "Q8684",
    attractions: [
      {
        name: "Gyeongbokgung Palace",
        koreanName: "경복궁",
        code: "Q482485",
      },
      {
        name: "N Seoul Tower",
        koreanName: "N서울타워",
        code: "Q69134",
      },

      {
        name: "Yeouido Park",
        koreanName: "남산공원",
        code: "Q625037",
      },
      {
        name: "hongdae",
        koreanName: "홍대",
        code: "Q5895772",
      },
      {
        name: "Myeongdong",
        koreanName: "명동",
        code: "Q484407",
      },
    ],
  },

  {
    name: "busan",
    koreanName: "부산",
    code: "Q16520",
    attractions: [
      {
        name: "Haeundae Beach",
        koreanName: "해운대해수욕장",
        code: "Q491203",
      },
      {
        name: "Gwangalli Beach",
        koreanName: "광안리해수욕장",
        code: "Q495370",
      },
      {
        name: "Gamcheon Culture Village",
        koreanName: "감천문화마을",
        code: "Q18641306",
      },
      {
        name: "Bukchon Hanok Village",
        koreanName: "북촌한옥마을",
        code: "Q490981",
      },
      {
        name: "Beomeosa Temple",
        koreanName: "범어사",
        code: "Q487662",
      },
    ],
  },
  {
    name: "Sokcho",
    koreanName: "제주시",
    code: "Q16520",
    attractions: [
      {
        name: "Seoraksan National Park",
        koreanName: "설악산국립공원",
        code: "Q491203",
      },
      {
        name: "Osaek Beach",
        koreanName: "오세킹해수욕장",
        code: "Q495370",
      },
      {
        name: "Sokcho Beach",
        koreanName: "속초해수욕장",
        code: "Q18641306",
      },
      {
        name: "Sokcho City Hall",
        koreanName: "속초시청",
        code: "Q490981",
      },
      {
        name: "Yangyang International Market",
        koreanName: "양양국제시장",
        code: "Q487662",
      },
    ],
  },

  {
    name: "incheon",
    koreanName: "인천",
    code: "Q20934",
    attractions: [
      {
        name: "Incheon Bridge",
        koreanName: "인천교",
        code: "Q491203",
      },
      {
        name: "Incheon Munhak Stadium",
        koreanName: "인천문학경기장",
        code: "Q495370",
      },
      {
        name: "Incheon Munhak Stadium",
        koreanName: "인천문학경기장",
        code: "Q18641306",
      },
      {
        name: "Incheon Munhak Stadium",
        koreanName: "인천문학경기장",
        code: "Q490981",
      },
    ]
  },

  {
    name: "daejeon",
    koreanName: "대전",
    code: "Q20921",
    attractions: [
      {
        name: "Daejeon City Hall",
        koreanName: "대전시청",
        code: "Q491203",
      },
      {
        name: "Daejeon City Hall",
        koreanName: "대전시청",
        code: "Q495370",
      },
    ]
  },
];

function makeCityButtons() {
  cities.forEach((city) => {
    const cityButton = document.createElement("button");
    cityButton.classList.add("city-button");
    cityButton.innerText = city.name;
    cityButtons.appendChild(cityButton);
    cityButton.addEventListener("click", () => {
      heroCityEnglishName.innerText = city.name;
      heroCityKoreanName.innerText = city.koreanName;
      backgroundImageContainer.style.backgroundImage = `
      linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1)),
      url('/images/${city.name}-night.jpg')
      `;

      heroCityAboutText.innerText = document.querySelector(
        `#${city.name}-desc`
      ).innerText;

      heroCityKoreanName.classList.add("animate-korean-text");
      // console.log(heroCityAboutText.innerText);
    });
  });
}

function makeCity(cityName) {
  const cityKoreanName = cities.find(
    (city) => city.name === cityName
  ).koreanName;

  const wikiEndpoint = `https://en.wikipedia.org/api/rest_v1/page/summary/${cityName}`;
  fetch(wikiEndpoint)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const cityDiv = document.createElement("div");
      cityDiv.classList.add("city-div");

      const cityImage = document.createElement("img");
      cityImage.classList.add("city-image");
      cityImage.src = data.thumbnail.source ? data.thumbnail.source : "";
      
      cityDivContainer.appendChild(cityDiv);
    });
}

function makeAllCities() {
  cities.forEach((city) => {
    makeCity(city.name);
  });
}

// makeCityButtons();
// makeAllCities();


function makeAttractions(city){
  const attractions = city.attractions;
  attractions.forEach((attraction) => {
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${attraction.name}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const attractionDiv = document.createElement("div");
      attractionDiv.classList.add("attraction-div");

      attractionDiv.innerHTML = `

      <h2 class='attraction-name'>
        <span class='attraction-english-name'>${attraction.name}</span>
        <span class='attraction-korean-name'>${attraction.koreanName}</span>
      </h2>

 

      <p class='attraction-coordinates'>
        <span class='attraction-latitude'>${data.coordinates.lat}</span>
        <span class='attraction-longitude'>${data.coordinates.lon}</span>
      </p>

      <p class='attraction-desc'>
        ${data.extract}
      </p>
      `;
  

    attractionDivContainer.appendChild(attractionDiv);
  });
  });
}

function makeAllAttractions(){
  cities.forEach((city) => {
    makeAttractions(city);
  });
} 

makeAllAttractions();