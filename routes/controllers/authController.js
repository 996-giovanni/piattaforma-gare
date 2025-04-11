// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

exports.registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email già registrata' });

    const user = await User.create({ email, password });
    res.status(201).json({ token: generateToken(user) });
  } catch (error) {
    res.status(500).json({ message: 'Errore registrazione', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Credenziali non valide' });
    }

    res.status(200).json({ token: generateToken(user) });
  } catch (error) {
    res.status(500).json({ message: 'Errore login', error: error.message });
  }
};
