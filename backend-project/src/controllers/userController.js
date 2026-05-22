const bcrypt = require('bcrypt');
const db = require('../config/db');

const Register = async (req, res) => {
  try {
    const { username, password, employee_id } = req.body;
    if (!username || !password || !employee_id) {
      return res.status(400).json({ message: 'all fields are required' });
    }

    const [employeeRows] = await db.promise().query(
      'SELECT employee_id FROM mk_employees WHERE employee_id = ?',
      [employee_id]
    );

    if (employeeRows.length === 0) {
      return res.status(400).json({ message: 'selected employee does not exist' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const [result] = await db.promise().query(
      'INSERT INTO mk_user(employee_id, username, password) VALUES(?,?,?)',
      [employee_id, username, hashedPassword]
    );

    res.status(201).json({ user_id: result.insertId, username, employee_id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'something went wrong' });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'username and password required' });
    }

    const [rows] = await db.promise().query('SELECT * FROM mk_user WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'user not found' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'incorrect password' });
    }

    req.session.userId = user.user_id;
    req.session.username = user.username;
    req.session.employeeId = user.employee_id;

    res.json({ user_id: user.user_id, username: user.username, employee_id: user.employee_id });
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
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const [rows] = await db.promise().query(
      'SELECT u.user_id, u.username, u.employee_id, e.firstname, e.lastname, e.department, e.position, e.email FROM mk_user u LEFT JOIN mk_employees e ON u.employee_id = e.employee_id WHERE u.user_id = ?',
      [req.session.userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User profile not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'something went wrong' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.promise().query(
      'DELETE FROM mk_user WHERE user_id = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'user record not found' });
    }
    res.json({ message: 'user deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {
  Register,
  login,
  logout,
  me,
  deleteUser,
};

