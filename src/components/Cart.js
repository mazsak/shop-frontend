import React, { useState } from 'react';
import NavBar from './NavBar';
import ItemProduct from './ItemProduct';
import { FiTrash2 } from "react-icons/fi";
import {
    Button,
    Col,
    Row,
    Card
} from 'react-bootstrap';
import { OrdersApi } from './../requests/user';


const Cart = (props) => {
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem('products')));
    var totalPrice = 0.00;

    for (var i = 0; i < products.length; i++) {
        totalPrice += products[i].price;
    }

    return (
        <div>
            <nav>
                <NavBar />
            </nav>
            <div style={{ marginTop: '20px', width: '60%', marginLeft: 'auto', marginRight: 'auto' }}>
                {products.map((product) =>
                (
                    <Card bg='dark' text='white'>
                        <Row>

                            <Col >
                                <ItemProduct id={product.id} item={product} />
                            </Col>
                            <Col style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <h4>{product.price} $</h4>
                            </Col>
                            <Col xs style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Button href='/cart' onClick={() => {
                                    var index = -1;
                                    for (var i = 0; i < products.length; i++) {
                                        if (products[i].id === product.id) {
                                            index = i;
                                            break;
                                        }
                                    }
                                    if (index > -1) {
                                        products.splice(index, 1);
                                    }

                                    localStorage.setItem('products', JSON.stringify(products));

                                }}>
                                    <FiTrash2 />
                                </Button>
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
                            <h4>{totalPrice.toFixed(2)} $</h4>
                        </Col>
                        <Col xs style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Button href='#' onClick={ async () =>{
                                if (JSON.parse(localStorage.getItem('token')) !== ''){
                                    await OrdersApi();
                                    localStorage.setItem('products', JSON.stringify([]));
                                    document.location.href = '/cart';
                                }else{
                                    document.location.href = '/login';
                                }
                            }}>Buy</Button>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default Cart;
