import './App.css';
import { Component } from 'react';
import Clarifai from 'clarifai' ;
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/imageLinkForm/imageLinkForm';
import Rank from './components/rank/Rank';
import Particles from "react-tsparticles";
import FaceRecognition from './components/facerecognition/faceRecognition';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';

const app = new Clarifai.App({
  apiKey: '76ccee162e4f4e3da13835841ca8a75d'  
})

const initialState = {
  input:'' ,
  imageURL:'',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user : {
    id: '',
    name: '' ,
    email: '' ,
    entries: 0 ,
    joined:  ''
  } ,
} ;

class App extends Component {
  constructor() {
    super() ;
    this.state = initialState ;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name ,
      email: data.email ,
      entries: data.entries ,
      joined: data.joined
    }})
  }

  calculateFaceLocation= (data) => {
    const clarifaiface = data.outputs[0].data.regions[0].region_info.bounding_box ;
    const image = document.getElementById('inputimage') ;
    const width = Number(image.width) ;
    const height = Number(image.height) ;
    return {
      leftCol : clarifaiface.left_col * width ,
      topRow: clarifaiface.top_row * height ,
      rightCol: width - (clarifaiface.right_col * width) ,
      bottomRow: height - (clarifaiface.bottom_row * height) ,
    }
  }

  displayBox= (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input : event.target.value}) ;
  }

  onSubmit = () => {
    this.setState({imageURL : this.state.input}) ;
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then( (response) => {
        if(response) {
          fetch('https://frozen-bastion-01836.herokuapp.com/image' , {
            method:'put' ,
            headers:{ 'Content-Type': 'application/json'} ,
            body: JSON.stringify({id: this.state.user.id})
          })
          .then(response => response.json()) 
          .then(data => this.setState( Object.assign(this.state.user, {entries: data}) ) )
        }
        this.displayBox( this.calculateFaceLocation(response) )
      } )
      .catch( (err) => console.log(err)) 
  }

  onRouteChange = (route) => {
    if(route === 'signout')
      this.setState(initialState) ;
    else if (route === 'home') 
      this.setState({isSignedIn : true}) ;
    this.setState({route : route} )
  }

 

  render() {
  return (
    <div className="App">
      <Particles className='particles'
      options={{
        fpsLimit: 60,
        interactivity: {
          detectsOn: "canvas",
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 4,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.4,
          },  
        },
      }}/>

      <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
      { this.state.route === 'home' 
        ? <div> 
            <Logo />
            <Rank user={this.state.user} />
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
            <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} />
          </div>
        
        : (
          (this.state.route === 'signin' || this.state.route === 'signout' ) ?
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
      }
      
    </div>
  );
  }
}

export default App;
