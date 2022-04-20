const errorMessages = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  408: 'Timeout',
  410: 'Gone',
  429: 'Too many requests',
  500: 'Internal Server Error',
  503: 'Service Unavailable',
  504: 'Server Timeout',
}

const log = (err, context) => {
  if(err.context) {
    throw err;
  } else {
    //firebase uses err.code and regular errors use err.response.status
    const message = err.response ? `Error ${context}: ${err.message}, ${errorMessages[err.response.status]}`: `Error ${context}: ${err.message}`;
    console.log(message)
    const error = {message, context, error: true}
    throw error; 
  }
}

const logAndSend = (res, err, context) => {
  if(!err.context) {
    // console.log(err.response.status)
    const code = errorMessages[err.response.status];
    const message = `Error ${context}: ${err.message}, ${code}`;
    console.log(message);
    const error = {message, context, error: true}
    res.send(error)
  } else {
    res.send(err);
  }
}

export {
  log,
  logAndSend
}