import './App.css';
import ParticlesBg from 'particles-bg';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import { Component } from 'react';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';

class App extends Component {
  
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box:{},
      route:'signin',
      isSignedIn:false,
      user:{
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: ''
      }
    }
  }
  
  loadUser = (userData) => {
    this.setState({user:{
      id:userData.id,
      name:userData.name,
      email:userData.email,
      entries:userData.entries,
      joined:userData.joined
    }})
  }

  onInputChange = (event) => {
    this.setState({input:event.target.value});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const height = Number(image.height);
    const width = Number(image.width);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    } 
  }

  displayFaceBox = (box) => {
    this.setState({box:box})
  }

  onButtonSubmit = () => {
    console.log('click');
    this.setState({imageUrl:this.state.input});

    
    //   .catch(err => console.log(err));


  }

  onRouteChange = (route) => {
    if(route === 'signin'){
      this.setState({isSignedIn:false})
    }
    else if(route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route});

  }

  render(){
    const {route,isSignedIn,imageUrl,box} = this.state;
    return (
      <div className="App">
        <ParticlesBg color="#ffffff" num={100} alpha={[0.9, 0]} type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {
          (route==='home')
          ?
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition imageUrl={imageUrl} box={box}/>
          </div>
          :
          ((route === 'signin')
          ?
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          :
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
