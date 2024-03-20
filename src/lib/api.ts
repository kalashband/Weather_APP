// src/lib/api.ts
const API_KEY = 'E9kjUn8YZcYb89hUgSu9gKn1kjgRkj9x'; // Replace with your API key E9kjUn8YZcYb89hUgSu9gKn1kjgRkj9x WRoxLyk4s7Se5SfDkVxRB95aAAaYQ1ls 0crMZqbwmeZ4cRM8DtSgtRRB2Zy0vPuP
const BASE_URL = 'https://api.tomorrow.io/v4/weather/forecast?';

export async function weather(city: string) {
  const response = await fetch(`${BASE_URL}location=${city}&apikey=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  console.log(response);
  return response.json();
}

export async function forecast(city: string) {
  const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}`);
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  return response.json();
}
