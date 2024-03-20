<!-- src/components/SearchBar.svelte -->
<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { weather } from "../lib/api";
  import { readable } from "svelte/store";

  const dispatch = createEventDispatcher();

  export let city: string;

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
    console.log(city);
    

    // Refresh weather data every 10 minutes
    const interval = setInterval(() => {
      fetchData(city);
    }, 600000);

    // Cleanup function
    return function stop() {
      clearInterval(interval);
    };
  });

  let location = "";

  function search() {
    dispatch("search", location);
    location = ""; // Clear input after search
  }
</script>

{#if $weatherData}
  <div class=" grid content-around h-full">
    <input
      type="text"
      bind:value={location}
      placeholder="Enter city or zip code"
      class="w-34 p-4 border text-gray-600"
    />
    <button on:click={search} class="p-2 text-2xl  font-extrabold ">Search</button>

    <div
      class="bg-darkblue py-4 px-5 flex flex-col items-center space-y-4 text-gray-250"
    >
      <h2 class="text-2xl">Temperature:</h2>
      <div class="flex justify-between space-x-5">
        <h2 class="text-gray-250 text-[100px] font-medium">
          {$weatherData.timelines.minutely[0].values.temperature.toFixed(2)}°C
        </h2>
      </div>
      <div
        class="flex flex-col items-center text-center text-gray-350 text-lg space-y-5"
      >
        <h3><span class="mdi mdi-map-marker"></span>{city}</h3>
      </div>
    </div>
  </div>
{:else}
  <p>...</p>
{/if}
