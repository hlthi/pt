import React, { Component, useEffect } from 'react';
import './styles/App.scss';
import { Route, Switch, BrowserRouter, useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import { toast, ToastContainer } from 'react-toastify';
import LeftBar from './containers/left-bar/LeftBar';
import AddFish from './containers/add-fish/AddFish';
import Login from './containers/login/Login';
import axios from 'axios';
import Order from './containers/order/Order';
import Market from './containers/market/Market';
import EditFish from './containers/edit-fish/EditFish';
toast.configure();

/**
 * Set axios token if exist, or remove ...
 */
function setAxiosAuth() {
  const token = localStorage.getItem('token');
  if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  else axios.defaults.headers.common.Authorization = null;
}

setAxiosAuth();

interface IProps {}

const App: React.FC<IProps> = props => {
  useEffect(() => {
    setAxiosAuth();
  }, []);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/dashboard"
            component={() => {
              return (
                <div className="u-flex u-flexRow u-flexJustifyStart">
                  <LeftBar />
                  <Switch>
                    <Route path="/dashboard/list" component={Market} />
                    <Route path="/dashboard/add" component={AddFish} />
                    <Route path="/dashboard/edit/:id" component={EditFish} />
                    <Route path="/dashboard/order" component={Order} />
                  </Switch>
                </div>
              );
            }}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
