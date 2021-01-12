import React from 'react';
import {
    Card
} from 'react-bootstrap';

const ItemProduct = ({ item }) => {
    return (
        <div>
            <Card bg='dark' text='white'>
                <div className="col">
                    <div className='row' style={{padding: '10px'}}>
                        <h4><a href={'/product/' + item.id}>{item.name}</a></h4>
                    </div>
                    <div className='row' style={{paddingLeft: '10px', paddingBottom: '10px'}}>
                        <span>{item.description}</span>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ItemProduct;