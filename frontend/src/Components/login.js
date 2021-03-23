import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { loginSuccess, loginRequest, loginError} from '../Redux';

class Login extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            errors: {},
        }
    }

    tryLogin = () => {
        let { username, password } = this.state; 
        let errors = {};
        if( !(username && username.trim()) ){
            errors.username = "Username is required";
        }
        if(!(password && password.trim())){
            errors.password = "password is required";
        }
        if(Object.keys(errors).length === 0){
            this.props.loginRequest();
            axios.post('http://localhost:5000/login',{username, password}).then(res => {
                if(res.status === 200){
                    localStorage.setItem('token', JSON.stringify(res.data.token));
                    this.props.loginSuccess(res.data.token);
                }else if(res.status === 404){
                    this.props.loginError(res.data.msg)
                }else{
                    this.props.loginError('Error occurred')
                }
            }).catch(err => {
                this.props.loginError('Error occurred')
            })
        }else{
            this.setState({
                errors
            })
        }

    }

    render(){

        const {username, password, errors} = this.state;
        const { loading, error } = this.props.login
        return(
            <div>
                <div>
                    <div className="login-form" >
                        <div className='padding-20'>
                            <input type="text" value={username} onChange={(e) => this.setState({username: e.target.value})} placeholder="please enter the Username" />
                            <br/>
                            {errors && errors.username ? <p style={{color: 'red', fontSize: 12}}>{errors.username}</p> : null}
                        </div>
                        <div className='padding-20'>
                            <input type='password' value={password} onChange = { (e) =>  this.setState({password: e.target.value}) } placeholder="please enter the password" />
                            <br/>
                            {errors && errors.password ? <small style={{color: 'red', fontSize: 12}}>{errors.password}</small> : null}
                        </div>
                        {error ? <small style={{color: 'red', fontSize: 12}}>{error}</small> : null}
                        <div className='padding-20'>
                            <button type="button" disabled={loading} onClick={() => this.tryLogin()}>Login</button>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)