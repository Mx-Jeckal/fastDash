var $input = $('<input>')
var $searchBtn = $('<button>')
$searchBtn.attr('class', "fas fa-search btn btn-primary btn-lg")
$('.input').attr('style', "display: block")
$('.input').append($input, $searchBtn)

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}

var cityArr = ["Austin", "Chicago", "New York", "Orlando", "San Francisco", "Seattle", "Denver", "Atlanta"]
var i;
tryLoop()

function tryLoop() {
    for (i = 0; i < cityArr.length; i++) {
        var $cityDiv = $('<button>').text(cityArr[i])
        $('.cities').append($cityDiv)
        $cityDiv.attr('class', "list-group-item city")
        $cityDiv.attr('data-city', cityArr[i])
        console.log(cityArr[i])

        $('.city[data-city="' + cityArr[i] + '"]').on('click', function() {
            var cityId = this.dataset.city
            var APIKey = "e00134c9cfaa493d18059bd5d70653e5";
            // var searchTerm = $input.val()
            // Here we are building the URL we need to query the database
            console.log(cityId)
            var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityId + "&appid=" + APIKey;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {

                // Create CODE HERE to Log the queryURL
                console.log(queryURL)
                    // Create CODE HERE to log the resulting object
                console.log(response)

                function renderSearch() {
                    $('.currentWeather').empty()
                    $('.fiveDayHead').empty()
                    $('.fiveDayCards').empty()
                    var weatherDisplayDiv = $('<h1>').text(response.city.name + " " + mm + "/" + dd + "/" + yyyy)
                    weatherDisplayDiv.attr('class', "d-flex")
                    var iconImg = $('<img>').attr('src', "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png")
                    iconImg.attr('style', "width: 100px")
                    iconImg.attr('style', "height: 100px")
                    var temp = ((response.list[0].main.temp - 273.15) * 9 / 5 + 32)
                    var tempDiv = $('<div>').text("Temperature: " + temp.toFixed(1) + "°F")
                    var humidDiv = $('<div>').text("Humidity: " + response.list[0].main.humidity + "%")
                    var windDiv = $('<div>').text("Wind speed: " + response.list[0].wind.speed + "MPH")
                    var fiveDayHeader = $('<h2>').html("5&#8209;Day&nbsp;Forecast:")
                    weatherDisplayDiv.append(iconImg)
                    $('.currentWeather').append(weatherDisplayDiv, tempDiv, humidDiv, windDiv)
                    $('.fiveDayHead').append(fiveDayHeader)
                    var jumpDays = [0, 8, 16, 24, 32]
                    for (var y = 0; y < jumpDays.length; y++) {
                        var fiveDayCard = $('<div>').attr('class', 'text-white col-sm-6 col-lg-2 bg-primary mb-2 mr-2 rounded-lg')
                        $('.fiveDayCards').append(fiveDayCard)
                        var date5 = $('<h3>').text(mm + "/" + (dd + 1 + y) + "/" + yyyy)
                        date5.attr('class', "ml-2")
                        var icon5Day = $('<img>').attr('src', "http://openweathermap.org/img/wn/" + response.list[jumpDays[y]].weather[0].icon + "@2x.png")
                        icon5Day.attr('style', "width: 50px")
                        icon5Day.attr('style', "height: 50px")
                        var temp5 = ((response.list[jumpDays[y]].main.temp - 273.15) * 9 / 5 + 32)
                        var temp5Div = $('<div>').text("Temp: " + temp5.toFixed(1) + "°F")
                        var humid5Div = $('<div>').text("Humidity: " + response.list[jumpDays[y]].main.humidity + "%")
                        temp5Div.attr('class', "mb-3")
                        humid5Div.attr('class', "mb-2")
                        fiveDayCard.append(date5, icon5Day, temp5Div, humid5Div)
                        console.log(jumpDays[y])
                    }
                }
                renderSearch()


            });

        })
        console.log(('.city[data-city="' + cityArr[i] + '"]'))
    }
}


$searchBtn.on('click', function() {

    var APIKey = "e00134c9cfaa493d18059bd5d70653e5";
    var searchTerm = $input.val()
        // Here we are building the URL we need to query the database

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        // Create CODE HERE to Log the queryURL
        console.log(queryURL)
            // Create CODE HERE to log the resulting object
        console.log(response)

        function renderSearch() {
            $('.currentWeather').empty()
            var weatherDisplayDiv = $('<h1>').text(response.name + " " + mm + "/" + dd + "/" + yyyy)
            $('.currentWeather').append(weatherDisplayDiv)

        }
        renderSearch()


    });
    var $cityDiv = $('<button>').text(searchTerm)
    $('.cities').append($cityDiv)
    cityArr.push(searchTerm)
    $cityDiv.attr('class', "list-group-item city")
    $cityDiv.attr('data-city', searchTerm)
    console.log(searchTerm)
    $input.val('')
    tryLoop()


})

console.log(mm + "/" + dd + "/" + yyyy)

// var rowId = $('.city').dataset.city

// Ill need a function to process each city when it's clicked