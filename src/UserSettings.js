import React, { Component } from 'react'
import firebase from './firebase'

class UserSettings extends Component{
    constructor(){
        super();
        this.state={
            currentUser:{},
            setDisplayName:'',
            userUploadImage:'',
            setEmail:'',
            setPassword:'',
        }
    }
    getUserInfo=()=>{ //Getting the current user settings and saving them into the state
        const user = firebase.auth().currentUser;
        const currentUser = {
            displayName: user.displayName,
            email: user.email,
            photoURL : user.photoURL,
            uid : user.uid
        }
        if (currentUser.photoURL ===undefined || currentUser.photoURL ===null ){
            currentUser.photoURL = 'https://miro.medium.com/max/480/0*WK_vAxJo4O7Kdq3j.png'
        }

        this.setState({
            currentUser
        })
    }

    componentDidMount(){ //Calling the getUserInfo function to save to state
        this.getUserInfo()
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    changeImageState=(e)=>{ //Change the image state to store the image which we can upload after using the uploadImage function
        const image = e.target.files[0];
        this.setState({
            userUploadImage : image
        })
    }

    uploadImage=(e)=>{ // Uploads the image into firebase and adjusts the user photo url to that url
        e.preventDefault()
        const image = this.state.userUploadImage
        firebase.storage().ref(`userImages/${image.name}`).put(image)
        .then(()=>{
            firebase.storage().ref('userImages').child(image.name).getDownloadURL().then((url)=>{
                const imageUrl = url
                firebase.auth().currentUser.updateProfile({photoURL: imageUrl})
                const currentUser = this.state.currentUser
                currentUser.photoURL = imageUrl
                this.setState({
                    currentUser,
                    userUploadImage:''
                })
            })
        })
    }

    updateDisplayName=(e)=>{ //uses the state to update the name
        e.preventDefault()
        firebase.auth().currentUser.updateProfile({
            displayName: this.state.setDisplayName
        }).then(()=>{
            this.setState({
                setDisplayName:''
            })
            this.getUserInfo()
        })
        .catch((error)=>{
            alert(error)
        })
    }
    updateEmail=(e)=>{ //uses the state to update the email
        e.preventDefault()
        firebase.auth().currentUser.updateEmail(this.state.setEmail)
        .then(()=>{
            this.setState({
                setEmail:''
            })
            this.getUserInfo()
        })
        .catch((error)=>{
            alert(error)
        })
    }

    updatePassword=(e)=>{ //uses the state to update password
        e.preventDefault()
        firebase.auth().currentUser.updatePassword(this.state.setPassword)
        .then(()=>{
            this.setState({
                setDisplayName:''
            })
            this.getUserInfo()
        })
        .catch((error)=>{
            alert(error)
        })
    }


    render(){
        return(
            <section className="userSettingsSection">
                    <h2>User Account Settings</h2>
                <form className="userSettings">
                    <div className="imageContainer avatarImage">
                        <img src={this.state.currentUser.photoURL} alt={this.state.currentUser.name +"profile picture"} />
                    </div>

                    <div className="settingsContainer">
                        <p>{this.state.currentUser.displayName}</p>
                        <p>{this.state.currentUser.email}</p>
                    </div>

                    <div className="settingsContainer">
                        <label htmlFor="userUploadImage">Upload a profile picture!</label>
                        <input type="file" id="userUploadImage" onChange={this.changeImageState}/>
                        <button onClick={this.uploadImage}>Upload Image</button>
                    </div>

                    <div className="settingsContainer">
                        <label htmlFor="setDisplayName">Display Name</label>
                        <input type="text" maxLength="20" id="setDisplayName" onChange={this.handleChange} value={this.state.setDisplayName}/>
                        <button onClick={this.updateDisplayName}>Update Display Name</button>
                    </div>

                    <div className="settingsContainer">
                        <label htmlFor="setEmail">Update Email</label>
                        <input type="email" id="setEmail" onChange={this.handleChange} value={this.state.setEmail}/>
                        <button onClick={this.updateEmail}>Update Email</button>
                    </div>

                    <div className="settingsContainer">
                        <label htmlFor="setPassword">Update Password</label>
                        <input type="password" id="setPassword" onChange={this.handleChange} value={this.state.setPassword}/>
                        <button onClick={this.updatePassword}>Upload Password</button>
                    </div>

                </form>
            </section>
        )
    }
}
export default UserSettings