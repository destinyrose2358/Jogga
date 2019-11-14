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
              <input
                type="text"
                value={name}
                onChange={this.update("name")}
                placeholder="Name"
              />
              <textarea
                value={description}
                onChange={this.update("description")}
                placeholder="Description"
              />
              <label>
                Private?
                <input
                  type="checkbox"
                  value=""
                  onChange={this.togglePrivate}
                />
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