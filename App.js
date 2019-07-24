// import React, { Component } from "react";
// import { ScrollView } from "react-native";
// import SensorView from "./SensorView";

// const axis = ["x", "y", "z"];

// const availableSensors = {
//   accelerometer: axis,
//   gyroscope: axis,
//   magnetometer: axis,
//  // barometer: ["pressure"]
// };
// const viewComponents = Object.entries(availableSensors).map(([name, values]) =>
//   SensorView(name, values)
// );

// export default class App extends Component {
//   render() {
//     return (
//       <ScrollView>
//         {viewComponents.map((Comp, index) => <Comp key={index} />)}
//       </ScrollView>
//     );
//   }
// }

import React, { Component } from "react";
import {AppRegistry, View , Text ,StyleSheet, Image, Dimensions } from "react-native";
import {accelerometer} from "react-native-sensors";
import { setUpdateIntervalForType, SensorTypes } from "react-native-sensors";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const responsiveWidth = Dimensions.get('screen').width;
const responsiveHeight = Dimensions.get('screen').height;

export default class App extends Component {
  constructor(){
    super();
    this.state= {
      data: {x: 0,
            y: 0,
            z: 0,
          }
      };
  }

  componentDidMount(){
    setUpdateIntervalForType(SensorTypes.accelerometer, 120);
    accelerometer.subscribe(({ x, y, z }) => {
      this.setState({data : {x,y,z}})
    })
    accelerometer.subscribe(item => {
      this.setState({movement: item.x *-100 + 120});
     console.log( item.x + ' ' + item.y + ' ' + item.z + ' ' + item.timestamp );
    });
     
  }

  render() {  
    return (
      <View style={styles.cont}>
        <Image source={require("./assets/road.gif")} style={{ width: responsiveWidth, height: responsiveHeight * 0.3}}/>
        <Image source={require("./assets/car.png")} style={{width: 70, height: 50, flex: 1, 
            position: 'absolute', left: this.state.movement}}/>
        <Text style={styles.txt}>X : {this.state.data.x}</Text>
        <Text style={styles.txt}>Y : {this.state.data.y}</Text>
        <Text style={styles.txt}>Z : {this.state.data.z}</Text>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  cont:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  txt:{
    marginHorizontal: 20,
    fontSize: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

AppRegistry.registerComponent('App',()=> App)