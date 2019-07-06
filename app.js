window.addEventListener('load', () => {
    let lat;
    let long;
    const temperatureDegree = document.querySelector('.temperature');
    const weatherSummary = document.querySelector('.summary');
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
                .then(data => {
                    //Logging data so we can work with it
                    console.log(data);
                    //Taking portions of the API
                    const { temperature, summary , icon} = data.currently;
                    //Set DOM elements from the api
                    weatherSummary.textContent = summary;
                    temperatureDegree.textContent = `${temperature} degrees`;

                    //Set icon based on icon info from API
                    if(icon === "cloudy" ||  "partly-cloudy-day" ||  "partly-cloudy-night"  ) {
                        iconImage.src='./img/002-cloud.svg';
                    } else if (icon === "clear-day"){
                        iconImage.src="./img/001-sun.svg";
                    }
                })
            });
        }
});

