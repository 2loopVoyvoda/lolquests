const log = (err, context) => {
  const message = `error with ${context}: ${err.message}`;
  console.log(message);
  return { error: true, message };
}

export {
  log
}