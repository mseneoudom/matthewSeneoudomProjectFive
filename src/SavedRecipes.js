import React, { Component } from 'react'
import firebase from './firebase'
import FocusRecipe from './FocusRecipe'


class SavedRecipes extends Component{
    constructor(){
        super()
        this.state = {
        recipes : [],
        showFocus:false,
        focusKey:'',
        }
    }
    
    componentDidMount(){ //Gets the recipes from the database and saves them into the recipes state which will then be rendered and mapped
        const dbRef = firebase.database().ref('recipes');
        dbRef.on('value', (response)=>{
        const newState= [];
        const data = response.val();
        for (let key in data){
            newState.push({key:key, name: data[key]})
        }
        this.setState({
            recipes: newState
            })
        })
    }
    
    focusRecipe=(key)=>{ //Toggles recipe focus which will use the key from the object and send it to a focus state/component which displays the recipe in a larger component
        this.setState({
            showFocus:true,
            focusKey: key
        })
    }

    toggleFocus=()=>{ //Used to get in and out of the focus state
        this.setState({
            showFocus:!this.state.showFocus
        })
    }

render(){
    return(
        <section className="savedRecipesSection">
            <div className="savedRecipes">
                {this.state.recipes.map((recipe, index)=>{
                    return(
                    <ul className="recipeUL" key={'ul_'+recipe.key} >
                        <li className="recipeLI" key={recipe.key} id={recipe.key} onClick={()=>this.focusRecipe(recipe.key)}>
                        <div className="imageContainer recipeImage">
                            <img src={recipe.name.finalImageUrl} alt={recipe.name.description}/>
                        </div>
                        <div className="recipeTextContainer">
                            <h2>{recipe.name.name}</h2>
                            <div className="authorContainer">
                                <p>Posted by:</p>
                                <div className="imageContainer authorIcon">
                                    <img src={recipe.name.authorImage} alt="author icon"/>
                                </div>
                                <p>{recipe.name.author}</p>
                            </div>
                            <p className="recipeDescription">{recipe.name.description}</p>
                        </div>
                        </li>
                    </ul>
                    )
                })}
            </div>
            {this.state.showFocus?
                <FocusRecipe focusKey={this.state.focusKey} toggleFocus={this.toggleFocus} />
                :null}
        </section>
    )}
}

export default SavedRecipes