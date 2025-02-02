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
import { useCurrentUser, useSetCurrentUser, } from "../../contexts/CurrentUserContext";
// Import custom styles
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/ProfileEditForm.module.css";

/**
 * Component for editing the username of a user's profile.
 * The component will fetch the current user's information from the context and
 * populate the form with the user's current username. If the user is not logged in
 * or is not the owner of the profile, the component will redirect the user to the
 * homepage.
 *
 * Once the form is submitted, the component will send a PUT request to the
 * server with the new username. If the request is successful, the component will
 * update the current user's information in the context and redirect the user back
 * to the previous page. If the request fails, the component will display the
 * errors to the user.
 */
const UsernameForm = () => {
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  useEffect(() => {
    if (currentUser?.profile_id?.toString() === id) {
      setUsername(currentUser.username);
    } else {
      navigate("/");
    }
  }, [currentUser, navigate, id]);

  /**
   * UsernameForm
   * Handles the submission of the username edit form.
   * Updates the current user's username by making a PUT request
   * to the Django REST Framework API, and then redirects the user
   * to the previous page.
   *
   * If the request fails, the component will display the
   * errors to the user.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put("/dj-rest-auth/user/", {
        username,
      });
      setCurrentUser((prevUser) => ({
        ...prevUser,
        username,
      }));
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
          <Form onSubmit={handleSubmit} className="my-2">
            <Form.Group>
              <Form.Label className="fs-5 font-weight-bold">Change username</Form.Label>
              <Form.Control
                placeholder="username"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>
            {errors?.username?.map((message, idx) => (
              <Alert key={idx} variant="warning">
                {message}
              </Alert>
            ))}
            <Button
              className={`${btnStyles.Button} fs-7 mt-3`}
              onClick={() => navigate(-1)}
              variant="warning"
            >
              CANCEL
            </Button>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Bright} fs-7 mt-3 ms-2`}
              type="submit"
            >
              SAVE
            </Button>
          </Form>
        </Container>
      </Col>
    </div>
  );
};

export default UsernameForm;