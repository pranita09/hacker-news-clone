import React from "react";
import { useData } from "../../context/dataContext";
import Story from "../Story/Story";
import "./ListingOfStories.css";

const ListingOfStories: React.FC = () => {
  const {
    stories,
    loading,
    error,
    handleLoadMore,
    selectedTab,
    setSelectedTab,
  } = useData();

  const handleTabChange = (option: string) => {
    setSelectedTab(option);
  };

  return (
    <div className="listContainer">
      {error ? (
        <p className="errMessage">Error ocurred while fetching stories!</p>
      ) : (
        <div className="container">
          <div className="actions">
            <button
              className={`btn newBtn ${
                selectedTab === "new" ? "selected" : ""
              }`}
              onClick={() => handleTabChange("new")}
            >
              New
            </button>
            <button
              className={`btn pastBtn ${
                selectedTab === "past" ? "selected" : ""
              }`}
              onClick={() => handleTabChange("past")}
            >
              Past
            </button>
          </div>
          <div className="storiesList">
            <div className="stories">
              {stories?.map((story) => (
                <Story key={story.id} story={story} />
              ))}
            </div>
          </div>
          <button
            className="btn loadMoreBtn"
            disabled={loading}
            onClick={handleLoadMore}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ListingOfStories;
