// @flow
//use React Native polygill for HTML5 navigator.geolocation API
//start observing location whe APP first renders and stop when it unmounts

class App extends Component {

    state = {
    //Keep the mapRegion and accuracy in the App state

        mapRegion: null,
        gpsAccuracy: null

    }//state

    //watchID to hold region object
    watchID = null

    //start observing location when App is about to mount
    componentWillMount(){

      this.watchID = navigator.geolocation.watchPosition((position)=>{
      //geolocation watch with navigation.geolocation.watchPosition
      //every the position changes, it returns a region object as below
      //The Geolocation.watchPosition() method is used to register a handler function that will be called automatically each time the position of the device changes.
      //syntax: id = navigator.geolocation.watchPosition(success[, error[, options]])
      //each update returns a new Position object
      //options: can specify accuracy, timeout, use of cached location
      //the watchPosition method returns a unique ID. Use this ID to cancel the watchPosition call and stop receiving location updates
            let region = {
            //Use latitude, longitude to center Map and run FourSquare query
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922*1.5,
                longitudeDelta: 0.00421*1.5

            }

      //call a onRegionChange function with region object and accuracty
      //Use accuracy to make bigger or smaller circle based on GPS accuracy
      this.onRegionChange(region, position.coords.accuracy);

      })//this.watchID

    }//componentWillMount

    componentWillUnmount(){
    //Use watchID to cancel the watchPosition call and stop receiving location updates

      navigator.geolocation.clearwatch(this.watchID);

    }//componentWillUnmount

    onRegionChange(region, gpsAccuracy){
    //2 functions: change region from watchPosition and when user zooms
    //Also fetches FourSquare recommendations
      this.fetchVenues(region);

      this.setState({

        mapRegion: region,
        //if the gpsAccuracy passed in, we use that
        //otherwise keep the one in the state
        gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy

      });

    }//onRegionChange

    //Render the map
    render(){
    //if we have a location, we will render the map.(mapRegion is defined) Otherwise render a Spinner
    //We use Screen and Spinner from Shoutem UI Kit
    //Screen is like View, but with nice backgrounds

        const {mapRegion, lookingFor} = this.state;

        if(mapRegion){
        //if mapRegion is defined in state we render RecommendationsMa
        //and pass in onRegionChange as a prop and bind it, for when users manually changes his position manually
        //and pass in all of this.state
            return (
              <Screen>
                <RecommendationsMap {...this.state}  onRegionChange = {this.onRegionChange.bind(this)}/>
              </Screen>
            )
        } else {


        }//if,else


    }//render

}// App component
