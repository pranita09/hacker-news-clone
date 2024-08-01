/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stories, setStories] = useState([]);
  const [storyIds, setStoryIds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const BATCH_SIZE = 5;
  const initialFetchDone = useRef(false);

  const fetchStoryIds = async () => {
    setLoading(true);
    try {
      const responseIds = await axios.get(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );
      setStoryIds(responseIds.data);
      setCurrentIndex(0);
    } catch (error) {
      console.log("Error while fetching story ids: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStories = async () => {
    if (storyIds.length === 0) return;
    setLoading(true);
    try {
      const batchIds = storyIds.slice(currentIndex, currentIndex + BATCH_SIZE);
      const storyPromises = batchIds.map((id) =>
        axios
          .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          .then((res) => res.data)
      );

      const storiesData = await Promise.all(storyPromises);
      setStories((prevStories) => [...prevStories, ...storiesData]);
    } catch (error) {
      console.log("Error while fetching story data: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStoryIds();
  }, []);

  useEffect(() => {
    if (storyIds.length > 0 && !initialFetchDone.current) {
      initialFetchDone.current = true;
      fetchStories();
    } else if (storyIds.length > 0 && currentIndex > 0) {
      fetchStories();
    }
  }, [storyIds, currentIndex]);

  const handleLoadMore = () => {
    setCurrentIndex((prevIndex) => prevIndex + BATCH_SIZE);
  };

  return (
    <DataContext.Provider value={{ stories, loading, error, handleLoadMore }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
