const createError = require('http-errors');

exports.isLoggedIn = (currentUser) => (req, res, next) => {
  console.log("hola")
  if (currentUser) {
    next();
  } else {
    next(createError(401));
  }
};

exports.isNotLoggedIn = () => (req, res, next) => {
  if (!ctx.session.currentUser) {
    next();
  } else {
    next(createError(403));
  }
};

exports.validationLoggin = () => (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next(createError(422))
  } else {
    next();
  }
}
