import React from 'react';
import Logo from '../../assets/cookbook-logo.png';
import FeatureOne from '../../assets/features/add-to-favorites.jpg';
import styles from '../../styles/About.module.css';


const About = () => {
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
                            <img src={FeatureOne} alt="add to favorites" className={styles.FeatureImage} />
                        </div>
                        <div className={styles.Feature}>
                            <h2>Add to Favorites</h2>
                            <p>
                                Unlock the convenience of having all your favorite recipes at your fingertips
                                by signing up. With our "Favorites" feature, you can save recipes you
                                love and access them anytime, anywhere. No more scrolling through endless feeds
                                or losing track of that mouth-watering dish you wanted to try. Simply hit the
                                <i className={`${styles.FavoriteIcon} fas fa-heart me-2 ms-2 p-0 fs-3`}></i>icon to add any recipe to your favorites, and enjoy the ease of having your
                                personal cookbook always within reach.
                            </p>
                        </div>
                    </div>

                    <div className={styles.FeatureContainer}>
                        <div className={styles.FeatureImageContainer}>
                            <img src={FeatureOne} alt="Signup" className={styles.FeatureImage} />
                        </div>
                        <div className={styles.Feature}>
                            <h2>Add to Favorites</h2>
                            <p>
                                Unlock the convenience of having all your favorite recipes at your fingertips
                                by signing up. With our "Favorites" feature, you can save recipes you
                                love and access them anytime, anywhere. No more scrolling through endless feeds
                                or losing track of that mouth-watering dish you wanted to try. Simply hit the
                                <i className={`${styles.FavoriteIcon} fas fa-heart me-2 ms-2 p-0 fs-3`}></i>icon to add any recipe to your favorites, and enjoy the ease of having your
                                personal cookbook always within reach.
                            </p>
                        </div>
                    </div>

                    <div className={styles.FeatureContainer}>
                        <div className={styles.FeatureImageContainer}>
                            <img src={FeatureOne} alt="Signup" className={styles.FeatureImage} />
                        </div>
                        <div className={styles.Feature}>
                            <h2>Add to Favorites</h2>
                            <p>
                                Unlock the convenience of having all your favorite recipes at your fingertips
                                by signing up. With our "Favorites" feature, you can save recipes you
                                love and access them anytime, anywhere. No more scrolling through endless feeds
                                or losing track of that mouth-watering dish you wanted to try. Simply hit the
                                <i className={`${styles.FavoriteIcon} fas fa-heart me-2 ms-2 p-0 fs-3`}></i>icon to add any recipe to your favorites, and enjoy the ease of having your
                                personal cookbook always within reach.
                            </p>
                        </div>
                    </div>

                    <div className={styles.FeatureContainer}>
                        <div className={styles.FeatureImageContainer}>
                            <img src={FeatureOne} alt="Signup" className={styles.FeatureImage} />
                        </div>
                        <div className={styles.Feature}>
                            <h2>Add to Favorites</h2>
                            <p>
                                Unlock the convenience of having all your favorite recipes at your fingertips
                                by signing up. With our "Favorites" feature, you can save recipes you
                                love and access them anytime, anywhere. No more scrolling through endless feeds
                                or losing track of that mouth-watering dish you wanted to try. Simply hit the
                                <i className={`${styles.FavoriteIcon} fas fa-heart me-2 ms-2 p-0 fs-3`}></i>icon to add any recipe to your favorites, and enjoy the ease of having your
                                personal cookbook always within reach.
                            </p>
                        </div>
                    </div>

                    <div className={styles.FeatureContainer}>
                        <div className={styles.FeatureImageContainer}>
                            <img src={FeatureOne} alt="Signup" className={styles.FeatureImage} />
                        </div>
                        <div className={styles.Feature}>
                            <h2>Add to Favorites</h2>
                            <p>
                                Unlock the convenience of having all your favorite recipes at your fingertips
                                by signing up. With our "Favorites" feature, you can save recipes you
                                love and access them anytime, anywhere. No more scrolling through endless feeds
                                or losing track of that mouth-watering dish you wanted to try. Simply hit the
                                <i className={`${styles.FavoriteIcon} fas fa-heart me-2 ms-2 p-0 fs-3`}></i>icon to add any recipe to your favorites, and enjoy the ease of having your
                                personal cookbook always within reach.
                            </p>
                        </div>
                    </div>
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to connect food enthusiasts from around the world and create a vibrant community where users can share their love for cooking. We believe that food brings people together, and our platform is designed to foster connections, creativity, and culinary exploration.
                    </p>
                    <h2>Features</h2>
                    <ul>
                        <li><strong>Add to Favorites:</strong> Save your favorite recipes for easy access and inspiration.</li>
                        <li><strong>Upload Your Recipes:</strong> Share your culinary creations with the community and get feedback from fellow food lovers.</li>
                        <li><strong>Review and Comment:</strong> Engage with other users by reviewing and commenting on their recipes. Share tips, ask questions, and celebrate each other's successes.</li>
                    </ul>
                    <h2>Our Team</h2>
                    <p>
                        Our team is made up of passionate food enthusiasts, developers, and designers who work tirelessly to make [Your App Name] the best it can be. Meet the team:
                    </p>
                    <ul>
                        <li>Person 1 - Role</li>
                        <li>Person 2 - Role</li>
                        <li>Person 3 - Role</li>
                    </ul>
                    <h2>Contact Us</h2>
                    <p>
                        Have questions, feedback, or just want to say hello? Reach out to us at [Your Contact Information]. We love hearing from our users and are always here to help!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
