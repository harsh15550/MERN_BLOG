import React from 'react';
import './SubscriptionForm.css'; // Assuming you have the CSS in this file

const SubscriptionForm = () => {
  return (
    <div className="subscription-main-container">
        <div className="subscription-container">
            <h2 className="subscription-title">Subscribe for the daily Updates</h2>
            <p className="subscription-description">
                Right my front it wound cause fully am sorry it. She jointure goodness interest debating did outweigh.
            </p>
            <form className="subscription-form">
                <input type="email" placeholder="Enter your email" className="subscription-input" />
                <button type="submit" className="subscription-button">Subscribe</button>
            </form>
        </div>
    </div>
  );
};

export default SubscriptionForm;
