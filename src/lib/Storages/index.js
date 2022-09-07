export default {
    /**
     * @function set
     * @description 设置sessionStorage的值
     * @param {string} key 键
     * @param {any} value 值
     */
    set: (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    /**
     * @function get
     * @description 获取sessionStorage的值
     * @param {string} key 键
     */
    get: (key) => {
        return JSON.parse(sessionStorage.getItem(key));
    },
    /**
     * @function remove
     * @description 删除sessionStorage的值
     * @param {string} key 键
     */
    remove: (key) => {
        sessionStorage.removeItem(key);
    },
    /**
     * @function clear
     * @description 清空sessionStorage
     */
    clear: () => {
        sessionStorage.clear();
    },
}