module.exports = {
  loggedIn() {
    return Boolean(localStorage.token);
  }
};
