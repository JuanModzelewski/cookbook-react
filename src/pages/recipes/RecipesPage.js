import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
// Import Bootstrap Components
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
// Import custom components
import Asset from "../../components/Asset";
import FullScreenSpinner from "../../components/FullScreenSpinner";
import RecipeCard from "./RecipeCard";
// Import custom contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// Import custom styles
import styles from "../../styles/RecipesPage.module.css";
// Import utils
import { fetchMoreData } from "../../utils/utils";


/**
 * RecipesPage
 * The RecipesPage component renders a page that displays a list of recipes.
 * It fetches the recipes from the server and updates the state whenever 
 * the user navigates to a new page or changes the search query. It also 
 * displays a loading message when the recipes are being fetched and an 
 * error message if there is an error.
 */
function RecipesPage({ message, filter="" }) {
    const [recipes, setRecipe] = useState({ results: [] });
    const [query, setQuery] = useState("");
    const [ loading, setLoading ] = useState(false);
    const { pathname } = useLocation();
    const currentUser = useCurrentUser();

    useEffect(() => {
    /**
     * Fetches the recipes from the server, based on the current search query.
     * If the fetch is successful, sets the recipes state with the fetched data
     * and sets the hasLoaded state to true. If there is an error, logs the
     * error to the console. Finally, sets the loading state to false.
     */
        const fetchRecipes = async () => {
            try {
                const { data } = await axiosReq.get(`/recipes/?${filter}search=${query}`);
                setRecipe(data);
                setLoading(true);
            } catch (error) {
                console.log(error);
            }
        };
        setLoading(false);
        fetchRecipes();
    }, [filter, query, pathname, currentUser]);

    return (
        <div className={styles.RecipesPage}>
            <div className={styles.SearchContainer}>
                <i className={`fas fa-search ${styles.SearchIcon}`}></i>
                <Form
                    className={styles.SearchBar}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <Form.Control
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="text"
                        placeholder="Search recipes"
                        className={styles.SearchInput}
                    />
                </Form>
            </div>
            {loading? (
                <>
                    {recipes.results.length ? (
                        <InfiniteScroll
                            children={
                                <Row className="gx-3">  {/* Adjust gutters to fit container */}
                                    {recipes.results.map((recipe) => (
                                        <Col md={12} lg={6} className="p-2" key={recipe.id}>
                                            <RecipeCard {...recipe} setRecipe={setRecipe} />
                                        </Col>
                                    ))}
                                </Row>
                            }
                            dataLength={recipes.results.length}
                            loader={<Asset spinner />}
                            hasMore={recipes.next}
                            next={() => fetchMoreData(recipes, setRecipe)}
                            className="p-2"
                        />
                    ) : (
                        <Container>
                            <Asset message={message} />
                        </Container>
                    )}
                </>
            ) : (
                <FullScreenSpinner message={"Loading recipes..."} />
            )}
        </div>
    );
}

export default RecipesPage;