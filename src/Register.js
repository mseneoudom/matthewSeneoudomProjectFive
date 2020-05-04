import React, { Component } from 'react'
import firebase from './firebase'
import TermsOfUse from './TermsOfUse'

class Register extends Component{
    constructor(){
        super();
        this.state={
            registerEmail:'',
            registerPassword:'',
            confirmPassword:'',
            termsCheckBox: false,
            passwordsMatch: false,
            displayName: '',
            showTerm: false,
            photoURL:'https://miro.medium.com/max/480/0*WK_vAxJo4O7Kdq3j.png' //default picture for avatar
        }
    }

    handleChange=(e)=>{
        this.listenForMatch();
        this.setState({
            [e.target.id] : e.target.value
        })
    }

    listenForMatch=()=>{
        if (this.state.registerPassword === this.state.confirmPassword && this.state.registerPassword !==""){ //Checks to see if password and confirm password field matches
            this.setState({passwordsMatch : true})
        } else{
            this.setState({passwordsMatch : false})
        }
    }

    registerUser =(e)=>{
        e.preventDefault();
        
        if (this.state.termsCheckBox===true && this.state.passwordsMatch===true){
            return firebase.auth().createUserWithEmailAndPassword(this.state.registerEmail, this.state.registerPassword) //Creates the User with the email in state, and password, only IF terms are checked, and passwords match/TRUE
            .then((user)=>{
                firebase.auth().currentUser.updateProfile({ //Uses the current user (which is automatically logged into when created), and sets the display name and photo to the state's DisplayName and PhotoURL
                    displayName:this.state.displayName,
                    photoURL:this.state.photoURL,
                })
            }).then(()=>{
                this.setState({ //Reset Fields
                    registerEmail:'',
                    registerPassword:'',
                    confirmPassword:'',
                    termsCheckBox: false,
                    passwordsMatch: false,
                    displayName: '',
                    photoURL:'https://miro.medium.com/max/480/0*WK_vAxJo4O7Kdq3j.png'
                })
            })
            .catch((error)=>{
                alert(error)
            })
        }
    }

    handleCheckbox =(e)=>{
        this.setState({ //Toggle state for terms when checkbox is checked
            [e.target.id] : !this.state.termsCheckBox
        })
    }

    toggleTerms=()=>{ //Toggles a state to show the TOS when clicked -used to also get out of the TOS page 
        this.setState({
            showTerm:!this.state.showTerm,
        })
    }


    render(){
        return(
            <section className="registerSection">
                <form className="registerForm">
                    <div className="imageContainer avatarImage">
                        <img src={this.state.photoURL} alt={this.state.displayName +'user photo'} />
                    </div>

                    <h2>Register</h2>
                    <p>Create your account. It's free, and only takes a minute!</p>
                    <p>Already have an account?<span onClick={()=>this.props.toggleSelect("showLogin")}> Click  here to login to your account!</span></p>
                    
                    <label htmlFor="registerEmail">Email</label>
                    <input type="email" id="registerEmail" onChange={this.handleChange}/>

                    <label htmlFor="registerPassword">Password</label>
                    <input type="password" id="registerPassword" onChange={this.handleChange} minLength="3" />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" onChange={this.handleChange}/>
                    {this.state.passwordsMatch?null:<span>Passwords must match!</span>}

                    <label htmlFor="displayName">Display Name</label>
                    <input type="text" id="displayName" maxLength="20" onChange={this.handleChange}/>

                    <div className="termsContainer">
                        <input type="checkbox" id="termsCheckBox" onChange={this.handleCheckbox}/>
                        <label htmlFor="termsCheckBox">I accept the <span onClick={()=>{this.setState({showTerm:true})}}>Terms of Use and Privacy Policy.</span></label>
                    </div>


                    <button onClick={this.registerUser}>Register Now</button>

                    {this.state.showTerm ? <TermsOfUse toggleTerms={()=>this.toggleTerms()}/> : null}
                </form>
            </section>
        )
    }
}

export default Register