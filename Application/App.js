import * as React from 'react';
import PushNotification from 'react-native-push-notification';

// import Video from 'react-native-video';
import {NodePlayerView} from 'react-native-nodemediaclient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Slider} from '@miblanchard/react-native-slider';
// import { FontAwesome5, Entypo } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
// import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Switch,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
// import VideoPlayer from './src/VideoPlayer';

const App = () => {
  const slider = React.useRef(null);
  const [value, setValue] = React.useState(1);
  const [status, setStatus] = React.useState({});
  const [isSwitchOn, setIsSwitchOn] = React.useState(true);
  const [data, setData] = React.useState({});
  const [light, setLight] = React.useState('');
  const [moisture, setMoisture] = React.useState('');
  const [music, setMusic] = React.useState(false);
  var ws = React.useRef(new WebSocket('ws://3.110.24.21:5000/')).current;
  const sliderChange = e => {
    setValue(e[0]);
    
  };

  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'cradle-channel',
      channelName: 'cradle-channel',
    });
  };
  const handleNotifications = () => {
    PushNotification.localNotification({
      channelId: 'cradle-channel',
      title: 'Alert',
      vibration: 600,
      picture:
        'https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png',
      message: 'Baby Crying',
    });
  };

  // console.log(music);
  React.useEffect(() => {
    // let obj = {
    //   buttonState: isSwitchOn,
    //   value: value,
    //   from: 'App',
    //   music: music,
    // };
    ws.onopen = () => {
      // ws.send(JSON.stringify(obj));
    };
    ws.onmessage = e => {
      // a message was received
      // let a = JSON.parse(e.data);
      console.log(e);
      // let obj = JSON.parse(e.data).payload.split(' ');
      // setLight(obj[0].split(':')[1]);
      // setMoisture(obj[1].split(':')[1]);
    };
    sendMotorValue()
  }, [isSwitchOn, value]);
  React.useEffect(() => {
    createChannel();

    if (isSwitchOn) {
      handleNotifications();
    }
    // var ws = new WebSocket('ws://52.202.102.177:4001/');
  });
  const switchChange = ()=>{
    

    sendMotorValue()

  }
  const sendMotorValue = ()=>{
    let obj = {
      buttonState: isSwitchOn,
      value: value,
      from: 'App',
      music: music,
    };
    try{
    ws.send(JSON.stringify(obj));
    }catch(e){
        console.log(e)
    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar />
      <View style={{flex: 1}}>
        <NodePlayerView
          style={{height: '100%', width: '100%'}}
          inputUrl={'rtmp://3.110.24.21/live/zahid'}
          // scaleMode="cover"

          bufferTime={300}
          maxBufferTime={1000}
          autoplay
        />
      </View>
      <View style={{flex: 1, backgroundColor: '#282828'}}>
        <View
          style={{
            height: '20%',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => setMusic(!music)}
            style={{
              alignItems: 'center',
              justifySelf: 'flex-start',
              flex: 1,
              justifyContent: 'center',
            }}>
            <Icon name="music" size={30} color={music ? 'green' : '#ffff'} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Switch
              trackColor={{false: '#767577', true: '#81b0ff'}}
              thumbColor={isSwitchOn ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>[setIsSwitchOn(!isSwitchOn)]}
              value={isSwitchOn}
              style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
            />
            <Text style={{fontSize: 20, color: 'white'}}>
              {isSwitchOn ? 'Automatic' : 'Manual'}
            </Text>
          </View>
          <View style={{flex: 1}}></View>
        </View>
        <View style={{height: '80%', width: '100%'}}>
          <View style={{flex: 1, margin: '5%'}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#ff6e7f',
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {isSwitchOn ? (
                  <MaterialCommunityIcons
                    name="sleep"
                    color="white"
                    size={50}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="emoticon-cry"
                    color="white"
                    size={50}
                  />
                )}
                <Text style={{fontSize: 25, color: 'white'}}>
                  {isSwitchOn ? 'SLEEP' : 'CRY'}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#02aab0',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Entypo name="drop" size={50} color="#ffff" />
                <Text style={{fontSize: 25, color: 'white'}}>
                  {/* {moisture === 0 ? 'DRY' : 'WET'} */}
                  DRY
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#ff0084',
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="lightbulb" size={50} color="#ffff" />
                <Text style={{fontSize: 25, color: 'white'}}>
                  {/* {light === 0 ? 'OFF' : 'ON'} */}
                  OFF
                </Text>
              </View>
            </View>
            <View style={{flex: 1}}>
              <View style={{flex: 1, justifyContent: 'center'}}>
                <Text style={{fontSize: 20, color: 'white'}}>
                  Swing Speed: {value}
                </Text>
                <Slider
                  ref={slider}
                  value={value}
                  minimumValue={0}
                  maximumValue={3}
                  maximumTrackTintColor="#d3d3d3"
                  minimumTrackTintColor="#1fb28a"
                  thumbTintColor={isSwitchOn ? '#d3d3d3' : '#1a9274'}
                  animateTransitions
                  step={1}
                  disabled={isSwitchOn ? true : false}
                  trackClickable={true}
                  onValueChange={sliderChange}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default App;
