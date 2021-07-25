const SessionStorageService = (function() {
  let _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(tokenObj) {
    sessionStorage.setItem("access_token", tokenObj.access_token);
    sessionStorage.setItem("refresh_token", tokenObj.refresh_token);
  }
  function _getAccessToken() {
    return sessionStorage.getItem("access_token");
  }
  function _getRefreshToken() {
    return sessionStorage.getItem("refresh_token");
  }
  function _clearToken() {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
  }
  function _setUserId(id) {
    return sessionStorage.setItem("user_id", id);
  }
  function _getUserId() {
    return sessionStorage.getItem("user_id");
  }
  function _clearUserId() {
    return sessionStorage.removeItem("user_id");
  }
  function _setServiceId(id) {
    return sessionStorage.setItem("service_id", id);
  }
  function _getServiceId() {
    return sessionStorage.getItem("service_id");
  }
  function _clearServiceId() {
    return sessionStorage.removeItem("service_id");
  }
  function _setRandomKey(key) {
    return sessionStorage.setItem("random_key", key);
  }
  function _getRandomKey() {
    return sessionStorage.getItem("random_key");
  }
  function _clearRandomKey() {
    return sessionStorage.removeItem("random_key");
  }
  function _setRedirect(key) {
    return sessionStorage.setItem("redirect", key);
  }
  function _getRedirect() {
    return sessionStorage.getItem("redirect");
  }
  function _clearRedirect() {
    return sessionStorage.removeItem("redirect");
  }
  function _setItem(name, payload) {
    sessionStorage.setItem(name, payload);
  }
  function _getItem(name) {
    sessionStorage.getItem(name);
  }
  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
    setUserId: _setUserId,
    getUserId: _getUserId,
    clearUserId: _clearUserId,
    setServiceId: _setServiceId,
    getServiceId: _getServiceId,
    clearServiceId: _clearServiceId,
    setRandomKey: _setRandomKey,
    getRandomKey: _getRandomKey,
    clearRandomKey: _clearRandomKey,
    setRedirect: _setRedirect,
    getRedirect: _getRedirect,
    clearRedirect: _clearRedirect,
    setItem: _setItem,
    getItem: _getItem
  };
})();
export default SessionStorageService;
