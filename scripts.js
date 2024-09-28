document.getElementById('getWeatherBtn').addEventListener('click', () => {
        const city = document.getElementById('cityInput').value;
        if (city) {
            fetchWeatherData(city);
        } else {
            alert('Please enter a city name');
        }
    });
    
    function fetchWeatherData(city) {
        const apiKey = 'c791fd22b0be47918f043902242809';
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
        
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    document.getElementById('weatherData').innerHTML = `<p class="error">City not found</p>`;
                } else {
                    displayWeatherData(data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('weatherData').innerHTML = `<p class="error">Something went wrong</p>`;
            });
    }
    
    function displayWeatherData(data) {
        const iconUrl = data.current.condition.icon;
        const weatherData = `
            <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
            <img src="${iconUrl}" alt="Weather Icon">
            <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
            <p><strong>Condition:</strong> ${data.current.condition.text}</p>
            <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
            <p><strong>Last Updated:</strong> ${data.current.last_updated}</p>
        `;
        document.getElementById('weatherData').innerHTML = weatherData;
    }
    