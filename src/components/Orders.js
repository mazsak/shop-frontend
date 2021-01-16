import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import ItemProduct from './ItemProduct';
import {
    Button,
    Col,
    Row,
    Card,
    Spinner,
    Accordion
} from 'react-bootstrap';
import { GetOrdersApi } from "./../requests/user";


const Orders = (props) => {
    const [orders, setOrders] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getOrders = async () => {
        setIsLoading(true);
        setOrders(await GetOrdersApi());
        setIsLoading(false);

    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <div>
            <nav>
                <NavBar />
            </nav>
            <div style={{ marginTop: '20px', width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>
                {isLoading ? (
                    <Card bg='dark' text='white' style={{ padding: '10px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Spinner animation="grow" variant="light" />
                    </Card>
                ) : (
                        <Accordion >
                            {orders.map((order) =>
                                <Card bg='dark' text='white'>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={order.id}>{order.id}</Accordion.Toggle>
                                    <Accordion.Collapse eventKey={order.id} key={order.id}>
                                        <Card.Body>
                                            {order.shopItems.map((item) =>
                                            (

                                                <Card bg='dark' text='white'>
                                                    <Row>
                                                        {item.product !== null ? (
                                                            <>
                                                                <Col >
                                                                    <ItemProduct id={item.product.id} item={item.product} />
                                                                </Col>
                                                                <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                    <h4>{item.product.price} $</h4>
                                                                </Col>
                                                            </>
                                                        ) : (<>
                                                            <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                <h4>Product deleted</h4>
                                                            </Col>
                                                            <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                <h4>Product deleted</h4>
                                                            </Col>
                                                        </>)}
                                                        <Col xs style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <h5>Amount: {item.amount}</h5>
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            ))}
                                            <Card bg='dark' text='white' style={{ marginTop: '20px', padding: '10px' }}>
                                                <Row>
                                                    <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <h4>Total price:</h4>
                                                    </Col>
                                                    <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                        <h4>{order.totalPrice.toFixed(2)} $</h4>
                                                    </Col>
                                                    <Col xs style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            )}
                        </Accordion>
                    )}
            </div>
        </div >
    );
};

export default Orders;