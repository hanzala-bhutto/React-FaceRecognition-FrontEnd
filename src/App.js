import './App.css';
import ParticlesBg from 'particles-bg';
// import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import { Component } from 'react';
import Signin from './Components/Signin/Signin';

// const app = new Clarifai.App({
//   apiKey: '4cae014b57964844b259fe0a988be7e9',
// });


class App extends Component {
  
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      box:{}
    }
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

    // app.models
    // .predict(
    //   {
    //     id: 'face-detection',
    //     name: 'face-detection',
    //     version: '6dc7e46bc9124c5c8824be4822abe105',
    //     type: 'visual-detector',
    //   }, req.body.input)
    //   .then(data => {
    //     this.displayFaceBox(calculateFaceLocation(data));
    //   })
    //   .catch(err => console.log(err));


  }

  render(){
    return (
      <div className="App">
        <ParticlesBg color="#ffffff" num={100} alpha={[0.9, 0]} type="cobweb" bg={true} />
        <Navigation />
        <Signin />
        {/* <Register /> */}
        <Logo />
        <Rank />
        <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
      </div>
    );
  }
}

export default App;
