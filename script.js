/* Get data from Open Weather Map API */

const weatherData = async (city) => {
    const key = '287a8e66b21a956f402975518633bfb6';
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}&units=metric`, {mode: 'cors'});
        const data = await response.json();
        console.log(data.weather[0].icon);
        const icon = await weatherIcon(data.weather[0].icon);
        setTemperatureContainer(data, icon);
        setAirContainer(data);
        console.log(data);
    }
    catch (error) {
        console.error(error);
    }
}

/* Get weather icon */

const weatherIcon = async (code) => {
    try {
        const response = await fetch(`https://openweathermap.org/img/wn/${code}@2x.png`, {mode: 'cors'});
        const data = await response.blob();
        const imageObjectURL = URL.createObjectURL(data);
        return imageObjectURL;
    }
    catch (error) {
        console.error(error);
        return '';
    }
}

/* DOM */

const setTemperatureContainer = (data, icon) => {

    const description = data.weather[0].description;
    const temperature = Math.trunc(data.main.temp);
    const min = Math.trunc(data.main.temp_min);
    const max = Math.trunc(data.main.temp_max);
    const real_feel = Math.trunc(data.main.feels_like);

    document.querySelector('.weather-icon').src = icon;
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

const initSearchInput = () => {

    const button = document.getElementById('btn-search');

    button.addEventListener('click', () => {

        const city = document.getElementById('city-input').value;
        weatherData(city);

    });

}

/* INIT */

weatherData('João Pessoa');
initSearchInput();