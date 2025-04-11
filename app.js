const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);

// Test
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API funzionante' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server attivo su http://localhost:${PORT}`);
});
