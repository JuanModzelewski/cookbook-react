import axios from "axios";
import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/SignInUpForm.module.css";

const SignInForm = () => {

    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    })

    const { username, password } = signInData;

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.post("/dj-rest-auth/login/", signInData)
            navigate("/")
        } catch (error) {
            setErrors(error.response?.data)
        }
    };

    return (
        <div className={styles.SignInFormCoverImage}>
            <div className={styles.PageContainer}>
            <Container className={`${styles.FormContainer} p-4 `}>
                <h1 className={styles.Header}>sign in</h1>
                <hr className={styles.Divider} />
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label className="d-none">Username</Form.Label>
                        <Form.Control
                            className={styles.Input}
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={handleChange} />
                    </Form.Group>
                    {errors.username?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    <Form.Group className="mb-3" controlId="password1">
                        <Form.Label className="d-none">Password</Form.Label>
                        <Form.Control
                            className={styles.Input}
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={handleChange} />
                    </Form.Group>
                    {errors.password?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}

                    <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`} type="submit">
                        SignUp
                    </Button>
                    {errors.non_field_errors?.map((message, idx) => (
                        <Alert key={idx} variant="warning" className="mt-3">
                            {message}
                        </Alert>
                    ))}
                </Form>

            </Container>
            <Container className={`${styles.Content}`}>
                <Link className={styles.Link} to="/signup">
                    Don't have an account? <span>Sign up</span>
                </Link>
            </Container>
        </div>
        </div>
    );
};

export default SignInForm;