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
import { Order } from "../../types/types";
import OrderForm from "./OrderForm";
import { PencilFill, PlusCircleFill, TrashFill } from "react-bootstrap-icons";

const Home = () => {
  const [orders, setOrders] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editOrder, setEditOrder] = useState<any>();
  const [deleteOrderId, setDeleteOrderId] = useState<number | undefined>();

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

  const onAddClick = (data: Order | {} = {}) => {
    setEditOrder(data);
  };

  const deletOrder = () => {
    if (deleteOrderId) {
      const response = orderService.deleteOrder(deleteOrderId);
      if (response.status === 200) {
        setDeleteOrderId(undefined);
        getOrders();
      }
    }
  };

  return (
    <Container className="d-flex mt-4 flex-column">
      <div className="d-flex mb-4 mt-4  justify-content-between">
        <h2>Orders</h2>
        <Button onClick={() => onAddClick({})}>
          <PlusCircleFill color="white" />
        </Button>
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
            orders.map((order: Order) => {
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
                            <p>You want to delete this order?</p>
                            <Button variant="danger" onClick={deletOrder}>
                              Delete
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={() => setDeleteOrderId(undefined)}
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
                        <TrashFill color="white" />
                      </Button>
                    </OverlayTrigger>
                    <Button
                      variant="dark"
                      className="ms-2"
                      onClick={() => onAddClick(order)}
                    >
                      <PencilFill color="white" />
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5} className="text-center">
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
            setEditOrder(undefined);
            getOrders();
          }}
        />
      )}
    </Container>
  );
};

export default Home;
