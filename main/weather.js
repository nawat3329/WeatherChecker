function callAPI(){
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: 'https://api.openweathermap.org/geo/1.0/direct?q=Bangkok&limit=1&appid=813eeecd2f39020f2a5e609f5f1731f7',
        success: function (response) {
            console.log('response: ', response);
        },
        error: function (response) {
            console.log('response: ', response);
        },
    });

}
function getCurrentLocation(){
    if ("geolocation" in navigator){ //check geolocation available 
        //try to get user current location using getCurrentPosition() method
        navigator.geolocation.getCurrentPosition(function(position){ 
                console.log("Found your location \nLat : "+position.coords.latitude+" \nLang :"+ position.coords.longitude);
            });
    }else{
        console.log("Browser doesn't support geolocation!");
    }
}

function main() {
    callAPI();
    getCurrentLocation();
}
$(document).ready(main);