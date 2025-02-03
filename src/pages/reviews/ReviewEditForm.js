import PropTypes from 'prop-types';
import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
// Import Bootstrap Components
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// Import custom styles
import styles from "../../styles/ReviewCreateEditForm.module.css";

/**
 * ReviewEditForm
 * The form allows users to edit the rating and comment of an existing review.
 * It handles form submission by sending a PUT request to update the review on the server.
 * Upon successful submission, it updates the reviews and recipe state and cancels the edit operation.
 * If an error occurs, it displays error messages to the user.
 */

function ReviewEditForm(props) {
    const {
        review,
        handleCancelEdit,
        setReviews,
        setRecipe,
    } = props;

    const [rating, setRating] = useState(review.rating);
    const [comment, setComment] = useState(review.comment);
    const [errors, setErrors] = useState({});

    /**
     * Handles the submission of a review edit form. It sends a PUT request to update
     * the review on the server, and updates the reviews and recipe state if successful.
     * If an error occurs, it logs the error and sets the error state with the response
     * data. If the rating is 0, it sets an error message for the rating field.
     * If the request is successful, it cancels the edit operation.
     */
    const handleReviewEdit = async (event) => {
        event.preventDefault();
        setErrors({});
        try {
            const { data } = await axiosRes.put(`/reviews/${review.id}/`, {
                rating,
                comment,
            });
            setReviews((prevReviews) => ({
                ...prevReviews,
                results: prevReviews.results.map((rev) =>
                    rev.id === review.id ? data : rev
                ),
            }));
            setRecipe((prevRecipe) => ({
                ...prevRecipe,
                review_count: prevRecipe.review_count, // Adjust if necessary
            }));
            handleCancelEdit();
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
        <Form className={styles.EditReviewContainer} onSubmit={handleReviewEdit}>
            <Form.Group>
                <Form.Label className={styles.FormLabel}>Edit Review</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={2}
                    value={comment}
                    name="comment"
                    onChange={(event) => setComment(event.target.value)}
                />
            </Form.Group>
            {errors?.comment?.map((message, idx) => (
                <Alert variant="warning" key={idx}>{message}</Alert>
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
                    <Button className={`${styles.Button} btn d-block my-2 me-2`} type="submit">
                        Save
                    </Button>
                    <Button className={`${styles.Button} btn d-block my-2`} onClick={handleCancelEdit}>
                        Cancel
                    </Button>
                </div>
            </Form.Group>
        </Form>
    );
}

ReviewEditForm.propTypes = {
    review: PropTypes.object.isRequired,
    handleCancelEdit: PropTypes.func.isRequired,
    setReviews: PropTypes.func.isRequired,
    setRecipe: PropTypes.func.isRequired,
};

export default ReviewEditForm;