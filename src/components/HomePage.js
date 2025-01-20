import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.css";

class HomePage extends Component {
    state = {
        users: [],
        searchQuery: "",
        sortOrder: "asc",
    };

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => response.json())
            .then((data) => this.setState({ users: data }))
            .catch((error) => console.error("Error fetching users:", error));
    }

    handleSearch = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    toggleSortOrder = () => {
        const newSortOrder = this.state.sortOrder === "asc" ? "desc" : "asc";
        this.setState({ sortOrder: newSortOrder });
    };

    getSortedUsers = (users) => {
        const { sortOrder } = this.state;
        return users.sort((a, b) =>
            sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        );
    };

    render() {
        const { users, searchQuery, sortOrder } = this.state;

        const filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        const displayedUsers = this.getSortedUsers(filteredUsers);

        return (
            <div className="container">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="search-bar"
                    value={searchQuery}
                    onChange={this.handleSearch}
                />
                <button className="button" onClick={this.toggleSortOrder}>
                    Sort {sortOrder === "asc" ? "A-Z" : "Z-A"}
                </button>
                <div>
                    {displayedUsers.length === 0 ? (
                        <div>
                            <p>Not Found</p>
                        </div>
                    ) : (
                        displayedUsers.map((user) => (
                            <div key={user.id} className="user-card">
                                <Link to={`/${user.id}`}>
                                    <p>
                                        <strong>{user.name}</strong>
                                    </p>
                                    <p>Email: {user.email}</p>
                                    <p>City: {user.address.city}</p>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        );
    }
}

export default HomePage;
