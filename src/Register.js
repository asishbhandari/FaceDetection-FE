import react from 'react';

class Register extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            userEmail: '',
            userPassword: ''
        }
    }

    onNameChange =(event)=>{
        this.setState({userName: event.target.value})
    }

    onEmailChange =(event)=>{
        this.setState({userEmail: event.target.value})
    }

    onPasswordChange =(event)=>{
        this.setState({userPassword: event.target.value})
    }

    onRegisterSubmit=()=>{
        // console.log(JSON.stringify(this.state))
        fetch('https://facedetection-be.netlify.app/registor', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                name: this.state.userName,
                email: this.state.userEmail,
                password: this.state.userPassword
            })
        })
        .then(response => {
            // console.log(response)
            response.json()})
        .then(data => {
            alert('registered Successfully now signin using your credentials')
            // console.log(data)
        }
        )
        
        this.props.onroutechange("signin")
    }

    render(){
        return( 
            <div>
                <div className="sans-serif w-90 white mw6 center relative cover bg-top mt2 shadow-3">
                    {/* <div id="overlay" className="absolute absolute--fill bg-navy o-70 z-unset"></div> */}
    
                    <div className="relative pa4 pa5-m">
                        <h1 className="serif tracked ma0 mb4 pv3">Register</h1>
                        <div action="" id="login" className="">
                            <div className="mb3">
                                <label htmlFor="Username" className="db f6 white-80 ttu ph2 mb2">Username</label>
                                <input type="text" name="username" className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill"
                                onChange={this.onNameChange}/>
                            </div>
                            <div className="mb3">
                                <label htmlFor="Email" className="db f6 white-80 ttu ph2 mb2">Email</label>
                                <input type="text" name="Email" className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill"
                                onChange={this.onEmailChange}/>
                            </div>
                            <div className="mb4">
                                <label htmlFor="password" className="db f6 white-80 ttu ph2 mb2">Password</label>
                                <input type="password" name="password" className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill"
                                onChange={this.onPasswordChange}/>
                            </div>
                            <div>
                                <button onClick={this.onRegisterSubmit} className="input-reset db w-100 light-gray f6 b ttu tracked pv3 ph3 pointer bg-dark-blue hover-bg-blue bn br-pill">register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Register;