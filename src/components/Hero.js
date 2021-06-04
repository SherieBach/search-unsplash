import React from "react";
import '../styles/index.css'

const Hero = () => {

    return (
        <>
            <div className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">Unsplash image search</h1>
                    <p>Find amazing picture from all around the world</p>
                </div>
                <div className="hero-attribution">Photo by <a href="https://unsplash.com/@lucadgr?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Luca Dugaro</a> on <a href="https://unsplash.com/s/photos/clouds?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
                    </div>
            </div>
        </>
    );
}
export default Hero;
