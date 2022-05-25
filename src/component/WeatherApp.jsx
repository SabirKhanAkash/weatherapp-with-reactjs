import React, { useState, useEffect } from 'react';

const Weatherapp = () => {
        const [search, setSearch] = useState("Rajshahi");
        const [data, setData] = useState([]);
        const [input, setInput] = useState("");
        let componentMounted = true;

        useEffect(() => {
            const fetchWeather = async () => {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=56632d38bb84f8555911b34ce92aac60`);
                console.log(response.statusText);
                if(response.statusText === "Not Found")
                {
                    alert("Reload the page and Enter a valid City")
                }
                    
                if(componentMounted)
                {
                    setData(await response.json());
                    console.log(data);
                }
                else
                {
                    console.log("wrong");
                }
                
                return () => {
                    console.log("wrong");
                    componentMounted = false;
                }
            }
            fetchWeather();
        },[search]);

        let emoji = null;
        if(typeof data.main != "undefined")
        {
            if(typeof data.weather[0].main === "Clouds")
            {
                emoji = "fa-cloud";
            }
            else if(data.weather[0].main === "Thunderstorm")
            {
                emoji = "fa-bolt";
            }
            else if(data.weather[0].main === "Drizzle")
            {
                emoji = "fa-cloud-rain";
            }
            else if(data.weather[0].main === "Rain")
            {
                emoji = "fa-cloud-shower-heavy";
            }
            else if(data.weather[0].main === "Snow")
            {
                emoji = "fa-snow-flake";
            }
            else 
            {
                emoji = "fa-smog";
            }
        }
        else{
            return (
                <div>

                </div>
            )
        }

        let temp = (data.main.temp - 273.15).toFixed(2);
        let temp_min = (data.main.temp_min - 273.15).toFixed(2);
        let temp_max = (data.main.temp_max - 273.15).toFixed(2);
        let feelsLike = (data.main.feels_like - 273.15).toFixed(2);

        let dRise = new Date(data.sys.sunrise*1000);
        let dSet = new Date(data.sys.sunset*1000);

        let sunrise = dRise.toLocaleString([],{
            hour : '2-digit',
            hour12: true,
            minute : '2-digit'
        });
        let sunset = dSet.toLocaleString([],{
            hour : '2-digit',
            hour12: true,
            minute : '2-digit'
        });

        let d = new Date();
        let date = d.getDate();
        let year = d.getFullYear();
        let month = d.toLocaleString("default", {month:'long'});
        let day = d.toLocaleString("default", {weekday:'long'});

        let time = d.toLocaleString([],{
            hour : '2-digit',
            hour12: true,
            minute : '2-digit'
        });

        const handleSubmit = (event) => {
            event.preventDefault();
            setSearch(input);
        }

    return (
        <div>
            <div className="container mt-S">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div class="card text-white text-center border-0">
                            
                            <div class="card-img-overlay">
                                <form onSubmit={handleSubmit}>
                                    <div class="input-group mb-4 w-100 mx-auto">
                                        <input 
                                        type="search" 
                                        class="form-control" 
                                        placeholder="Enter City Name " 
                                        aria-label="Enter City Name " 
                                        aria-describedby="basic-addon2"
                                        name="search"
                                        value={input}
                                        onChange={(e)=>setInput(e.target.value)}
                                        required
                                        />
                                            <button type="submit" onclick="changeBG()" class="input-group-text" id="basic-addon2">
                                                <i className='fas fa-search'></i>
                                            </button>
                                    <script>
                                        function changeBG() {
                                            document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?"+ data.weather[0].name +"')"
                                        }
                                    </script>
                                    </div>
                                </form>
                                <div className='bg-dark bg-opacity-50 py-5'>
                                    <h2 class="card-title">{data.name}</h2>
                                    <p class="card-text lead">
                                        {day}, {month} {date}, {year}
                                        <br/>
                                        {time}
                                    </p>
                                    <hr/>
                                    <i className={`fas ${emoji} fa-4x`}></i>
                                    <h1 className='fw-bolder mb-5'>{temp}&deg;C</h1>
                                    <p className='lead fw-bolder mb-0'>{data.weather[0].description}</p>
                                    <p className='lead'>Min: {temp_min}&deg;C  |  Max: {temp_max}&deg;C</p>
                                    <p className='lead'>Feels like: {feelsLike}&deg;C </p>
                                    <p className='lead'> Humidity: {data.main.humidity}% | Wind: {data.wind.speed} km/h</p>
                                    <hr/>
                                    <p className='lead'>Sunrise:  {sunrise} |  Sunset: {sunset}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weatherapp;