import React, { Component } from "react";
import Navbar from "./Navbar";
import { BrowserRouter } from "react-router-dom";
import BookmarkList from "./BookmarkList";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Navbar />
          <main className="container">
            <BookmarkList />
          </main>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
