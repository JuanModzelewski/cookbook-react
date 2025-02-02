import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
// Import Bootstrap Components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
// Import custom contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// Import custom styles
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/ProfileEditForm.module.css";

/**
 * UserPasswordForm
 * This component renders a form for users to change their password. It
 * authenticates the user, validates the input, and submits the new password
 * to the server. If successful, it navigates the user to the previous page.
 * If there are errors, it displays them to the user.
 */
const UserPasswordForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });
  const { new_password1, new_password2 } = userData;

  const [errors, setErrors] = useState({});

  /**
   * Handles changes to the form fields.
   * Updates the userData state with the new values.
   */
  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      // redirect user if they are not the owner of this profile
      navigate("/");
    }
  }, [currentUser, navigate, id]);

  /**
   * Handles form submission, sending a POST request to the change password endpoint
   * and changing the user's password if successful. If there is an error, it sets the
   * errors state to the error response.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.post("/dj-rest-auth/password/change/", userData);
      navigate(-1);
    } catch (err) {
      console.log(err);
      setErrors(err.response?.data);
    }
  };

  return (
    <div className={styles.ProfilePage}>
      <Col className="py-2 mx-auto text-start" md={6}>
        <Container className={styles.Content}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>New password</Form.Label>
              <Form.Control
                placeholder="new password"
                type="password"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
              />
            </Form.Group>
            {errors?.new_password1?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Form.Group className="mt-3">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                placeholder="confirm new password"
                type="password"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
              />
            </Form.Group>
            {errors?.new_password2?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} fs-7 p-2 mt-3`}
              onClick={() => navigate(-1)}
              variant="warning"
            >
              CANCEL
            </Button>
            <Button
              type="submit"
              className={`${btnStyles.Button} ${btnStyles.Bright} btn fs-7 p-2 mt-3 ms-2`}
            >
              SAVE
            </Button>
          </Form>
        </Container>
      </Col>
    </div>
  );
};

export default UserPasswordForm;