import { axiosRes } from '../api/axiosDefaults';

/**
 * Handles adding a recipe to the user's favorites.
 * If the user is the recipe's owner, the function returns immediately.
 * Otherwise, it sends a POST request to the `/favorites/` endpoint
 * with the recipe's `id` as payload, and updates the recipe's
 * `favorite_count` and `favorite_id` in the state.
 * If the request fails, it logs the error to the console.
 */
export const handleFavorite = async (recipeId, is_owner, setRecipe) => {
    try {
        if (is_owner) return;
        const { data } = await axiosRes.post(`/favorites/`, { recipe: recipeId });
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            favorite_count: prevRecipe.favorite_count + 1,
            favorite_id: data.id,
        }));
    } catch (err) {
        console.log(`Error adding recipe to favorites: ${err.response?.data || err.message}`);
    }
};
