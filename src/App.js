import React, { Component } from 'react';
import firebase from './firebase'
import Nav from './Nav'
import RecipeForm from './RecipeForm'
import SavedRecipes from './SavedRecipes'
import Register from './Register'
import Login from './Login'
import UserSettings from './UserSettings'
import Home from './Home'

class App extends Component{
  constructor(){
    super()
    this.state = {
      showSection:{
        showSavedRecipes: false,
        showRecipeForm: false,
        showLogin: false,
        showRegister:false,
        showHome:false,
        showUserSettings:false,
      },
      recipeAdded:false,
      userLogin:false,
      userID:null,
    }
  }


  selectSection=(select)=>{   //This gets called when I want to change to toggle states - turns all to false first, then gets the input from where it is being called
    const allStates = this.state.showSection
    for (let key in allStates){
        allStates[key] = null
      }
    this.setState(
      {showSection: allStates}
    )
    const newState= this.state.showSection
    newState[select] = !newState[select]
    this.setState({
      showSection : newState
    })
  }

  authListener(){ //This is used to see if user is logged in, as well as bringing you to home when user is logged in
    firebase.auth().onAuthStateChanged((user)=>{
      user === null ?
        this.setState({
          showSection:{
            showSavedRecipes: false,
            showRecipeForm: false,
            showLogin: false,
            showRegister:false,
            showHome:true,
            showUserSettings:false,
          },
          userLogin:false,
          userID: user
        })
        :
      this.setState({
        showSection:{
          showSavedRecipes: false,
          showRecipeForm: false,
          showLogin: false,
          showRegister:false,
          showHome:true,
          showUserSettings:false,
        },
        userLogin:true,
        userID: user
      })
    })
  }

  componentDidMount(){ // Listens to see if user logs in/out
    this.authListener()
  }

  userLogout = ()=>{  //Used to log out the user
    firebase.auth().signOut();
    this.setState({
      userLogin:false
    })
  }

  updateRecipeState=()=>{
    this.setState({
      recipeAdded: true
    })
  }

  render(){ // Most of the render below is contingeant on what the user will click on the NAV. The NAV is the only thing truly consistent as it will always be mounted. The other components are only mounted on user input / clicking the NAV
  return (
    <>
    <Nav toggleSection={(item)=> this.selectSection(item)} loggedIn={this.state.userLogin} logoutFunction={(e)=>this.userLogout(e)} userLogout={()=>this.userLogout()}/>
    <main className="bleed">

      {this.state.showSection.showHome?
        <Home toggleSelect={(item)=>this.selectSection(item)}/>
        :null} 

      {this.state.showSection.showSavedRecipes?
        <SavedRecipes />
        :null} 

      {this.state.showSection.showRecipeForm?
        <RecipeForm toggleSelect={(item)=>this.selectSection(item)}loggedIn={this.state.userLogin}updateRecipeState={()=>this.updateRecipeState}/>
        :null} 

      {this.state.showSection.showRegister?
        <Register toggleSelect={(item)=>this.selectSection(item)} toggleSection={(item)=> this.selectSection(item)} />
        :null} 

      {this.state.showSection.showLogin?
        <Login toggleSelect={(item)=>this.selectSection(item)} authListener={this.authListener}/>
        :null} 

      {this.state.showSection.showUserSettings?
        <UserSettings toggleSelect={(item)=>this.selectSection(item)} authListener={this.authListener}/>
        :null} 

    </main>
    </>
  );
  }
}

export default App;
