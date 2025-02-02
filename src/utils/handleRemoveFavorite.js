import { axiosRes } from "../api/axiosDefaults";

/**
 * Handles removing a recipe from the user's favorites.
 * If the user is the recipe's owner or the recipe is not in the user's favorites,
 * the function returns immediately.
 * Otherwise, it sends a DELETE request to the `/favorites/{favorite_id}/` endpoint
 * to remove the recipe from favorites, and updates the recipe's
 * `favorite_count` and `favorite_id` in the state to reflect the change.
 * If the request fails, it logs the error to the console.
 */
export const handleRemoveFavorite = async (recipe, isOwner, setRecipe) => {
    try {
        if (isOwner || !recipe.favorite_id) return;
        await axiosRes.delete(`/favorites/${recipe.favorite_id}/`);
        setRecipe((prevRecipe) => ({
            ...prevRecipe,
            favorite_count: prevRecipe.favorite_count - 1,
            favorite_id: null,
        }));
    } catch (err) {
        console.log(`Error removing favorite: ${err.response?.data || err.message}`);
    }
};