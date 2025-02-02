import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Import Bootstrap Components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
// Import custom hook
import { useRedirect } from "../../hooks/useRedirect";
// Import custom styles
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/SignInUpForm.module.css";

/**
 * SignUpForm
 * This component includes a form for users to sign up by providing
 * a username, password, and password confirmation. It manages form
 * state, handles input changes, and submits the registration data
 * to the server. Upon successful registration, the user is navigated
 * to the sign-in page. Validation errors are displayed to the user
 * when applicable.
 */

const SignUpForm = () => {
    useRedirect("loggedIn");

    const [signUpData, setSignUpData] = useState({
        username: "",
        password1: "",
        password2: "",
    })

    const { username, password1, password2 } = signUpData;

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setSignUpData({
            ...signUpData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await axios.post("/dj-rest-auth/registration/", signUpData)
            navigate("/signin")
        } catch (error) {
            setErrors(error.response?.data)
        }
    };

    // Returns the SignUpForm component
    return (
        <div className={styles.PageContainer}>
            <div className={styles.SignUpFormCoverImage}>
            
            <Container className={`${styles.FormContainer} p-4 `}>
                <h1 className={styles.Header}>sign up</h1>
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
                            name="password1"
                            value={password1}
                            onChange={handleChange} />
                    </Form.Group>
                    {errors.password1?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}

                    <Form.Group className="mb-3" controlId="password2">
                        <Form.Label className="d-none">Confirm Password</Form.Label>
                        <Form.Control
                            className={styles.Input}
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            value={password2}
                            onChange={handleChange} />
                    </Form.Group>
                    {errors.password2?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}

                    <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright} ${btnStyles.SignInOutText}`} type="submit">
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
                <Link className={styles.Link} to="/signin">
                    Already have an account? <span>Sign in</span>
                </Link>
            </Container>
        </div>
        </div>
    );
};

export default SignUpForm;