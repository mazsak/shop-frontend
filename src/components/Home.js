import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import ItemProduct from './ItemProduct';
import { GetAllDirectory } from './../requests/directory';
import {
    Accordion,
    Card,
    Spinner,
    Pagination
} from 'react-bootstrap';

const Home = (props) => {
    const [directories, setDirectories] = useState();
    const [products, setProducts] = useState([]);
    const [isLoadingDirectiories, setIsLoadingDirectiories] = useState(true);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoadingDirectiories(true);

            const result = await GetAllDirectory();

            setDirectories(result);
            setIsLoadingDirectiories(false);
        };

        fetchData();
    }, []);

    console.log(directories);
    return (
        <div>
            <nav>
                <NavBar />
            </nav>
            <div className='row' style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }}>
                <div className='col-2' style={{ padding: '20px', minWidth: '300px' }}>
                    {isLoadingDirectiories ? (
                        <Accordion defaultActiveKey="0">
                            <Card bg='dark' text='white'>
                                <Accordion.Toggle as={Card.Header} >
                                    <Spinner animation="grow" variant="light" />
                                </Accordion.Toggle>
                            </Card>
                        </Accordion>
                    ) : (
                            <Accordion defaultActiveKey="0">
                                {directories.map((item) =>
                                    <Card bg='dark' text='white'>
                                        <Accordion.Toggle as={Card.Header} eventKey={item.id}>{item.name}</Accordion.Toggle>
                                        <Accordion.Collapse eventKey={item.id}>
                                            <Card.Body>
                                                {item.subdirectories.map((subdirectory) =>
                                                    <div className='row' style={{ paddingLeft: '20px' }}>
                                                        <a href='#'>{subdirectory.name}</a>
                                                    </div>
                                                )}
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                )}
                            </Accordion>
                        )}
                </div>
                <div className='col' style={{ padding: '20px' }}>
                    <Card bg='dark' text='white' style={{ padding: '10px' }}>
                    <div className='row' style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Pagination >
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
                    <Card bg='dark' text='white' style={{ padding: '10px' }}>
                        <h3>Product</h3>
                    </Card>
                    <ItemProduct />
                    <ItemProduct />
                    <Card bg='dark' text='white' style={{ padding: '10px' }}>
                    <div className='row' style={{margin: '20px', display: "flex", justifyContent: "center", alignItems: "center"}}>
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
                </div>
            </div>
        </div>
    );
};

export default Home;