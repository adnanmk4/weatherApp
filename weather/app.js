async function showWeather() {
  const cityNameValue = placeName.value;

  placeName.value = '';

  const url =
    'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' +
    cityNameValue;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'dbde3d3059mshf14b25fc99c5a0ep1f21b4jsnbc6ec167c91e',
      'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);

    cityName.innerHTML = cityNameValue;

    if (result.temp) {
      temp.innerHTML = 'Temperature : ' + result.temp + ' degreeC';
      hum.innerHTML = 'Humidity : ' + result.humidity + ' %';
      feels.innerHTML = 'feels like : ' + result.feels_like + ' degreeC';
    } else {
      temp.innerHTML = 'Temperature : information not available.';
      hum.innerHTML = 'Humidity : information not available.';
      feels.innerHTML = 'feels like : information not available.';
    }
  } catch (error) {
    console.error(error);
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then((registration) => {
        console.log('Service worker registered');

        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('Notification permission granted');
            return;
          }
          console.log(permission);
        });
      })
      .catch((error) => console.log('Service worker not registered', error));
  });

  navigator.serviceWorker.ready.then((swReg) => {
    console.log(swReg);
    var options = {
      body: 'This is Message Body',
      icon: 'assets/icons/icon-192x192.png',
    };
    swReg.showNotification('welcome to my APP', options);
  });
}
