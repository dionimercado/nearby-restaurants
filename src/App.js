import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Map from "./components/Map";
import Places from "./components/Places";

class App extends Component {
  state = {
    places: []
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9 px-0">
              <Map fetchPlaces={this.fetchPlaces} />
            </div>
            <div className="col-md-3 px-0">
              <Places places={this.state.places} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  fetchPlaces = places => {
    this.setState({ places });
  };
}

export default App;
