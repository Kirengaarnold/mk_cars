const requireLogin = (req, res, next) => {
  if (req.session && req.session.adminId) {
    return next()
  }
  return res.status(401).json({ error: 'Unauthorized' })
}

const requireUser = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next()
  }
  return res.status(401).json({ error: 'Unauthorized' })
}

module.exports = { requireLogin, requireUser }
