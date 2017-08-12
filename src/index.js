//library imports
import _ from "lodash";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";

//relative path reference to files we wrote
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

const API_KEY = "AIzaSyCvxg-Fg46OvUcoCYB3zW3QE-2CcDmeB94";


//Create a new component. This component should produce some HTML
//Class based component, a class is used when we want to have the concept of "state"
class App extends Component{
	constructor(props){
		super(props);

		//state is set within the constructor
		//Component level state, this state only belongs to the App component
		this.state = { 
			videos: [],
			selectedVideo: null 
		};

		this.videoSearch("boxxy");
	}

	videoSearch(term){
		YTSearch({key:API_KEY, term: term}, (data) =>{
			this.setState({
				videos: data,
				selectedVideo: data[0]
			});
		});
	}

	render(){
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);


		return(
			<div>
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetail video={this.state.selectedVideo} />
				<VideoList 
					onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
					videos={this.state.videos} />
			</div>
		);
	}
}

//Take this component's generated HTML and put in on the page (in the DOM)
ReactDOM.render(<App/>, document.querySelector(".container"));

