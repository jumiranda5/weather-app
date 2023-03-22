/* Get data from Open Weather Map API */

const weatherData = async (city) => {
    
    const key = '287a8e66b21a956f402975518633bfb6';
    setLoading(true);

    try {
        console.log('init fetch');
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}&units=metric`, {mode: 'cors'});
        const status = response.status;
        console.log(status);
        if (status === 404) {
            document.getElementById('city-error').textContent = `City not found: ${city}`;
        }
        else {
            const data = await response.json();
            const icon = await weatherIcon(data.weather[0].icon);
            setCityContainer(data);
            setTemperatureContainer(data, icon);
            setAirContainer(data);
            setBackgroundImage(data.weather[0].icon);
        }
        setLoading(false);
    }
    catch (error) {
        console.error(error);
        setLoading(false);
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

const setCityContainer = (data) => {

    document.getElementById('city').textContent = `${data.name}, ${data.sys.country}`;

}

const initSearchInput = () => {

    const button = document.getElementById('btn-search');

    button.addEventListener('click', (e) => {

        e.preventDefault();
        const city = document.getElementById('city-input').value;
        weatherData(city);

        console.log('button clicked');

    });

}

const setLoading = (isLoading) => {

    if (isLoading) {
        document.querySelector('.loading').classList.remove('hidden');
        document.querySelector('.weather-container').classList.add('hidden');
        document.querySelector('.air-container').classList.add('hidden');
    }
    else {
        document.querySelector('.loading').classList.add('hidden');
        document.querySelector('.weather-container').classList.remove('hidden');
        document.querySelector('.air-container').classList.remove('hidden');
    }

}

const setBackgroundImage = (icon) => {

    const body = document.getElementById('body');
    const code = icon.slice(0,-1);

    // Delete bg img
    body.classList.forEach(
        function(name) {
            if (name !== 'bg') {
                body.classList.remove(name);
            }
        }
    );

    // Add new bg img
    switch (code) {
        case '01':
            body.classList.add('bg-sun');
            break;
        case '02':
            body.classList.add('bg-few-clouds');
            break;
        case '03':
        case '04': 
            body.classList.add('bg-clouds');
            break;
        case '09':
        case '10': 
            body.classList.add('bg-rain');
            break;
        case '11': 
            body.classList.add('bg-thunder');
            break;
        case '13': 
            body.classList.add('bg-snow');
            break;
        case '50':
            body.classList.add('bg-mist');
            break;
    }
}

/* INIT */

initSearchInput();
weatherData('João Pessoa');