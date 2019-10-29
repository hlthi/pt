import React from 'react';
import './LeftBar.scss';
import { useHistory } from 'react-router-dom';

/**
 * Icons
 */
import addIcon from '../icons/add.svg';
import fishIcon from '../icons/fish.svg';
import moneyIcon from '../icons/money.svg';
import exitIcon from '../icons/exit.svg';
import { Link } from 'react-router-dom';

interface IProps {}

const LeftBar: React.FC<IProps> = props => {
  const history = useHistory();
  return (
    <div className="left-bar">
      <div className="top">
        <Link to={'/dashboard/list'}>
          <img src={fishIcon} className="icon-button" />
        </Link>
        <Link to={'/dashboard/add'}>
          <img src={addIcon} className="icon-button" />
        </Link>
        <Link to={'/dashboard/order'}>
          <img src={moneyIcon} className="icon-button" />
        </Link>
      </div>
      <div className="bottom">
        <div
          className="cursor-pointer"
          onClick={() => {
            localStorage.removeItem('token');
            history.push('/login');
          }}
        >
          <img src={exitIcon} className="icon-button" />
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
