const express = require('express');
const cors = require('cors');
const orders = require('./routes/orders');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/orders', orders);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});