import React, { useState } from "react";
import { Form, Button, Spinner, Modal } from "react-bootstrap";
import orderService from "../../services/order.service";

const OrderForm = ({ onHide, order }) => {
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [crust, setCrust] = useState(order?.Crust || "");
  const [flavor, setFlavor] = useState(order?.Flavor || "");
  const [size, setSize] = useState(order?.Size || "");
  const [tableNo, setTableNo] = useState(order?.Table_No || "");

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    let isValidForm = form.checkValidity();
    setValidated(true);
    if (isValidForm) {
      setIsLoading(true);
      const response = orderService.addOrder({
        Order_ID: order?.Order_ID || "",
        Crust: crust,
        Flavor: flavor,
        Size: size,
        Table_No: tableNo,
      });
      setIsLoading(false);
      onHide();
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
          {order?.id ? "Edit" : "Add"} order
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicCrust">
            <Form.Label>Crust</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter crust"
              required
              value={crust}
              onChange={(e) => {
                setCrust(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCrust">
            <Form.Label>flavor</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter flavor"
              required
              value={flavor}
              onChange={(e) => {
                setFlavor(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCrust">
            <Form.Label>Size</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter size"
              required
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCrust">
            <Form.Label>Crust</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter table number"
              required
              value={tableNo}
              onChange={(e) => {
                setTableNo(e.target.value);
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
            ) : (
              "Submit"
            )}
          </Button>
          <Button variant="secondary" onClick={onHide} className="ms-2">
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default OrderForm;
