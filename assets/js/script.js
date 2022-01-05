<<<<<<< HEAD
/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
/*SUBSCRIBE HERE FOR API KEY: https://home.openweathermap.org/users/sign_up*/
const apiKey = "3a5dcccabb31635037afffcfa07050bc";

form.addEventListener("submit", e => {
    e.preventDefault();
    let inputVal = input.value;

    //check if there's already a city
    const listItems = list.querySelectorAll(".ajax-section .city");
    const listItemsArray = Array.from(listItems);

    if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {
            let content = "";
            //athens,gr
            if (inputVal.includes(",")) {
                //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
                if (inputVal.split(",")[1].length > 2) {
                    inputVal = inputVal.split(",")[0];
                    content = el
                        .querySelector(".city-name span")
                        .textContent.toLowerCase();
                } else {
                    content = el.querySelector(".city-name").dataset.name.toLowerCase();
                }
            } else {
                //athens
                content = el.querySelector(".city-name span").textContent.toLowerCase();
            }
            return content == inputVal.toLowerCase();
        });

        if (filteredArray.length > 0) {
            msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well 😉`;
            form.reset();
            input.focus();
            return;
        }
    }

    //ajax here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const { main, name, sys, weather } = data;
            const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
            li.innerHTML = markup;
            list.appendChild(li);
        })
        .catch(() => {
            msg.textContent = "Please search for a valid city 😩";
        });

    msg.textContent = "";
    form.reset();
    input.focus();
});

$(document).ready(function() {


    var API_KEY = "AIzaSyCidAtnKLK0NmfyPCf9auAA459rZytLyAk"

    var video = "";

    $("form").submit(function(event) {
        event.preventDefault();

        var search = $("#search").val();
        videoSearch(API_KEY, search, 5);
    });

    function videoSearch(key, search, maxResults) {
        $("#videos").empty();

        $.get("https://www.googleapis.com/youtube/v3/search?key=" + key + "&q=" + search + "&type=video&part=snippet&&maxResults" + maxResults, function(data) {
            console.log(data),

                data.items.forEach(item => {

                    video = `
                    <iframe width="200" height="200"
                    src="https://www.youtube.com/embed/${item.id.videoId}"
                    frameborder="0" allowfullscreen></iframe> 
                      `

                    $("#videos").append(video);
                });
        })
    }

})
=======
//First API - Covid Tracker //

window.onload = function() {
	getCovidStats();
}

function getCovidStats() {
	fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/225')
	.then(function(resp) { return resp.json() })
	.then(function(data) {
		let population = data.location.country_population;
		let update = data.location.last_updated;
		let confirmedCases = data.location.latest.confirmed;
		let deaths = data.location.latest.deaths;

		document.getElementById('population').innerHTML = population.toLocaleString('en');
		document.getElementById('update').innerHTML = update.substr(0, 10);
		document.getElementById('cases').innerHTML = confirmedCases.toLocaleString('en');
		document.getElementById('deaths').innerHTML = deaths.toLocaleString('en');
		document.getElementById('percent').innerHTML = ((Number(deaths)/Number(confirmedCases))*100).toLocaleString("en", {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "%";




	})
	.catch(function() {
		console.log("error");
	})
	setTimeout(getCovidStats, 43200000) // update every 12 hours
}



// Second API - News from NY TIMES //
//store url into variable
var headlines = document.getElementById("headlines");
var url = "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=iGRIa7yg2feYJqwvCvLKKg9TDnJjAGLx";

fetch(url)
.then(response => response.json())
.then(data => {
    console.log(data);

    data.results.map(article => {
        console.log(article.title);

        var a = document.createElement("a");
        a.setAttribute('href', article.url);
        a.innerHTML = article.title;

        var p = document.createElement("p");
        p.innerHTML = article.abstract;

        var img = document.createElement("img");
        img.setAttribute('src', article.multimedia[0].url);

        headlines.append(img);
        headlines.appendChild(a);
        headlines.appendChild(p);

    })
});
>>>>>>> 0101b36bb865a728e37ab7f3f8beb5af6f35a9d4
