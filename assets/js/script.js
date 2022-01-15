//First API - Covid Tracker //

window.onload = function () {
  getCovidStats();
  nytimes();
};

// function to get Covid status by fetching from api
function getCovidStats() {
  fetch("https://coronavirus-tracker-api.herokuapp.com/v2/locations/225")
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      // set variables for certain data properties
      var population = data.location.country_population;
      var update = data.location.last_updated;
      var confirmedCases = data.location.latest.confirmed;
      var deaths = data.location.latest.deaths;

      // embed data onto the web page
      document.getElementById("population").innerHTML =
        population.toLocaleString("en");
      document.getElementById("update").innerHTML = update.substr(0, 10);
      document.getElementById("cases").innerHTML =
        confirmedCases.toLocaleString("en");
      document.getElementById("deaths").innerHTML = deaths.toLocaleString("en");
      document.getElementById("percent").innerHTML =
        ((Number(deaths) / Number(confirmedCases)) * 100).toLocaleString("en", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }) + "%";

      $(covidwatch).append(population);
    })
    .catch(function () {
      console.log("error");
    });
  // update every 12 hours
  setTimeout(getCovidStats, 43200000);
}

// Second API - News from NY TIMES //

//store important variables

var headlines = document.getElementById("headlines");
var endpoints = "https://api.nytimes.com/svc/topstories/v2/";
var topic = "world.json?";
var key = "iGRIa7yg2feYJqwvCvLKKg9TDnJjAGLx";
var url = (url = `${endpoints}${topic}api-key=${key}`);

//fetch data from nytimes api
function nytimes() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => render(data))
    .catch((err) => console.error(err));

  // render data
  function render(data) {
    data.results.map((article) => {
      console.log(article.title);

      // creating the headlines div to have the top stories
      var HeadlineDiv = $(`<div class="grid-item"  id="news-${headlines}">`);
      var imgDiv = $(`<div class= 'image-overflow'>`);
      var img = $(
        `<img class='rounded mx-auto d-block' src='${article.multimedia[0].url}'>`
      );
      $(imgDiv).append(img);
      var a = $(
        "<a target='_blank'class= 'card-link' href=" +
          article.url +
          ">" +
          article.title +
          "</a></br>"
      );
      var p = $(
        "<p class='card-text'  href=" +
          article.url +
          ">" +
          article.abstract +
          "</p></br>"
      );

      $(HeadlineDiv).append(a, img, p);

      $("#headlines").append(HeadlineDiv);
    });
  }
}

//Navbar
const toggelButton = document.getElementsByClassName('toggle.button')[0]
const navbarLink = document.getElementsByClassName('navbar-links')[0]

toggelButton.addEventListener('click', () => {
    navbarLink.classList.toggle('active')
})