// console.log("Hello World");
const API_KEY=config.API_KEY;

const btn = document.querySelector(".btn");
const input = document.querySelector(".input");
const cityName = document.querySelector(".city-name");
const countryName = document.querySelector(".country-name");
const curTemp = document.querySelector(".temperature");
const weatherDesc = document.querySelector(".description");
const curHumidity = document.querySelector(".humidity");
const curWind = document.querySelector(".wind-speed");
const sunSet = document.querySelector(".sunset");
const sunRise = document.querySelector(".sunrise");
const curFeelsLike = document.querySelector(".feel");
const curPressure = document.querySelector(".air_pressure");
const latitude = document.querySelector(".latitude");
const longitude = document.querySelector(".longitude");
const visibility = document.querySelector(".visibility");
const dateStamp = document.querySelector(".date-stamp");
const windGust = document.querySelector(".wind-gust");

setInterval(() => {
  const now = new Date();
  now.toLocaleTimeString();
  document.querySelector(
    ".time"
  ).textContent = `Time: ${now.toLocaleTimeString()}`;
}, 1000);

const footer = document.querySelector(".footer");
const year = new Date().getFullYear();
footer.textContent = `© ${year} Weather App`;

btn.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log("click");
  const input = document.querySelector(".input").value;
  // console.log(input);
  let globalData;
  const getData = async function (e) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Promise chaining method to get data from API and display it on the UI using DOM manipulation methods.
  getData().then((data) => {
    globalData = data;
    // console.log(globalData);

    document.querySelector(
      ".icon"
    ).src = `https://openweathermap.org/img/wn/${globalData.weather[0].icon}@2x.png`;
    cityName.textContent = globalData.name;
    countryName.textContent = globalData.sys.country;
    curTemp.textContent = `${globalData.main.temp}°C`;
    weatherDesc.textContent = `Desc: ${globalData.weather[0].description}`;
    curHumidity.textContent = `Humidity: ${globalData.main.humidity}%`;
    sunRise.textContent = `Sunrise: ${new Date(
      globalData.sys.sunrise * 1000
    ).toLocaleTimeString()}`;

    curWind.textContent = `Speed: ${globalData.wind.speed}m/s`;
    curPressure.textContent = `Pressure: ${globalData.main.pressure}hPa`;

    sunSet.textContent = `Sunset: ${new Date(
      globalData.sys.sunset * 1000
    ).toLocaleTimeString()}`;
    visibility.textContent = `Visibility ${globalData.visibility}m`;
    latitude.textContent = `Latitude: ${globalData.coord.lat}`;
    longitude.textContent = `Longitude: ${globalData.coord.lon}`;
    curFeelsLike.textContent = `Feels like:${globalData.main.feels_like}°C`;
    dateStamp.textContent = `Date: ${new Date().toLocaleDateString()}`;
    windGust.textContent = `Gust: ${globalData.wind.gust}m/s`;
  });

  // clear input field
  document.querySelector(".input").value = "";
});


