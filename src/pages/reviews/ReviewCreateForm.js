import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
// Import Bootstrap Components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// Import custom components
import Avatar from "../../components/Avatar";
// Import custom styles
import styles from "../../styles/ReviewCreateEditForm.module.css";

/**
 * ReviewCreateForm
 * A form to create a new review for a recipe
 */
function ReviewCreateForm(props) {
  const {
    recipe,
    profile_image,
    profile_id,
    setReviews
  } = props;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});

  /**
   * Handles the submission of a new review for a recipe.
   * Prevents the default form submission behavior and clears any existing errors.
   * Sends a POST request to the server with the review data, including the recipe ID, rating, and comment.
   * On successful submission, updates the reviews state to include the new review at the beginning,
   * and resets the rating and comment fields.
   * If an error occurs (excluding unauthorized access), logs the error and sets the error state with the response data.
   */
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
      if (rating === 0) {
        setErrors({
          rating: ["Please select a rating."],
        });
      }
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleReviewSubmit}>
      <Form.Group>
        <InputGroup>
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} width={55} />
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
      {errors?.comment?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group className="d-flex flex-row align-items-center justify-content-end mt-3">
        {errors?.rating?.map((message, idx) => (
          <Alert variant="warning" className="me-2" key={idx}>
            {message}
          </Alert>
        ))}
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