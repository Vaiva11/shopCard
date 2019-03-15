import React from "react";
import { connect } from "react-redux";
import { PacmanLoader } from "react-spinners";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch,
} from "react-router-dom";
import { Shop, Favorites, Cart, PageNotFound, Login } from "./pages";
import { PageLayout, PrivateRoute } from "./components";

const NAV_LINKS = ["shop", "cart", "favorites"].map(link => (
  <button type="button" onClick={() => this.setState({ route: link })}>
    {link}
  </button>
));

class App extends React.Component {
  constructor(props) {
    super(props);

    this.NAV_LINKS = ["shop", "cart", "favorites"].map(link => (
      <NavLink to={`/${link}`}>{link}</NavLink>
    ));
  }

  componentDidMount() {
    const { getProducts, getProductsSuccess, getProductsFailure } = this.props;

    getProducts();
    fetch("https://boiling-reaches-93648.herokuapp.com/food-shop/products")
      .then(response => response.json())
      .then(json => {
        const products = json.map(product => ({
          ...product,
          isFavorite: false,
          cartCount: 0,
        }));
        getProductsSuccess(products);
      })
      .catch(() => getProductsFailure("Something went wrong"));
  }

  render() {
    const { loading, error } = this.props;

    return (
      <Router>
        <PageLayout navLinks={this.NAV_LINKS}>
          {error && <span> {error} </span>}
          {loading && <PacmanLoader />}
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/shop" component={Shop} />
            <PrivateRoute exact path="/favorites" component={Favorites} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/404" component={PageNotFound} />
            <Redirect exact from="/" to="/shop" />
            <Redirect to="/404" />
          </Switch>
        </PageLayout>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.error,
    loading: state.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => dispatch({ type: "FETCH_PRODUCTS" }),
    getProductsSuccess: payload =>
      dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload }),
    getProductsFailure: payload =>
      dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload }),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
