import React, { useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import RecipeCard from "./RecipeCard";


function RecipesPage({ message, filter="" }) {
    const [ recipes, setRecipe ] = useState({results : []});
    const [ hasLoaded, setHasLoaded ] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const { data } = await axiosReq.get(`/recipes/?${filter}`);
                setRecipe(data);
                setHasLoaded(true);
            } catch (error) {
                console.log(error);
            }
        };
        setHasLoaded(false);
        fetchRecipes();
    }, [filter, pathname]);
  
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Top Rated Recipes mobile</p>
        {hasLoaded ? (
            <>
                {recipes.results.length ? (
                    recipes.results.map((recipe) => (
                        <RecipeCard key={recipe.id} {...recipe} setRecipe={setRecipe}/>
                    ))
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