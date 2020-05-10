<template>
  <div>
    <h1>Events for user {{user.user.name}}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
   <router-link :to="{name: 'event-list',query:{page:page-1}}" rel="prev">
    Prev Page </router-link>
    <template v-if="hasNextPage"> | </template>
    </template> 
   <router-link v-if="hasNextPage" :to="{name: 'event-list',query:{page:page+1}}" rel="prev">
    Next Page </router-link>

  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
//import axios from 'axios'
// import EventService from '@/services/EventService.js'
import {mapState} from 'vuex'
export default {
  components: {
    EventCard
  },
  // data() {
  //   return {
  //     events: []
  //   }
  // },
  created() {
    this.perPage = 3 // Setting perPage here and not in data means it won't be reactive.
    // We don't need it to be reactive, and this way our component has access to it.

     //axios
      //// .get('http://localhost:3000/events')
    //  EventService.getDataEvents()
    //      .then(response => {
    //     this.events = response.data
    //     console.log(response.data)
    //   })
    //   .catch(error => {
    //     console.log('There was an error' + error.response)
    //   })

  // this.$store.dispatch('fetchEvents', {
    this.$store.dispatch('event/fetchEvents', { //event namespaced is true in event.js
      perPage :this.perPage,
      page : this.page
    })
  },
  computed: {
    page(){
       return parseInt(this.$route.query.page) || 1  //if no url query parameters,assume first page
    },
    hasNextPage(){
      return this.event.eventsTotal > this.page * this.perPage
    },
   ...mapState(['event','eventsTotal','user'])
}
}
</script>
