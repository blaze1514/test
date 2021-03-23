import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import Login from './Components/login';
import Home from './Components/home';
import { loginSuccess, loginRequest, loginError} from './Redux';
import {getToken, setToken} from './Utility/utility';
import axios from 'axios'
import Visualize from './Components/visualize';

class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      loading: false,
    }
  }

  async componentDidMount(){
    let token = localStorage.getItem('token');
    if(token){
      this.props.loginSuccess(token)
    }
    this.setState({
      loading: true
    })
  }

  render(){
    const { loading } = this.state;
    const { login } = this.props
    return(
      <React.Fragment>
        {/* <Home /> */}
        {
          loading ? 
            login.user ?
              <Home />
            : <Login />
          :<p>Loading</p>
        }
      </React.Fragment>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: () => dispatch( loginRequest() ),
    loginSuccess: (user) => dispatch( loginSuccess(user) ),
    loginError: (error) => dispatch( loginError(error) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);