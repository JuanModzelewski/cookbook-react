import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
// Import Bootstrap Components
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
// Import custom components
import Asset from "../../components/Asset";
import { ProfileEditDropdown } from "../../components/EditDeleteDropdown";
import FullScreenSpinner from "../../components/FullScreenSpinner";
import StarRating from "../../components/StarRating";
import RecipeCard from "../recipes/RecipeCard";
// Import custom contexts
import { useCurrentUser } from "../../contexts/CurrentUserContext";
// Import custom styles
import styles from "../../styles/ProfilePage.module.css";
// Import utils
import { fetchMoreData } from "../../utils/utils";


/**
 * The ProfilePage component renders the main profile page.
 * It displays the user's name, content, and their recipes.
 * If the user is the owner of the profile, it also displays
 * an edit button that allows the user to edit their profile
 * If the user is not the owner of the profile, it
 * does not display the edit button.
 */
function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [profileRecipes, setProfileRecipes] = useState({ results: [] });
  const [profileData, setProfileData] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  useEffect(() => {
  /**
   * Fetches the profile data and associated recipes for the user with the given id.
   * Sets the profile data and recipes into state and updates the loading and loaded states.
   * If an error occurs during the fetch, it logs the error and ensures the loading state is reset.
   */
    const fetchData = async () => {
      setLoading(true);
      try {
        const [{ data: pageProfile }, { data: profileRecipes }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/recipes/?owner__profile=${id}`),
        ]);
        setProfileData({ results: [pageProfile] });
        setProfileRecipes(profileRecipes);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // Gets the current profile
  const profile = profileData.results[0];
  // Checks if the current user is the owner of the profile
  const is_owner = currentUser?.username === profile?.owner;
  // Gets recipes with ratings
  const ratedRecipes = profileRecipes.results.filter((recipe) => recipe.average_rating > 0);
  // Gets average rating of the current users recipes
  const average_rating = ratedRecipes.reduce((total, recipe) => total + recipe.average_rating, 0) / ratedRecipes.length;

  // Main Profile Content
  const mainProfile = (
    <>
    <div className="d-flex flex-row justify-content-end me-4">
      {is_owner && (
            <ProfileEditDropdown
              id={profile?.id}
            />
          )}
      </div>
    <div className={styles.ProfileContainer}>
      <div className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-3 w-100">
        <div className="d-flex flex-column">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </div>
        <div className={styles.ProfileInfo}>
        <h3 className="text-center fw-bold mb-3">{profile?.name || profile?.owner}</h3>
            <div className="d-flex flex-row flex-wrap align-items-center align-self-start">
              <div className="pe-3 fs-5">Recipes:</div>
              <div className="fs-4">{profile?.recipes_count}</div>
            </div>
            <div className="d-flex flex-row flex-wrap align-items-center align-self-start">
              <div className="pe-3 fs-5">Average Rating:</div>
              <StarRating rating={average_rating}/>
            </div>
        </div>
      </div>
    </div>
    {profile?.content && <div className={styles.About}>
          <div className="fs-4 text-center">About {profile?.owner}</div>
          <hr />
            {profile.content}
          </div>}
    </>
  );

  // Recipe Content
  const mainProfileRecipes = (
    <>
      <hr />
      <div className="text-center fs-4">{currentUser?.username === profile?.owner ? 'Your' : profile?.owner + "'s"} recipes</div>
      <hr />
      {profileRecipes.results.length ? (
        <InfiniteScroll
          children={
            <Row className="gx-0">
              {profileRecipes.results.map((recipe, index) => (
                <Col md={6} sm={12} className="p-2" key={recipe.id}>
                  <RecipeCard key={recipe.id} {...recipe} setRecipes={setProfileRecipes} />
                </Col>
              ))}
            </Row>
          }
          dataLength={profileRecipes.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileRecipes.next}
          next={() => fetchMoreData(profileRecipes, setProfileRecipes)}
        />
      ) : (
        <Asset
          message={`No results found, ${profile?.owner} hasn't added any recipes yet.`}
        />
      )}
    </>
  );
  
  // When the page has loaded, display the content
  return (
    <Row>
      <Col className="ps-3 pe-3">
          {hasLoaded && !loading ? (
            <>
            <div className={styles.Content}>
              {mainProfile}
              {mainProfileRecipes}
            </div>
            </>
          ) : (
            <FullScreenSpinner message="Loading profile..." />
          )}
      </Col>
    </Row>
  );
}

export default ProfilePage;
