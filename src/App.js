import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ListingOfStories from "./components/ListingOfStories/ListingOfStories";

function App() {
  return (
    <div className="App">
      <Header />
      <ListingOfStories />
      <Footer />
    </div>
  );
}

export default App;
