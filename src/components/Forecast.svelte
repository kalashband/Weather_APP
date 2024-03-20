<!-- src/components/Forecast.svelte -->
<script lang="ts">
  import { forecast } from '../lib/api';
  import { onMount } from 'svelte';
  import { readable } from 'svelte/store';

  export let city: string;

  // Define interface for forecast data
  interface ForecastData {
    list: {
      dt: number;
      main: {
        temp: number;
      };
      weather: {
        description: string;
      }[];
    }[];
  }

  // Store for forecast data
  export const forecastData = readable(null, function start(set) {
    async function fetchData(city: string) {
      try {
        const data = await forecast(city);
        set(data as ForecastData); // Type assertion
      } catch (error) {
        console.error('Failed to fetch forecast data:', error);
      }
    }

    fetchData(city);

    // Cleanup function
    return function stop() {};
  });
</script>

{#if $forecastData}
<div>
  <h2>5-Day Forecast for {city}</h2>
  <ul>
    <!-- {#each $forecastData.list as item} -->
      <!-- <li>
        <p>Date: {new Date(item.dt * 1000).toLocaleDateString()}</p>
        <p>Temperature: {(item.main.temp - 273.15).toFixed(2)}°C</p>
        <p>Description: {item.weather[0].description}</p>
      </li> -->
    <!-- {/each} -->
  </ul>
</div>
{:else}
<p>Loading...</p>
{/if}
