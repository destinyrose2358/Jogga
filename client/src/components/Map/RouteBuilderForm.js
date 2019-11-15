import React from "react";
import { Mutation } from "react-apollo";
import { CREATE_ROUTE } from "../../graphql/mutations";


export default class RouteBuilderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      isPrivate: false
    }

    this.togglePrivate = this.togglePrivate.bind(this);
    
  }

  togglePrivate() {
    this.setState(prevState => ({
      isPrivate: !prevState.isPrivate
    }))
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value
      })
    }
  }

  updateCache(cache, { data }) {

  }

  render() {
    const { name, description, isPrivate } = this.state;
    return (
      <Mutation
        mutation={ CREATE_ROUTE }
        update={ this.updateCache }
      >
        {createRoute => (
          <>
            <form className="route-builder-form">
              <header>
                <h1>Save</h1>
              </header>
              <p>
                Enter a name and description for your new route. Then, on the
                next page, you'll be able to see, and edit your route.
              </p>
              <label className="route-name">
                Route Name (required)
                <input
                  type="text"
                  value={name}
                  onChange={this.update("name")}
                />
              </label>
              <label className="route-description">
                Description
                <textarea
                  value={description}
                  onChange={this.update("description")}
                  id="route-description"
                />
                </label>
              <label className="route-privacy">
                <input type="checkbox" value="" onChange={this.togglePrivate} />
                Private?
              </label>
              <div className="route-controls">
                <button
                className="route-cancel"
                  onClick={this.props.closeModal}
                >
                  Cancel
                </button>
                <button
                  className="route-save"
                  onClick={e => {
                    e.preventDefault();
                    createRoute({
                      variables: {
                        name,
                        description,
                        isPrivate,
                        positions: this.props.positions,
                        token: localStorage.getItem("auth-token")
                      }
                    });
                  }}
                >
                  Save
                </button>
                
              </div>
            </form>
            
          </>
        )}
      </Mutation>
    );
  }
}