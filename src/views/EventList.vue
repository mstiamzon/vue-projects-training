<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
//import axios from 'axios'
import EventService from '@/services/EventService.js'

export default {
  components: {
    EventCard
  },
  data() {
    return {
      events: []
    }
  },
  created() {
     //axios
      //// .get('http://localhost:3000/events')
     EventService.getDataEvents()
         .then(response => {
        this.events = response.data
        console.log(response.data)
      })
      .catch(error => {
        console.log('There was an error' + error.response)
      })
  }
}
</script>
