export const newStoriesAPIEndpoint: string =
  "https://hacker-news.firebaseio.com/v0/newstories.json";
export const pastStoriesAPIEndpoint: string =
  "https://hacker-news.firebaseio.com/v0/beststories.json";

export const dummyTitle: string = "Lorem ipsum dolor sit amet";

export const dummyDescription: string =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.";

export const getTimeDifference = (timestamp: number) => {
  const currentTime = Date.now();
  const timeDifference = currentTime - timestamp * 1000; // convert seconds to milliseconds

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
};

export const calculateVisibleWords = (
  width: number,
  textToTruncate: string
) => {
  const words = textToTruncate.split(" ");
  const avgWordWidth = 25; // approximate average word width in pixels
  const wordsPerLine = Math.floor(width / avgWordWidth);
  const totalVisibleWords = wordsPerLine * 3; // sssuming 3 lines of text

  if (words.length <= totalVisibleWords) {
    return textToTruncate;
  }

  const startWords = words.slice(0, wordsPerLine).join(" ");
  const endWords = words.slice(-wordsPerLine).join(" ");

  return `${startWords} ... ${endWords}`;
};
