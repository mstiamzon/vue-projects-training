import EventService from '@/services/EventService.js'

export const namespaced = true
export const state= {
    
    // categories: ['sustainablity', 'nature', 'housing'],
    
    // events:[
    //   {id:25,title:'SAmple',organizer:'...'},
    //   {id:23,title:'SAmpleTo',organizer:'...'},
    //   {id:25,title:'SAmplelang',organizer:'...'},
    //   {id:25,title:'SAmpleOO',organizer:'...'},
    // ],
    
    events: [],
    eventsTotal: 0,
    event: {}
  }
 export const mutations= {
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
  }
  export const actions= {
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
            commit('SET_EVENTS_TOTAL', parseInt(response.headers['x-total-count']))
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
  }
  
  export const getters= {
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