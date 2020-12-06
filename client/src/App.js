import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

import configureStore from './store/configureStore/configStore';
const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
