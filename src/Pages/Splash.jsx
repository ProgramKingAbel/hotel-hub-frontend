import React from 'react';

const Splash = () => (
  <div className="splash">
    <div className="splash-nav">
      <img src="images/menu.svg" alt="menu" />
      <img src="images/binoculars.svg" alt="binoculars" />
    </div>
    <div className="splash_intro">
      <h1>Hotel Hub</h1>
      <h3>Where Comfort Meets Convenience</h3>
      <p>
        Welcome to Hotel Hub, where the world of luxurious accommodations and
        unforgettable experiences unfolds before you. Dive into a realm where each
        stay is a story waiting to be told, and where impeccable service meets
        breathtaking destinations. Your journey begins here.
      </p>
      <div className="splash_intro-btns">
        <a href="/register" className="btn btn-animated-left">
          <img src="images/hand-pointing.svg" alt="sign up" />
          <span>Sign up</span>
        </a>
        <a href="/login" className="btn btn-animated-right">
          <img src="images/sign-in.svg" alt="sign up" />
          <span>Login</span>
        </a>
      </div>
    </div>
  </div>
);

export default Splash;
