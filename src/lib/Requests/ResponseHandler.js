const responseHandler = (response) => {
  if (response !== null && (response.status === 200 || response.status === 0)) {
    return response
  } else {
    console.log(response)
    return Promise.reject(response)
  }
}
export default responseHandler
