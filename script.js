/* Get data from Open Weather Map API */

const weatherData = async () => {
    try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=London&APPID=287a8e66b21a956f402975518633bfb6', {mode: 'cors'});
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.error(err);
    }
}

weatherData();