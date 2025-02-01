import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import { ProfileEditDropdown } from "../../components/EditDeleteDropdown";
import FullScreenSpinner from "../../components/FullScreenSpinner";
import StarRating from "../../components/StarRating";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/ProfilePage.module.css";
import { fetchMoreData } from "../../utils/utils";
import RecipeCard from "../recipes/RecipeCard";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileRecipes, setProfileRecipes] = useState({ results: [] });
  const [profileData, setProfileData] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [ loading, setLoading ] = useState(false); 

  useEffect(() => {
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

  const profile = profileData.results[0];
  const is_owner = currentUser?.username === profile?.owner;
 
  const ratedRecipes = profileRecipes.results.filter((recipe) => recipe.average_rating > 0);
  const average_rating = ratedRecipes.reduce((total, recipe) => total + recipe.average_rating, 0) / ratedRecipes.length;

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
            <div className="d-flex flex-row flex-wrap align-self-start">
              <div className="pe-3 fs-5">Recipes:</div>
              <div className="fs-4">{profile?.recipes_count}</div>
            </div>
            <div className="d-flex flex-row flex-wrap align-self-start">
              <div className="pe-3 fs-5 mb-1">Average Rating:</div>
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
  

  return (
    <Row>
      <Col className="ps-3 pe-3">
          {hasLoaded ? (
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
