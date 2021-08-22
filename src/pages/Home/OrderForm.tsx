import React, { useState } from "react";
import { Form, Button, Spinner, Modal } from "react-bootstrap";
import orderService from "../../services/order.service";
import { Order } from "../../types/types";

type Props = {
  onHide: () => void;
  order?: Order;
};

const OrderForm = ({ onHide, order }: Props) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [crust, setCrust] = useState<string>(order?.Crust || "");
  const [flavor, setFlavor] = useState<string>(order?.Flavor || "");
  const [size, setSize] = useState<string>(order?.Size || "");
  const [tableNo, setTableNo] = useState<number>(order?.Table_No || 0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    let isValidForm = form.checkValidity();
    setValidated(true);
    if (isValidForm) {
      setIsLoading(true);
      const response = orderService.addOrder({
        Order_ID: order?.Order_ID || 0,
        Crust: crust,
        Flavor: flavor,
        Size: size,
        Table_No: tableNo,
      });
      setIsLoading(false);
      if (response.status === 201 || response.status === 200) {
        onHide();
      }
    }
  };

  return (
    <Modal
      show={true}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {order?.Order_ID ? `Edit Order (${order.Order_ID})` : "Add Order"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3 required" controlId="formBasicCrust">
            <Form.Label>Crust</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter crust"
              required
              value={crust}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCrust(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3 required" controlId="formBasicFlavor">
            <Form.Label>Flavor</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter flavor"
              required
              value={flavor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFlavor(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3 required" controlId="formBasicSize">
            <Form.Label>Size</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter size"
              required
              value={size}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSize(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 required"
            controlId="formBasicTableNumber"
          >
            <Form.Label>Table number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter table number"
              required
              min={1}
              value={tableNo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setTableNo(Number(e.target.value));
              }}
            />
          </Form.Group>
          <Button disabled={isLoading} variant="success" type="submit">
            {isLoading ? (
              <Spinner
                animation="border"
                className="d-flex justify-content-center align-self-center"
                size={"sm"}
              />
            ) : order?.Order_ID ? (
              `Edit`
            ) : (
              "Add"
            )}
          </Button>
          <Button variant="secondary" onClick={onHide} className="ms-2">
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderForm;
