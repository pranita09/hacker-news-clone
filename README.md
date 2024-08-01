# HackerNews Clone

## Features

1. **Top Stories Fetching**: The app fetches the top stories from the Hacker News API and displays them in batches.
2. **Batch Loading**: Stories are loaded in batches of 5. Clicking the "Load More" button fetches the next batch of stories.
3. **Sorting**:
   - **New**: Sorts stories by the newest first.
   - **Past**: Sorts stories by the oldest first.
   - Default sorting option is **New**.
4. **Error Handling**: Displays error messages if there's an issue fetching data from the API.
5. **Loading State**: Shows a loading indicator while stories are being fetched.
6. **Context API**: Uses React Context API for state management, making it easier to pass data through the component tree.
7. **Axios for HTTP Requests**: Uses Axios for making HTTP requests to the Hacker News API.
