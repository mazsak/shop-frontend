import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { GetProductById } from './../requests/product';
import {
    Card,
    Row,
    Col,
    Spinner,
    Button,
    Alert
} from 'react-bootstrap';

const Product = (props) => {
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [showError, setShowError] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);

        const result = await GetProductById(props.match.params.id);
        setProduct(result);

        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <nav>
                <NavBar />
            </nav>
            <div style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                {isLoading ? (
                    <Card bg='dark' text='white' style={{ padding: '10px', margin: '20px' }}>
                        <Spinner animation="grow" variant="light" />
                    </Card>
                ) : (
                        <>
                            <Alert show={showError} variant="danger" style={{margin: '10px'}}>Product is out of stock!</Alert>
                            <Card bg='dark' text='white' style={{ padding: '10px', margin: '20px' }}>
                                <Row>
                                    <div className='col'>
                                        <h3>{product.name}</h3>
                                    </div>
                                    <div className='col-3'>
                                        <h4>{product.price} $</h4>
                                        <p>Amount in stock: {product.stockAmount}</p>
                                        <Button onClick={() => {
                                            var products = JSON.parse(localStorage.getItem('products'));
                                            var amount = 0;
                                            for (var i = 0; i < products.length; i++) {
                                                if (products[i].id === product.id) {
                                                    amount++;
                                                }
                                            }
                                            if (amount < product.stockAmount) {
                                                products.push(product)
                                                localStorage.setItem('products', JSON.stringify(products));
                                                setShowError(false);
                                            } else {
                                                setShowError(true);
                                            }
                                        }}>Add to cart</Button>
                                    </div>
                                </Row>
                                <Row>
                                    <Col>
                                        <span>{product.description}</span>
                                    </Col>
                                </Row>
                            </Card>
                        </>
                    )}
            </div>
        </div>
    );
};

export default Product;

