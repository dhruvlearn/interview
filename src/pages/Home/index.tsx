import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  OverlayTrigger,
  Popover,
  Spinner,
  Form,
  Tooltip,
} from "react-bootstrap";
import orderService from "../../services/order.service";
import { Order } from "../../types/types";
import OrderForm from "./OrderForm";
import {
  PencilFill,
  PlusCircleFill,
  TrashFill,
  FilePdfFill,
} from "react-bootstrap-icons";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Home = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [editOrder, setEditOrder] = useState<Order | {}>();
  const [deleteOrderId, setDeleteOrderId] = useState<number | undefined>();
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);
  const isAllSelected = orders.length === selectedOrders.length;
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
  useEffect(() => {
    if (isDownloading) {
      const input: HTMLElement | null = document.getElementById("divToPrint");
      if (input) {
        html2canvas(input).then((canvas) => {
          console.log("deo");
          let imgWidth = 208;
          let imgHeight = (canvas.height * imgWidth) / canvas.width;
          const imgData = canvas.toDataURL("img/png");
          const pdf = new jsPDF("p", "mm", "a4");
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          // pdf.output('dataurlnewwindow');
          pdf.save(`orders_${new Date().getTime()}.pdf`);
          setIsDownloading(false);
        });
      }
    }
  }, [isDownloading]);

  const onAddClick = (data: Order | {} = {}) => {
    setEditOrder(data);
  };

  const downloadPdf = () => {
    console.log("downloadPdf");
    setIsDownloading(true);
  };

  const checkboxClick = (orderId?: number) => {
    if (orderId) {
      if (!selectedOrders.includes(orderId)) {
        setSelectedOrders([...selectedOrders, orderId]);
      } else {
        const newSelectedOrders = selectedOrders.filter((id) => id !== orderId);
        setSelectedOrders(newSelectedOrders);
      }
    } else if (isAllSelected) {
      setSelectedOrders([]);
    } else {
      const newSelectedOrders = orders.map((order: Order) => order.Order_ID);
      setSelectedOrders(newSelectedOrders);
    }
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

  const renderTooltip = ({
    buttonComponent,
    tooltip,
  }: {
    buttonComponent: React.ReactElement;
    tooltip: string;
  }) => {
    return (
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id="button-tooltip">{tooltip}</Tooltip>}
      >
        {buttonComponent}
      </OverlayTrigger>
    );
  };

  const renderPdfGenerator = () => {
    return (
      <div style={{ opacity: 0 }}>
        <div id="divToPrint" className="m-3 mt4">
          <h2 className="m2 text-center">Orders</h2>
          <Table bordered>
            <thead>
              <tr>
                <th>Crust</th>
                <th>Flavor</th>
                <th>Size</th>
                <th>Table No</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: Order) => {
                if (!selectedOrders.includes(order.Order_ID)) {
                  return null;
                }
                return (
                  <tr key={`${order.Order_ID}`}>
                    <td>{order.Crust}</td>
                    <td>{order.Flavor}</td>
                    <td>{order.Size}</td>
                    <td>{order.Table_No}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  };

  return (
    <Container className="d-flex mt-4 flex-column">
      <div className="d-flex mb-4 mt-4  justify-content-between">
        <h2>Orders</h2>
        <div>
          {renderTooltip({
            tooltip: "Generat & Download PDF",
            buttonComponent: (
              <Button
                className="me-3"
                onClick={downloadPdf}
                disabled={!selectedOrders?.length}
              >
                <FilePdfFill color="white" />
              </Button>
            ),
          })}
          {renderTooltip({
            tooltip: "Create Order",
            buttonComponent: (
              <Button className="me-3" onClick={() => onAddClick()}>
                <PlusCircleFill color="white" />
              </Button>
            ),
          })}
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                readOnly={true}
                checked={isAllSelected}
                onClick={() => checkboxClick()}
                type="checkbox"
              />
            </th>
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
                  <td>
                    <Form.Check
                      readOnly={true}
                      checked={selectedOrders.includes(order.Order_ID)}
                      onClick={() => checkboxClick(order.Order_ID)}
                      type="checkbox"
                    />
                  </td>
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
          order={editOrder ?? {}}
          onHide={() => {
            setEditOrder(undefined);
            getOrders();
          }}
        />
      )}
      {isDownloading && renderPdfGenerator()}
    </Container>
  );
};

export default Home;
