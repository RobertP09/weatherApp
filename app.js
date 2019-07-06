window.addEventListener('load', () => {
    let lat;
    let long;
    const temperatureDegree = document.querySelector('.temperature');
    const weatherSummary = document.querySelector('.summary');
    const dayOfTheWeek = document.querySelector('.day');
    const iconImage = document.querySelector('.icon');

    //Setting location based on user allowing us to use their location
    if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                //Take lat and long so we can pass it to our API
                long = position.coords.longitude;
                lat = position.coords.latitude;

                //Using proxy so we can get past cors policy on localhost
                const proxy = 'https://cors-anywhere.herokuapp.com/'
                const api = `${proxy}https://api.darksky.net/forecast/d90bb07911ca703f05a5debfc273ed5a/${lat},${long}`;
                //Using fetch to make the get call
                fetch(api)
                // Getting reponse and making it Json
                .then(response => {
                        return response.json();
                })
                .then(weatherData => {
                    //Logging weatherData so we can work with it
                    console.log(weatherData);
                    //Taking portions of the API
                    const { temperature, summary , icon} = weatherData.currently;
                    //Set DOM elements from the api
                    weatherSummary.textContent = summary;
                    temperatureDegree.textContent = Math.floor(temperature);

                    //Set icon based on icon info from API
                    if(icon === "cloudy" ||  "partly-cloudy-day" ||  "partly-cloudy-night"  ) {
                        iconImage.src='./img/002-cloud.svg';
                    } else if (icon === "clear-day"){
                        iconImage.src="./img/001-sun.svg";
                    }
                    // Declaring array to hold days data
                    let weekdays =[];
                    // 5 Day Forecast
                    const { data } = weatherData.daily
                    for(days in data ){
                        //move data into weekdays array
                        weekdays.push(days);
                    }
                    let daysOfWeek = new Map();
                        daysOfWeek.set(0,"Sunday");
                        daysOfWeek.set(1,"Monday");
                        daysOfWeek.set(2,"Tuesday");
                        daysOfWeek.set(3,"Wednesday");
                        daysOfWeek.set(4,"Thursday");
                        daysOfWeek.set(5,"Friday");
                        daysOfWeek.set(6,"Saturday");
                    
                })
            });
        }
});

