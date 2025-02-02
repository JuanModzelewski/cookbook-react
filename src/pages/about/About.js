import React from 'react';
import { useNavigate } from 'react-router-dom';
// Import Images
import Logo from '../../assets/CookBook-Logo.png';
import FeatureOne from '../../assets/features/add-to-favorites.jpg';
import FeatureTwo from '../../assets/features/create-recipe.jpg';
import FeatureFour from '../../assets/features/profile.jpg';
import FeatureThree from '../../assets/features/reviews.jpg';
// Import custom styles
import styles from '../../styles/About.module.css';
import btnStyles from '../../styles/Button.module.css';

const About = () => {
    const navigate = useNavigate();
    // Returns the about page with main features
    return (
        <div className={`${styles.AboutPage}`}>
            <div className={`${styles.AboutCoverImage}`} >
                <div className={styles.AboutContainer}>
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <div className={styles.Logo}>
                            <img src={Logo} alt="CookBook Logo" className={styles.LogoImage} />
                        </div>
                        <h1>Welcome to CookBook</h1>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <p className={styles.AboutText}>
                            Your go-to social media platform for all things culinary!<br />
                            Whether you're a seasoned chef or a kitchen novice, our community is here to inspire,
                            connect, share, and celebrate the joy of cooking.
                        </p>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <h2>Our Mission</h2>
                        <p className={styles.AboutText}>
                        Our mission is to connect food enthusiasts from around the world and create a vibrant 
                        community where users can share their love for cooking. We believe that food brings 
                        people together, and our platform is designed to foster connections, creativity, 
                        and culinary exploration.
                        </p>
                    </div>
                    <div className={styles.FeatureContainer}>
                        <div className={styles.FeatureImageContainer}>
                            <img src={FeatureOne} alt="Add to Favorites" className={styles.FeatureImage} />
                        </div>
                        <div className={styles.Feature}>
                            <h2>Add to Favorites</h2>
                            <p>
                                Unlock the convenience of having all your favorite recipes at your fingertips
                                by signing up. With our "Favorites" feature, you can save recipes you
                                love and access them anytime, anywhere. No more scrolling through endless feeds
                                or losing track of that mouth-watering dish you wanted to try. Simply hit the
                                <i className={`${styles.FavoriteIcon} fas fa-heart me-2 ms-2 p-0 fs-3`}></i>
                                icon to add any recipe to your favorites, and enjoy the ease of having your
                                personal cookbook always within reach.
                            </p>
                        </div>
                    </div>
                    <div className={styles.FeatureContainer}>
                    <div className={styles.Feature}>
                            <h2>Create Your Own Recipes</h2>
                            <p>
                            Showcase your culinary creativity by sharing your own recipes with the community. 
                            Signing up allows you to upload your recipes, complete with photos, ingredients, 
                            and step-by-step instructions. Whether it's your grandma's secret pie recipe or 
                            your latest kitchen experiment, your culinary creations can inspire and delight 
                            fellow food enthusiasts. Gain feedback, share tips, and become a valued 
                            contributor in our vibrant community of cooks and food lovers.
                            </p>
                        </div>
                        <div className={styles.FeatureImageContainer}>
                            <img src={FeatureTwo} alt="Create a Recipe" className={styles.FeatureImage} />
                        </div>
                    </div>
                    <div className={styles.FeatureContainer}>
                        <div className={styles.FeatureImageContainer}>
                            <img src={FeatureThree} alt="Recipe Reviews" className={styles.FeatureImage} />
                        </div>
                        <div className={styles.Feature}>
                            <h2>Review and Comment on Recipes</h2>
                            <p>
                            Engage with the community by reviewing and commenting on others' recipes. Your insights 
                            and experiences can help others improve their cooking skills, discover new flavors, and 
                            perfect their dishes. By signing up, you can leave detailed reviews, rate recipes, and 
                            join lively discussions. Share your tips, ask questions, and celebrate the joy of cooking 
                            together with fellow food enthusiasts from around the world.
                            </p>
                        </div>
                    </div>
                    <div className={styles.FeatureContainer}>
                    <div className={styles.Feature}>
                            <h2>View Profiles and Recipes</h2>
                            <p>
                            Explore the culinary masterpieces of fellow food enthusiasts by selecting their profiles. 
                            By signing up, you can view detailed profiles of other users, showcasing their collection 
                            of recipes and overall ratings. Discover new and exciting dishes, and get inspired by their 
                            culinary journey. Each profile offers a glimpse into the user's unique cooking style and expertise, 
                            complete with recipe ratings and reviews from the community. Whether you're seeking new ideas 
                            or want to connect with like-minded cooks, our platform provides the perfect space to explore and learn from each other.
                            </p>
                        </div>
                        <div className={styles.FeatureImageContainer}>
                            <img src={FeatureFour} alt="Profile Page" className={styles.FeatureImage} />
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex flex-row align-items-center justify-content-center w-100 mb-3" >
                        <div className={styles.SignUpContainer}>
                        <h2>Sign Up Now</h2>
                    <p>
                    These features make signing up an enriching experience, transforming your cooking 
                    journey into an interactive and enjoyable adventure. Join our community today and 
                    start sharing, discovering, and connecting through the love of food.
                    </p>
                    <button className={`${btnStyles.Button} ${btnStyles.Bright} ps-3 pe-3`} onClick={() => navigate("/signup")}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
