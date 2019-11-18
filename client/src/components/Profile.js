import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CURRENT_USER } from '../graphql/queries';
import { UPDATE_USER } from '../graphql/mutations';
import svgs from './svgs/svgs';
import {} from '../stylesheets/profile.scss';

export default props => {
  const [image, setImage] = useState(null);
  const { loading, data: { currentUser } } = useQuery(CURRENT_USER);
  if (loading) return null;
  const [updateUser] = useMutation(UPDATE_USER);

  const birthDate = new Date(currentUser.birthDate).toLocaleString(
    'en-us', {year: 'numeric', month: 'long', day: 'numeric'}
  );
  const gender = currentUser.gender[0].toUpperCase() + currentUser.gender.slice(1);

  const handleSubmit = (e, updateUser) => {
    e.preventDefault();
    updateUser({variables: {
      _id: currentUser._id,
      profile_img: image
    }})
    setImage(null);
  }

  return(<div className='profile-background'>
    <div className='profile-container'>
      <div className='column-middle'>
        <div className='title'>
          My Profile
        </div>
        <div className='profile-item'>
          <div className='label'>Current Photo</div>
          <div className='value'>
            <div className='profile-img'>
              {currentUser.profile_img ?
                <div className='user-img'
                  style={{ backgroundImage: `url(${currentUser.profile_img})` }}>
                </div> : svgs.user}
              {svgs.plusThick}
              <input className='input no-select'
                type='file'
                onChange={({
                  target: {validity, files: [file]}
                }) => validity.valid && setImage(file)} />
            </div>
            <div className='new-profile-img'
              hidden={image ? false : true}>
              <div className='new-img-name'>
                New Image: {image ? image.name : ''}
              </div>
              <div className='image-btn-container'>
                <div className='image-btn'
                  onClick={e => handleSubmit(e, updateUser)}>
                  Submit
                </div>
                <div className='image-btn'
                  onClick={() => setImage(null)}
                  hidden={image ? false : true}>
                  Cancel
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='profile-item'>
          <div className='label'>Name</div>
          <div className='value'>
            {currentUser.firstName && currentUser.lastName ?
              `${currentUser.firstName} ${currentUser.lastName}` :
              'New Jogga'}
          </div>
        </div>
        <div className='profile-item'>
          <div className='label'>Email</div>
          <div className='value'>{currentUser.email}</div>
        </div>
        <div className='profile-item'>
          <div className='label'>Birthday</div>
          <div className='value'>{birthDate}</div>
        </div>
        <div className='profile-item'>
          <div className='label'>Gender</div>
          <div className='value'>{gender}</div>
        </div>
      </div>
    </div>
  </div>)
}
