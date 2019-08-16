import React from 'react';
import { StyleSheet, Text, View, Button, Picker, Image, Dimensions, ScrollView, AsyncStorage, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";
import { AppLoading } from 'expo';

import { getWorldAlignment, getPlaneDetection } from 'expo/build/AR';




export default class App extends React.Component {

    state = {
        ready: false,
      };

      componentDidMount = () => {
        this.retrieveData();
      };

    render() {
        
        // this.retrieveData();
        if (this.state.ready)
        {
              return (
          <AppContainer />);
        }
        return null;

    }

    
    retrieveData = async()  => {
        try{
            var student = await AsyncStorage.getItem('student');
            if (student != null)
            {
                
                HomeActivity.typeOfStudent = student;
                
            }
            else{
                
                HomeActivity.typeOfStudent = '115 Greenough';
                
                
            }
        }
        catch(error){
            console.info(error);
        }


        try{
            var week = await AsyncStorage.getItem('week');
            if (week != null)
            {
                
                HomeActivity.currentWeek = week;
                
            
            }
            else{
                
                HomeActivity.currentWeek = 'red';
                
            }
            
        }
        catch(error){
            console.info(error);
        }
        this.setState({ready: true});
    }
}







  

  class MapScreen extends React.Component {
    render() {

    var deviceWidth = Dimensions.get("window").width;

      return(
        <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
        <Image source={require('./assets/img9.jpg')} style={{ width: deviceWidth, height: 848.0/1027 * deviceWidth }}/>
        <Image source={require('./assets/img15.jpg')} style={{ width: deviceWidth, height: 848.0/1015 * deviceWidth }}/>
        <Image source={require('./assets/img77.jpg')} style={{ width: deviceWidth, height: 848.0/1015 * deviceWidth }}/>
        <Image source={require('./assets/img137.jpg')} style={{ width: deviceWidth, height: 848.0/1029 * deviceWidth }}/>
        </View>
      </ScrollView>
      );
    }
  }




class FullScheduleScreen extends React.Component {

    state = {
        location: HomeActivity.typeOfStudent,
        week: HomeActivity.currentWeek,
        day: HomeActivity.dayName
      }

      

    render() {

        
        
        if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(this.state.location, "115 Greenough")) {
           FullScheduleScreen.location = "115 Greenough";
        }
        else {
            if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(this.state.location, "Begin @ 115")) {
               FullScheduleScreen.location = "Begin @ 115";
            }
            else
            {
                FullScheduleScreen.location = "Begin @ OLS";
            }
        }


        
        if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(this.state.week, "Red Week")) {
           FullScheduleScreen.week = "Red Week";
        }
        else {
            if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(this.state.week, "Blue Week")) {
               FullScheduleScreen.week = "Blue Week";
        }
    }



        if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(this.state.day, "Monday")) {
           FullScheduleScreen.day = "Monday";
        }
        else {
            if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(this.state.day, "Tuesday")) {
               FullScheduleScreen.day = "Tuesday";
            }
            else
            {
                
                if ((function (o1, o2) { if (o1 && o1.equals) {
                    return o1.equals(o2);
                }
                else {
                    return o1 === o2;
                } })(this.state.day, "Wednesday")) {
                FullScheduleScreen.day = "Wednesday";
                }
                else {
                    if ((function (o1, o2) { if (o1 && o1.equals) {
                        return o1.equals(o2);
                    }
                    else {
                        return o1 === o2;
                    } })(this.state.day, "Thursday")) {
                    FullScheduleScreen.day = "Thursday";
                    }
                    else
                    {
                        FullScheduleScreen.day = "Friday";
                    }
            }
                }
        }

      return(
<View style={{flex: 1}}>
           
<Picker
    selectedValue={this.state.location}
  style={{ height: 50, width: 175, top: 0, left: 0}}
  onValueChange={location => this.setState({ location })}>
  <Picker.Item label="115 Greenough" value="115 Greenough" />
  <Picker.Item label="Begin @ 115" value="Begin @ 115" />
  <Picker.Item label="Begin @ OLS" value="Begin @ OLS" />
</Picker>


<Picker
    selectedValue={this.state.week}
  style={{ height: 50, width: 175, top: 100, left: 0 }}
  onValueChange={week => this.setState({ week })}>
  <Picker.Item label="Red Week" value="Red Week" />
  <Picker.Item label="Blue Week" value="Blue Week" />
</Picker>


<Picker
    selectedValue={this.state.day}
  style={{height: 50, width: 175, top:200, left: 0 }}
  onValueChange={day => this.setState({ day })}>
  <Picker.Item label="Monday" value="Monday" />
  <Picker.Item label="Tuesday" value="Tuesday" />
  <Picker.Item label="Wednesday" value="Wednesday" />
  <Picker.Item label="Thursday" value="Thursday" />
  <Picker.Item label="Friday" value="Friday" />
</Picker>


<View style = {{position: 'absolute', top:30, right: 30}}>
<ScheduleReload text = ""/>
</View>

        </View>

      );
    }
  }



  class ScheduleReload extends React.Component {
    componentDidMount() {
      // Toggle the state every second
      setInterval(() => this.setState({ isShowingText: true}), 100);
    }
  
    //state object
    state = { isShowingText: true };
  
    render() {

            var location = FullScheduleScreen.location;
            var week = FullScheduleScreen.week;
            var day = FullScheduleScreen.day;
            var dayNames = ([]);
            /* add */ (dayNames.push("Monday") > 0);
            /* add */ (dayNames.push("Tuesday") > 0);
            /* add */ (dayNames.push("Wednesday") > 0);
            /* add */ (dayNames.push("Thursday") > 0);
            /* add */ (dayNames.push("Friday") > 0);
            var schedule = "";
            var dayNum = dayNames.indexOf(day);
            if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(location, "115 Greenough")) {
                if ((function (o1, o2) { if (o1 && o1.equals) {
                    return o1.equals(o2);
                }
                else {
                    return o1 === o2;
                } })(week, "Red Week")) {
                    schedule = ScheduleDisplayActivity.scheduleRed(location, week, dayNum);
                }
                else if ((function (o1, o2) { if (o1 && o1.equals) {
                    return o1.equals(o2);
                }
                else {
                    return o1 === o2;
                } })(week, "Blue Week")) {
                    schedule = ScheduleDisplayActivity.scheduleBlue(location, week, dayNum);
                }
            }
            else if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(location, "Begin @ 115")) {
                if ((function (o1, o2) { if (o1 && o1.equals) {
                    return o1.equals(o2);
                }
                else {
                    return o1 === o2;
                } })(week, "Red Week")) {
                    schedule = ScheduleDisplayActivity.schedule115Red(location, week, dayNum);
                }
                else if ((function (o1, o2) { if (o1 && o1.equals) {
                    return o1.equals(o2);
                }
                else {
                    return o1 === o2;
                } })(week, "Blue Week")) {
                    schedule = ScheduleDisplayActivity.schedule115Blue(location, week, dayNum);
                }
            }
            else if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(location, "Begin @ OLS")) {
                if ((function (o1, o2) { if (o1 && o1.equals) {
                    return o1.equals(o2);
                }
                else {
                    return o1 === o2;
                } })(week, "Red Week")) {
                    schedule = ScheduleDisplayActivity.scheduleOLSRed(location, week, dayNum);
                }
                else if ((function (o1, o2) { if (o1 && o1.equals) {
                    return o1.equals(o2);
                }
                else {
                    return o1 === o2;
                } })(week, "Blue Week")) {
                    schedule = ScheduleDisplayActivity.scheduleOLSBlue(location, week, dayNum);
                }
            }
        



      return(

    <View style = {{top: 30}}> 
    <Text style = {{fontSize:15}}>{schedule} </Text>
            </View>);
    }
  }





/* Generated from Java with JSweet 2.2.0-SNAPSHOT - http://www.jsweet.org */
var ScheduleDisplayActivity = (function () {
    function ScheduleDisplayActivity() {
    }
   
    ScheduleDisplayActivity.scheduleRed = function (location, week, day) {
        var timeStart = [[730, 820, 925, 1030, 1105, 1240, 1345], [730, 820, 930, 1040, 1220, 1330], [730, 820, 920, 1020, 1120, 1250, 1350], [730, 820, 930, 1040, 1115, 1200, 1340], [730, 830, 940, 1045, 1155, 1335]];
        var timeEnd = [[815, 920, 1025, 1100, 1235, 1340, 1450], [815, 925, 1035, 1215, 1325, 1435], [815, 915, 1015, 1115, 1245, 1345, 1445], [815, 925, 1035, 1115, 1155, 1335, 1445], [825, 935, 1040, 1150, 1330, 1440]];
        var blocks = [["Z", "A", "B", "T", "D", "E", "G"], ["Z", "C", "E", "D", "F", "G"], ["Z", "A", "B", "C", "E", "D", "G"], ["Z", "B", "A", "T", "X", "G", "F"], ["Z", "B", "C", "E", "D", "F"]];
        var lunchBlocks = ["D", "D", "E", "G", "D"];
        return this.schedule(timeStart, timeEnd, blocks, lunchBlocks,location, week, day);
    };
    ScheduleDisplayActivity.scheduleBlue = function (location, week, day) {
        var timeStart = [[730, 820, 930, 1005, 1110, 1250, 1350], [730, 820, 930, 1040, 1220, 1330], [730, 820, 925, 1030, 1105, 1240, 1345], [810, 940, 1050, 1200, 1345], [730, 830, 940, 1050, 1200, 1340]];
        var timeEnd = [[815, 925, 1000, 1105, 1245, 1345, 1450], [815, 925, 1035, 1215, 1325, 1430], [815, 920, 1025, 1100, 1235, 1340, 1445], [930, 1045, 1155, 1340, 1450], [825, 935, 1045, 1155, 1335, 1440]];
        var blocks = [["Z", "A", "T", "C", "E", "F", "G"], ["Z", "A", "B", "C", "D", "F"], ["Z", "A", "B", "X", "E", "F", "G"], ["Faculty\nCollaboration", "C", "D", "F", "G"], ["Z", "A", "B", "C", "D", "E"]];
        var lunchBlocks = ["E", "C", "E", "F", "D"];
        return this.schedule(timeStart, timeEnd, blocks, lunchBlocks,location, week, day);
    };
    ScheduleDisplayActivity.schedule115Red = function (location, week, day) {
        var timeStart = [[730, 820, 925, 1045, 1119, 1257, 1400], [820, 924, 958, 1102, 1240, 1345], [730, 820, 920, 1035, 1135, 1305, 1405], [730, 820, 930, 1040, 1115, 1230, 1340], [730, 830, 955, 1100, 1210, 1355]];
        var timeEnd = [[815, 920, 1025, 1115, 1253, 1357, 1500], [920, 954, 1058, 1236, 1340, 1450], [815, 915, 1015, 1130, 1300, 1400, 1500], [815, 925, 1035, 1110, 1155, 1335, 1445], [825, 935, 1055, 1205, 1350, 1500]];
        var blocks = [["Z", "A", "B", "T", "D", "E", "G"], ["C", "T/H", "E", "D", "F", "G"], ["Z", "A", "B", "C", "E", "D", "G"], ["Z", "B", "A", "Lunch", "X", "G", "F"], ["Z", "B", "C", "E", "D", "F"]];
        var lunchBlocks = ["D", "D", "E", "Lunch@115", "D"];
        return this.schedule(timeStart, timeEnd, blocks, lunchBlocks,location, week, day);
    };
    ScheduleDisplayActivity.schedule115Blue = function (location, week, day) {
        var timeStart = [[730, 820, 945, 1048, 1122, 1300, 1400], [730, 820, 930, 1055, 1205, 1345], [730, 820, 925, 1045, 1119, 1257, 1356], [810, 935, 1050, 1200, 1350], [730, 830, 940, 1105, 1215, 1355]];
        var timeEnd = [[815, 925, 1045, 1118, 1257, 1355, 1500], [815, 925, 1035, 1200, 1340, 1450], [815, 920, 1025, 1115, 1253, 1352, 1500], [930, 1045, 1155, 1345, 1455], [825, 935, 1045, 1210, 1350, 1500]];
        var blocks = [["Z", "A", "C", "T", "E", "F", "G"], ["Z", "A", "B", "C", "D", "F"], ["Z", "A", "B", "T/H", "E", "F", "G"], ["Faculty\nCollaboration", "C", "D", "F", "G"], ["Z", "A", "B", "C", "D", "E"]];
        var lunchBlocks = ["E", "D", "E", "F", "D"];
        return this.schedule(timeStart, timeEnd, blocks, lunchBlocks,location, week, day);
    };
    ScheduleDisplayActivity.scheduleOLSRed = function (location, week, day) {
        var timeStart = [[800, 904, 1008, 1047, 1225, 1345], [800, 915, 1025, 1220, 1330], [800, 859, 1003, 1137, 1236, 1350], [825, 940, 1115, 1200, 1340], [800, 859, 1003, 1037, 1215, 1335]];
        var timeEnd = [[900, 1004, 1043, 1221, 1325, 1450], [910, 1020, 1200, 1325, 1435], [855, 959, 1133, 1232, 1331, 1445], [935, 1050, 1155, 1335, 1445], [855, 959, 1033, 1211, 1315, 1440]];
        var blocks = [["A", "B", "T", "D", "E", "G"], ["C", "E", "D", "F", "G"], ["A", "B", "C", "E", "D", "G"], ["B", "A", "X", "G", "F"], ["B", "C", "T/H", "E", "D", "F"]];
        var lunchBlocks = ["D", "D", "C", "G", "E"];
        return this.schedule(timeStart, timeEnd, blocks, lunchBlocks,location, week, day);
    };
    ScheduleDisplayActivity.scheduleOLSBlue = function (location, week, day) {
        var timeStart = [[800, 904, 938, 1047, 1250, 1350], [800, 910, 1020, 1205, 1330], [800, 905, 1010, 1045, 1240, 1345], [810, 935, 1040, 1200, 1345], [815, 925, 1035, 1215, 1330]];
        var timeEnd = [[900, 934, 1043, 1225, 1345, 1450], [905, 1015, 1200, 1310, 1430], [900, 1005, 1040, 1220, 1340, 1445], [930, 1035, 1140, 1340, 1450], [920, 1030, 1210, 1325, 1440]];
        var blocks = [["A", "T", "C", "E", "F", "G"], ["B", "A", "C", "D", "F"], ["A", "B", "T/H", "E", "F", "G"], ["Faculty\nCollaboration", "C", "D", "F", "G"], ["A", "B", "C", "D", "E"]];
        var lunchBlocks = ["E", "C", "E", "F", "C"];
        return this.schedule(timeStart, timeEnd, blocks, lunchBlocks, location, week, day);
    };
    ScheduleDisplayActivity.schedule = function (timeStart, timeEnd, block, lunch, location, week, day) {
        var schedule = "";
        for (var i = 0; i < block[day].length; i++) {
            {
                schedule += block[day][i];
                schedule += "\n";
                schedule += this.formatTime(timeStart[day][i]);
                schedule += " - ";
                schedule += this.formatTime(timeEnd[day][i]);
                schedule += "\n";
                if ((function (o1, o2) { if (o1 && o1.equals) {
                    return o1.equals(o2);
                }
                else {
                    return o1 === o2;
                } })(block[day][i], lunch[day])) {
                    schedule += ScheduleDisplayActivity.handleLunch(location, week, day);
                }
                schedule += "\n";

            }
            ;
        }
        return schedule;
    };
    

    
    ScheduleDisplayActivity.handleLunch = function (location, week, day) {
        var schedule = "";
        var red = [["11:05 - 11:35", "10:40 - 11:10", "11:15 - 11:45", "12:30 - 1:00", "12:30 - 1:00"], ["12:05 - 12:35", "11:45 - 12:15", "12:15 - 12:45", "11:55 - 12:25", "11:55 - 12:25"]];
                var blue = [["11:10 - 11:40", "10:35 - 11:05", "11:00 - 11:30", "12:30 - 1:00", "12:30- 1:00"], ["12:15 - 12:45", "11:45 - 12:15", "12:05 - 12:45", "12:00 - 12:30", "11:55 - 12:25"]];
                var red115 = [["11:50 - 12:20", "11:36 - 12:06", "12:05 - 12:35", "10:40 - 11:10", "12:40- 1:10"], ["12:23 - 12:53", "12:06 - 12:36", "11:35 - 12:05", "10:40 - 11:10", "12:10 - 12:40"]];
                var blue115 = [["11:52 - 12:22", "12:35 - 1:05", "11:49 - 12:19", "12:30 - 1:00", "12:45- 1:15"], ["12:27 - 12:57", "12:05 - 12:35", "12:24 - 12:54", "12:00 - 12:30", "12:15 - 12:45"]];
                var redOLS = [["11:17 - 11:47", "10:55 - 11:25", "10:33 - 11:03", "12:30 - 1:00", "11:07- 11:37"], ["10:47 - 11:17", "10:25 - 10:55", "11:03 - 11:33", "11:55 - 12:25", "11:42 - 12:12"]];
                var blueOLS = [["11:17 - 11:47", "10:50 - 11:20", "11:15 - 11:45", "12:30 - 1:00", "11:05- 11:35"], ["10:47 - 11:17", "11:30 - 12:00", "10:45 - 11:15", "11:55 - 12:25", "11:40 - 12:10"]];
        if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(location, "115 Greenough")) {
            if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(week, "Red Week")) {
                schedule += "   Lunch A:\n  " + red[0][day];
                schedule += "\n\n";
                schedule += "   Lunch B:\n  " + red[1][day];
            }
            else if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(week, "Blue Week")) {
                schedule += "   Lunch A:\n  " + blue[0][day];
                schedule += "\n\n";
                schedule += "   Lunch B:\n  " + blue[1][day];
            }
        }
        else if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(location, "Begin @ 115")) {
            if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(week, "Red Week")) {
                schedule += "   Lunch A:\n  " + red115[0][day];
                schedule += "\n\n";
                schedule += "   Lunch B:\n  " + red115[1][day];
            }
            else if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(week, "Blue Week")) {
                schedule += "   Lunch A:\n  " + blue115[0][day];
                schedule += "\n\n";
                schedule += "   Lunch B:\n  " + blue115[1][day];
            }
        }
        else if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(location, "Begin @ OLS")) {
            if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(week, "Red Week")) {
                schedule += "   Lunch A:\n  " + redOLS[0][day];
                schedule += "\n\n";
                schedule += "   Lunch B:\n  " + redOLS[1][day];
            }
            else if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(week, "Blue Week")) {
                schedule += "   Lunch A:\n  " + blueOLS[0][day];
                schedule += "\n\n";
                schedule += "   Lunch B:\n  " + blueOLS[1][day];
            }
        }
        schedule += "\n";
        return schedule;
    };




    ScheduleDisplayActivity.formatTime = function (time) {
        var formatted = "";
        if (time >= 1300) {
            formatted = ('' + (time - 1200));
        }
        else {
            formatted = ('' + (time));
        }
        return formatted.substring(0, formatted.length - 2) + ":" + formatted.substring(formatted.length - 2);
    };
    return ScheduleDisplayActivity;
}());
ScheduleDisplayActivity["__class"] = "ScheduleDisplayActivity";





  class HomeScreen extends React.Component{ 

    state = {
        location: HomeActivity.typeOfStudent  
      }


 render(){
     

    if ((function (o1, o2) { if (o1 && o1.equals) {
        return o1.equals(o2);
    }
    else {
        return o1 === o2;
    } })(this.state.location, "115 Greenough")) {
       HomeActivity.typeOfStudent = "115 Greenough";
    }
    else {
        if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(this.state.location, "Begin @ 115")) {
           HomeActivity.typeOfStudent = "Begin @ 115";
        }
        else
        {
            HomeActivity.typeOfStudent = "Begin @ OLS";
        }
    }
    HomeActivity.saveData();
    
     
 return( 

 <View style={{ alignItems: 'center'}}>
    
    
 <View style={{top:0}}>
 <Picker
    selectedValue={this.state.location}
  style={{ height: 50, width: 175, top: 10 }}
  onValueChange={location => this.setState({ location })}>
  <Picker.Item label="115 Greenough" value="115 Greenough" />
  <Picker.Item label="Begin @ 115" value="Begin @ 115" />
  <Picker.Item label="Begin @ OLS" value="Begin @ OLS" />
  
</Picker>
     </View>

<View style={{top:150}}>

        <TouchableOpacity
          style={{backgroundColor: "#FFFFFF"}}
          onPress={HomeActivity.ButtonChange} 
        >
          <Text style={{fontSize:20, color:"purple"}}>CHANGE WEEK</Text>
        </TouchableOpacity>



</View>

<View style={{top:175}}>
     <AppReload text= "" />
     </View> 


         
 </View>);
 }
}




  const bottomTabNavigator = createBottomTabNavigator(
    {
        FullSchedule: {
            screen: FullScheduleScreen,
            navigationOptions: {
              tabBarIcon: ({ tintColor }) => (
                <Icon name="clock-o" size={25} color={tintColor} />
              )
            }
          
          },
        Home: {
            screen: HomeScreen,
            navigationOptions: {
              tabBarIcon: ({ tintColor }) => (
                <Icon name="home" size={25} color={tintColor} />
              )
            }
          },
          Maps: {
            screen: MapScreen,
            navigationOptions: {
              tabBarIcon: ({ tintColor }) => (
                <Icon name="map" size={25} color={tintColor} />
              )
            }
          },
    },
    {
      initialRouteName: 'Home'
    }
  );
  
  const AppContainer = createAppContainer(bottomTabNavigator); 





class AppReload extends React.Component {
    componentDidMount() {
      // Toggle the state every second
      setInterval(() => this.setState({ isShowingText: true}), 100);
    }
  
    //state object
    state = { isShowingText: true };
  
    render() {
        var deviceWidth = Dimensions.get("window").width;
        var deviceHeight = Dimensions.get("window").height;
  
        var colorDate = 'red';
        var colorCurrent = 'red';
        var colorNext = 'red';

        if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(HomeActivity.currentWeek, "Red Week")) {
            colorDate = "#AA0055";
           colorCurrent = "#C42B47";
           colorNext = "#FF76E4";
           
        }
        else {
            colorDate = "#15478C";
           colorCurrent = "#4169E1";
           colorNext = "#87CEFA";
            
        }

      return(

    <View style = {{width:deviceWidth}}> 

    <View style={{backgroundColor:colorDate, height:0.18*(deviceHeight-150)}}> 
    <Text style={{ fontSize: 23, textAlign: "center", color:"white" }}>
        {HomeActivity.printDate()}
    </Text> 
    </View>

    <View style={{backgroundColor:colorCurrent, height:0.18*(deviceHeight-150)}}> 
    <Text style={{ fontSize: 23, textAlign: "center", color:"white" }}>
    {HomeActivity.reload()[0]}</Text>
    </View>

    <View style={{backgroundColor:colorNext, height:0.18*(deviceHeight-150)}}> 
      <Text style={{ fontSize: 23, textAlign: "center", color:"white" }}>
      {HomeActivity.reload()[1]}</Text>
      </View> 

      <Text style={{ fontSize: 18, textAlign: "center", color:"black" }}>
      {HomeActivity.reload()[2]}</Text>
      
      </View>);
    }
  }





/* Generated from Java with JSweet 2.2.0-SNAPSHOT - http://www.jsweet.org */
var HomeActivity = (function () {
    function HomeActivity() {
    }
    
    HomeActivity.reload = function () {

        var currentNext = [null, null, null];
        
        if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(HomeActivity.currentWeek, "Red Week")) {
            if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(HomeActivity.typeOfStudent, "115 Greenough")) {
                currentNext = HomeActivity.scheduleRed();
            }
            else if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(HomeActivity.typeOfStudent, "Begin @ 115")) {
                currentNext = HomeActivity.schedule115Red();
            }
            else if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(HomeActivity.typeOfStudent, "Begin @ OLS")) {
                currentNext = HomeActivity.scheduleOLSRed();
            }
        }
        else {
            if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(HomeActivity.typeOfStudent, "115 Greenough")) {
                currentNext = HomeActivity.scheduleBlue();
            }
            else if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(HomeActivity.typeOfStudent, "Begin @ 115")) {
                currentNext = HomeActivity.schedule115Blue();
            }
            else if ((function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(HomeActivity.typeOfStudent, "Begin @ OLS")) {
                currentNext = HomeActivity.scheduleOLSBlue();
            }
        }
        return (currentNext);
         
    };


    HomeActivity.ButtonChange = function () {

       if ((function (o1, o2) { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(HomeActivity.currentWeek, "Red Week")) {
           HomeActivity.currentWeek = "Blue Week";
        }
        else {
            HomeActivity.currentWeek = "Red Week"
        }
        HomeActivity.saveData();
    };

    
    
         
    

    HomeActivity.printDate = function() {
      // TimeZone.setDefault(TimeZone.getTimeZone("America/New_York"));
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
  "Saturday"];
  var date = new Date();
  var hour = date.getHours();
  var min = date.getMinutes();
  var minString = "";
  var sec = date.getSeconds();
  var secString = "";
  var am_pm = "AM";

  if (hour >= 12)
  {
      am_pm = "PM"
  }

  if (hour > 12)
  {
      hour -= 12;
  }
  
 
  
  if (min < 10)
  {
    minString = "0" + min;
  }
  else{
      minString = min;
  }

  if (sec < 10)
  {
    secString = "0" + sec;
  }
  else{
      secString = sec;
  }

      return dayNames[date.getDay()] + " " + monthNames[date.getMonth()] +" "+ date.getDate() + ", " + date.getFullYear() + "\n" + hour + ":" + minString + ":" + secString + " " + am_pm;

  }


    HomeActivity.scheduleRed = function () {
        var times = [[730, 820, 925, 1030, 1105, 1240, 1345, 1455],
        [730, 820, 930, 1040, 1220, 1330, 1440],
        [730, 820, 920, 1020, 1120, 1250, 1350, 1450],
        [730, 820, 930, 1040, 1115, 1200, 1340, 1450],
        [730, 830, 940, 1045, 1155, 1335, 1445]];

        var blocks = [["Z", "A", "B", "T", "D", "E", "G"],
        ["Z", "C", "E", "D", "F", "G"],
        ["Z", "A", "B", "C", "E", "D", "G"],
        ["Z", "B", "A", "T", "X", "G", "F"],
        ["Z", "B", "C", "E", "D", "F"]];

        var lunchBlocks = ["D", "D", "E", "G", "D"];

        return HomeActivity.schedule(times, blocks, lunchBlocks);
    };
    HomeActivity.scheduleBlue = function () {
        var times = [[730, 820, 930, 1005, 1110, 1250, 1350, 1455],
                [730, 820, 930, 1040, 1220, 1330, 1435],
                [730, 820, 925, 1030, 1105, 1240, 1345, 1450],
                [810, 940, 1050, 1200, 1345, 1455],
                [730, 830, 940, 1050, 1200, 1340, 1445]];

        var blocks = [["Z", "A", "T", "C", "E", "F", "G"],
                ["Z", "A", "B", "C", "D", "F"],
                ["Z", "A", "B", "X", "E", "F", "G"],
                ["Faculty Collaboration", "C", "D", "F", "G"],
                ["Z", "A", "B", "C", "D", "E"]];

        var lunchBlocks = ["E", "C", "E", "F", "D"];
        return HomeActivity.schedule(times, blocks, lunchBlocks);
    };
    HomeActivity.schedule115Red = function () {
        var timeStart = [[730, 820, 925, 1045, 1119, 1257, 1400],
                [820, 924, 958, 1102, 1240, 1345],
                [730, 820, 920, 1035, 1135, 1305, 1405],
                [730, 820, 930, 1040, 1115, 1230, 1340],
                [730, 830, 955, 1100, 1210, 1355]];

        var timeEnd = [[815, 920, 1025, 1115, 1253, 1357, 1500],
                [920, 954, 1058, 1236, 1340, 1450],
                [815, 915, 1015, 1130, 1300, 1400, 1500],
                [815, 925, 1035, 1110, 1155, 1335, 1445],
                [825, 935, 1055, 1205, 1350, 1500]];

        var blocks = [["Z", "A", "B", "T", "D", "E", "G"],
                ["C", "T/H", "E", "D", "F", "G"],
                ["Z", "A", "B", "C", "E", "D", "G"],
                ["Z", "B", "A", "Lunch", "X", "G", "F"],
                ["Z", "B", "C", "E", "D", "F"]];

        var lunchBlocks = ["D", "D", "E", "Lunch@115", "D"];
        return HomeActivity.scheduleFreshman(timeStart, timeEnd, blocks, lunchBlocks);
    };

    HomeActivity.schedule115Blue = function () {
        var timeStart = [[730, 820, 945, 1048, 1122, 1300, 1400],
                [730, 820, 930, 1055, 1205, 1345],
                [730, 820, 925, 1045, 1119, 1257, 1356],
                [810, 935, 1050, 1200, 1350],
                [730, 830, 940, 1105, 1215, 1355]];

        var timeEnd = [[815, 925, 1045, 1118, 1257, 1355, 1500],
                [815, 925, 1035, 1200, 1340, 1450],
                [815, 920, 1025, 1115, 1253, 1352, 1500],
                [930, 1045, 1155, 1345, 1455],
                [825, 935, 1045, 1210, 1350, 1500]];

        var blocks = [["Z", "A", "C", "T", "E", "F", "G"],
                ["Z", "A", "B", "C", "D", "F"],
                ["Z", "A", "B", "T/H", "E", "F", "G"],
                ["Faculty Collaboration", "C", "D", "F", "G"],
                ["Z", "A", "B", "C", "D", "E"]];

        var lunchBlocks = ["E", "D", "E", "F", "D"];
        return HomeActivity.scheduleFreshman(timeStart, timeEnd, blocks, lunchBlocks);
    };

    HomeActivity.scheduleOLSRed = function () {
        var timeStart = [[800, 904, 1008, 1047, 1225, 1345],
                [800, 915, 1025, 1220, 1330],
                [800, 859, 1003, 1137, 1236, 1350],
                [825, 940, 1115, 1200, 1340],
                [800, 859, 1003, 1037, 1215, 1335]];

        var timeEnd = [[900, 1004, 1043, 1221, 1325, 1450],
                [910, 1020, 1200, 1325, 1435],
                [855, 959, 1133, 1232, 1331, 1445],
                [935, 1050, 1155, 1335, 1445],
                [855, 959, 1033, 1211, 1315, 1440]];

        var blocks = [["A", "B", "T", "D", "E", "G"],
                ["C", "E", "D", "F", "G"],
                ["A", "B", "C", "E", "D", "G"],
                ["B", "A","X", "G", "F"],
                ["B", "C","T/H", "E", "D", "F"]];

        var lunchBlocks = ["D", "D", "C", "G", "E"];
        return HomeActivity.scheduleFreshman(timeStart, timeEnd, blocks, lunchBlocks);
    };


    HomeActivity.scheduleOLSBlue = function () {
        var timeStart = [[800, 904, 938, 1047, 1250, 1350],
                [800, 910, 1020, 1205, 1330],
                [800, 905, 1010, 1045, 1240, 1345],
                [810, 935, 1040, 1200, 1345],
                [815, 925, 1035, 1215, 1330]];

        var timeEnd = [[900, 934, 1043, 1225, 1345, 1450],
                [905, 1015, 1200, 1310, 1430],
                [900, 1005, 1040, 1220, 1340, 1445],
                [930, 1035, 1140, 1340, 1450],
                [920, 1030, 1210, 1325, 1440]];


        var blocks = [["A", "T", "C", "E", "F", "G"],
                ["B", "A", "C", "D", "F"],
                ["A","B", "T/H", "E", "F", "G"],
                ["Faculty Collaboration", "C", "D", "F", "G"],
                ["A", "B", "C", "D", "E"]];

        var lunchBlocks = ["E", "C", "E", "F", "C"];

        return HomeActivity.scheduleFreshman(timeStart, timeEnd, blocks, lunchBlocks);
    };


    HomeActivity.schedule = function (timeArray, blockArray, lunchArray) {
        var date = new Date()
        var dayOfWeek = date.getDay() + 1;
        var second = date.getSeconds();
        var min  = "";
        if (date.getMinutes() < 10)
        {
            min = 0 + String(date.getMinutes())
        }
        else{
            min = String(date.getMinutes())
        }
        var time = parseInt(String(date.getHours()) + min);
        // dayOfWeek = 5;
        // time = 845;

        // console.info(time);
        var c = "";
        var n = "";
        var schedule = "";
        if (dayOfWeek >= 2 && dayOfWeek <= 6) {
            schedule = "Today\'s Schedule: ";
            if (dayOfWeek === 5 && (function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(HomeActivity.currentWeek, "Blue Week")) {
                schedule += "C D F G";
            }
            else {
                {
                    var array5278 = blockArray[dayOfWeek - 2];
                    for (var index5277 = 0; index5277 < array5278.length; index5277++) {
                        var block = array5278[index5277];
                        {
                            schedule += block;
                            schedule += " ";
                        }
                    }
                }
            }
            var i = 0;
            var printed = false;
            while ((i < timeArray[dayOfWeek - 2].length - 1 && !printed)) {
                {
                    var currentBlock = blockArray[dayOfWeek - 2][i];
                    var timeUntilBlockStarts = HomeActivity.minFormat(HomeActivity.timeDifference(timeArray[dayOfWeek - 2][i + 1], time, second, 2));
                    var timeUntilBlockEnds = HomeActivity.minFormat(HomeActivity.timeDifference(HomeActivity.minus5(timeArray[dayOfWeek - 2][i + 1]), time, second, 2));
                    if (time >= timeArray[dayOfWeek - 2][i] && time < HomeActivity.minus5(timeArray[dayOfWeek - 2][i + 1])) {
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(currentBlock, "Faculty Collaboration")) {
                            c = ("It is now " + currentBlock + ".\nEnds in " + HomeActivity.minFormat(HomeActivity.timeDifference(HomeActivity.minus5(HomeActivity.minus5(timeArray[dayOfWeek - 2][i + 1])), time, second, 2)) + " at 9:30.");
                        }
                        else {
                            c = ("It is now " + currentBlock + " Block.\nEnds in " + timeUntilBlockEnds + " at " + HomeActivity.formatTime(HomeActivity.minus5(timeArray[dayOfWeek - 2][i + 1])) + ".");
                        }
                        printed = true;
                        if (i < blockArray[dayOfWeek - 2].length - 1) {
                            var nextBlock = blockArray[dayOfWeek - 2][i + 1];
                            n = ("Next is " + nextBlock + " Block.\nStarts in " + timeUntilBlockStarts + " at " + HomeActivity.formatTime(timeArray[dayOfWeek - 2][i + 1]) + ".");
                        }
                        else {
                            n = ("School ends in " + timeUntilBlockEnds + ".");
                        }
                    }
                    else if (time >= HomeActivity.minus5(timeArray[dayOfWeek - 2][i + 1]) && time < timeArray[dayOfWeek - 2][i + 1]) {
                        if (i === blockArray[dayOfWeek - 2].length - 1) {
                            printed = false;
                        }
                        else {
                            c = ("Travel Time: " + blockArray[dayOfWeek - 2][i + 1] + " Block\nStarts in " + timeUntilBlockStarts + " at " + HomeActivity.formatTime(timeArray[dayOfWeek - 2][i + 1]) + ".");
                            n = "";
                            printed = true;
                        }
                    }
                    i++;
                }
            }
            ;
            if (!printed) {
                if (time >= 1300) {
                    c = ("No School.\nSchool ended " + HomeActivity.minFormat(HomeActivity.timeDifference(time, HomeActivity.minus5(timeArray[dayOfWeek - 2][timeArray[dayOfWeek - 2].length - 1]), second, 1)) + " ago.");
                    if (dayOfWeek < 6) {
                        var schoolRestart = HomeActivity.minFormat(HomeActivity.timeDifference(timeArray[dayOfWeek - 1][1], time, second, 2));
                        n = ("School starts in " + schoolRestart + ".");
                    }
                    else {
                        n = "";
                    }
                }
                else {
                    if (dayOfWeek > 2) {
                        c = ("No School.\nSchool ended " + HomeActivity.minFormat(HomeActivity.timeDifference(time, HomeActivity.minus5(timeArray[dayOfWeek - 3][timeArray[dayOfWeek - 3].length - 1]), second, 1)) + " ago.");
                        var schoolRestart = HomeActivity.minFormat(HomeActivity.timeDifference(timeArray[dayOfWeek - 2][1], time, second, 2));
                        n = "School starts in " + schoolRestart + ".";
                    }
                    else {
                        var schoolRestart = HomeActivity.minFormat(HomeActivity.timeDifference(timeArray[dayOfWeek - 2][1], time, second, 2));
                        c = "School starts in " + schoolRestart + ".";
                        n = "";
                    }
                }
            }
        }
        else {
            c = ("No School.\n It is the weekend.");
            n = "";
        }
        var yuen_ler = [c, n, schedule];
        return yuen_ler;
    };

    HomeActivity.scheduleFreshman = function (timeStartArray, timeEndArray, blockArray, lunchArray) {
        var date = new Date()
        var dayOfWeek = date.getDay() + 1;
        var second = date.getSeconds();
        var min  = "";
        if (date.getMinutes() < 10)
        {
            min = 0 + String(date.getMinutes())
        }
        else{
            min = String(date.getMinutes())
        }
        var time = parseInt(String(date.getHours()) + min);
        // dayOfWeek = 5;
        // time = 1001;
        var c = "";
        var n = "";
        var schedule = "";
        if (dayOfWeek >= 2 && dayOfWeek <= 6) {
            schedule = "Today\'s Schedule: ";
            if (dayOfWeek === 5 && (function (o1, o2) { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(HomeActivity.currentWeek, "Blue Week")) {
                schedule += "C D F G";
            }
            else {
                {
                    var array5280 = blockArray[dayOfWeek - 2];
                    for (var index5279 = 0; index5279 < array5280.length; index5279++) {
                        var block = array5280[index5279];
                        {
                            schedule += block;
                            schedule += " ";
                        }
                    }
                }
            }
            var i = 0;
            var printed = false;
            while ((i < timeStartArray[dayOfWeek - 2].length && !printed)) {
                {
                    var currentBlock = blockArray[dayOfWeek - 2][i];
                    var timeUntilBlockStarts = "";
                    if (i < blockArray[dayOfWeek - 2].length - 1) {
                        timeUntilBlockStarts = HomeActivity.minFormat(HomeActivity.timeDifference(timeStartArray[dayOfWeek - 2][i + 1], time, second, 2));
                    }
                    var timeUntilBlockEnds = HomeActivity.minFormat(HomeActivity.timeDifference(timeEndArray[dayOfWeek - 2][i], time, second, 2));
                    if (time >= timeStartArray[dayOfWeek - 2][i] && time < timeEndArray[dayOfWeek - 2][i]) {
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(currentBlock, "Faculty Collaboration")) {
                            c = ("It is now " + currentBlock + ".\nEnds in " + timeUntilBlockEnds + " at 9:30.");
                        }
                        else {
                            c = ("It is now " + currentBlock + " Block.\nEnds in " + timeUntilBlockEnds + " at " + HomeActivity.formatTime(timeEndArray[dayOfWeek - 2][i]) + ".");
                        }
                        printed = true;
                        if (i < blockArray[dayOfWeek - 2].length - 1) {
                            var nextBlock = blockArray[dayOfWeek - 2][i + 1];
                            n = ("Next is " + nextBlock + " Block.\nStarts in " + timeUntilBlockStarts + " at " + HomeActivity.formatTime(timeStartArray[dayOfWeek - 2][i + 1]) + ".");
                        }
                        else {
                            n = ("School ends in " + timeUntilBlockEnds + ".");
                        }
                    }
                    else {
                        if (i === blockArray[dayOfWeek - 2].length - 1) {
                            printed = false;
                        }
                        else if (time >= timeEndArray[dayOfWeek - 2][i] && time < timeStartArray[dayOfWeek - 2][i + 1]) {
                            c = ("Travel Time: " + blockArray[dayOfWeek - 2][i + 1] + " Block\nStarts in " + timeUntilBlockStarts + " at " + HomeActivity.formatTime(timeStartArray[dayOfWeek - 2][i + 1]) + ".");
                            n = "";
                            printed = true;
                        }
                    }
                    i++;
                }
            }
            ;
            if (!printed) {
                if (time >= 1300) {
                    c = ("No School.\nSchool ended " + HomeActivity.minFormat(HomeActivity.timeDifference(time, timeEndArray[dayOfWeek - 2][timeStartArray[dayOfWeek - 2].length - 1], second, 1)) + " ago.");
                    if (dayOfWeek < 6) {
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(HomeActivity.typeOfStudent, "Begin @ 115") && dayOfWeek === 2 && (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(HomeActivity.currentWeek, "Red Week")) {
                            var schoolRestart = HomeActivity.minFormat(HomeActivity.timeDifference(timeStartArray[dayOfWeek - 1][0], time, second, 2));
                            n = ("School starts in " + schoolRestart + ".");
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(HomeActivity.typeOfStudent, "Begin @ 115")) {
                            var schoolRestart = HomeActivity.minFormat(HomeActivity.timeDifference(timeStartArray[dayOfWeek - 1][1], time, second, 2));
                            n = ("School starts in " + schoolRestart + ".");
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(HomeActivity.typeOfStudent, "Begin @ OLS") && dayOfWeek === 4 && (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(HomeActivity.currentWeek, "Blue Week")) {
                            var schoolRestart = HomeActivity.minFormat(HomeActivity.timeDifference(timeStartArray[dayOfWeek - 1][1], time, second, 2));
                            n = ("School starts in " + schoolRestart + ".");
                        }
                        else {
                            var schoolRestart = HomeActivity.minFormat(HomeActivity.timeDifference(timeStartArray[dayOfWeek - 1][0], time, second, 2));
                            n = ("School starts in " + schoolRestart + ".");
                        }
                    }
                    else {
                        n = "";
                    }
                }
                else {
                    if (dayOfWeek > 2) {
                        c = ("No School.\nSchool ended " + HomeActivity.minFormat(HomeActivity.timeDifference(time, timeEndArray[dayOfWeek - 3][timeStartArray[dayOfWeek - 3].length - 1], second, 1)) + " ago.");
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(HomeActivity.typeOfStudent, "Begin @ 115") && dayOfWeek === 3 && (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(HomeActivity.currentWeek, "Red Week")) {
                            var schoolRestart = HomeActivity.minFormat(HomeActivity.timeDifference(timeStartArray[dayOfWeek - 2][0], time, second, 2));
                            n = ("School starts in " + schoolRestart + ".");
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(HomeActivity.typeOfStudent, "Begin @ 115")) {
                            var schoolRestart = HomeActivity.minFormat(HomeActivity.timeDifference(timeStartArray[dayOfWeek - 2][1], time, second, 2));
                            n = ("School starts in " + schoolRestart + ".");
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(HomeActivity.typeOfStudent, "Begin @ OLS") && dayOfWeek === 5 && (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(HomeActivity.currentWeek, "Blue Week")) {
                            var schoolRestart = HomeActivity.minFormat(HomeActivity.timeDifference(timeStartArray[dayOfWeek - 2][1], time, second, 2));
                            n = ("School starts in " + schoolRestart + ".");
                        }
                        else {
                            var schoolRestart = HomeActivity.minFormat(HomeActivity.timeDifference(timeStartArray[dayOfWeek - 2][0], time, second, 2));
                            n = ("School starts in " + schoolRestart + ".");
                        }
                    }
                    else {
                        if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(HomeActivity.typeOfStudent, "Begin @ 115") && dayOfWeek === 3 && (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(HomeActivity.currentWeek, "Red Week")) {
                            var schoolRestart = HomeActivity.minFormat(HomeActivity.timeDifference(timeStartArray[dayOfWeek - 2][0], time, second, 2));
                            c = ("School starts in " + schoolRestart + ".");
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(HomeActivity.typeOfStudent, "Begin @ 115")) {
                            var schoolRestart = HomeActivity.minFormat(HomeActivity.timeDifference(timeStartArray[dayOfWeek - 2][1], time, second, 2));
                            c = ("School starts in " + schoolRestart + ".");
                        }
                        else if ((function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(HomeActivity.typeOfStudent, "Begin @ OLS") && dayOfWeek === 5 && (function (o1, o2) { if (o1 && o1.equals) {
                            return o1.equals(o2);
                        }
                        else {
                            return o1 === o2;
                        } })(HomeActivity.currentWeek, "Blue Week")) {
                            var schoolRestart = HomeActivity.minFormat(HomeActivity.timeDifference(timeStartArray[dayOfWeek - 2][1], time, second, 2));
                            c = ("School starts in " + schoolRestart + ".");
                        }
                        else {
                            var schoolRestart = HomeActivity.minFormat(HomeActivity.timeDifference(timeStartArray[dayOfWeek - 2][0], time, second, 2));
                            c = ("School starts in " + schoolRestart + ".");
                        }
                        n = "";
                    }
                }
            }
        }
        else {
            c = ("No School.\n It is the weekend.");
            n = "";
        }
        var may = [c, n, schedule];
        return may;
    };
    HomeActivity.formatTime = function (time) {
        var formatted = "";
        if (time >= 1300) {
            formatted = ('' + (time - 1200));
        }
        else {
            formatted = ('' + (time));
        }
        return formatted.substring(0, formatted.length - 2) + ":" + formatted.substring(formatted.length - 2);
    };
    HomeActivity.timeDifference = function (time1, time2, currentSecond, whichOneIsNow) {
        if (time1 >= time2) {
            var timeDiff = 0;
            var progressTime = time2;
            while (((time1 - progressTime) > 100)) {
                {
                    timeDiff += 60;
                    progressTime += 100;
                }
            }
            ;
            if ((time1 / 100 | 0) !== (progressTime / 100 | 0)) {
                timeDiff += (time1 - progressTime - 40);
            }
            else {
                timeDiff += (time1 - progressTime);
            }
            if (whichOneIsNow === 1) {
                var arr = [timeDiff, currentSecond];
                return arr;
            }
            else {
                var arr = [timeDiff - 1, 60 - currentSecond];
                return arr;
            }
        }
        else {
            var timeDiff = 0;
            var progressTime = time1;
            while (((time2 - progressTime) > 100)) {
                {
                    timeDiff += 60;
                    progressTime += 100;
                }
            }
            ;
            if ((time2 / 100 | 0) !== (progressTime / 100 | 0)) {
                timeDiff += (time2 - progressTime - 40);
            }
            else {
                timeDiff += (time2 - progressTime);
            }
            if (whichOneIsNow === 1) {
                var arr = [(24 * 60) - timeDiff, currentSecond];
                return arr;
            }
            else {
                var arr = [(24 * 60) - timeDiff - 1, 60 - currentSecond];
                return arr;
            }
        }
    };
    HomeActivity.minFormat = function (minAndSec) {
        if (minAndSec[0] >= 60) {
            return (minAndSec[0] / 60 | 0) + " hr " + minAndSec[0] % 60 + " min";
        }
        else {
            return minAndSec[0] + " min " + minAndSec[1] + " sec";
        }
    };
    HomeActivity.minus5 = function (time) {
        if ((time % 100 - 5) < 0) {
            return (time - time % 100 - 100) + (60 + (time % 100 - 5));
        }
        else {
            return time - 5;
        }
    };

    HomeActivity.saveData = function(){
        let student = HomeActivity.typeOfStudent;
        let week = HomeActivity.currentWeek;
        if (student != null){
        AsyncStorage.setItem('student', student);

        }
        if (week == "Red Week" || week == "Blue Week"){
        AsyncStorage.setItem('week', week);
        }
        


    }
    
    
    




    HomeActivity.getDayName = function(){
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday",
      "Saturday"];

      var date = new Date();
        if (date.getDay() == 6 || date.getDay() == 0)
        {
            return "Monday";
        }
      
      return dayNames[date.getDay()];
    
    }

    

    return HomeActivity;
}());


HomeActivity.typeOfStudent;
HomeActivity.currentWeek;
HomeActivity.dayName = HomeActivity.getDayName();
HomeActivity["__class"] = "HomeActivity";



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
