import React from "react";
import { Mutation, Query } from "react-apollo";
import { UPDATE_USER } from '../graphql/mutations';
import { CURRENT_USER } from '../graphql/queries';
// import { FETCH_CURRENT_USER } from '../../../server/schema/mutations';

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }

  updateImage(file) {
    this.setState({ image: file });
  }

  render() {
    return (<Query query={CURRENT_USER}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return error.message;
        const currentUser = data.currentUser
    return (<div>
      <Mutation mutation={UPDATE_USER}>
        {(updateUser, data) => {
          return (
            <div>
              <form onSubmit={e => {
                e.preventDefault();
                console.log(this.state.image)
                console.log(currentUser._id)
                updateUser({
                  variables: {
                    _id: currentUser._id,
                    profile_img: this.state.image
                  }
                })
                console.log('Image submitted')}}
              >
                <input
                  type='file'
                  required
                  onChange={({
                    target: {
                      validity,
                      files: [file]
                    }
                  }) => validity.valid && this.updateImage(file)}
                />
                <input type="submit" value="Upload File" />
              </form>
              {this.state.message}
            </div>
          );
        }}
      </Mutation>
    </div>
    );
      }}
    </Query>)
  }
}

export default UploadImage;