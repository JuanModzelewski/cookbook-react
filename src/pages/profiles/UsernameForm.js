import React, { useEffect, useState } from "react";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import { useNavigate, useParams } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/ProfileEditForm.module.css";

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