import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

// ROUTES
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import Register from './components/auth/Register';
import Confirmation from './components/auth/Confirmation';
import Login from './components/auth/Login';
import Profile from './components/user_profile/Profile';

// STORE
import configureStore from './store/configureStore/configStore';
import { setCurrentUser, clearOutUser } from './store/actions/authAction';

const store = configureStore();

//CHECK FOR TOKEN IN LOCAL STORAGE
if (localStorage.jwtToken) {
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set currentUser to auth.user in redux state and  Authenticate for reloads
  const dataToRedux = {
    id: decoded.id,
    email: decoded.email,
    name: decoded.name,
    role: decoded.role,
    avatar: decoded.avatar,
  };
  store.dispatch(setCurrentUser(dataToRedux));

  const timeNow = parseInt(Date.now() / 1000, 10);

  if (decoded.exp < timeNow) {
    store.dispatch(clearOutUser());
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/confirm/:id/:token" component={Confirmation} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
