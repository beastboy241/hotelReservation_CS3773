var userProfile = (function() {
  var full_name = "";
  var accountType ='';
  var main_session = false;

  var getName = function() {
    return full_name;    
  };

  var setName = function(name) {
    full_name = name;     
  };

  var getType = function() {
    return accountType;    
  };

  var setType = function(type) {
    accountType = type;     
  };

  var getSession = function(){
    return main_session;
  };

  var setSession = function(session){
    main_session = session;
  };

  return {
    getName: getName,
    setName: setName,
    getType: getType,
    setType: setType,
    getSession: getSession,
    setSession: setSession
  }

})();

export default userProfile;
