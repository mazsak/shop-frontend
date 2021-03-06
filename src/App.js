import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Profile from './components/Profile';
import Product from './components/Product';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import Orders from './components/Orders';
import Admin from './components/Admin';
import Error from './components/Error';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/product/:id" component={Product} />
          <Route path="/cart" component={Cart} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/orders" component={Orders} />
          <Route path="/admin" component={Admin} />
          <Route path="/profile" component={Profile} />
          <Route component={Error} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App; 
