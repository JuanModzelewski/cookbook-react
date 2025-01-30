import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";



function ProfileEditForm() {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const navigate = useNavigate();
    const imageFile = useRef();

    const [profileData, setProfileData] = useState({
        profile_image: "",
        name: "",
        content: "",
    });

    const { profile_image, name, content } = profileData;

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleMount = async () => {
            if (currentUser?.profile_id?.toString() === id) {
            try {
                const { data } = await axiosReq.get(`/profiles/${id}/`);
                const { profile_image, name, content } = data;
                setProfileData({profile_image, name, content});
            } catch (err) {
                console.log(err);
                navigate("/");
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
                profile_image: URL.createObjectURL(file),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("content", content);

        if (imageFile.current.files[0]) {
            formData.append("profile_image", imageFile.current.files[0]);
        }

        try {
            const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
            setCurrentUser({...currentUser, profile_image: data.profile_image});
            navigate(`/profiles/${id}`);
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data);
        }
    };

    const textFields = (
        <>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={handleChange}
              name="name"
            />
          </Form.Group>

          {errors?.name?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}

          <Form.Group>
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              value={content}
              onChange={handleChange}
              name="content"
              rows={7}
            />
          </Form.Group>
    
          {errors?.content?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Button
            className={`${btnStyles.Button} ${btnStyles.Blue}`}
            onClick={() => navigate(-1)}
          >
            cancel
          </Button>
          <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
            save
          </Button>
        </>
      );

    return (
        <Form onSubmit={handleSubmit}>
            <Container>
                <Form.Group>
                    {profile_image && (
                        <figure>
                            <img src={profile_image} fluid="true" />
                        </figure>
                    )}
                    {errors?.image?.map((message, idx) => (
                        <Alert variant="warning" key={idx}>
                            {message}
                        </Alert>
                    ))}
                    <div>
                        <Form.Label
                            className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
                            htmlFor="image-upload"
                        >
                            Change the image
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
                <div className="d-md-none">{textFields}</div>
            </Container>
            <Container>{textFields}</Container>
        </Form>
    );
}

export default ProfileEditForm;
