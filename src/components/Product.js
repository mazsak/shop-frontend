import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { GetProductById } from './../requests/product';
import {
    Card,
    Spinner
} from 'react-bootstrap';

const Product = (props) => {
    const [id, setId] = useState(props.match.params.id);
    const [product, setProduct] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);

        const result = await GetProductById(id);
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
            <div style={{width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
                {isLoading ? (
                    <Card bg='dark' text='white' style={{ padding: '10px', margin:'20px'}}>
                        <Spinner animation="grow" variant="light" />
                    </Card>
                ) : (
                    <Card bg='dark' text='white' style={{ padding: '10px', margin:'20px'}}>
                    {product.name}
                </Card>
                    )}
            </div>
        </div>
    );
};

export default Product;

