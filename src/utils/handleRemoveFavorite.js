import { axiosRes } from "../api/axiosDefaults";

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