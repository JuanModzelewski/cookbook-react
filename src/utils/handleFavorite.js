import { axiosRes } from '../api/axiosDefaults';

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
