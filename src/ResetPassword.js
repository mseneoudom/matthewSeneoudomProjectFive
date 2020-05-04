import React, { Component } from 'react'
import firebase from './firebase'

class ResetPassword extends Component{
    constructor(){
        super();
        this.state={
            email:''
        }
    }

    passwordStateChange=(e)=>{ // Set the state of email from input in form
        this.setState({email: e.target.value})
    }

    resetPassword=(e)=>{ // Reset the password with the current state using sendPasswordResetEmail()
        e.preventDefault()

        firebase.auth().sendPasswordResetEmail(this.state.email)
        .then(()=>{
            alert('Please check your inbox for an email!')
            this.props.toggleSelect("showLogin")
            this.setState({
                email:''
            })
        })
        .catch(()=>{
            alert('This email is not registered')
        })
    }

    render(){
        return(
            <section className="forgotPasswordSection">
                <div className="resetPassword">
                    <h2>Enter your email below to reset your password!</h2>
                    
                    <label htmlFor="resetPassword">Email/Username</label>
                    <input type="text" id="resetPassword" onChange={this.passwordStateChange} value={this.state.email}/>

                    <button onClick={this.resetPassword}>Reset Password</button>

                    <span onClick={()=>this.props.forgotPassword()}>Cancel...</span>
                </div>
            </section>
        )
    }
}

export default ResetPassword