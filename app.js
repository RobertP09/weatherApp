window.addEventListener('load', () => {
    let lat;
    let long;

    if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                long = position.coords.longitude;
                lat = position.coords.latitude;

                const proxy = 'https://cors-anywhere.herokuapp.com/'
                const api = `${proxy}https://api.darksky.net/forecast/d90bb07911ca703f05a5debfc273ed5a/${lat},${long}`;
                fetch(api)
                .then(response => {
                        return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary } = data.currently;
                })   
            });
        }
});

