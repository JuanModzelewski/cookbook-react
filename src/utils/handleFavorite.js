import { axiosRes } from '../api/axiosDefaults';

export const handleFavorite = async (recipeId, isOwner, setRecipe) => {
    try {
        if (isOwner) return;
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
