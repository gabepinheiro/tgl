function createRequest (method = 'GET') {
  return (route, callback) => {
    const ajax = new XMLHttpRequest()
    ajax.open(method, route)
    ajax.send()
    ajax.addEventListener('readystatechange', handleReadyStateChange)

    function handleReadyStateChange () {
      try {
        if(isRequestOk.call(ajax)) {
          callback(JSON.parse(ajax.responseText))
        }
      } catch (error) {
        callback({
          error: true
        })
      }
    }

    function isRequestOk (){
      return this.readyState === 4 && this.status == 200
    }
  }
}

export const get = createRequest('GET')
