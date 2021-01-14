import React, { useState } from 'react';
import NavBar from './NavBar';
import {
    Card,
    Spinner,
    Form,
    Button,
    Alert
} from 'react-bootstrap';

const Login = (props) =>{
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    return (
        <div>
            <nav>
                <NavBar />
            </nav>
            <div style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Card bg='dark' text='white' style={{ padding: '10px', margin: '10px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Form style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}}>
                        <Alert show={showError} variant="danger">Incorrect username or password</Alert>
                        <Form.Group>
                            <Form.Label htmlFor="username">Username</Form.Label>
                            <Form.Control
                                type="text"
                                id="username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Form.Label htmlFor="password">Password</Form.Label>
                            <Form.Control
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Button type="submit" href="/login" onClick={() => {
                        setIsLoading(true);
                        setShowError(false);
                        
                        setIsLoading(false);
                    }}>Register</Button>
                    <Spinner animation="grow" variant="light" hidden={!isLoading} />
                </Card>
            </div>
        </div>
    );
};

export default Login;
