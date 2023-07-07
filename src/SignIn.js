import React from "react";

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            signinEmail:'',
            signinPassword:''
        }
    }

    // onemailchange = (event) => {
    //     this.setState({inputEmail: event.target.value})
    // }

    // onpasswordchange = (event) => {
    //     this.setState({inputPassword: event.target.value})
    // }

    // onsubmitchange=()=>{
    //     let routeis=false;
    //     // debugger;
    //     fetch('http://localhost:3001/signin',
    //         {method:'post',
    //         headers:{'content-type':'application/json'},
    //         body:JSON.stringify({
    //             email: this.state.inputEmail,
    //             password: this.state.inputPassword
    //         })
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //             // console.log(data)
    //             if(data === 'Success'){
    //                 this.props.onroutechange("home");
    //                 console.log(data);
    //                 routeis=true;
    //                 console.log(routeis);
    //             }
    //             else{
    //                 return(alert("wrong combination of email and password try again"))
    //             }
    //         })
    //     console.log('outside'+ routeis)
    //     // if(routeis === true){this.props.onroutechange("home")}
    //     this.props.onroutechange("home")
    // }
    onEmailChange = (event) => {
        this.setState({signinEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signinPassword: event.target.value})
    }

    onSubmitSignin = () => {
        // console.log(this.state)
        fetch('https://facedetection-be.netlify.app/signin',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                email: this.state.signinEmail,
                password: this.state.signinPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            if(data === "unable to fr"){
                alert("email and password does not match")
                
            }
            else{
                this.props.loadUser(data);
                this.props.onroutechange('home')
            }
        })
        
    }

    render(){
        const { onroutechange }= this.props;
        return( 
            <div>
                <div className="sans-serif w-90 white mw6 center relative cover bg-top mt2 shadow-3">
                    {/* <div id="overlay" className="absolute absolute--fill bg-navy o-70 z-unset"></div> */}
    
                    <div className="relative pa4 pa5-m">
                        <h1 className="serif tracked ma0 mb4 pv3">Sign In</h1>
                        <div action="" id="login" className="">
                            <div className="mb3">
                                <label htmlFor="username" className="db f6 white-80 ttu ph2 mb2">Email</label>
                                <input onChange={this.onEmailChange} type="text" name="username" className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill"/>
                            </div>
                            <div className="mb4">
                                <label htmlFor="password" className="db f6 white-80 ttu ph2 mb2">Password</label>
                                <input onChange={this.onPasswordChange} type="password" name="password" className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill"/>
                            </div>
                            <div>
                                <input 
                                    onClick={this.onSubmitSignin} 
                                    type="submit"
                                    value="sign in"
                                    className="input-reset db w-100 light-gray f6 b ttu tracked pv3 ph3 pointer bg-dark-blue hover-bg-blue bn br-pill"
                                />
                            </div>
                        </div>
            
                        <div className="tc b f6 mt4 o-70 glow pa2 i">
                            <p>New Member?</p> 
                            <p onClick={()=>{onroutechange("registor")}} className="white pointer" >Register</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default SignIn;