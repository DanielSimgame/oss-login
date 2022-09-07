export default {
  /**
   * @description 网络请求错误处理，转换错误信息并返回
   * @function parseError
   * @return {String} 错误信息
   * */
  parseError: (error) => {
    if (typeof error.json === 'function') {
      error.json()
        .then((data) => {
          throw new Error(data.message);
        })
    }
    if (error.message) {
      return error.message
    }
    if (error.status) {
      return `${error.status} 具体信息请查看控制台`
    }
    if (error.msg) {
      return error.msg
    }
    return '未知错误'
  },
}
