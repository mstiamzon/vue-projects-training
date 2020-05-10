<template>
  <div>
   <h4>created user {{user.name}}</h4>
   <h4> Hello user Id {{user.id}} </h4>

   <div v-for="cat in categories" :key="cat.id"> {{cat}}</div>
  
   There are {{catLength}} categories

   <div>
   </div>
   <!-- Passing the Getters function {{getEvent(25)}}
    -->
      <!-- getting for mapGetters -->
      Passing the Getters {{getEventsId(25)}}
   <input type="number" v-model.number="incrementBy"> 
   <button @click="incrementCount">INCREMENT </button>

    <br>
    <p>-----------------------------------------------------</p>
        <form @submit.prevent="createEvent">
          <h3>Select a category</h3>
          <select v-model="event.category">
            <option v-for="cat in categories" :key="cat">{{ cat }}</option>
          </select>
          <h3>Name & describe your event</h3>
          <div class="field">
            <label>Title</label>
            <input v-model="event.title" type="text" placeholder="Add an event title"/>
          </div>
          <div class="field">
            <label>Description</label>
            <input v-model="event.description" type="text" placeholder="Add a description"/>
          </div>
          <h3>Where is your event?</h3>
          <div class="field">
            <label>Location</label>
            <input v-model="event.location" type="text" placeholder="Add a location"/>
          </div>
          <h3>When is your event?</h3>
          <div class="field">
            <label>Date</label>
            <datepicker v-model="event.date" placeholder="Select a date"/>
          </div>
          <div class="field">
            <label>Select a time</label>
            <select v-model="event.time">
              <option v-for="time in times" :key="time">{{ time }}</option>
            </select>
          </div>
          <input type="submit" class="button -fill-gradient" value="Submit"/>
        </form>


  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Datepicker from 'vuejs-datepicker'
export default {
  components: {
    Datepicker
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      incrementBy: 0,
      times,
      categories: this.$store.state.categories,
      event: this.createFreshEventObject(),
      user: this.$store.state.user
    }
  },

  ///mapState
  // computed: {
  //   userName() {
  //     return this.$store.state.user.name
  //   },
  //   userId(){
  //     return this.$store.state.user.id
  //   }
  // }

  // computed: mapState({
  //   userName : state => state.user.name,
  //   userId: state => state.user.id,
  //   categories: state => state.categories
  // })

  // computed: mapState({
  //   user: 'user',
  //   categories: 'categories'
  // })
  // computed: mapState(['user','categories']),
  ///mapstate

  computed: {
    //mapgetters function
    catLength() {
      return this.$store.getters.catLength
    },
    //  getEvent()
    //  {
    //     return this.$store.getters.getEventsId
    //  },
    ...mapGetters(['getEventsId'])
    // ...mapState(['user','categories'])
  },
  methods: {
    incrementCount() {
      //this.$store.commit('INCREMENT_COUNT',this.incrementBy)
      this.$store.dispatch('updateCount', this.incrementBy)
    },
    createFreshEventObject() {
      const user = this.$store.state.user
      const id = Math.floor(Math.random() * 10000000)

      return {
        id: id,
        user: user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: []
      }
    },
    createEvent() {
      this.$store
        .dispatch('createEvent', this.event)
        .then(() => {
          this.router.push({
            name: 'event-show',
            params: { id: this.event.id }
          })
          this.event = this.createFreshEventObject()
        })
        .catch(() => {
          console.log('There was a problem')
        })
    }
  }
}
</script>

<style  scoped>
</style>
