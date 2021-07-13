import SearchImage from "./components/UnsplashSearch";
import React from "react";
import './App.css';
import Hero from "./components/Hero";

class App extends React.Component {

    render() {
        return (
            <div>
                <Hero/>
                <SearchImage/>
            </div>
        )
    }
}

export default App;
