const container = document.querySelector(".wheather");
const form = document.querySelector(".search");
const input = document.querySelector(".input");

const apiKey = "e885cfcb06ffda0f713b6f04cb8d168f";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const checkWeather = async (city) => {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").innerHTML = "<p>Invalid city name</p>";
    document.querySelector(".error").style.display = "block";
  } else {
    let data = await response.json();

    container.children[1].innerHTML = `${Math.round(data.main.temp)}°C`;
    container.children[2].innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${data.wind.speed}km/h`;

    const icon = document.querySelector(".icon");
    if (data.weather[0].main == "Clouds") {
      icon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      icon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      icon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      icon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      icon.src = "images/mist.png";
    }

    container.style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkWeather(input.value);
});
input.oninput = () => {
    input.value = input.value.replace(/[^a-zA-Z ]/g, '');
};

