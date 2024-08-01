import { useState, useMemo } from "react";
import { useData } from "../../context/dataContext";
import Story from "../Story/Story";
import "./ListingOfStories.css";

const ListingOfStories = () => {
  const { stories, loading, error, handleLoadMore } = useData();
  const [sortOption, setSortOption] = useState("new");

  const sortedStories = useMemo(() => {
    return [...stories].sort((a, b) => {
      if (sortOption === "new") {
        return b.time - a.time;
      } else {
        return a.time - b.time;
      }
    });
  }, [stories, sortOption]);

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <div className="listContainer">
      {error ? (
        <p className="errMessage">Error ocurred while fetching stories!</p>
      ) : (
        <div className="container">
          <div className="actions">
            <button
              className={`btn newBtn ${sortOption === "new" ? "selected" : ""}`}
              onClick={() => handleSortChange("new")}
            >
              New
            </button>
            <button
              className={`btn pastBtn ${
                sortOption === "past" ? "selected" : ""
              }`}
              onClick={() => handleSortChange("past")}
            >
              Past
            </button>
          </div>
          <div className="storiesList">
            <div className="stories">
              {sortedStories?.map((story) => (
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
