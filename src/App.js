import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/container/Home";
import Signin from "./components/container/Signin";
import Signup from "./components/container/Signup";
import PrivateRoute from "./components/HOC/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { getInitialData, isUserLoggedIn } from "./actions";
import { useEffect } from "react";
import Products from "./components/container/Products";
import Orders from "./components/container/Orders";
import Categories from "./components/container/Categories";
import CategoryPage from "./components/container/CategoryPage";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticated){
      dispatch(getInitialData());
    }
    
  }, [auth.authenticated]);

  return (
    <Router>
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/pages"  component={CategoryPage} />

        <PrivateRoute path="/category" component={Categories} />

        <PrivateRoute path="/products" component={Products} />
        <Route path="/orders" component={Orders} />

        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </Router>
  );
}

export default App;
