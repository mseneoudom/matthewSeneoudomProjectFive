import React, { Component } from 'react'

class Login extends Component{
    constructor(){
        super();
        this.state={

        }
    }



    loginInputs =(e)=>{
        e.preventDefault();
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    //When showTOS is true (from saved Recipes), show this component in a focus state
    //The TOS is fake, do not waste your time reading it
    render(){
        return(
            <section className="termsOfUseSection" onClick={()=>this.props.toggleTerms()}>
                <div className="policyBox">
                    <label htmlFor="policyCheckBox">
                    <p>Terms and Conditions</p>

<p>These terms and conditions outline the rules and regulations for the use of Company Name's Website, located at Website.com.</p>

<p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Website Name if you do not agree to take all of the terms and conditions stated on this page.</p>

<p>Cookies</p>
<p>We employ the use of cookies. By accessing Website Name, you agreed to use cookies in agreement with the Company Name's Privacy Policy.</p>

<p>Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>

<p>License</p>
<p>Unless otherwise stated, Company Name and/or its licensors own the intellectual property rights for all material on Website Name. All intellectual property rights are reserved. You may access this from Website Name for your own personal use subjected to restrictions set in these terms and conditions.</p>

<p>You must not:</p>

<p>Republish material from Website Name</p>
<p>Sell, rent or sub-license material from Website Name</p>
<p>Reproduce, duplicate or copy material from Website Name</p>
<p>Redistribute content from Website Name</p>
<p>This Agreement shall begin on the date hereof.</p>

<p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Company Name does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Company Name,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Company Name shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>

<p>Company Name reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>

<p>You warrant and represent that:</p>

<p>Hyperlinking to our Content</p>
<p>The following organizations may link to our Website without prior written approval:</p>

<p>Content Liability</p>
<p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>

                    </label>
                    <input type="checkbox" id="policyCheckBox" />
                </div>
            </section>
        )
    }
}

export default Login