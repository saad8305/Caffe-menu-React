let orders = [];
let currentId = 1;
const Order = {
  create: (orderData) => {
    const order = {
      id: currentId++,
      ...orderData,
      status: 'در انتظار',
      timestamp: Date.now()
    };
    orders.push(order);
    return order;
  },
  getAll: () => [...orders].reverse(),
  getById: (id) => orders.find(o => o.id == id),
  updateStatus: (id, status) => {
    const order = orders.find(o => o.id == id);
    if (order) {
      order.status = status;
      return order;
    }
    return null;
  },
  delete: (id) => {
    const index = orders.findIndex(o => o.id == id);
    if (index !== -1) {
      orders.splice(index, 1);
      return true;
    }
    return false;
  }
};
module.exports = Order;