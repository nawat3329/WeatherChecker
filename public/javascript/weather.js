

//api_key = '813eeecd2f39020f2a5e609f5f1731f7';
function findLocation(geolocation,api_key){
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: 'https://api.openweathermap.org/geo/1.0/direct',
        data: {
            q: geolocation,
            limit : 1,
            appid : api_key
        },
        success: function (response) {
            console.log('response: ', response);
            if(!$.trim(response)){
                console.log("no location found");
                alert("Unknown Location")
            }
            else{
                callWeather(response[0].lat,response[0].lon,api_key);
            }
        },
        error: function (response) {
            console.log('response: ', response);
            return "error";
        },
    });
    
    

}
function getCurrentLocation(api_key){
    if ("geolocation" in navigator){ //check geolocation available 
        //try to get user current location using getCurrentPosition() method
        navigator.geolocation.getCurrentPosition(function(position){ 
                console.log("Found your location \nLat : "+position.coords.latitude+" \nLang :"+ position.coords.longitude);
                callWeather(position.coords.latitude,position.coords.longitude,api_key);
            });
    }else{
        console.log("Browser doesn't support geolocation!");
    }
}

function getCurrentWeather(lat,lon,api_key){
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: 'https://api.openweathermap.org/data/2.5/weather',
        data: { 
            lat: lat,
            lon: lon,
            units: "metric",
            appid : api_key
        },
        success: function (response) {
            console.log('response: ', response);
            var card = '' + 
            '<div class="col-md-8 col-lg-6 col-xl-4">' + 
            '                                <div class="card" style="color: #4B515D; border-radius: 35px;">' + 
            '                                    <div class="card-body p-4">' + 
            '                                        <div class="d-flex">' + 
            '                                            <h6 class="flex-grow-1">'+ response.name +'</h6><!-- city -->' + 
            '                                            <h6>'+ moment().format("D MMM")+'</h6><!-- time -->' + 
            '                                        </div>' + 
            '                                        <div class="d-flex flex-column text-center mt-5 mb-4">' + 
            '                                            <h6 class="display-4 mb-0 font-weight-bold" style="color: #1C2331;"> '+ response.main.temp + '°C' + 
            '                                            </h6>' + 
            '                                            <span class="small" style="color: #868B94">'+response.weather[0].main+'</span><!-- weather -->' + 
            '                                        </div>' + 
            '                                        <div class="d-flex align-items-center">' + 
            '                                            <div class="flex-grow-1" style="font-size: 1rem;">' + 
            '                                                <div><i class="fas fa-wind fa-fw" style="color: #868B94;"></i> <span' + 
            '                                                        class="ms-1">'+ response.wind.speed+' km/h' + 
            '                                                    </span></div> <!-- wing flow -->' + 
            '                                                <div><i class="fas fa-tint fa-fw" style="color: #868B94;"></i> <span' + 
            '                                                        class="ms-1"> '+ response.main.humidity+'% </span>' + 
            '                                                </div><!-- raining rate -->' + 
            '                                                <div><i class="fas fa-arrow-alt-circle-down" style="color: #868B94;"></i> <span' + 
            '                                                        class="ms-1"> '+response.main.pressure+' hPa </span>' + 
            '                                                </div><!-- raining time -->' + 
            '                                            </div>' + 
            '                                            <div>' + 
            '                                                <img src="http://openweathermap.org/img/wn/'+response.weather[0].icon+'@4x.png"' + 
            '                                                    width="100px"><!-- icon pic -->' + 
            '                                            </div>' + 
            '                                        </div>' + 
            '                                    </div>' + 
            '                                </div>' + 
            '                            </div>' + 
            '';
        $("#carddeck").append(card);
        },
        error: function (response) {
            console.log('response: ', response);
            return "error";
        },
    });
}
function getPredictionWeather(lat,lon,api_key){
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: 'https://api.openweathermap.org/data/2.5/onecall',
        data: { 
            lat: lat,
            lon: lon,
            units: "metric",
            appid : api_key
        },
        success: function (response) {
            console.log('response: ', response);
            var weeklyitem = ''
            for (let i=0;i<Object.keys(response.daily).length; i++){
                weeklyitem += 
                '            <div class="weakly-weather-item">' + 
                '               <p class="mb-0">'+(moment.unix(response.daily[i].dt)).format("ddd")+
                '               <img src="http://openweathermap.org/img/wn/'+response.daily[i].weather[0].icon+'@2x.png" width="50px"> ' + 
                '               <p class="mb-0"> '+ Math.round(response.daily[i].temp.eve) +' °C </p>' + 
                '            </div>'
            }
            var sunset = moment.unix(response.current.sunset)
            var sunrise = moment.unix(response.current.sunrise)
            var card = '' + 
'                                   <div class="card card-weather">' + 
'                                        <div class="card-body">' + 
'                                            <div class="weather-date-location">' + 
'                                                <h3>'+ moment().format("dddd")+'</h3>' + 
'                                                <p class="text-black-50">' + 
'                                                    <span class="weather-date">'+moment().format("D MMMM YYYY")+'</span>' + 
'                                                    <span class="weather-location">'+ +'</span>' + 
'                                                </p>' + 
'                                            </div>' + 
'                                            <div class="row">' + 
'                                                <div class="column" id="cl01">' + 
'                                                    <div class="weather-data d-flex">' + 
'                                                        <div class="mr-auto">' + 
'                                                            <h4 class="display-3">'+  Math.round(response.current.temp) +' <span class="symbol">°</span>C</h4>' + 
'                                                            <p> '+ response.current.weather[0].main +' </p>' + 
'                                                        </div>' + 
'                                                    </div>' + 
'                                                </div>' + 
'                                                <div class="column" id="cl02">' + 
'                                                    <p class="text-black">' + 
'                                                        <span>Feel like: '+ response.current.feels_like+'°C</span>' + 
'                                                    </p>' + 
'                                                    <p class="text-black">' + 
'                                                        <span>UVI: '+ response.current.uvi +'</span>' + 
'                                                    </p>' + 
'                                                    <p class="text-black">' + 
'                                                        <span>Sunrise: '+ sunrise.format("HH:mm") +'</span>' + 
'                                                    </p>' + 
'                                                    <p class="text-black">' + 
'                                                        <span>Sunset: '+ sunset.format("HH:mm") +'</span>' + 
'                                                    </p>' + 
'                                                </div>' + 
'                                            </div>' + 
'                                        </div>' + 
'                                        <!-- lower path -->' + 
'                                        <div class="card-body p-0">' + 
'                                            <div class="d-flex weakly-weather">' + 
                                                    weeklyitem +
'                                                </div>' + 
'                                            </div>' + 
'                                        </div>' + 
'                                    </div>' + 
'';
            $("#carddeck2").append(card);
        },
        error: function (response) {
            console.log('response: ', response);
            return "error";
        },
    });
}
function callWeather(lat,lon,api_key){
    getCurrentWeather(lat,lon,api_key)
    getPredictionWeather(lat,lon,api_key)
}

async function callAPI(){
    const response = await fetch("/api");
    var data = await response.json();
    api_key = data.api
    if (api_key === undefined){
        $("#searchbutton").prop("disable", true);
        $("#CurrentLocation").prop("disable", true);
        console.log("api not found")
        
    }
    else{
        console.log("api found!")
        $("#api_warning").hide();
        interface(api_key);
    }
}

function interface(api_key){
    console.log(api_key)
    $("#searchbutton").click(function () {
        geolocation = $("#geolocation").val();
        console.log(geolocation)
        findLocation(geolocation,api_key);
    })
    $("#CurrentLocation").click(function () {
    getCurrentLocation(api_key);
    })
}


function main() {
    callAPI()
    
}
$(document).ready(main);
