var userProfile = (function() {
  var full_name = "";
  var main_session = false;

  var getName = function() {
    return full_name;    
  };

  var setName = function(name) {
    full_name = name;     
    
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
    getSession: getSession,
    setSession: setSession
  }

})();

export default userProfile;
