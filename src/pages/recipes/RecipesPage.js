import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/RecipesPage.module.css";
import { fetchMoreData } from "../../utils/utils";
import RecipeCard from "./RecipeCard";

function RecipesPage({ message, filter="" }) {
    const [recipes, setRecipe] = useState({ results: [] });
    const [query, setQuery] = useState("");
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const currentUser = useCurrentUser();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const { data } = await axiosReq.get(`/recipes/?${filter}search=${query}`);
                setRecipe(data);
                setHasLoaded(true);
            } catch (error) {
                console.log(error);
            }
        };
        setHasLoaded(false);
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
            {hasLoaded ? (
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
                <Container>
                    <Asset spinner />
                </Container>
            )}
        </div>
    );
}

export default RecipesPage;
