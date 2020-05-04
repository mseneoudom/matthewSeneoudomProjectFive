import React, { Component } from 'react'
import firebase from 'firebase'

class Home extends Component{
    // Basic home page which will show a message and call a component when spans are clicked.
    render(){
        return(
            firebase.auth().currentUser ===null?
            <section className="homeSection">
                <h2>Welcome to my Recipe Poster App!</h2>
                <p>This app allows you to view recipes that were posted by registered users.</p>
                <p>If you would like to post a recipe, you must <span onClick={()=>this.props.toggleSelect("showRegister")}>create an account with your email</span>, then head over to the <span onClick={()=>this.props.toggleSelect("showRecipeForm")}>'Add Recipe'</span> section.</p>
            </section>
            :
            <section className="homeSection">
                <h2>Welcome back {firebase.auth().currentUser.displayName}!</h2>
                <p>If you haven't already, you can change your avatar to show the other users what you look like over in <span onClick={()=>this.props.toggleSelect("showUserSettings")}>'Settings'.</span></p>
                <p>If you would like to post a recipe, head over to the <span onClick={()=>this.props.toggleSelect("showRecipeForm")}>'Add Recipe'</span> section.</p>
            </section>
        )
    }
}

export default Home