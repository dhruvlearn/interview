// import customAxios from "./customAxios";

const setOrders = (orders) => {
  return localStorage.setItem("orders", JSON.stringify(orders));
};

const getOrders = () => {
  const data = JSON.parse(localStorage.getItem("orders")) || [];
  // return customAxios.get("orders");
  return {
    status: 200,
    data,
  };
};

const addOrder = (data) => {
  if (data.Order_ID) {
    return editOrder(data.Order_ID, data);
  }
  const allOrders = getOrders().data;
  data.Order_ID = new Date().getTime();
  allOrders.push(data);
  setOrders(allOrders);
  return {
    status: 201,
  };
  // return customAxios.post("orders", {
  //   data,
  // });
};
const editOrder = (Order_ID, data) => {
  const allOrders = getOrders().data;
  const orderIndex = allOrders.findIndex(
    (order) => order.Order_ID === Order_ID
  );
  if (orderIndex > -1) {
    allOrders[orderIndex] = data;
    setOrders(allOrders);
  }
  return {
    status: 200,
  };
};

const deleteOrder = (Order_ID) => {
  const allOrders = getOrders().data;
  const newOrders = allOrders.filter((order) => order.Order_ID !== Order_ID);
  setOrders(newOrders);
  return {
    status: 200,
  };
  // return customAxios.delete(`orders/${id}`);
};

export default {
  getOrders,
  addOrder,
  editOrder,
  deleteOrder,
};
