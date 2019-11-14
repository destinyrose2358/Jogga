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

  render() {
    const { name, description, isPrivate } = this.state;
    return (
      <Mutation
        mutation={CREATE_ROUTE}
      >
        {createRoute => (
          <>
            <form
              className="route-builder-form"
              onSubmit={e => {
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
              <header>
                <h1>Save</h1>
              </header>
              <p>Enter a name and description for your new route. Then, on the next page, you'll be able to see, and edit your route.</p>
              <label for="route-name">Route Name (required)</label>
              <input
                id="route-name"
                type="text"
                value={name}
                onChange={this.update("name")}
              />
              <label for="route-description">Description</label>
              <textarea
                value={description}
                onChange={this.update("description")}
                id="route-description"
              />
              <label>
                <input
                  type="checkbox"
                  value=""
                  onChange={this.togglePrivate}
                />
                Private?
              </label>
              
              <input type="submit" value="Save" />
            </form>
            <button onClick={this.props.closeModal}>Cancel</button>
          </>
        )}
      </Mutation>
    );
  }
}