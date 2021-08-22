import { Order } from "./../types/types.d";
// import customAxios from "./customAxios";

const setOrders = (orders: Order[]) => {
  return localStorage.setItem("orders", JSON.stringify(orders));
};

const getOrders = () => {
  const data = JSON.parse(localStorage.getItem("orders") || "") || [];
  return {
    status: 200,
    data,
  };
  // return customAxios.get("orders");
};

const addOrder = (order: Order) => {
  if (order.Order_ID) {
    return editOrder(order.Order_ID, order);
  }
  const allOrders = getOrders().data;
  order.Order_ID = new Date().getTime();
  allOrders.push(order);
  setOrders(allOrders);
  return {
    status: 201,
  };
  // return customAxios.post("orders", {
  //   data,
  // });
};
const editOrder = (Order_ID: number, order: Order) => {
  const allOrders = getOrders().data;
  const orderIndex = allOrders.findIndex(
    (order: Order) => order.Order_ID === Order_ID
  );
  if (orderIndex > -1) {
    allOrders[orderIndex] = order;
    setOrders(allOrders);
  }
  return {
    status: 200,
  };
};

const deleteOrder = (Order_ID: number) => {
  const allOrders = getOrders().data;
  const newOrders = allOrders.filter(
    (order: Order) => order.Order_ID !== Order_ID
  );
  setOrders(newOrders);
  return {
    status: 200,
  };
  // return customAxios.delete(`orders/${id}`);
};

const orderService = {
  getOrders,
  addOrder,
  editOrder,
  deleteOrder,
};

export default orderService;
