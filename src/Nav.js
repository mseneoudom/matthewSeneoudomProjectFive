import React, { Component } from 'react'
import MobileNav from './MobileNav'

class Nav extends Component{
    constructor(){
        super();
        this.state= {
            showMobileNav:false,
        }
    }

    toggleMobileNav=()=>{ //Toggles the state to get in and out of Mobile Nav
        this.setState({
            showMobileNav:!this.state.showMobileNav
        })
    }   
    
    render(){
        return(
        <>
            <nav className="desktopNav">
                <button className="mobileNavButton" onClick={()=>this.toggleMobileNav()}><i className="fas fa-bars"></i></button>
                <div className="bleed">
                    <div className="logoContainer">
                        <i className="fas fa-utensils"></i>
                    </div>
                    <ul className="navUL">
                        <li className="appName" onClick={()=>this.props.toggleSection("showHome")}>//recipeApp</li>
                        <li onClick={()=>this.props.toggleSection("showHome")}>Home</li>
                        <li onClick={()=>this.props.toggleSection("showRecipeForm")}>Add Recipes</li>
                        <li onClick={()=>this.props.toggleSection("showSavedRecipes")}>View Recipes</li>
                        {this.props.loggedIn ?
                            <>
                                <li onClick={()=>this.props.toggleSection("showUserSettings")}><i className="fas fa-user-circle"></i> Settings</li>
                                <li onClick={()=>this.props.userLogout()}>Logout</li>
                            </>
                            :
                            <>
                                <li onClick={()=>this.props.toggleSection("showLogin")}>Login</li>
                                <li onClick={()=>this.props.toggleSection("showRegister")}>Register</li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
            {this.state.showMobileNav ? 
                <MobileNav toggleSection={(item)=>this.props.toggleSection(item)} toggleMobileNav={this.toggleMobileNav} loggedIn={this.props.loggedIn} userLogout={()=>this.props.userLogout()}/>
                :null}
        </>
        )
    }
}
export default Nav