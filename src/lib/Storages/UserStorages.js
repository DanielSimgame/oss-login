import Storages from "./index"
import {store} from "../store";

export default {
    /**
     *
     * @param {String} token
     */
    setToken: (token) => {
        Storages.set("jwt", token);
    },
    getToken: () => {
        return Storages.get("jwt");
    },
    delToken: () => {
        Storages.remove("jwt");
    },
    /**
     *
     * @param {String} role
     */
    setRole: (role) => {
        store.commit("setUserRole", role);
    },
    delUserInfoInSession: () => {
        Storages.remove("userInfo");
    }
}
