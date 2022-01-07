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
            document.getElementById('percent').innerHTML = ((Number(deaths) / Number(confirmedCases)) * 100).toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";




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

            let HeadlineDiv = $(`<div class="grid-item"  id="hike-${headlines}">`);
            let imgDiv = $(`<div class= 'image-overflow'>`);
            let img = $(`<img class='rounded mx-auto d-block' src='${article.multimedia[0].url}'>`);
            $(imgDiv).append(img);
            let a = $("<a target='_blank'class= 'card-link' href=" + article.url + ">" + article.title + "</a></br>");


            let p = $("<p class='card-text'  href=" + article.url + ">" + article.abstract + "</p></br>");

            // var a = document.createElement("a");
            // a.setAttribute('href', article.url);
            // a.innerHTML = article.title;

            // var p = document.createElement("p");
            // p.innerHTML = article.abstract;



            // var img = document.createElement("img");
            // img.setAttribute('src', article.multimedia[0].url);

            $(HeadlineDiv).append(a);
            $(HeadlineDiv).append(img);
            $(HeadlineDiv).append(p);

            $("#headlines").append(HeadlineDiv);
        })

    });