import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./index.css";

const apiStatusConstants = {
    initial: "INITIAL",
    success: "SUCCESS",
    failure: "FAILURE",
    inProgress: "IN_PROGRESS",
};

const UserDetail = () => {
    const [user, setUser] = useState(null);
    const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
    const { id } = useParams();
    useEffect(() => {
        getUserDetails();
    }, [id]);

    const getUserDetails = async () => {
        setApiStatus(apiStatusConstants.inProgress);

        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/users/${id}`
            );
            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setApiStatus(apiStatusConstants.success);
            } else {
                setApiStatus(apiStatusConstants.failure);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
            setApiStatus(apiStatusConstants.failure);
        }
    };

    const renderLoadingView = () => (
        <div className="user-detail-loader-container">
            <p className="loading-text">Loading...</p>
        </div>
    );

    const renderFailureView = () => (
        <div className="user-detail-error-view-container">
            <img
                alt="error view"
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
                className="error-view-image"
            />
            <h1 className="error-message">User Not Found</h1>
            <Link to="/">
                <button type="button" className="button">
                    Go Back
                </button>
            </Link>
        </div>
    );

    const renderUserDetailsView = () => {
        const { name, email, phone, website, company } = user;

        return (
            <div className="user-details-container">
                <h1 className="user-name">{name}</h1>
                <p className="user-email">Email: {email}</p>
                <p className="user-phone">Phone: {phone}</p>
                <p className="user-website">
                    Website:{" "}
                    <a
                        href={`http://${website}`}
                        target="_blank"
                        rel="noreferrer"
                        className="website-link"
                    >
                        {website}
                    </a>
                </p>
                <p className="user-company">Company: {company?.name}</p>
                <Link to="/">
                    <div className="go-back-btn">
                        <button type="button" className="button">
                            Go Back
                        </button>
                    </div>
                </Link>
            </div>
        );
    };

    const renderUserDetails = () => {
        switch (apiStatus) {
            case apiStatusConstants.success:
                return renderUserDetailsView();
            case apiStatusConstants.failure:
                return renderFailureView();
            case apiStatusConstants.inProgress:
                return renderLoadingView();
            default:
                return null;
        }
    };

    return <div className="user-detail-page">{renderUserDetails()}</div>;
};

export default UserDetail;
