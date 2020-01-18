var $input = $('<input>')
var $searchBtn = $('<button>')
$searchBtn.attr('class', "fas fa-search btn btn-primary btn-lg")
$('.input').attr('style', "display: block")
$('.input').append($input, $searchBtn)


var cityArr = ["Austin", "Chicago", "New York", "Orlando", "San Francisco", "Seattle", "Denver", "Atlanta"]

for (var i = 0; i < cityArr.length; i++) {
    var $cityDiv = $('<div>').text(cityArr[i])
    $('.cities').append($cityDiv)
    $cityDiv.attr('class', "list-group-item")
    console.log(cityArr[i])
}

$searchBtn.on('click', function() {

    var APIKey = "e00134c9cfaa493d18059bd5d70653e5";

    // Here we are building the URL we need to query the database
    var searchTerm = $input.val()
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        // Create CODE HERE to Log the queryURL
        console.log(queryURL)
            // Create CODE HERE to log the resulting object
        console.log(response)



    });
    var $cityDiv = $('<div>').text(searchTerm)
    $('.cities').append($cityDiv)
    $cityDiv.attr('class', "list-group-item")
    console.log(searchTerm)
    $input.val('')


})

function cityData() {

}
// Ill need a function to process each city when it's clicked