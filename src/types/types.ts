import { ReactNode } from "react";

export interface Story {
  id: number;
  title?: string;
  text?: string;
  time: number;
  descendants: number;
  url: string;
}

export interface DataProviderProps {
  children: ReactNode;
}

export interface DataContextType {
  stories: Story[];
  loading: boolean;
  error: string | null;
  handleLoadMore: () => void;
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

export interface StoryProps {
  story: Story;
}
