import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import styles from "../../styles/ReviewCreateEditForm.module.css";

function ReviewCreateForm(props) {
  const { recipe, profileImage, profile_id, setReviews } = props;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    try {
      const { data } = await axiosRes.post('/reviews/', {
        recipe: recipe.id,
        rating,
        comment,
      });
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: [data, ...prevReviews.results],
      }));
      setRating(0);
      setComment('');
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data || {});
      }
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleReviewSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profileImage} height={55} width={55} />
          </Link>
          <Form.Control
            className={styles.Form}
            placeholder="my review..."
            as="textarea"
            value={comment}
            name="review"
            onChange={(event) => setComment(event.target.value)}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <Form.Group className="d-flex flex-row align-items-center justify-content-end mt-3">
        <Form.Control
          className="w-25 me-2"
          as="select"
          value={rating}
          name="rating"
          onChange={(event) => setRating(parseInt(event.target.value))}
        >
          <option value={0}>Select Rating</option>
          <option value={1}>1 Star</option>
          <option value={2}>2 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={5}>5 Stars</option>
        </Form.Control>
        <div className="d-flex justify-content-end">
        <Button
          className={`${styles.Button} btn d-block my-2`}
          type="submit"
        >
          Submit
        </Button>
      </div>
      </Form.Group>
    </Form>
  );
}

export default ReviewCreateForm;