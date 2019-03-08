import React from "react";
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
      allow: false,
    };
    this.NAV_LINKS = ["shop", "cart", "favorites"].map(link => (
      <NavLink to={`/${link}`}>{link}</NavLink>
    ));
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch("https://boiling-reaches-93648.herokuapp.com/food-shop/products")
      .then(response => response.json())
      .then(json => {
        const products = json.map(product => ({
          ...product,
          isFavorite: false,
          cartCount: 0,
        }));
        this.setState({ products, loading: false });
      })
      .catch(() =>
        this.setState({ error: "Something went wrong", loading: false })
      );
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

  /* renderRoute = () => {
    const { route, products } = this.state;
    switch (route) {
      case "shop":
        return (
          <Shop
            products={products}
            toggleFavorite={this.toggleFavorite}
            updateCartCount={this.updateCartCount}
          />
        );

      case "favorites":
        return (
          <Favorites
            products={products.filter(product => product.isFavorite)}
            toggleFavorite={this.toggleFavorite}
            updateCartCount={this.updateCartCount}
          />
        );

      case "cart":
        return (
          <Cart products={products.filter(product => product.cartCount > 0)} />
        );

      default:
        return (
          <Shop
            products={products}
            toggleFavorite={this.toggleFavorite}
            updateCartCount={this.updateCartCount}
          />
        );
    }
  }; */

  login = (intended, history) =>
    this.setState({ allow: true }, () => {
      history.replace(intended || "/favorites");
    });

  logout = () => this.setState({ allow: false });

  renderShop = props => {
    const { products, allow } = this.state;
    return (
      <Shop
        {...props}
        allow={allow}
        login={intended => this.login(intended, props.history)}
        logout={this.logout}
        products={products}
        toggleFavorite={this.toggleFavorite}
        updateCartCount={this.updateCartCount}
      />
    );
  };

  renderFavorites = () => {
    const { products } = this.state;
    return (
      <Favorites
        products={products.filter(product => product.isFavorite)}
        toggleFavorite={this.toggleFavorite}
        updateCartCount={this.updateCartCount}
      />
    );
  };

  renderCart = () => {
    const { products } = this.state;
    return (
      <Cart products={products.filter(product => product.cartCount > 0)} />
    );
  };

  // if error === true tada h1
  render() {
    const { loading, error, allow } = this.state;
    return (
      <Router>
        <PageLayout navLinks={this.NAV_LINKS}>
          {error && <h1> ERORAS 😣 {error} </h1>}
          {loading && <PacmanLoader />}
          <Switch>
            <Route exact path="/shop" component={this.renderShop} />
            <Route exact path="/favorites" component={this.renderFavorites} />
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

export default App;
