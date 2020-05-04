import React, { Component } from 'react'

class MobileNav extends Component{

    //Only rendered when state in Nav is true for showMobileNav    
    render(){
        return(
            <nav className="mobileNav" onClick={this.props.toggleMobileNav}>
                <ul className="mobileNavUL">
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
            </nav>
        )
    }
}
export default MobileNav