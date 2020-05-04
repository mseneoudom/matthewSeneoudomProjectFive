import React, { Component } from 'react'
import firebase from './firebase'
import ResetPassword from './ResetPassword'

class Login extends Component{
    constructor(){
        super();
        this.state={
            loginName:'',
            loginPassword:'',
            forgotPassword:false,
        }
    }

    userLogin = (e) =>{ // Gets the information from state and users Firebase Auth to sign into an existing account
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.loginName, this.state.loginPassword).then((user)=>{
            console.log('User successfully signed in');
        }).catch((error)=>{
            alert(error)
        })
    }

    loginInputs =(e)=>{ // Gets the user info and saves to state
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    forgotPassword=()=>{ // Brings up the forgot password form
        this.setState({
            forgotPassword : !this.state.forgotPassword
        })
    }



    render(){
        return(
            <>
            <section className="loginSection">
                <form className="signInForm">
                    <h2>Login</h2>
                    
                    <label htmlFor="loginName">Username</label>
                    <input type="text" id="loginName" onChange={this.loginInputs}/>

                    <label htmlFor="loginPassword">Password</label>
                    <input type="password" id="loginPassword" onChange={this.loginInputs} />

                    <p>Don't have an account? <span onClick={()=>{this.props.toggleSelect("showRegister")}}>Click here to register for an account.</span></p>
                    <p>Forgot your password? <span onClick={()=>this.forgotPassword()}>Click here to be sent a new password.</span></p>
                    

                    <button onClick={this.userLogin}>Login</button>
                </form>
            </section>
            {this.state.forgotPassword ? <ResetPassword toggleSelect={(item)=>{this.props.toggleSelect(item)}} forgotPassword={()=>this.forgotPassword()}/> : null}
            </>
        )
    }
}

export default Login