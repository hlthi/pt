import React, { useState } from 'react';
import './AddFish.scss';
import axios from 'axios';
import { toast } from 'react-toastify';

/**
 * Icons and Images
 */
import fishPng from '../icons/fish.png';
import { useHistory } from 'react-router-dom';

interface IProps {}

const AddFish: React.FC<IProps> = props => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const history = useHistory();


  /**
   * Save fish
   */
  const saveFish = () => {
    axios
      .post('http://localhost:3063/v1/fish', {
        name: name,
        image_url: imageUrl,
      })
      .then(res => {
        history.push("/dashboard/list");
      })
      .catch(e => {
        toast.error(e.response.data.message);
      });
  };

  return (
    <div className="add-fish">
      <div className="font-40 bold-font">Add Fish</div>

      <div className="columns">
        <div className="column is-two-fifths">
          <div className="u-flex u-flexCol u-flexJustifyCenter">
            <input
              value={name}
              onChange={e => {
                setName(e.target.value);
              }}
              className="input"
              type="text"
              placeholder="Name"
            />
            <input
              value={imageUrl}
              onChange={e => {
                setImageUrl(e.target.value);
              }}
              className="input"
              type="text"
              placeholder="Image Url"
            />
            <img className="preview-area" src={imageUrl} />
            <button onClick={saveFish} className="button is-primary">
              Save
            </button>
          </div>
        </div>
        <div className="column is-three-fifths is-hidden-mobile">
          <div className="extra-image-area">
            <img src={fishPng} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFish;
