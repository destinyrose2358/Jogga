import React from "react";
import { Mutation } from "react-apollo";
import { CREATE_ROUTE } from "../../graphql/mutations";
import { FETCH_CURRENT_USER_ROUTES } from "../../graphql/queries";
import { withRouter } from "react-router-dom";

class RouteBuilderForm extends React.Component {
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

  updateCache(cache, { data: { createRoute } }) {
    let routes;
    try {
      routes = cache.readQuery({ query: FETCH_CURRENT_USER_ROUTES })
    } catch (err) {
      return;
    }
    console.log(routes);
    if (routes) {
      let routesArray = routes.currentUserRoutes;

      cache.writeQuery({
        query: FETCH_CURRENT_USER_ROUTES,
        data: { currentUserRoutes: routesArray.concat(createRoute) }
      })
    }
  }

  render() {
    const { name, description, isPrivate } = this.state;
    return (
      <Mutation
        mutation={ CREATE_ROUTE }
        update={ (cache, data) => this.updateCache(cache, data) }
        onCompleted={ () => this.props.history.push("/athlete/routes") }
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
                        travelMode: this.props.travelMode,
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

export default withRouter(RouteBuilderForm);