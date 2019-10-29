import React, { useEffect, useState } from 'react';
import './EditFish.scss';
import axios from 'axios';
import { toast } from 'react-toastify';

/**
 * Icons and Images
 */
import fishPng from '../icons/fish.png';
import { useHistory, useParams } from 'react-router-dom';

interface IProps {}

const EditFish: React.FC<IProps> = props => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const history = useHistory();
  // @ts-ignore
  let { id } = useParams();

  /**
   * Update fish
   */
  const updateFish = () => {
    axios
      .put(`http://localhost:3063/v1/fish/${id}`, {
        name: name,
        image_url: imageUrl,
      })
      .then(res => {
        toast.success('Success.');
        history.push('/dashboard/list');
      })
      .catch(e => {
        toast.error(e.response.data.message);
      });
  };

  /**
   * Get fish async
   */
  const getFish = () => {
    axios
      .get(`http://localhost:3063/v1/fish/${id}`)
      .then(res => {
        setImageUrl(res.data.image_url);
        setName(res.data.name);
      })
      .catch(e => {
        toast.error(e.response.data.message);
      });
  };

  /**
   * Delete fish
   */
  const deleteFish = (id: number) => {
    axios
      .delete(`http://localhost:3063/v1/fish/${id}`)
      .then(res => {
        toast.success('Success.');
        history.push('/dashboard/list');
      })
      .catch(e => {
        toast.error(e.response.data.message);
      });
  };

  /**
   * When did mount, get fish
   */
  useEffect(() => {
    getFish();
  }, []);

  return (
    <div className="edit-fish">
      <div className="u-flex u-flexRow u-flexAlignItemsCenter">
        <div className="font-40 bold-font">Edit Fish</div>
        <button
          className="button u-marginLx"
          onClick={() => {
            // @ts-ignore
            deleteFish(id);
          }}
        >
          <span className="icon is-small">
            <i className="icon ion-md-trash" aria-hidden="true" />
          </span>
        </button>
      </div>

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
            <button onClick={updateFish} className="button is-primary">
              Update
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

export default EditFish;
