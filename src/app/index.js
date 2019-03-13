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
import { Shop, Favorites, Cart, PageNotFound } from "./pages";
import { PageLayout } from "./components";

function PrivateRoute({ allow, path, ...props }) {
  if (allow) {
    return <Route {...props} path={path} />;
  }

  return (
    <Redirect
      to={{
        pathname: "/shop",
        state: { intendedLocation: path },
      }}
    />
  );
}

const NAV_LINKS = ["shop", "cart", "favorites"].map(link => (
  <button type="button" onClick={() => this.setState({ route: link })}>
    {link}
  </button>
));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      error: null,
      loading: false,
      allow: true,
    };
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

  toggleFavorite = id => {
    this.setState(state => ({
      products: state.products.map(product => {
        if (product.id === id) {
          return { ...product, isFavorite: !product.isFavorite };
        }
        return product;
      }),
    }));
  };

  updateCartCount = (id, value) => {
    this.setState(state => ({
      products: state.products.map(product => {
        if (product.id === id) {
          return { ...product, cartCount: value };
        }
        return product;
      }),
    }));
  };

  login = (intended, history) =>
    this.setState({ allow: true }, () => {
      history.replace(intended || "/favorites");
    });

  logout = () => this.setState({ allow: false });

  renderCart = () => {
    const { products } = this.state;
    return (
      <Cart products={products.filter(product => product.cartCount > 0)} />
    );
  };

  // if error === true tada h1
  render() {
    const { allow } = this.state;
    const { loading, error } = this.props;

    return (
      <Router>
        <PageLayout navLinks={this.NAV_LINKS}>
          {error && <h1> ERORAS 😣 {error} </h1>}
          {loading && <PacmanLoader />}
          <Switch>
            <Route exact path="/shop" component={Shop} />
            <Route exact path="/favorites" component={Favorites} />
            <PrivateRoute
              allow={allow}
              exact
              path="/cart"
              component={this.renderCart}
            />
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
