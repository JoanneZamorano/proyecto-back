const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
      return next();
    }
  
    return res.status(401).json("No estás autorizado, debes hacer login");
  };


  const isAllowed = (req, res, next) => {
    console.log("recogemos req auth ", req.isAuthenticated());
    console.log("recogemos locals ", res.locals.user);
    
      if(req.user && req.user.role === "admin") {
        return next();
      } else {
        return res.status(401).json("YOU SHALL NOT PASS");
      }
    }
  // const isAllowed=(permissions)=>{
    
  //   return (req,res,next)=>{
  //       console.log("recogemos req auth ", req.isAuthenticated());
  //       console.log("recogemos locals ",res.locals.user)
  //       if (req.user && permissions.includes(req.user.role)){
  //           return next()
  //       }else{
  //           return res.status(401).json("YOU SHALL NOT PASS")
  //       }
  //   };   
  // }
  
  module.exports = {
    isAuthenticated,
    isAllowed
  }
  
 