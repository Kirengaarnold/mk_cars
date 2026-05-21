const bcrypt = require('bcrypt');
const db = require('../config/db');

const Register = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ message: 'all fields are required' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const [result] = await db.promise().query(
      'INSERT INTO admin(name,password) VALUES(?,?)',
      [name, hashedPassword]
    );

    res.status(201).json({ admin_id: result.insertId, name });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'something went wrong' });
  }
};

const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.status(400).json({ error: 'username and password required' });
    }

    const [rows] = await db.promise().query('SELECT * FROM admin WHERE name = ?', [name]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'user not found' });
    }

    const user = rows[0];
    let passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch && user.password === password) {
      passwordMatch = true;
    }

    if (!passwordMatch) {
      return res.status(401).json({ error: 'incorrect password' });
    }

    req.session.adminId = user.admin_id;
    req.session.adminName = user.name;

    res.json({ admin_id: user.admin_id, name: user.name });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'something went wrong' });
  }
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Unable to logout' });
    }
    res.clearCookie('connect.sid');
    res.json({ message: 'Logged out successfully' });
  });
};

const me = async (req, res) => {
  if (!req.session || !req.session.adminId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  res.json({ admin_id: req.session.adminId, name: req.session.adminName });
};

module.exports = {
  Register,
  login,
  logout,
  me,
};