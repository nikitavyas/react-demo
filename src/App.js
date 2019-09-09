import React from 'react';
import { HashRouter, Route, Switch ,Redirect} from 'react-router-dom';
const Login = React.lazy(() => import('./Login'));
const SignUp = React.lazy(() => import('./SignUp'));
const Home = React.lazy(() => import('./Home'));
const Post = React.lazy(() => import('./Post'));

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('isAuthenticated') === 'true'
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
  )} />
)
const PublicRoute = ({ component: Component, ...rest }) => (
 
  <Route {...rest} render={(props,history) => (
    localStorage.getItem('isAuthenticated') !== 'true'
      ? <Component {...props} />
      : <Redirect  to={{
        pathname: '/home',
        state: { from: props.location }
      }}      />
  )} />
)
class App extends React.Component {
  render() {
    return (
      <HashRouter>
      <React.Suspense fallback={loading()}>
        <Switch>
        <PublicRoute exact path="/" name="Login Page" component={Login}/>
        <PublicRoute exact path="/login" name="Login Page" component={Login} />
        <PublicRoute exact path="/signUp" name="SignUp Page" component={SignUp} />
        <PrivateRoute path='/home' component={Home} />
        <PrivateRoute path='/post' component={Post} />
      </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}
export default App;