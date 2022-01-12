//First API - Covid Tracker //

window.onload = function() {
    getCovidStats();
    nytimes();
}


function getCovidStats() {
    fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations/225')
        .then(function(resp) { return resp.json() })
        .then(function(data) {

            var News = document.getElementById("news");

            let covidwatch = $(`<div class = "location-container" src = '${News}'>`);
            let population = data.location.country_population;
            let update = data.location.last_updated;
            let confirmedCases = data.location.latest.confirmed;
            let deaths = data.location.latest.deaths;


            document.getElementById('population').innerHTML = population.toLocaleString('en');
            document.getElementById('update').innerHTML = update.substr(0, 10);
            document.getElementById('cases').innerHTML = confirmedCases.toLocaleString('en');
            document.getElementById('deaths').innerHTML = deaths.toLocaleString('en');
            document.getElementById('percent').innerHTML = ((Number(deaths) / Number(confirmedCases)) * 100).toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";

            $(covidwatch).append(population);


        })
        .catch(function() {
            console.log("error");
        })
    setTimeout(getCovidStats, 43200000) // update every 12 hours
}



// Second API - News from NY TIMES //
//store url into variable
var headLines = [];
var headlines = document.getElementById("headlines");

function nytimes() {
    fetch('https://api.nytimes.com/svc/topstories/v2/world.json?api-key=iGRIa7yg2feYJqwvCvLKKg9TDnJjAGLx')
        .then(function(response) {
            console.log(response);
        })
        .then(data => {

            // for (i = 0; i < 5; i++) {
            //     headLines.push(response.headLines[i]);
            // }
            data.results.map(article => {
                console.log(article.title);

                // creating the headlines div to have the top stories
                let HeadlineDiv = $(`<div class="grid-item"  id="news-${headlines}">`);
                let imgDiv = $(`<div class= 'image-overflow'>`);
                let img = $(`<img class='rounded mx-auto d-block' src='${article.multimedia[0].url}'>`);
                $(imgDiv).append(img);
                let a = $("<a target='_blank'class= 'card-link' href=" + article.url + ">" + article.title + "</a></br>");
                let p = $("<p class='card-text'  href=" + article.url + ">" + article.abstract + "</p></br>");

                $(HeadlineDiv).append(a, img, p);

                $("#headlines").append(HeadlineDiv);

            })

        })
        .catch(function() {
            console.log("error");
        })
}
// var headlines = document.getElementById("headlines");
// // url for fetching the top stories of nytimes
// var url = "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=iGRIa7yg2feYJqwvCvLKKg9TDnJjAGLx";

// fetch(url)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);

//         data.results.map(article => {
//             console.log(article.title);

//             // creating the headlines div to have the top stories
//             let HeadlineDiv = $(`<div class="grid-item"  id="news-${headlines}">`);
//             let imgDiv = $(`<div class= 'image-overflow'>`);
//             let img = $(`<img class='rounded mx-auto d-block' src='${article.multimedia[0].url}'>`);
//             $(imgDiv).append(img);
//             let a = $("<a target='_blank'class= 'card-link' href=" + article.url + ">" + article.title + "</a></br>");
//             let p = $("<p class='card-text'  href=" + article.url + ">" + article.abstract + "</p></br>");

//             $(HeadlineDiv).append(a, img, p);

//             $("#headlines").append(HeadlineDiv);
//         })

//     });