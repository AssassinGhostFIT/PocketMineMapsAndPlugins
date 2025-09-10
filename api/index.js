// Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();

// ==========================================
// CONEXIÓN A LA BASE DE DATOS
// ==========================================
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB conectado correctamente.'))
    .catch(err => console.error('Error de conexión a MongoDB:', err));

// ==========================================
// DEFINICIÓN DEL MODELO DE USUARIO
// ==========================================
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

// =chos=========================================
// MIDDLEWARE
// ==========================================
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ==========================================
// RUTAS
// ==========================================
// Ruta de registro
app.post('/register', async (req, res) => {
    const { name, lastname, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('El correo electrónico ya está registrado.');
        }

        user = new User({ name, lastname, email, password });
        await user.save();
        
        // Redirigir al usuario después de un registro exitoso
        res.status(200).send('<script>alert("Registro exitoso!"); window.location.href="/login.html";</script>');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

// Ruta de login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('<script>alert("Credenciales inválidas."); window.location.href="/login.html";</script>');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('<script>alert("Credenciales inválidas."); window.location.href="/login.html";</script>');
        }

        // Login exitoso, puedes redirigir a una página de perfil o de bienvenida
        res.status(200).send('<script>alert("¡Inicio de sesión exitoso!"); window.location.href="/plugins.html";</script>');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error del servidor');
    }
});

module.exports = app;