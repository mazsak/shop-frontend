import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import ItemProduct from './ItemProduct';
import { GetAllDirectory } from './../requests/directory';
import { GetProducts } from './../requests/product';
import { viewPagination } from './Pagination';
import {
    Accordion,
    Card,
    Spinner,
    Button,
    Pagination
} from 'react-bootstrap';

const Home = (props) => {
    const [directories, setDirectories] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoadingDirectiories, setIsLoadingDirectiories] = useState(true);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [currentDirectory, setCurrentDirectory] = useState('');
    const [currentSubdirectory, setCurrentSubdirectory] = useState('');


    const loadProducts = async (directory, subdirectory, pageNumber) => {
        setIsLoadingProducts(true);

        const resultProduct = await GetProducts(directory, subdirectory, pageNumber);

        setProducts(resultProduct.products);
        setCurrentPage(resultProduct.currentPage);
        setTotalPage(resultProduct.totalPages);

        setIsLoadingProducts(false);
    };

    const fetchData = async () => {
        setIsLoadingDirectiories(true);

        const resultDirectory = await GetAllDirectory();
        setDirectories(resultDirectory);
        setCurrentDirectory(resultDirectory[0].name)

        setIsLoadingDirectiories(false);

        loadProducts(resultDirectory[0].name, '', currentPage)
    };

    useEffect(() => {
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
                    {isLoadingDirectiories && directories.length === 0 ? (
                        <Card bg='dark' text='white' style={{ padding: '10px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Spinner animation="grow" variant="light" />
                        </Card>
                    ) : (
                            <Accordion>
                                {directories.map((item, index) =>
                                    <Card bg='dark' text='white'>
                                        <Accordion.Toggle as={Button} variant="link" onClick={ async () => {
                                            setCurrentDirectory(item.name);
                                            setCurrentSubdirectory('')
                                            setCurrentPage(1);
                                            loadProducts(item.name, '',1);
                                        }} eventKey={item.id}>{item.name}</Accordion.Toggle>
                                        <Accordion.Collapse eventKey={item.id}>
                                            <Card.Body>
                                                {item.subdirectories.map((subdirectory) =>
                                                    <div className='row' style={{ paddingLeft: '20px' }}>
                                                        <a href={'#' + subdirectory.name} onClick={async () => {
                                            setCurrentSubdirectory(subdirectory.name);
                                            setCurrentPage(1);
                                            loadProducts(currentDirectory, subdirectory.name, 1);
                                        }}>{subdirectory.name}</a>
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
                        <h3>Products from: {currentDirectory}{currentSubdirectory != '' ? ', ' + currentSubdirectory : ''}</h3>
                    </Card>
                    {isLoadingProducts && products.length === 0 ? (
                        <Card bg='dark' text='white' style={{ padding: '10px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Spinner animation="grow" variant="light" />
                        </Card>
                    ) :
                        (

                            <div>
                                <Card bg='dark' text='white' style={{ padding: '10px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Pagination onClick={(e) => {
                                        loadProducts(currentDirectory, currentSubdirectory, Number(e.target.id))
                                    }}>
                                        {viewPagination(totalPage, currentPage)}
                                    </Pagination>
                                </Card>
                                {products.map((product) =>
                                    <ItemProduct item={product} />
                                )}
                                <Card bg='dark' text='white' style={{ padding: '10px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Pagination onClick={(e) => {
                                        loadProducts(currentDirectory, currentSubdirectory, Number(e.target.id))
                                    }}>
                                        {viewPagination(totalPage, currentPage)}
                                    </Pagination>
                                </Card>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default Home;