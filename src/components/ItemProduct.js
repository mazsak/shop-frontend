import React, {useState} from 'react';
import {
    Card,
    Nav,
    NavDropdown
} from 'react-bootstrap';

const ItemProduct = ({ item }) => {
    const [product, setProduct] = useState(item);
    return (
        <div>
            <Card bg='dark' text='white'>
                <div className="col">
                    <div className='row' style={{padding: '10px'}}>
                        <h4><a href='#'>Tytuł</a></h4>
                    </div>
                    <div className='row' style={{paddingLeft: '10px', paddingBottom: '10px'}}>
                        <span>opis</span>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ItemProduct;