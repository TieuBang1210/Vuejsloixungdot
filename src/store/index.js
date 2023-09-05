
import { createStore } from 'vuex'

const store = createStore({
    state () {
      return {
        count: 0
      }
    },


    mutations: {
        increment (state) {
          state.count++
        }
      },

      actions: {
           async createTask({ commit }) {
            try {

            } catch(e) {
                
            }

            }
        },
      
    });
   



export default store;
