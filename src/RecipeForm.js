import React, { Component } from 'react'
import firebase from './firebase'


class RecipeForm extends Component{
    constructor(){
        super();
        this.state ={
        newDraft: {
            name:'',
            ingredients:'',
            instructions:'',
            description:'',
            finalImage:null,
            finalImageUrl:''
            }
        }
    }
    
    handleClick=(e)=>{
        e.preventDefault();
    }

    submitRecipe=(e)=>{  //Saves the values of the states and uploads it to Firebase Database under Recipes folder
        this.handleClick(e);
        const dbRef = firebase.database().ref('recipes')
        dbRef.push(this.state.newDraft)

        this.setState({ //Reset the state so we can clear the form.. 
            newDraft:{
                name:'',
                ingredients:'',
                instructions:'',
                description:'',
                finalImage:null,
                finaleImageUrl:'',
                placeholder:''
            }
        })
        
        this.props.toggleSelect('showSavedRecipes') //Brings us to the Saved Recipes so we can see what we uploaded
        alert('Your recipe has been added!')
    }

    //Below are all functions to update the state
    updateTitle=(e)=>{
        const draft = this.state.newDraft;
        draft.name = e.target.value;
        this.setState({newDraft:draft})
    }

    updateDescription=(e)=>{
        const draft = this.state.newDraft;
        draft.description = e.target.value;
        this.setState({newDraft:draft})
    }
    
    updateIngredient=(e)=>{
        const draft = this.state.newDraft;
        const listArray = e.target.value.split('\n') //Used to turn the input to an array so we can map and create dynamic LI
        draft.ingredients = listArray;
        this.setState({newDraft:draft})
    }
    updateInstructions=(e)=>{
        const draft = this.state.newDraft;
        const listArray = e.target.value.split('\n') //Used to turn the input to an array so we can map and create dynamic LI
        draft.instructions = listArray;
        this.setState({newDraft:draft})
    }

    uploadImageState = (e)=>{ //Uses the image to save to the state
        console.log(e.target.files)
        const image = e.target.files[0];
        const draft= this.state.newDraft;
        draft.finalImage = image;
        this.setState({newDraft: draft})
    }

    uploadTask = (e)=>{ //Uses the state to upload the image into the Firebase Storage
        e.preventDefault()
        const image = this.state.newDraft.finalImage
        firebase.storage().ref(`recipeImages/${image.name}`).put(image)
        .then(()=>{
            firebase.storage().ref('recipeImages').child(image.name).getDownloadURL().then((url)=>{ //Saves the image to recipeImages with the name that was uploaded
                const imageUrl = url
                const draft = this.state.newDraft
                draft.finalImageUrl = imageUrl
                this.setState({
                    newDraft : draft
                })
            })
        })
    }

    componentDidMount(){
        const newDraft = this.state.newDraft
        if (firebase.auth().currentUser !== null){
            newDraft.author = firebase.auth().currentUser.displayName //Listens to see if logged in- which you have to be to post. This saves the state so we can save the author and icon to the image
            newDraft.authorImage = firebase.auth().currentUser.photoURL
            this.setState({
                newDraft
            })
        }
    }

    render(){
        return(
            <section className="recipeFormSection">
                {this.props.loggedIn ? 
                <form action="submit" className="recipeForm">
                    <h2>Add a recipe!</h2>

                    <div className="imageContainer">
                        <img src={this.state.newDraft.finalImageUrl} alt={this.state.newDraft.description} />
                    </div>

                    <label htmlFor="uploadRecipeImage">Upload the final image of your dish!</label>
                    <input type="file" id="uploadRecipeImage" onChange={this.uploadImageState}/>
                    <button onClick={this.uploadTask}>Upload Image</button>

                    <label htmlFor="recipeTitle">Name the dish!</label>
                    <input type="text" id="recipeTitle" maxLength="25" onChange={this.updateTitle} value={this.state.newDraft.name}/>

                    <label htmlFor="recipeDescription">Add a description for your dish</label>
                    <textarea id="recipeDescription" onChange={this.updateDescription} value={this.state.newDraft.description}/>

                    <label htmlFor="recipeIngredients">Ingredient Name and Quantity (Enter each ingredient on a new line for better results!)</label>
                    <textarea id="recipeIngredients" onChange={this.updateIngredient} placeholder="Example: 5 tbs of Sugar" value={this.state.newDraft.placeholder}/>

                    <label htmlFor="recipeSteps">List your steps below! (Enter each step on a new line for better results!)</label>
                    <textarea id="recipeSteps" onChange={this.updateInstructions} value={this.state.newDraft.placeholder}/>
                    
                    <button onClick={this.submitRecipe}>Submit</button>
                </form>
                :
                <section className="recipeFormSection">
                    <h2>You must be logged in to add a recipe!</h2>

                    <form action="submit" className="recipeForm">
                        <h2>Add a recipe!</h2>

                        <div className="imageContainer">
                            <img src={this.state.newDraft.finalImageUrl} alt={this.state.newDraft.description} />
                        </div>

                        <label htmlFor="uploadRecipeImage">Upload the final image of your dish!</label>
                        <input type="file" id="uploadRecipeImage" disabled onChange={this.uploadImageState}/>
                        <button onClick={this.uploadTask} disabled>Upload Image</button>

                        <label htmlFor="recipeTitle">Name the dish!</label>
                        <input type="text" id="recipeTitle" onChange={this.updateTitle} value={this.state.newDraft.name} disabled/>

                        <label htmlFor="recipeDescription">Add a description for your dish</label>
                        <textarea id="recipeDescription" onChange={this.updateDescription} value={this.state.newDraft.description} disabled/>

                        <label htmlFor="recipeIngredients">Ingredient Name and Quantity (Enter each ingredient on a new line for better results!)</label>
                        <textarea id="recipeIngredients" onChange={this.updateIngredient} placeholder="Example: 5 tbs of Sugar" value={this.state.newDraft.placeholder} disabled/>

                        <label htmlFor="recipeSteps">List your steps below! (Enter each step on a new line for better results!)</label>
                        <textarea id="recipeSteps" onChange={this.updateInstructions} value={this.state.newDraft.placeholder} disabled/>
                        
                        <button onClick={this.submitRecipe} disabled>Submit</button>
                    </form>
                </section>
                }
            </section>
        )
    }
}

export default RecipeForm