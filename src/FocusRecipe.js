import React, { Component } from 'react'
import firebase from './firebase'


class FocusRecipe extends Component{
    constructor(){
        super()
        this.state = {
            focusedItem:{ // This is generated based on what the user selects during the SavedRecipes component
                ingredients:[],
                instructions:[],
            }
        }
    }
    
    componentDidMount(){
        firebase.database().ref('recipes/'+this.props.focusKey).on('value', (response)=>{ // Gets the input from a user from the saved Recipe, and updates the state to the item selected which will then be brought up to your screen
            const focusedItem = response.val();
            this.setState({
                focusedItem
            })
        })
    }

render(){
    return(
        <section className="focusedRecipeSection" onClick={()=>this.props.toggleFocus()}> 
            <div className="focusedRecipe" key={'f_'+this.props.focusKey}>
                <div className="imageContainer focusedImage">
                    <img src={this.state.focusedItem.finalImageUrl} alt={this.state.focusedItem.description}/>
                </div>
                <div className="focusRecipeDescription">
                    <h2>{this.state.focusedItem.name}</h2>
                    <p>{this.state.focusedItem.description}</p>
                </div>
                <div className="focusedIngredientList">
                    <h3>Ingredients</h3>
                    {this.state.focusedItem.ingredients.map((ingredient, index)=>{
                    return(
                        <li key={'f_'+this.state.focusedItem.name+'_ingredient_'+index}>{ingredient}</li>
                        )
                    })}
                </div>
                <div className="focusedInstructionsList">
                    <h3>Directions</h3>
                    {this.state.focusedItem.instructions.map((instruction, index)=>{
                    return(
                        <li key={'f_'+this.state.focusedItem.name+'_instructions_'+index}>{instruction}</li>
                        )
                    })}
                </div>
            </div>
        </section>
    )}
}

export default FocusRecipe
