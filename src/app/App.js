import '../App.css';
import { HashRouter, Routes, Route, useParams, Navigate } from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import { setInitializedThunk } from '../redux/appReducer';
import spinner from "../img/spinner.svg"
import spinner2 from "../img/spinner2.svg"
import { connect } from 'react-redux';

const Home = React.lazy(() => import('../components/Home/Home'));
const UsersContainer = React.lazy(() => import('../components/Users/UsersContainer'));
const ProfileContainer = React.lazy(() => import('../components/Profile/ProfileInfo/ProfileContainer'));
const LoginContainer = React.lazy(() => import('../components/Login/LoginContainer'));
const DialogContainer2 = React.lazy(() => import('../components/Dialogs/DialogItem/DialogContainer2'));
const SettingsContainer = React.lazy(() => import('../components/Settings/SettingsContainer'));

const App = (props) => {
  useEffect(() => {
    props.setInitializedThunk()
  }, [])
  if (!props.initialized) {
    return <div className='preloader'><img src={spinner2} alt="" /></div>
  }
  return (
    <HashRouter>
      <div className="App">
        <Suspense fallback={<div className='preloader'><img src={spinner2} alt="" /></div>}>
          <Routes>
            <Route path="//" element={<Navigate to={`/profile/` + props.authId} />} />
            <Route path="/home/" element={<Home />} />
            <Route path="/login" element={<LoginContainer />} />
            <Route path="/users/" element={<UsersContainer />} />
            <Route path={`/profile/`} element={<ProfileContainer style={{ overflow: 'hidden' }} />} >
              <Route path=":userId" element={<ProfileContainer style={{ overflow: 'hidden' }} />} />
            </Route>
            <Route path="/messages/" element={<DialogContainer2 />} >
              <Route path=":userId" element={<DialogContainer2 />} />
            </Route>
            <Route path="/settings" element={<SettingsContainer />} />
          </Routes>
        </Suspense>
      </div >
    </HashRouter >
  );
}
const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized,
    authId: state.auth.userId
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setInitializedThunk: () => {
      dispatch(setInitializedThunk())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
