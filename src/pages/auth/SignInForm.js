import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// Import custom hook
import { useRedirect } from "../../hooks/useRedirect";
// Import Bootstrap Components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
// Import custom context
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
// Import utils
import { setTokenTimestamp } from "../../utils/utils";
// Import custom styles
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/SignInUpForm.module.css";


/**
 * SignInForm
 * This component renders a sign in form with username and password fields and
 * a submit button. When the form is submitted, it attempts to log in the user
 * and redirects them to the homepage if successful. It also displays any
 * errors that occur during the login process.
 */
const SignInForm = () => {
    const setCurrentUser = useSetCurrentUser()
    useRedirect("loggedIn");

    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    })

    const { username, password } = signInData || {};

    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value
        });
    };
    

    /**
     * Handles form submission, sending a POST request to the login endpoint
     * and logging the user in if successful. If there is an error, it sets the
     * errors state to the error response.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const { data } = await axios.post('/dj-rest-auth/login/', signInData);
            setCurrentUser(data.user);
            setTokenTimestamp(data);
            localStorage.setItem('authToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            navigate('/');
        } catch (error) {
          console.error('Login error:', error);
          setErrors(error.response?.data);
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

                    <Button className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright} ${btnStyles.SignInOutText}`} type="submit">
                        SignIn
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