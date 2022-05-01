api_key = '813eeecd2f39020f2a5e609f5f1731f7';
function findLocation(geolocation){
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
            getCurrentWeather(response[0].lat,response[0].lon);
            }
        },
        error: function (response) {
            console.log('response: ', response);
            return "error";
        },
    });
    
    

}
function getCurrentLocation(){
    if ("geolocation" in navigator){ //check geolocation available 
        //try to get user current location using getCurrentPosition() method
        navigator.geolocation.getCurrentPosition(function(position){ 
                console.log("Found your location \nLat : "+position.coords.latitude+" \nLang :"+ position.coords.longitude);
                getCurrentWeather(position.coords.latitude,position.coords.longitude);
            });
    }else{
        console.log("Browser doesn't support geolocation!");
    }
}

function getCurrentWeather(lat,lon){
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
            '                                            <h6>'+ new Date().toString("HH:mm")+'</h6><!-- time -->' + 
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

function main() {
    
    
    $("#search").click(function () {
        geolocation = $("#geolocation").val();
        console.log(geolocation)
        findLocation(geolocation);
    })
    $("#CurrentLocation").click(function () {
    getCurrentLocation();
    })
    
}
$(document).ready(main);
