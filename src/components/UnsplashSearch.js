import React from "react";
import {createApi} from "unsplash-js";
import ImageGrid from "./ImageGrid";
import '../styles/index.css'


const unsplash = createApi({
    accessKey: "Your unsplash key",
});

const initialState = {
    query: "",
    images: [],
    page: 1,
    atBottom: false,
    visible: false
}

/**
 * Will search images from Unsplash, when user clicks the search button.
 * When scrolling to the bottom of the page it will keep loading more images from the search result.
 */
//TODO: * Handle the case if end of page reaches last image page search
    //TODO: * Handle display on amount of image on display

class UnsplashSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.newSearch = this.newSearch.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
        this.isBottomOfPage = this.isBottomOfPage.bind(this);
        this.getImageProperties = this.getImageProperties.bind(this);
        this.clearSearchResult = this.clearSearchResult.bind(this);
    }

    componentDidMount() {
        document.addEventListener('scroll', this.getScrollEvent);
    }

    componentWillUnmount() {
        document.addEventListener('scroll', this.getScrollEvent);
    }

    newSearch(e) {
        e.preventDefault();
        this.clearSearchResult();
        this.loadNextPage(e)
    }

    loadNextPage = async () => { // GET image search
        unsplash.search.getPhotos({
            query: this.state.query,
            page: this.state.page,
            perPage: 12,
            orientation: 'portrait',
        }).then(result => {
            if (result.type === 'error') {
                console.log('error occurred: ', result.errors[0]);
            } else {
                const queryResult = result.response.results;
                this.setState(currentState => ({
                        page: currentState.page + 1,
                        images: currentState.images.concat(this.getImageProperties(queryResult)), // Adding new images to current image list in state
                        query: currentState.query
                    }),
                );
            }
            this.setState(prevState => ({ // no longer at bottom of page
                ...prevState,
                isBottom: false
            }));
        });
    }

    isBottomOfPage(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight + 400;
    }

    getScrollEvent = () => {
        const app = document.getElementById('app');
        if (!this.state.isBottom && this.isBottomOfPage(app) && this.state.query !== "") { // making sure this runs once containing a string until we get new images
            this.setState(prevState => ({
                ...prevState,
                isBottom: true
            }));
            this.loadNextPage();
        }
    }

    getImageProperties = result => {
        return result.map(image => ({
            'url': image.urls.small,
            'description': image.alt_description,
            'id': image.id,
        }))
    }

    clearSearchResult() {
        this.setState(currentState => ({
            ...initialState,
            query: currentState.query
        }));
    }

    render() {

        const state = this.state;

        return (
            <div className="unsplash-container">
                <form className="form" onSubmit={this.newSearch}>
                    <label className="label" htmlFor="query">
                        {''}
                    </label>
                    <input
                        type="search"
                        name="query"
                        value={state.query}
                        className="input"
                        placeholder={`Search here..`}
                        required
                        onChange={(e) => this.setState({query: e.target.value})}
                    />
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={!state.query}>
                        Search
                    </button>
                </form>
                <div>
                    <ImageGrid
                        value={state.images}/>
                </div>
            </div>
        );
    }
}

export default UnsplashSearch;
