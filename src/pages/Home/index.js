import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  OverlayTrigger,
  Popover,
  Spinner,
} from "react-bootstrap";
import orderService from "../../services/order.service";
import OrderForm from "./OrderForm";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editOrder, setEditOrder] = useState();
  const [deleteOrderId, setDeleteOrderId] = useState();

  const getOrders = async () => {
    setLoading(true);
    const response = orderService.getOrders();
    if (response.status === 200) {
      setOrders(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, []);

  const onAddClick = (data = {}) => {
    setEditOrder(data);
  };

  const deletOrder = () => {
    const response = orderService.deleteOrder(deleteOrderId);
    if (response.status === 200) {
      setDeleteOrderId();
      getOrders();
    }
  };

  return (
    <Container className="d-flex mt-4 flex-column">
      <div className="d-flex mb-4 mt-4  justify-content-between">
        <h2>Orders</h2>
        <Button onClick={() => onAddClick({})}>Add</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Crust</th>
            <th>Flavor</th>
            <th>Size</th>
            <th>Table No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!loading && orders.length ? (
            orders.map((order) => {
              return (
                <tr key={`${order.Order_ID}`}>
                  <td>{order.Crust}</td>
                  <td>{order.Flavor}</td>
                  <td>{order.Size}</td>
                  <td>{order.Table_No}</td>
                  <td className="d-flex align-item-center">
                    <OverlayTrigger
                      trigger="click"
                      placement="top"
                      show={deleteOrderId === order.Order_ID}
                      overlay={
                        <Popover id={`popover-basic-${order.Order_ID}`}>
                          <Popover.Header as="h3">Are you sure?</Popover.Header>
                          <Popover.Body>
                            <Button variant="danger" onClick={deletOrder}>
                              Delete
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={setDeleteOrderId}
                              className="ms-2"
                            >
                              Cancel
                            </Button>
                          </Popover.Body>
                        </Popover>
                      }
                    >
                      <Button
                        variant="danger"
                        onClick={() => setDeleteOrderId(order.Order_ID)}
                      >
                        Delete
                      </Button>
                    </OverlayTrigger>
                    <Button
                      variant="dark"
                      className="ms-2"
                      onClick={() => onAddClick(order)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colspan="5" className="text-center">
                {loading ? (
                  <Spinner
                    animation="border"
                    className="d-flex align-self-center m-auto"
                    role="status"
                  ></Spinner>
                ) : (
                  "No order found"
                )}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {!!editOrder && (
        <OrderForm
          order={editOrder}
          onHide={() => {
            setEditOrder();
            getOrders();
          }}
        />
      )}
    </Container>
  );
};

export default Home;
