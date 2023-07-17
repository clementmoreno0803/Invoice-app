<template>
  <div>
   <h3>#{{ randomName }}</h3>
   <h3>Due to {{ date }}</h3> 
   <h3>{{ clientName }}</h3> 
   <h3>{{ total }}</h3> 
  </div>
</template>

<script>

export default {
props: ["randomName","date","clientName","total"]
}
</script>

<style>

</style>