const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
router.get('/', (req, res) => {
  res.json(Order.getAll());
});
router.post('/', (req, res) => {
  const { items, total, tableNumber } = req.body;
  if (!items || !tableNumber) {
    return res.status(400).json({ error: 'اطلاعات ناقص است' });
  }
  const order = Order.create({ items, total, tableNumber });
  res.status(201).json(order);
});
router.patch('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = Order.updateStatus(id, status);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ error: 'سفارش یافت نشد' });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleted = Order.delete(id);
  if (deleted) {
    res.json({ message: 'سفارش حذف شد' });
  } else {
    res.status(404).json({ error: 'سفارش یافت نشد' });
  }
});
module.exports = router;