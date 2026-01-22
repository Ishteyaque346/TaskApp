import { User } from '../models/User.js';

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.toJSON());
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, email },
      { new: true, runValidators: true }
    );

    res.json({ 
      message: 'Profile updated successfully',
      user: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
};
