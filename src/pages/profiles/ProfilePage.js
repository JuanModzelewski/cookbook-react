import React, { useEffect, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { EditDeleteDropdown } from "../../components/EditDeleteDropdown";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileRecipes }] = await Promise.all([
          axiosReq.get(`/profiles/${id}/`),
          axiosReq.get(`/recipes/?owner__profile=${id}`),
        ]);

        console.log('Fetched Profile:', pageProfile); // Debug log
        console.log('Fetched Recipes:', profileRecipes); // Debug log

        setProfileData({ results: [pageProfile] });
        setProfileRecipes(profileRecipes);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const profile = profileData.results[0];
  const is_owner = currentUser?.username === profile?.owner;
  const average_rating = (profileRecipes.results.reduce((acc, recipe) => acc + recipe.average_rating, 0) / profileRecipes.results.length).toFixed(2);

  const mainProfile = (
    <>
    <div className="d-flex flex-row w-100">
      <div className="d-flex flex-row align-items-center gap-3 w-100">
        <div className="d-flex flex-column">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.profile_image}
          />
          <h3 className="text-center">{profile?.owner}</h3>
        </div>
        <div className="d-flex flex-row align-items-center">

          <div className="justify-content-center no-gutters">
            <div className="d-flex flex-row align-items-center">
              <div className="pe-3">Recipes</div>
              <div>{profile?.recipes_count}</div>
            </div>
            <div className="d-flex flex-row align-items-center">
              <div className="pe-3">Average Rating</div>
              <StarRating rating={average_rating} />
            </div>
          </div>
        </div>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </div>
      {is_owner && (
          <div className="align-self-start">
            <EditDeleteDropdown
              handleEdit={() => { }}
              handleDelete={() => { }}
              className="align-self-start"
            />
          </div>)}
    </div>
    </>
  );

  const mainProfileRecipes = (
    <>
      <hr />
      <div className="text-center">{profile?.owner}'s recipes</div>
      <hr />
      {profileRecipes.results.length ? (
        <InfiniteScroll
          children={profileRecipes.results.map((recipe) => (
            <RecipeCard key={recipe.id} {...recipe} setRecipes={setProfileRecipes} />
          ))}
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
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileRecipes}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default ProfilePage;
