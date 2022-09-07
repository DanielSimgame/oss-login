import {createStore} from "vuex"
import {getters} from "./getters"
import {mutations} from "./mutations"
import {actions} from "./actions"

export const store = createStore({
  state() {
    return {
      appData: {
        // apiServer: 'http://127.0.0.1:4523/m1/1331394-0-default',
        // apiServer: 'http://10.140.22.99:8002',
        apiServer: 'http://localhost:8000',
        title: 'SSO单点登录',
        version: '1.0.0',
      },
      userInfo: {
        token: '',
        uid: '',
        name: '',
        username: '',
        isLoggedIn: false,
      }
    }
  },
  getters,
  mutations,
  actions
})
