import React, { useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Upload from "../../assets/upload.png";
import Asset from "../../components/Asset";
import FullScreenSpinner from "../../components/FullScreenSpinner";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/RecipeCreateEditForm.module.css";

function RecipeCreateForm() {

    const [errors, setErrors] = useState({});

    const [recipeData, setRecipeData] = useState({
        title: "",
        description: "",
        cooking_instructions: "",
        ingredients: [ { name: "", quantity: "" } ],
        recipe_image: "",
    });

    const { title, description, cooking_instructions, ingredients, recipe_image } = recipeData;

    const imageInput = useRef(null);
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(false);

    const handleChange = (event) => {
        setRecipeData({
            ...recipeData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(recipe_image);
            setRecipeData({
                ...recipeData,
                recipe_image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleIngredientChange = (index, event) => {
        const { name, value } = event.target;
        const newIngredients = [...ingredients];
        newIngredients[index][name] = value;
        setRecipeData({ ...recipeData, ingredients: newIngredients });
    };

    const handleAddIngredient = () => {
        setRecipeData({
            ...recipeData,
            ingredients: [...ingredients, { name: '', quantity: '' }],
        });
    };

    const handleRemoveIngredient = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setRecipeData({ ...recipeData, ingredients: newIngredients });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData(event.target);

        const filteredIngredients = ingredients.filter(
            ingredient => ingredient.name.trim() !== '' && ingredient.quantity.trim() !== '');

        formData.append("title", title);
        formData.append("description", description);
        formData.append("ingredients", JSON.stringify(filteredIngredients));
        formData.append("cooking_instructions", cooking_instructions);
        formData.append("recipe_image", imageInput.current.files[0]);

        try {
            const { data } = await axiosReq.post("/recipes/", formData);
            navigate(`/recipes/${data.id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        } finally {
            setLoading(false);
        }
    };

    const textFields = (
        <div>
            <Form.Group className={styles.FormGroup}>
                <Form.Label className="align-self-start mb-3">
                    Title
                </Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            <hr className={styles.Divider} />
            {errors?.title?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group className={styles.FormGroup}>
                <Form.Label className="align-self-start mb-3">
                    Description
                </Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={description}
                    onChange={handleChange}
                />
            </Form.Group>
            <hr className={styles.Divider} />
            {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group className={styles.FormGroup}>
                <Form.Label className="align-self-start mb-3">
                    Cooking Instructions
                </Form.Label>
                <Form.Control
                    as="textarea"
                    rows={8}
                    name="cooking_instructions"
                    value={cooking_instructions}
                    onChange={handleChange}
                />
            </Form.Group>
            <hr className={styles.Divider} />
            {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
        </div>
    );

    const submitFields = (
        <div className="d-flex justify-content-end">
            <Button
                variant="secondary"
                className={`${btnStyles.Wide} ${btnStyles.Button}`}
                onClick={() => navigate(-1)}
            >
                CANCEL
            </Button>
            <Button
                className={`${btnStyles.Button} ${btnStyles.Bright} ${btnStyles.Wide}`}
                type="submit"
            >
                CREATE
            </Button>
        </div>
    );

    const ingredientsFields = (
        <div>
            <Form.Group className={styles.FormGroup}>
                <Form.Label className="align-self-start mb-3">Ingredients</Form.Label>
                {ingredients.map((ingredient, index) => (
                    <div key={index} className={styles.Ingredient}>
                        <Form.Control
                            type="text"
                            name="name"
                            value={ingredient.name}
                            onChange={(event) => handleIngredientChange(index, event)}
                            placeholder="Ingredient"
                        />
                        <Form.Control
                            type="text"
                            name="quantity"
                            value={ingredient.quantity}
                            onChange={(event) => handleIngredientChange(index, event)}
                            placeholder="Quantity"
                        />
                        {ingredients.length > 1 && (
                            <div
                                type="button"
                                onClick={() => handleRemoveIngredient(index)}>
                                <i className={`${styles.IngredientIcons} fa-solid fa-circle-minus`}></i>
                            </div>
                        )}
                        {index === ingredients.length - 1 && (
                            <div
                                type="button"
                                onClick={handleAddIngredient}>
                                <i className={`${styles.IngredientIcons} fa-solid fa-circle-plus`}></i>
                            </div>
                        )}
                    </div>
                ))}
            </Form.Group>
        </div>
    )

    return (
        <Form onSubmit={handleSubmit}>
            {loading && <FullScreenSpinner />}
            <Row>
                <Col className="py-2 p-0 p-md-2" lg={6}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            {recipe_image ? (
                                <>
                                    <figure>
                                        <img
                                            className={`${appStyles.Image} ${styles.Image}`}
                                            src={recipe_image}
                                        />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} ${btnStyles.Orange} btn`}
                                            htmlFor="image-upload"
                                        >CHANGE THE IMAGE
                                        </Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label
                                    className="d-flex justify-content-center"
                                    htmlFor="image-upload"
                                >
                                    <Asset
                                        src={Upload}
                                        size={120}
                                        message="Upload a photo"
                                    />
                                </Form.Label>
                            )}
                            <Form.Control
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                        </Form.Group>
                        {errors?.recipe_image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="d-md-none p-2 p-md-2">
                            {textFields}
                            {ingredientsFields}
                            {submitFields}
                        </div>
                    </Container>
                </Col>
                <Col
                    lg={6}
                    className="d-none d-md-block p-2 p-md-2">
                    <Container className={styles.Content}>
                        {textFields}
                        {ingredientsFields}
                        {submitFields}
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default RecipeCreateForm;