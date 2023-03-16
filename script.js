/* Get data from Open Weather Map API */

const weatherData = async () => {
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Joao Pessoa&APPID=287a8e66b21a956f402975518633bfb6&units=metric', {mode: 'cors'});
        const data = await response.json();
        setTemperatureContainer(data);
        setAirContainer(data);
        console.log(data);
    }
    catch (error) {
        console.error(error);
    }
}

weatherData();


/* DOM */

const setTemperatureContainer = (data) => {

    const icon = data.weather[0].icon;
    const description = data.weather[0].description;
    const temperature = Math.trunc(data.main.temp);
    const min = Math.trunc(data.main.temp_min);
    const max = Math.trunc(data.main.temp_max);
    const real_feel = Math.trunc(data.main.feels_like);

    document.querySelector('.weather-icon').src = ''; // todo: get icon from api
    document.querySelector('.description').textContent = description;
    document.querySelector('.temperature').textContent = `${temperature}°C`;
    document.querySelector('.min-max').textContent = `Min: ${min}°C | Max: ${max}°C`;
    document.querySelector('.real-feel').textContent = `RealFeel: ${real_feel}°C`;

}

const setAirContainer = (data) => {
   const humidity = data.main.humidity;
   const wind_speed = data.wind.speed;
   const pressure = data.main.pressure;
   const visibility = data.visibility / 1000;

   document.getElementById('humidity').textContent = `${humidity}%`;
   document.getElementById('wind').textContent = `${wind_speed} m/s`;
   document.getElementById('pressure').textContent = `${pressure} mb`;
   document.getElementById('visibility').textContent = `${visibility} km`;
}