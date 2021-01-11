import React, { useState } from 'react';
import {
    Card,
    Pagination,
    NavDropdown
} from 'react-bootstrap';

const ItemProduct = ({ item }) => {
    const [product, setProduct] = useState(item);
    return (
        <Card bg='dark' text='white' style={{ padding: '10px' }}>
            <div className='row' style={{display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Pagination>
                    <Pagination.First />
                    <Pagination.Prev />
                    <Pagination.Item>{1}</Pagination.Item>
                    <Pagination.Ellipsis />

                    <Pagination.Item>{10}</Pagination.Item>
                    <Pagination.Item>{11}</Pagination.Item>
                    <Pagination.Item active>{12}</Pagination.Item>
                    <Pagination.Item>{13}</Pagination.Item>
                    <Pagination.Item disabled>{14}</Pagination.Item>

                    <Pagination.Ellipsis />
                    <Pagination.Item>{20}</Pagination.Item>
                    <Pagination.Next />
                    <Pagination.Last />
                </Pagination>
            </div>
        </Card>
    );
};

export default ItemProduct;