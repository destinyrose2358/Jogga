import React from "react";
import { Mutation } from "react-apollo";
import { UPDATE_USER } from '../graphql/mutations';
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
    return (<div>
      <Mutation mutation={UPDATE_USER}>
        {(updateUserImg, data) => {
          console.log(data);
          return (
            <div>
              <form onSubmit={e => {
                e.preventDefault();
                updateUserImg({
                  variables: {
                    _id: "5dc5e6ef7d2d4b039e6b9fca",
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
  }
}

export default UploadImage;