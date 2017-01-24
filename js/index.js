function showLocalWeather() {
  // Generate lat, lon coordinates
  $.ajax({
    url: 'https://freegeoip.net/json/',
    success: function (res) {
      getWeather(res.latitude, res.longitude);
    }
  });
}

function getWeather(lat, lon) {
  // Get weather data based on above coordinates
  var r = (new Date()).getTime();
  var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?r=' + r
  + '&lat=' + lat + '&lon=' + lon + '&APPID=225bc25daaf81e0924d58032874f18ff';
  $.ajax({
    url: weatherURL,
    success: function (res) {
      //console.log(res);
      var cityName = res.name,
          countryCode = res.sys.country,
          condition = res.weather[0].description,
          icon = 'http://openweathermap.org/img/w/' + res.weather[0].icon + '.png',
          tempK = res.main.temp,
          tempF = Math.round(1.8 * (tempK - 273) + 32),
          tempC = Math.round(tempK - 273)
          tempSwitch = true,
          windSpeed = res.wind.speed;

      $('h2').text('@ ' + cityName + ', ' + countryCode);
      $('#temperature').text(tempC + '°C');
      $('#toggleButton').click(function(){
        if (tempSwitch) {
          $('#temperature').text(tempF + '°F');
          tempSwitch = false;
        } else {
          $('#temperature').text(tempC + '°C');
          tempSwitch = true;
        }
      });
      $('#condition').html(condition);
      $('#iconWeather').html('<img src=' + icon + '>');
      $('#windSpeed').html(windSpeed + ' bft');
    }
  });
}

showLocalWeather();
