import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { FiPlus, FiTrash2, FiEdit } from "react-icons/fi";
import {
    Button,
    Col,
    Row,
    Card,
    Spinner,
    Table,
    Form
} from 'react-bootstrap';
import { GetAllDirectory, DeleteDirectoryById, CreateDirectory, UpdateDirectory, GetAllSubdirectory, DeleteSubdirectoryById, CreateSubdirectory, UpdateSubdirectory } from './../requests/directory';
import { GetAllProducts, DeleteProductById, CreateProduct, UpdateProduct } from './../requests/product';


const Admin = (props) => {
    const [directories, setDirectories] = useState([]);
    const [directory, setDirectory] = useState('');
    const [subdirectoriesUnassigned, setSubdirectoriesUnassigned] = useState([]);
    const [subdirectories, setSubdirectories] = useState([]);
    const [subdirectory, setSubdirectory] = useState('');
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState('list');
    const [currentModel, setCurrentModel] = useState('Directory');

    const fetchData = async () => {
        setIsLoading(true);

        setDirectories(await GetAllDirectory());
        setSubdirectories(await GetAllSubdirectory());
        setProducts(await GetAllProducts());

        setIsLoading(false);
    };

    const load = () => {
        const unassigned = [];

        for (var i =0; i < subdirectories.length; i++){
            var un = true;
            for (var j = 0; j < directories.length; j++){
                for (var s =0; s < directories[j].subdirectories.length; s++){
                    if (subdirectories[i].id === directories[j].subdirectories[s].id){
                        un = false;
                        break;
                    }
                }
                if (un === false){
                    break;
                }
            }
            if (un === true){
                unassigned.push(subdirectories[i]);
            }
        }
        console.log(unassigned)
        setSubdirectoriesUnassigned(unassigned);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <nav>
                <NavBar />
            </nav>
            <Row>
                <div className='col-3' style={{ margin: '20px' }}>
                    {['Directory', 'Subdirectory', 'Product'].map((model) => (
                        <Card bg='dark' text='white' style={{ padding: '10px' }}>
                            <Row>
                                <Col>
                                    <a href='#' onClick={() => {
                                        setView('list');
                                        setCurrentModel(model);
                                        setDirectory('');
                                        setSubdirectory('');
                                        setProduct('');
                                    }}>
                                        <h4>{model}</h4>
                                    </a>
                                </Col>
                                <div className='col-2'>
                                    <Button onClick={() => {
                                        if (model === 'Directory'){
                                            load();
                                        }
                                        setView('add');
                                        setCurrentModel(model);
                                        setDirectory('');
                                        setSubdirectory('');
                                        setProduct('');
                                    }}><FiPlus /></Button>
                                </div>
                            </Row>
                        </Card>
                    ))}
                </div>
                <Col xl>
                    <Card bg='dark' text='white' style={{ margin: '20px', padding: '10px' }}>
                        <h4>{currentModel}</h4>
                    </Card>
                    <Card bg='dark' text='white' style={{ margin: '20px', padding: '10px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                        {isLoading ? (
                            <Spinner animation="grow" variant="light" />
                        ) : currentModel === 'Directory' ? view === 'list' ? (
                            <>
                                <Table striped bordered hover variant="dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Subdirectories</th>
                                        <th>Action</th>
                                    </tr>
                                    {directories.map((directoryMap) =>
                                        <tr>
                                            <td>
                                                {directoryMap.id}
                                            </td>
                                            <td>
                                                {directoryMap.name}
                                            </td>
                                            <td>
                                                {directoryMap.subdirectories.map((subdirectoryMap) => subdirectoryMap.name + ', ')}
                                            </td>
                                            <td>
                                                <Button variant='danger' style={{ margin: '2px' }} onClick={async () => {
                                                    DeleteDirectoryById(directoryMap.id);
                                                    document.location.href = '/admin';
                                                }}><FiTrash2 /></Button>
                                                <Button variant='success' style={{ margin: '2px' }} onClick={() => {
                                                    setDirectory(directoryMap);
                                                    setView('add');
                                                }}><FiEdit /></Button>
                                            </td>
                                        </tr>)}
                                </Table>
                            </>
                        ) : (
                                <>
                                    <Form style={{ margin: '20px', padding: '10px', display: "block", width: '100%' }}>
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control value={directory !== '' ? directory.id : ''} disabled></Form.Control>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control onChange={async (e) => {
                                            if (directory === '') {
                                                await setDirectory({
                                                    id: null,
                                                    name: e.target.value,
                                                    subdirectories: []
                                                });
                                            } else {
                                                await setDirectory({
                                                    id: directory.id,
                                                    name: e.target.value,
                                                    subdirectories: directory.subdirectories
                                                });
                                            }
                                        }} value={directory !== '' ? directory.name : ''}></Form.Control>
                                        <Form.Label> Subdirectories</Form.Label>
                                        {directory !== '' ?
                                            <Form.Control onChange={async (e) => {
                                                var options = e.target.options;
                                                var value = [];
                                                for (var i = 0, l = options.length; i < l; i++) {
                                                    if (options[i].selected) {
                                                        value.push({ id: options[i].value });
                                                    }
                                                }
                                                if (directory === '') {
                                                    await setDirectory({
                                                        id: null,
                                                        name: '',
                                                        subdirectories: value
                                                    });
                                                } else {
                                                    await setDirectory({
                                                        id: directory.id,
                                                        name: directory.name,
                                                        subdirectories: value
                                                    });
                                                }
                                            }} as="select" multiple>
                                                {subdirectoriesUnassigned.map((subdirectoryMap) =>
                                                    <option value={subdirectoryMap.id} selected={directory.subdirectories.includes(subdirectoryMap)}>{subdirectoryMap.name}</option>)}
                                            </Form.Control>
                                            :
                                            <Form.Control onChange={(e) => {
                                                var options = e.target.options;
                                                var value = [];
                                                for (var i = 0, l = options.length; i < l; i++) {
                                                    if (options[i].selected) {
                                                        value.push({ id: options[i].value });
                                                    }
                                                }
                                                if (directory === '') {
                                                    setDirectory({
                                                        id: null,
                                                        name: '',
                                                        subdirectories: value
                                                    });
                                                } else {
                                                    setDirectory({
                                                        id: directory.id,
                                                        name: directory.name,
                                                        subdirectories: value
                                                    });
                                                }
                                            }} as="select" multiple>
                                                {subdirectoriesUnassigned.map((subdirectoryMap) =>
                                                    <option value={subdirectoryMap.id}>{subdirectoryMap.name}</option>)}
                                            </Form.Control>
                                        }
                                    </Form>
                                    <Button onClick={async () => {
                                        var subs = []
                                        if (directory !== '') {
                                            for (var sub in directory.subdirectories) {
                                                for (var i = 0; i < subdirectories.length; i++) {
                                                    console.log(sub);
                                                    if (subdirectories[i].id === parseInt(directory.subdirectories[sub].id)) {
                                                        subs.push(subdirectories[i])
                                                        break;
                                                    }
                                                }
                                            }
                                            console.log(subs);
                                            if (directory.id !== null) {
                                                await UpdateDirectory({
                                                    id: directory.id,
                                                    name: directory.name,
                                                    subdirectories: subs
                                                });
                                            } else {
                                                await CreateDirectory({
                                                    id: directory.id,
                                                    name: directory.name,
                                                    subdirectories: subs
                                                });
                                            }
                                            document.location.href = '/admin'
                                        }
                                    }}>{directory !== '' ? 'Update' : 'Create'}</Button>
                                </>
                            ) : currentModel === 'Subdirectory' ? view === 'list' ? (
                                <>
                                    <Table striped bordered hover variant="dark">
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Action</th>
                                        </tr>
                                        {subdirectories.map((subdirectoryMap) =>
                                            <tr>
                                                <td>
                                                    {subdirectoryMap.id}
                                                </td>
                                                <td>
                                                    {subdirectoryMap.name}
                                                </td>
                                                <td>
                                                    <Button variant='danger' style={{ margin: '2px' }} onClick={async () => {
                                                        DeleteSubdirectoryById(subdirectoryMap.id);
                                                        document.location.href = '/admin';
                                                    }}><FiTrash2 /></Button>
                                                    <Button variant='success' style={{ margin: '2px' }} onClick={() => {
                                                        setSubdirectory(subdirectoryMap);
                                                        setView('add');
                                                    }}><FiEdit /></Button>
                                                </td>
                                            </tr>)}
                                    </Table>
                                </>
                            ) : (
                                    <>
                                        <Form style={{ margin: '20px', padding: '10px', display: "block", width: '100%' }}>
                                            <Form.Label>ID</Form.Label>
                                            <Form.Control value={subdirectory !== '' ? subdirectory.id : ''} disabled></Form.Control>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control onChange={async (e) => {
                                                if (subdirectory === '') {
                                                    await setSubdirectory({
                                                        id: null,
                                                        name: e.target.value,
                                                    });
                                                } else {
                                                    await setSubdirectory({
                                                        id: subdirectory.id,
                                                        name: e.target.value,
                                                    });
                                                }
                                            }} value={subdirectory !== '' ? subdirectory.name : ''}></Form.Control>
                                        </Form>
                                        <Button onClick={async () => {
                                            if (subdirectory !== '') {
                                                if (subdirectory.id !== null) {
                                                    await UpdateSubdirectory(subdirectory);
                                                } else {
                                                    await CreateSubdirectory(subdirectory);
                                                }
                                                document.location.href = '/admin'
                                            }
                                        }}>{subdirectory !== '' ? 'Update' : 'Create'}</Button>
                                    </>
                                ) : view === 'list' ? (
                                    <>
                                        <Table striped bordered hover variant="dark">
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Description</th>
                                                <th>Subdirectory</th>
                                                <th>Price: $</th>
                                                <th>Stock Amount</th>
                                                <th>Action</th>
                                            </tr>
                                            {products.map((productMap) =>
                                                <tr>
                                                    <td>
                                                        {productMap.id}
                                                    </td>
                                                    <td>
                                                        {productMap.name}
                                                    </td>
                                                    <td>
                                                        {productMap.description}
                                                    </td>
                                                    <td>
                                                        {productMap.subdirectory.name}
                                                    </td>
                                                    <td>
                                                        {productMap.price}
                                                    </td>
                                                    <td>
                                                        {productMap.stockAmount}
                                                    </td>
                                                    <td>
                                                        <Button variant='danger' style={{ margin: '2px' }} onClick={async () => {
                                                            DeleteProductById(productMap.id);
                                                            document.location.href = '/admin';
                                                        }}><FiTrash2 /></Button>
                                                        <Button variant='success' style={{ margin: '2px' }} onClick={() => {
                                                            setProduct(productMap);
                                                            setView('add');
                                                        }}><FiEdit /></Button>
                                                    </td>
                                                </tr>)}
                                        </Table>
                                    </>
                                ) : (
                                            <>
                                                <Form style={{ margin: '20px', padding: '10px', display: "block", width: '100%' }}>
                                                    <Form.Group>
                                                        <Form.Label htmlFor="id">ID</Form.Label>
                                                        <Form.Control id='id' value={product !== '' ? product.id : ''} disabled></Form.Control>
                                                        <Form.Label htmlFor="name">Name</Form.Label>
                                                        <Form.Control id='name' onChange={e => {
                                                            if (product === '') {
                                                                setProduct({
                                                                    id: null,
                                                                    name: e.target.value,
                                                                    description: '',
                                                                    subdirectory: { id: null },
                                                                    price: 0.00,
                                                                    stockAmount: 0
                                                                });
                                                            } else {
                                                                setProduct({
                                                                    id: product.id,
                                                                    name: e.target.value,
                                                                    description: product.description,
                                                                    subdirectory: product.subdirectory,
                                                                    price: product.price,
                                                                    stockAmount: product.stockAmount
                                                                });
                                                            }
                                                        }} value={product !== '' ? product.name : ''}></Form.Control>
                                                        <Form.Label htmlFor="description">Description</Form.Label>
                                                        <Form.Control id='description' onChange={e => {
                                                            if (product === '') {
                                                                setProduct({
                                                                    id: null,
                                                                    name: '',
                                                                    description: e.target.value,
                                                                    subdirectory: { id: null },
                                                                    price: 0.00,
                                                                    stockAmount: 0
                                                                });
                                                            } else {
                                                                setProduct({
                                                                    id: product.id,
                                                                    name: product.name,
                                                                    description: e.target.value,
                                                                    subdirectory: product.subdirectory,
                                                                    price: product.price,
                                                                    stockAmount: product.stockAmount
                                                                });
                                                            }
                                                        }} value={product !== '' ? product.description : ''}></Form.Control>
                                                        <Form.Label htmlFor="subdirectories"> Subdirectories</Form.Label>
                                                        {product !== '' ?
                                                            <Form.Control id='subdirectories' as="select" onChange={e => {
                                                                if (product === '') {
                                                                    setProduct({
                                                                        id: null,
                                                                        name: '',
                                                                        description: '',
                                                                        subdirectory: { id: null },
                                                                        price: e.target.value,
                                                                        stockAmount: 0
                                                                    });
                                                                } else {
                                                                    setProduct({
                                                                        id: product.id,
                                                                        name: product.name,
                                                                        description: product.description,
                                                                        subdirectory: { id: e.target.value },
                                                                        price: product.price,
                                                                        stockAmount: product.stockAmount
                                                                    });
                                                                }
                                                            }}>
                                                                {subdirectories.map((subdirectoryMap) =>
                                                                    <option value={subdirectoryMap.id} selected={product.subdirectory.id === subdirectoryMap.id}>{subdirectoryMap.name}</option>)}
                                                            </Form.Control>
                                                            :
                                                            <Form.Control id='subdirectories' as="select" onChange={e => {
                                                                if (product === '') {
                                                                    setProduct({
                                                                        id: null,
                                                                        name: '',
                                                                        description: '',
                                                                        subdirectory: { id: null },
                                                                        price: e.target.value,
                                                                        stockAmount: 0
                                                                    });
                                                                } else {
                                                                    setProduct({
                                                                        id: product.id,
                                                                        name: product.name,
                                                                        description: product.description,
                                                                        subdirectory: { id: e.target.value },
                                                                        price: product.price,
                                                                        stockAmount: product.stockAmount
                                                                    });
                                                                }
                                                            }}>
                                                                {subdirectories.map((subdirectoryMap) =>
                                                                    <option value={subdirectoryMap.id}>{subdirectoryMap.name}</option>)}
                                                            </Form.Control>
                                                        }
                                                        <Form.Label htmlFor="price">Price</Form.Label>
                                                        <Form.Control id='price' onChange={e => {
                                                            if (product === '') {
                                                                setProduct({
                                                                    id: null,
                                                                    name: '',
                                                                    description: '',
                                                                    subdirectory: { id: null },
                                                                    price: e.target.value,
                                                                    stockAmount: 0
                                                                });
                                                            } else {
                                                                setProduct({
                                                                    id: product.id,
                                                                    name: product.name,
                                                                    description: product.description,
                                                                    subdirectory: product.subdirectory,
                                                                    price: e.target.value,
                                                                    stockAmount: product.stockAmount
                                                                });
                                                            }
                                                        }} min='0' step="0.01" type='number' value={product !== '' ? product.price : 0.00}></Form.Control>
                                                        <Form.Label htmlFor="stock_amount">Stock Amount</Form.Label>
                                                        <Form.Control id='stock_amount' onChange={e => {
                                                            if (product === '') {
                                                                setProduct({
                                                                    id: null,
                                                                    name: '',
                                                                    description: '',
                                                                    subdirectory: { id: null },
                                                                    price: e.target.value,
                                                                    stockAmount: 0
                                                                });
                                                            } else {
                                                                setProduct({
                                                                    id: product.id,
                                                                    name: product.name,
                                                                    description: product.description,
                                                                    subdirectory: product.subdirectory,
                                                                    price: product.price,
                                                                    stockAmount: e.target.value
                                                                });
                                                            }
                                                        }} min='0' step="1" type='number' value={product !== '' ? product.stockAmount : 0}></Form.Control>
                                                    </Form.Group>
                                                </Form>
                                                <Button onClick={async () => {
                                                    if (product !== '') {
                                                        for (var i = 0; i < subdirectories.length; i++) {
                                                            if (subdirectories[i].id === parseInt(product.subdirectory.id)) {
                                                                await setProduct({
                                                                    id: product.id,
                                                                    name: product.name,
                                                                    description: product.description,
                                                                    subdirectory: subdirectories[i],
                                                                    price: product.price,
                                                                    stockAmount: product.stockAmount
                                                                });
                                                                break;
                                                            }
                                                        }
                                                        if (product.id !== null) {
                                                            await UpdateProduct(product);
                                                        } else {
                                                            await CreateProduct(product);
                                                        }
                                                        document.location.href = '/admin'
                                                    }
                                                }}>{product !== '' ? 'Update' : 'Create'}</Button>
                                            </>
                                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Admin;