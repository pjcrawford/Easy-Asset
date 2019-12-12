exports.currentUser = function(req, res) {
    const user = {
      email: req.user.email,
      token: tokenForUser(req.user),
      watchList: req.user.watchList
    }
  
    res.send(user)
  }