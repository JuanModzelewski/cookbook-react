import React, { useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/RecipesPage.module.css";
import { fetchMoreData } from "../../utils/utils";
import RecipeCard from "./RecipeCard";


function RecipesPage({ message, filter="" }) {
    const [ recipes, setRecipe ] = useState({results : []});
    const [ query, setQuery ] = useState("");
    const [ hasLoaded, setHasLoaded ] = useState(false);
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
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>Top Rated Recipes mobile</p>
                <i className={`fas fa-search ${styles.SearchIcon}`}></i>
                <Form
                    className={styles.SearchBar}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <Form.Control
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="text"
                        className="mr-sm-2"
                        placeholder="Search recipes"
                    />
                </Form>
                {hasLoaded ? (
                    <>
                        {recipes.results.length ? (
                            <InfiniteScroll
                                children={recipes.results.map((recipe) => (
                                    <RecipeCard key={recipe.id} {...recipe} setRecipe={setRecipe} />
                                ))}
                                dataLength={recipes.results.length}
                                loader={<Asset spinner />}
                                hasMore={recipes.next}
                                next={() => fetchMoreData(recipes, setRecipe)}
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
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <p>Top Rated Recipes for desktop</p>
            </Col>
        </Row>
    );
}

export default RecipesPage;