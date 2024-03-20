<!-- src/components/CurrentWeather.svelte -->
<script lang="ts">
  import { weather } from "../lib/api";
  import { readable } from "svelte/store";
  import weatherCode from "../WeatherDesc.json"; // Correct the path to your JSON file

  const weatherCodeDescriptions = weatherCode[0].weatherCode;
  function getWeatherDescription(code: string): string {
    return weatherCodeDescriptions[code] || "Unknown";
  }

  export let city: string;

  // Store for weather data
  export const weatherData = readable(null, function start(set) {
    async function fetchData(city: string) {
      try {
        const data = await weather(city);
        set(data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    }

    fetchData(city);

    // Refresh weather data every 10 minutes
    const interval = setInterval(() => {
      fetchData(city);
    }, 600000);

    // Cleanup function
    return function stop() {
      clearInterval(interval);
    };
  });
</script>

{#if $weatherData}
  <div class="my-10">
    
     <h2 class="flex justify-center space-x-5 p-10 text-2xl" >Today's Weather</h2>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center">

      <div
        class="bg-darkblue py-4 px-5 flex flex-col items-center space-y-4 text-gray-250"
      >
        <p class="text-2xl">Wind Speed</p>
        <div class="flex justify-between space-x-5">
          <h2 class="text-5xl font-bold">
            {$weatherData.timelines.minutely[0].values.windSpeed} m/s
          </h2>
        </div>
      </div>
      
      <div
        class="bg-darkblue py-4 px-5 flex flex-col items-center space-y-4 text-gray-250"
      >
        <p class="text-2xl">Description</p>
        <div class="flex justify-between space-x-5">
          <h2 class="text-5xl font-bold">
            {getWeatherDescription(
              $weatherData.timelines.minutely[0].values.weatherCode)}
          </h2>
        </div>
      </div>
      
      <div
        class="bg-darkblue py-4 px-5 flex flex-col items-center space-y-4 text-gray-250"
      >
        <p class="text-2xl">Humidity</p>
        <div class="flex justify-between space-x-5">
          <h2 class="text-5xl font-bold">
            {$weatherData.timelines.minutely[0].values.humidity}%
          </h2>
        </div>
      </div>
      
      <div
        class="bg-darkblue py-4 px-5 flex flex-col items-center space-y-4 text-gray-250"
      >
        <p class="text-2xl">UV Index</p>
        <div class="flex justify-between space-x-5">
          <h2 class="text-5xl font-bold">
            {$weatherData.timelines.minutely[0].values.uvIndex}
          </h2>
        </div>
      </div>
     
    </div>
  </div>
{:else}
  <p>Loading...</p>
{/if}
