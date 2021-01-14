import React, { useState } from 'react';
import NavBar from './NavBar';
import {
    Card,
    Spinner,
    Form,
    Button,
    Alert
} from 'react-bootstrap';

const Register = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showErrorUsername, setShowErrorUsername] = useState(false);
    const [showErrorPassword, setShowErrorPassword] = useState(false);
    const [showErrorConfirmPassword, setShowErrorConfirmPassword] = useState(false);
    return (
        <div>
            <nav>
                <NavBar />
            </nav>
            <div style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Card bg='dark' text='white' style={{ padding: '10px', margin: '10px', display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Form style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}}>
                        <Alert show={showErrorUsername} variant="danger">Too short Username</Alert>
                        <Alert show={showErrorPassword} variant="danger">Too short Password</Alert>
                        <Alert show={showErrorConfirmPassword} variant="danger">Unequal Passwords</Alert>
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
                            <Form.Label htmlFor="confirm_password">Confirm password</Form.Label>
                            <Form.Control
                                type="password"
                                id="confirm_password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                    <Button type="submit" href="/login" onClick={() => {
                        let register = true;
                        setShowErrorConfirmPassword(false);
                        setShowErrorPassword(false);
                        setShowErrorUsername(false);
                        if (password.trim() !== confirmPassword.trim()) {
                            register = false;
                            setShowErrorConfirmPassword(true);
                        }
                        if (password.length < 8) {
                            register = false;
                            setShowErrorPassword(true);
                        }
                        if (username.length < 4) {
                            register = false;
                            setShowErrorUsername(true);
                        }
                        if (register) {
                            setIsLoading(true);



                            setIsLoading(false);
                        }
                    }}>Register</Button>
                    <Spinner animation="grow" variant="light" hidden={!isLoading} />
                </Card>
            </div>
        </div>
    );
};

export default Register;
