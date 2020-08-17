import React, { Component } from "react";
import Axios from "axios";

const BOOKMARK_API_ENDPOINT = "/api/bookmark";

class BookmarkList extends Component {
  state = {
    bookmarks: [],
  };

  async componentDidMount() {
    const { data: bookmarks } = await Axios.get(BOOKMARK_API_ENDPOINT);
    this.setState({ bookmarks });
  }

  async handleDelete(id) {
    const originalBookmarks = [...this.state.bookmarks];

    const bookmarks = this.state.bookmarks.filter((b) => b.id !== id);
    this.setState({ bookmarks });

    try {
      await Axios.delete(BOOKMARK_API_ENDPOINT + "/" + id);
    } catch (e) {
      alert("Something went wroung during deletion of a bookmark.");
      this.setState({ bookmarks: originalBookmarks });
    }
  }

  renderTableRow = (bookmark) => {
    const { id, name, url, description } = bookmark;
    return (
      <tr key={id}>
        <th scope="row">{name}</th>
        <td>
          <a href={url}>{url}</a>
        </td>
        <td>{description}</td>
        <td>
          <button
            onClick={() => this.handleDelete(id)}
            id={id}
            className="btn btn-sm btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };

  render() {
    return (
      <div>
        <h1 className="m-2 mb-4">My Bookmarks</h1>
        <table className="table m-2">
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Link</th>
              <th scope="col">Description</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.bookmarks.length === 0 && (
              <tr>
                <td colSpan="4">Nothing to show...</td>
              </tr>
            )}
            {this.state.bookmarks.map(this.renderTableRow)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default BookmarkList;
