var $input = $('<input>')
var $searchBtn = $('<button>')
$searchBtn.attr('class', "fas fa-search btn btn-primary btn-lg")
$('.input').attr('style', "display: block")
$('.input').append($input, $searchBtn)
    // generate current date in MM/DD/YYYY format
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
// add a zero in front of single digit day 
if (dd < 10) {
    dd = '0' + dd;
}
// add a zero in front of single digit month
if (mm < 10) {
    mm = '0' + mm;
}
// array of cities to generate clickable buttons
var cityArr = ["Austin", "Chicago", "New York", "Orlando", "San Francisco", "Seattle", "Denver", "Atlanta"]
var i;
// generate city blocks and make them clickable
cityGen()

function cityGen() {
    // clear .cities before they get regenerated
    $('.cities').empty()
        // loop to iterate over the cities array
    for (i = 0; i < cityArr.length; i++) {
        // make a div and give it a city name from array
        var $cityDiv = $('<div>').text(cityArr[i])
        $('.cities').append($cityDiv)
        $cityDiv.attr('class', "list-group-item city")
        $cityDiv.attr('data-city', cityArr[i])

        // click event for city blocks
        $('.city[data-city="' + cityArr[i] + '"]').on('click', function() {
            // select specific city
            var cityId = this.dataset.city
                // API idkey
            var APIKey = "e00134c9cfaa493d18059bd5d70653e5";
            // URL to query the API
            var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityId + "&appid=" + APIKey;

            // API call to get temp,humdity, wind, and city name
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + ""
                    // 2nd API call to get UV index value
                $.ajax({
                        url: uvIndexURL,
                        method: "GET"
                    }).then(function(event) {
                        // generate UV index data and append to .currentWeather
                        var UVDisplay = $('<div>').text(event.value)
                        var UVindex = $('<div>').text("UV Index: ")
                        UVDisplay.attr('class', " float-left bg-danger rounded-lg p-1")
                        UVindex.attr('class', "float-left")
                        $('.currentWeather').append(UVindex, UVDisplay)
                    })
                    // def of function that populates weather data
                function renderSearch() {
                    // clear previous city data displayed
                    $('.currentWeather').empty()
                    $('.fiveDayHead').empty()
                    $('.fiveDayCards').empty()
                        // weather data displayed
                    var weatherDisplayDiv = $('<h1>').text(response.city.name + " " + mm + "/" + dd + "/" + yyyy)
                    weatherDisplayDiv.attr('class', "d-flex")
                    var iconImg = $('<img>').attr('src', "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png")
                    iconImg.attr('style', "width: 100px")
                    iconImg.attr('style', "height: 100px")
                        // data for temp, humidity, wind
                    var temp = ((response.list[0].main.temp - 273.15) * 9 / 5 + 32)
                    var tempDiv = $('<div>').text("Temperature: " + temp.toFixed(1) + "°F")
                    var humidDiv = $('<div>').text("Humidity: " + response.list[0].main.humidity + "%")
                    var windDiv = $('<div>').text("Wind speed: " + response.list[0].wind.speed + "MPH")
                        // title for 5day forecast
                    var fiveDayHeader = $('<h2>').html("5&#8209;Day&nbsp;Forecast:")
                    fiveDayHeader.attr('class', "ml-3")
                        // appending weather data
                    weatherDisplayDiv.append(iconImg)
                    $('.currentWeather').append(weatherDisplayDiv, tempDiv, humidDiv, windDiv)
                    $('.fiveDayHead').append(fiveDayHeader)
                        // array to iterate over the 5day forecast data
                    var jumpDays = [0, 8, 16, 24, 32]
                        // loop to generate 5day forecast cards
                    for (var y = 0; y < jumpDays.length; y++) {
                        var fiveDayCard = $('<div>').attr('class', 'text-white col-sm-5 col-lg-2 bg-primary mb-2 mr-2 rounded-lg')
                        $('.fiveDayCards').append(fiveDayCard)
                        var date5 = $('<h5>').text(mm + "/" + (dd + 1 + y) + "/" + yyyy)
                        date5.attr('class', "ml-2")
                        var icon5Day = $('<img>').attr('src', "http://openweathermap.org/img/wn/" + response.list[jumpDays[y]].weather[0].icon + "@2x.png")
                        icon5Day.attr('style', "width: 50px")
                        icon5Day.attr('style', "height: 50px")
                        var temp5 = ((response.list[jumpDays[y]].main.temp - 273.15) * 9 / 5 + 32)
                        var temp5Div = $('<div>').text("Temp: " + temp5.toFixed(1) + "°F")
                        var humid5Div = $('<div>').text("Humidity: " + response.list[jumpDays[y]].main.humidity + "%")
                        temp5Div.attr('class', "mb-3 ml-2")
                        humid5Div.attr('class', "mb-2 ml-2")
                        fiveDayCard.append(date5, icon5Day, temp5Div, humid5Div)
                    }
                }
                renderSearch()
            });
        })
    }
}

// when a city is input into the searchfield, do this
$searchBtn.on('click', function() {

    var APIKey = "e00134c9cfaa493d18059bd5d70653e5";
    // input value from user
    var searchTerm = $input.val()
        // query the API with the user value
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid=" + APIKey;
    // add user value to array of cities
    cityArr.push(searchTerm)
        // make a new city block 
    var $cityDivAdd = $('<div>').text(searchTerm)
    $('.cities').append($cityDivAdd)
    $cityDivAdd.attr('class', "list-group-item city")
    $cityDivAdd.attr('data-city', searchTerm)
        // clear input field
    $input.val("")
        // 1st API call for weather data
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + ""
            // 2nd call to API, for UV data
        $.ajax({
                url: uvIndexURL,
                method: "GET"
            }).then(function(event) {
                // generate and render divs with UV index data
                var UVDisplay = $('<div>').text(event.value)
                var UVindex = $('<div>').text("UV Index: ")
                UVDisplay.attr('class', " float-left bg-danger rounded-lg p-1")
                UVindex.attr('class', "float-left")
                $('.currentWeather').append(UVindex, UVDisplay)
                console.log(uvIndexURL)
                console.log(event.value)
            })
            // run the for loop to add the new city to list of cities
        cityGen()
            // def of function that populates weather data
        function renderSearch() {
            // clear previous city data displayed
            $('.currentWeather').empty()
            $('.fiveDayHead').empty()
            $('.fiveDayCards').empty()
                // weather data displayed
            var weatherDisplayDiv = $('<h1>').text(response.city.name + " " + mm + "/" + dd + "/" + yyyy)
            weatherDisplayDiv.attr('class', "d-flex")
            var iconImg = $('<img>').attr('src', "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png")
            iconImg.attr('style', "width: 100px")
            iconImg.attr('style', "height: 100px")
                // data for temp, humidity, wind
            var temp = ((response.list[0].main.temp - 273.15) * 9 / 5 + 32)
            var tempDiv = $('<div>').text("Temperature: " + temp.toFixed(1) + "°F")
            var humidDiv = $('<div>').text("Humidity: " + response.list[0].main.humidity + "%")
            var windDiv = $('<div>').text("Wind speed: " + response.list[0].wind.speed + "MPH")
                // title for 5day forecast
            var fiveDayHeader = $('<h2>').html("5&#8209;Day&nbsp;Forecast:")
            fiveDayHeader.attr('class', "ml-3")
                // appending weather data
            weatherDisplayDiv.append(iconImg)
            $('.currentWeather').append(weatherDisplayDiv, tempDiv, humidDiv, windDiv)
            $('.fiveDayHead').append(fiveDayHeader)
                // array to iterate over the 5day forecast data
            var jumpDays = [0, 8, 16, 24, 32]
                // loop to generate 5day forecast cards
            for (var y = 0; y < jumpDays.length; y++) {
                var fiveDayCard = $('<div>').attr('class', 'text-white col-sm-5 col-lg-2 bg-primary mb-2 mr-2 rounded-lg')
                $('.fiveDayCards').append(fiveDayCard)
                var date5 = $('<h5>').text(mm + "/" + (dd + 1 + y) + "/" + yyyy)
                date5.attr('class', "ml-2")
                var icon5Day = $('<img>').attr('src', "http://openweathermap.org/img/wn/" + response.list[jumpDays[y]].weather[0].icon + "@2x.png")
                icon5Day.attr('style', "width: 50px")
                icon5Day.attr('style', "height: 50px")
                var temp5 = ((response.list[jumpDays[y]].main.temp - 273.15) * 9 / 5 + 32)
                var temp5Div = $('<div>').text("Temp: " + temp5.toFixed(1) + "°F")
                var humid5Div = $('<div>').text("Humidity: " + response.list[jumpDays[y]].main.humidity + "%")
                temp5Div.attr('class', "mb-3 ml-2")
                humid5Div.attr('class', "mb-2 ml-2")
                fiveDayCard.append(date5, icon5Day, temp5Div, humid5Div)
            }
        }
        renderSearch()


    });

})