import _ from "lodash";
import React ,{Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from "./components/SearchBar";
import VideoDetail from "./components/VideoDetail";
import VideoList from "./components/VideoList";
import Header from "./components/Header";

const API_KEY='AIzaSyB8QCxy1DaccIR7HsPrEgVvetaef-PlUdc';
class MyApp extends Component{

  constructor(props){
    super(props);

    this.state={
      videos:[],
      selectedVideo:null
    };
    this.videoSearch("");

  }
  videoSearch(term){
    YTSearch({key: API_KEY, term:term},(videos)=>{
      this.setState({
        videos:videos,
        selectedVideo:videos[0]
      });
    });
  }
  render(){
    const videoSearch= _.debounce((term)=>{this.videoSearch(term)},300);
    return(
      <div className="main-div">
        <Header/>
        <SearchBar onSearchTermChange={videoSearch}/>
        
        <VideoDetail video={this.state.selectedVideo} className="main-div"/>
        <VideoList
          onVideoSelect={selectedVideo=> this.setState({selectedVideo})}
          videos={this.state.videos}
          className="main-div"
        />      
      </div>
    );
  }
}
ReactDOM.render(<MyApp/>,document.querySelector('.root'));


