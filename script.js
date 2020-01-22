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
    $('.cities').empty()
    for (i = 0; i < cityArr.length; i++) {

        var $cityDiv = $('<button>').text(cityArr[i])
        $('.cities').append($cityDiv)
        $cityDiv.attr('class', "list-group-item city")
        $cityDiv.attr('data-city', cityArr[i])
        console.log(cityArr[i])




        $('.city[data-city="' + cityArr[i] + '"]').on('click', function() {
            var cityId = this.dataset.city
            var APIKey = "e00134c9cfaa493d18059bd5d70653e5";
            console.log(cityId)
            var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityId + "&appid=" + APIKey;


            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + ""
                $.ajax({
                    url: uvIndexURL,
                    method: "GET"
                }).then(function(event) {
                    var UVDisplay = $('<div>').text(event.value)
                    var UVindex = $('<div>').text("UV Index: ")
                    UVDisplay.attr('class', " float-left bg-danger rounded-lg p-1")
                    UVindex.attr('class', "float-left")
                    $('.currentWeather').append(UVindex, UVDisplay)
                    console.log(uvIndexURL)
                    console.log(event.value)
                })

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
                    fiveDayHeader.attr('class', "ml-3")
                    weatherDisplayDiv.append(iconImg)
                    $('.currentWeather').append(weatherDisplayDiv, tempDiv, humidDiv, windDiv)
                    $('.fiveDayHead').append(fiveDayHeader)
                    var jumpDays = [0, 8, 16, 24, 32]
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
                        console.log(jumpDays[y])
                    }
                }
                renderSearch()


            });
        })
    }
}




$searchBtn.on('click', function() {
    tryLoop()
    var APIKey = "e00134c9cfaa493d18059bd5d70653e5";
    var searchTerm = $input.val()

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appid=" + APIKey;

    var $cityDivAdd = $('<button>').text(searchTerm)
    $('.cities').append($cityDivAdd)
    $cityDivAdd.attr('class', "list-group-item city")
    $cityDivAdd.attr('data-city', searchTerm)
    searchTerm = ""

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + response.city.coord.lat + "&lon=" + response.city.coord.lon + ""
        $.ajax({
            url: uvIndexURL,
            method: "GET"
        }).then(function(event) {
            console.log(event)
            var UVDisplay = $('<div>').text(event.value)
            var UVindex = $('<div>').text("UV Index: ")
            UVDisplay.attr('class', " float-left bg-danger rounded-lg p-1")
            UVindex.attr('class', "float-left")
            $('.currentWeather').append(UVindex, UVDisplay)
            console.log(uvIndexURL)
            console.log(event.value)
        })

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
            fiveDayHeader.attr('class', "ml-3")
            weatherDisplayDiv.append(iconImg)
            $('.currentWeather').append(weatherDisplayDiv, tempDiv, humidDiv, windDiv)
            $('.fiveDayHead').append(fiveDayHeader)
            var jumpDays = [0, 8, 16, 24, 32]
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
                console.log(jumpDays[y])
            }
        }
        renderSearch()


    });

})