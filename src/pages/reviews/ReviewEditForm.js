import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/ReviewCreateEditForm.module.css";

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
                {errors?.rating?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>{message}</Alert>
                ))}
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

export default ReviewEditForm;
