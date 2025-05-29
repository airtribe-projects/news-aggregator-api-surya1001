const User = require("./user.schema");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body
        const userInDB = await User.findOne({ email });
        if(userInDB) return res.status(400).send("User already exists")

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        const savedUser = await user.save();
        const userObj = savedUser.toObject();
        delete userObj.password;

        return res.status(200).json(userObj);
    } catch (err) {
        console.log("Error in registering user ", err);
        return res.status(403).send("Something went wrong")
    }
}

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let {email, password} = req.body;
        const userFromDB = await User.findOne({ email });
        if(!userFromDB) return res.status(403).send("User doesn't exists");

        const comparePassword = bcrypt.compareSync(password, userFromDB.password);
        if(!comparePassword) return res.status(403).send("Password didn't matched");

        const token = jwt.sign({ userId: userFromDB._id, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.json({
            token
        });

    } catch (err) {
        console.log("error in logging user ", err);
        return res.status(403).send("something went wrong")
    }
}


const getPreferences = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('preferences');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user.preferences);
    } catch (err) {
        console.log("error in getting preference ", err);
        res.status(500).json({ message: 'Server error' });
    }
}
  
const updatePreferences = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { categories, languages } = req.body;
    if(!categories && !languages) return res.status(400).json({message: "Categories or Languages is required"})
    try {
        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { preferences: { categories, languages } },
            { new: true, runValidators: true }
        ).select('preferences');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user.preferences);
    } catch (err) {
        console.log("error in updating preference ", err);
        res.status(400).json({ message: err.message });
    }
}

  
module.exports = {
    register,
    login,
    getPreferences,
    updatePreferences
}