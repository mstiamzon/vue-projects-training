import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 1, name: 'laine' },
    categories: ['sustainablity', 'nature', 'housing'],
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false }
    ],
    // events:[
    //   {id:25,title:'SAmple',organizer:'...'},
    //   {id:23,title:'SAmpleTo',organizer:'...'},
    //   {id:25,title:'SAmplelang',organizer:'...'},
    //   {id:25,title:'SAmpleOO',organizer:'...'},
    // ],
    count: 0,
    usercount: null,
    events: [],
    eventsTotal: [],
    event: {}
  },
  mutations: {
    INCREMENT_COUNT(state, value) {
      state.count += value
    },
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_TOTAL(state, eventsTotal) {
      state.eventsTotal = eventsTotal
    },
    SET_EVENT_MUTATION(state, event) {
      state.event = event
    }
  },
  actions: {
    updateCount({ state, commit }, value) {
      if (state.user) {
        commit('INCREMENT_COUNT', value)
      }
    },
    createEvent({ commit }, event) {
      return EventService.postEvent(event).then(() => {
        commit('ADD_EVENT', event)
      })
    },
    fetchEvents({ commit }, { perPage, page }) {
      EventService.getDataEvents(perPage, page)
        .then(response => {
          commit('SET_EVENTS', response.data)
          console.log('Total events are ' + response.headers['x-total-count'])
        })
        .catch(error => {
          console.log('There was an error' + error.response)
        })
    },
    fetchEventMutation({ commit,getters }, id) {
      var eventid = getters.getEventsId(id)
      if (eventid) {
        commit('SET_EVENT_MUTATION', eventid)
      } else {
          EventService.getDataEvents(id)
        .then(response => {
            commit('SET_EVENT_MUTATION', response.data)
          })
          .catch(error => {
            console.log('There was an error' + error.response)
          })
      }
    }
  },
  getters: {
    catLength: state => {
      return state.categories.length
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    activeTodosCount: state => {
      return state.todos.filter(todo => !todo.done)
    },
    getEventsId: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
