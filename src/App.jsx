import { useState } from "react";

const API = {
	key: "74087a43755a584e6bf15cc2a7edf687",
	base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
	const [query, setQuery] = useState("");
	const [weather, setWeather] = useState({});
	const [background, setBackground] = useState(false);

	const search = (event) => {
		if (event.key === "Enter") {
			fetch(`${API.base}weather?q=${query}&units=metric&appid=${API.key}`)
				.then((response) => response.json())
				.then((data) => {
					setWeather(data);
					setQuery("");
					setBackground(true);
					console.log(data);
				});
		}
	};

	const dateBuilder = (d) => {
		let months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		let days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};

	const defaultStyle = {
		backgroundImage: "url(https://source.unsplash.com/1600x900/?landscape)",
	};

	const customStyle = {
		backgroundImage: `url(https://source.unsplash.com/1600x900/?${weather.name})`,
	};

	return (
		// spread operator is being used to create a new object that combines the defaultStyle object with the customStyle object. The resulting object will have all of the properties of defaultStyle, as well as any properties of customStyle that override or add to the properties in defaultStyle.
		<div
			className="App"
			style={!background ? { defaultStyle } : { ...customStyle }}
		>
			<main>
				<div className="search-box">
					<input
						type="text"
						className="search-bar"
						id="input_field"
						placeholder="Search..."
						onChange={(e) => setQuery(e.target.value)}
						value={query}
						onKeyPress={search}
					/>
				</div>

				{/* Checking if youve done a search query or not */}
				{typeof weather.main != "undefined" ? (
					<div className="content">
						<div className="location-box">
							<div className="location">
								{weather.name}, {weather.sys.country}
							</div>
							<div className="date">
								{dateBuilder(new Date())}
							</div>
						</div>
						<div className="weather-box">
							<div
								className="temp"
								style={
									weather.main.temp > 10
										? { color: "#bf3a37" }
										: { color: "#4858c2" }
								}
							>
								{Math.round(weather.main.temp)}°C
							</div>
							<div className="weather">
								{weather.weather[0].main}
							</div>
						</div>
					</div>
				) : (
					""
				)}

				{weather.cod != "404" ? (
					""
				) : (
					<div className="error">Invalid City</div>
				)}
			</main>
		</div>
	);
}

export default App;
