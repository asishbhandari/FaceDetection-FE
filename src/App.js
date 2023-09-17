import './App.css';
// import { Component } from 'react';
import Navigation from "./Navigation";
import Rank from "./Rank";
import Logo from "./Logo";
import ImageLinkForm from "./ImageLinkForm";
import FaceRecognition from "./FaceRecognition";
import ParticlesBg from 'particles-bg';
import SignIn from "./SignIn";
import Register from "./Register";
import { useDispatch, useSelector } from "react-redux";
import {getIsSignedIn, getRoute, getBox, getImageUrl, getInput} from './redux part/initialUserSlice';
import { loadUser, userEntries } from './redux part/userSlice';


const clarifairequestoption=(imageurl)=>{
  // Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '7b1d7aab2a734adbb868e036805a8818';
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = 'asish-bhandari_17';       
const APP_ID = 'Face_App';
// Change these to whatever model and image URL you want to use
// const MODEL_ID = 'face-detection';
// const MODEL_VERSION_ID= "6dc7e46bc9124c5c8824be4822abe105";
const IMAGE_URL = imageurl;

const raw = JSON.stringify({
    "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
    },
    "inputs": [
        {
            "data": {
                "image": {
                    "url": IMAGE_URL
                }
            }
        }
    ]
});

const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};
return requestOptions;
}

// const initialState ={
//         input:" ",
//         ImageUrl: " ",
//         box:[],
//         route:"signin",
//         issignedin: false,
//         user: {
//           id:'',
//           name:'',
//           email:'',
//           password:'',
//           entries:'',
//           joined:''
//         }
// }
function App (){
    // constructor(){
    //   super();
    //   this.state={initialState}
    // }
  
  const dispatch= useDispatch();
  const user= useSelector(state=> state.users.user);
  const initial= useSelector(state=> state.initialUser.initial) 

  const loadUserin =(data)=>{
    dispatch(loadUser(data))
  }
  // loadUser=(data)=>{
  //   this.setState({user:{
  //     id: data.id,
  //     name: data.name,
  //     email: data.email,
  //     entries: data.entries,
  //     joined: data.joined
  //   }})
  // }
// --> to check our connection with the server
  // componentDidMount(){
  //   fetch('http://localhost:3001')
  //   .then(response=>response.json())
  //   .then(console.log)
  // }
  // can also use mode: 'no-cors' insted of installing cors npm for testing purpose
  // fetch('http://localhost:3001/',{ mode: 'no-cors'}).then(response=>response.json()).then(console.log)

  // onchangeinput=(event)=>{
  //   this.setState({input: event.target.value});
  // }
  const onchangeinput=(event)=>{
    dispatch(getInput(event.target.value))
  }

  const calulatefacelocation=(data)=>{
    // console.log(data.outputs[0].data.regions)
    // const facelocation=data.outputs[0].data.regions[0].region_info.bounding_box;
    // console.log(data);
    let locations=[];
    if(Array.isArray(data.outputs[0].data.regions)){
      data.outputs[0].data.regions.forEach(element => {
        locations.push(element.region_info.bounding_box)
      });
    }
    // console.log(locations)
    const image=document.getElementById('faceloca');
    const width=Number(image.width);
    const height=Number(image.height);
    // const facelocation=data.outputs[0].data.regions.map((region)=> {
    //   return{
    //   leftcol: region.region_info.bounding_box.left_col * width,
    //   rightcol: width - region.region_info.bounding_box.right_col*width,
    //   toprow: region.region_info.bounding_box.top_row*height,
    //   bottomrow:height- region.region_info.bounding_box.bottom_row*height,
    //   }
    // })
    // console.log(facelocation);
    // return facelocation;
  let boxlocations=[];
    locations.forEach(item=>{
      boxlocations.push({
        leftcol: item.left_col * width,
        rightcol: width - item.right_col*width,
        toprow: item.top_row*height,
        bottomrow:height- item.bottom_row*height,
      })
    })
    return boxlocations;
  }

  // onroutechange=(rout)=>{
  //   if(rout=== "home"){this.setState({issignedin:true})}
  //   else{this.setState(initialState)}
  //   this.setState({route:rout})
  // }
  const onroutechange=(rout)=>{
    if(rout === 'home'){dispatch(getIsSignedIn(true))}
    else{dispatch(getIsSignedIn(false))}
    dispatch(getRoute(rout))
  }
  
  // displayfacebox=(box)=>{
  //   this.setState({box:box})
  //   // console.log("displayfacebox"+box[0].rightcol)
  // }
  const displayfacebox=(box)=>{
    dispatch(getBox(box))
  }
  const onclickbutton=()=>{
    let facein =false;
    if(initial.input === ' ' || initial.input === ''){
      facein=false
      dispatch(getImageUrl(initial.input)) // this.setState({ImageUrl: this.state.input})
    }else{facein= true}
    if(facein === true){
      dispatch(getImageUrl(initial.input)) //  this.setState({ImageUrl: this.state.input})
     fetch("https://api.clarifai.com/v2/models/face-detection/outputs", clarifairequestoption(initial.input))
        .then(response => response.json())
        .then(result => {
          if(result){
            fetch('https://facedetectionbe.onrender.com/image', {
            method: 'put',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                id: user.id
                })
            }).then(response => response.json())
            .then(count => {
              dispatch(userEntries(count)) // this.setState(Object.assign(this.state.user, {entries: count}))
            })
            }
            displayfacebox(calulatefacelocation(result))
        })
        .catch(error => console.log('error', error));
      }
    // this.setState({user:{entries:}})
    
  }
    return(
    <div className="App">
      <ParticlesBg  type="color" bg={true} />
      <Navigation issignedin={initial.issignedin} onroutechange={onroutechange} />
      { initial.route==="home"?
      <div>
        <Logo />
        <Rank name={user.name} entries={user.entries}/>
        <ImageLinkForm onchangeinput={onchangeinput} onclickbutton={onclickbutton}/>
        <FaceRecognition ImageUrl={initial.ImageUrl} box={initial.box}/>
      </div>:
      <div>
          {initial.route==="register"?
          <Register onroutechange={onroutechange}/>:
          <SignIn loadUserin={loadUserin} onroutechange={onroutechange} />
          }
      </div>
      } 
    </div>
  );
      
  
}

export default App;
// https://s3.amazonaws.com/samples.clarifai.com/featured-models/face-little-girl-boy-standing-outside.jpg