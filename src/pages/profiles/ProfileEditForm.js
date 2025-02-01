import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../..//styles/ProfileEditForm.module.css";
import { axiosReq } from "../../api/axiosDefaults";
import FullScreenSpinner from "../../components/FullScreenSpinner";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";



function ProfileEditForm() {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const navigate = useNavigate();
    const imageFile = useRef();
    const [ loading, setLoading ] = useState(false); 

    const [profileData, setProfileData] = useState({
        image: "",
        name: "",
        content: "",
    });

    const { image, name, content } = profileData;

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleMount = async () => {
            setLoading(true);
            if (currentUser?.profile_id?.toString() === id) {
            try {
                const { data } = await axiosReq.get(`/profiles/${id}/`);
                const { image, name, content } = data;
                setProfileData({image, name, content});
            } catch (err) {
                console.log(err);
                navigate("/");
            } finally {
                setLoading(false);
            }
        } else {
            navigate("/");
        }
        };

        handleMount();
    }, [currentUser, id, navigate]);

    const handleChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileData({
                ...profileData,
                image: URL.createObjectURL(file),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("content", content);

        if (imageFile.current.files[0]) {
            formData.append("image", imageFile.current.files[0]);
        }

        try {
            const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
            setCurrentUser({...currentUser, image: data.image});
            navigate(`/profiles/${id}`);
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data);
        }
    };

    const textFields = (
        <>
          <Form.Group>
            <Form.Label className="fs-5">Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={handleChange}
              name="name"
              className="mb-4"
            />
          </Form.Group>
          {errors?.name?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group>
            <Form.Label className="fs-5">Bio</Form.Label>
            <Form.Control
              as="textarea"
              value={content}
              onChange={handleChange}
              name="content"
              rows={7}
              className="mb-4"
            />
          </Form.Group>
    
          {errors?.content?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <div className="d-flex flex-row">
          <Button
            className={`${btnStyles.Button} ${btnStyles.Wide} p-2 me-3 ms-3 fs-6`}
            variant="warning"
            onClick={() => navigate(-1)}
          >
            cancel
          </Button>
          <Button
            variant="secondary" 
            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright} p-2 me-3 ms-3 fs-6`} 
            type="submit">
            save
          </Button>
          </div>
        </>
      );

    return (
        <Form onSubmit={handleSubmit}>
            {loading && <FullScreenSpinner />}
            <Container className={styles.ProfileEditPage}>
                <Form.Group className="text-center">
                    {image && (
                        <figure>
                            <img src={image} alt="Profile image" className={styles.ProfileImage} fluid="true" />
                        </figure>
                    )}
                    {errors?.image?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    <div>
                        <Form.Label
                            className={`${btnStyles.Button} ${btnStyles.Black} p-2 pe-4 ps-4 mt-3 text-center fs-6`}
                            htmlFor="image-upload"
                            variant="secondary"
                        >
                            Change image
                        </Form.Label>
                    </div>
                    <Form.Control
                        id="image-upload"
                        ref={imageFile}
                        accept="image/*"
                        onChange={handleImageChange}
                        type="file"
                    />
                </Form.Group>
                <Container>{textFields}</Container>
            </Container>
        </Form>
    );
}

export default ProfileEditForm;
