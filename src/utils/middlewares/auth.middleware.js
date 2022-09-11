const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
      return next();
    }
  
    return res.status(401).json("No estás autorizado, debes hacer login");
  };

  const isAllowed=(permissions)=>{
    return (req,res,next)=>{
        const userRole=req.body.role
        if (permissions.includes(userRole)){
            next()
        }else{
            return res.status(401).json("YOU SHALL NOT PASS")
        }
    };   
  }
  
  module.exports = {
    isAuthenticated,
    isAllowed
  }
  
 