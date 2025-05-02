import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const register = async (req, res) => {
    console.log("Registering user:", req.body);
    if (!req.body || !req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validates email format
    if (!emailRegex.test(req.body.email)) {
        console.log("Invalid email format:", req.body.email);
        return res.status(400).json({ message: 'Invalid email format' });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least one letter and one number
    if (!passwordRegex.test(req.body.password)) {
        console.error("Invalid password format:", req.body.password);
        return res.status(400).json({ message: 'Invalid password format. Password must be at least 8 characters long and include at least one letter and one number.' });
    }

    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const savedUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        console.log("User saved:", savedUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error saving user:", error);
        return res.status(500).json({ message: `Error saving user: ${error}` });
    }
};

const login = async (req, res) => {
    console.log("Logging in user:", req.body);
    if (!req.body || !req.body.name || !req.body.password) {
        return res.status(400).json({ message: 'Name and password are required' });
    }

    const { name, email, password } = req.body;

    if ((!email && !password) || !password) {
        console.log("Email and password are required", email, password);
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ name }).select('+password');
        if (!user) {
            console.log("User not found", user.name);
            return res.status(404).json({ message: 'User not found' });
        }

        if (email && user.email !== email) {
            console.log("Email does not match the registered email for this user:", user.name);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);
        if (!isMatch) {
            console.log("Invalid credentials", user.name);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        console.log("User logged in successfully", user.name);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: `Error logging in user: ${error}` });
    }
}

export default { 
    register,
    login
};