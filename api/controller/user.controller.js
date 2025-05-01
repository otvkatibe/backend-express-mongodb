import bcrypt from 'bcrypt';
import User from '../models/User.js';

const register = async (req, res) => {
    console.log("Registering user:", req.body);
    if (!req.body || !req.body.name || !req.body.password) {
        return res.status(400).json({ message: 'Name and password are required' });
    }

    const { name, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const savedUser = await User.create({
            name,
            password: hashedPassword,
        });
        console.log("User saved:", savedUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error saving user:", error);
        return res.status(500).json({ message: `Error saving user: ${error}` });
    }
};

export default { register };