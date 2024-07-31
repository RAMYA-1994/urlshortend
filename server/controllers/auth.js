const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport(config.smtpConfig);

exports.register = async (req, res) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ email, firstName, lastName, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: '1d',
    });

    const url = `http://localhost:3000/activate/${token}`;

    await transporter.sendMail({
      to: user.email,
      subject: 'Activate Your Account',
      html: `Click <a href="${url}">here</a> to activate your account`,
    });

    res.status(201).json({ msg: 'Registration successful, please check your email to activate your account' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.activate = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(400).json({ msg: 'Invalid token' });

    user.isActive = true;
    await user.save();

    res.status(200).json({ msg: 'Account activated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.isActive)
      return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      expiresIn: config.jwtExpiration,
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: 'Email not found' });

    const token = crypto.randomBytes(20).toString('hex');
    const url = `http://localhost:3000/reset-password/${token}`;

    await transporter.sendMail({
      to: user.email,
      subject: 'Reset Password',
      html: `Click <a href="${url}">here</a> to reset your password`,
    });

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    res.status(200).json({ msg: 'Password reset link has been sent to your email' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ msg: 'Invalid or expired token' });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ msg: 'Password has been reset successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
