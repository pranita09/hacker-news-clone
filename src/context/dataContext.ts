/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
import { newStoriesAPIEndpoint, pastStoriesAPIEndpoint } from "../utils";
import { Story, DataContextType } from "../types/types";

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [storyIds, setStoryIds] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<string>("new");
  const BATCH_SIZE = 5;
  const initialFetchDone = useRef<boolean>(false);

  const fetchStoryIds = async (apiEndpoint: string) => {
    setLoading(true);
    try {
      const responseIds = await axios.get(`${apiEndpoint}`);
      setStoryIds(responseIds.data);
      setCurrentIndex(0);
      setStories([]);
      initialFetchDone.current = false;
    } catch (error) {
      console.log("Error while fetching story ids: ", error);
      setError((error as Error).message);
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
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTab === "new") {
      fetchStoryIds(newStoriesAPIEndpoint);
    } else {
      console.log("past");
      fetchStoryIds(pastStoriesAPIEndpoint);
    }
  }, [selectedTab]);

  useEffect(() => {
    if (storyIds.length > 0 && !initialFetchDone.current) {
      initialFetchDone.current = true;
      fetchStories();
    } else if (storyIds.length > 0 && currentIndex > 0) {
      fetchStories();
    }
  }, [storyIds, currentIndex, selectedTab]);

  const handleLoadMore = () => {
    setCurrentIndex((prevIndex) => prevIndex + BATCH_SIZE);
  };

  return (
    <DataContext.Provider
      value={{
        stories,
        loading,
        error,
        handleLoadMore,
        selectedTab,
        setSelectedTab,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
