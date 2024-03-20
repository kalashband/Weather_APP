<!-- src/routes/index.svelte -->
<script lang="ts">
    import CurrentWeather from '../components/CurrentWeathre.svelte';
    import Forecast from '../components/Forecast.svelte';
    import SearchBar from '../components/SearchBar.svelte';
  
    let city = 'Mumbai'; // Default city
  
    function handleSearch(event: CustomEvent<string>) {
      city = event.detail;
    }
</script>
<div class=" flex justify-around content-center ">
  
<aside>
  <h2  class="flex justify-center space-x-5 p-10 text-2xl" >Search</h2>
  <SearchBar on:search={handleSearch}  {city}/>
</aside>

<main>
  <h1 class="flex justify-center space-x-5 p-10 text-2xl">Weather App</h1>
  <CurrentWeather {city} />
  <!-- <Forecast {city} /> -->
</main>
</div>



<style>
  /* Add your Tailwind CSS styles here */
</style>
