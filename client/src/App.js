import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';

const App = () => {
  return (
    <Router>
      <Switch>
        <Home />
      </Switch>
    </Router>
  );
};

export default App;
