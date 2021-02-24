import * as React from 'react';
import { useContext, Component} from 'react'
import {View, StyleSheet, Text, Button} from 'react-native';
import {FilledButton} from '../components/FilledButton';
import { AuthContext } from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { Input, ListItem } from 'react-native-elements';


let arrayDictStudents = [];


function checkID (examName , score){ // ********** Check if exam score is valid (not null)
  if (score != null){
    return "\t\t" + examName + "\t\t"+ score + "\n"
  } 
  return ""
}

function countExam (eachStudentDict){
  let temp = "";
  let keys = Object.keys(eachStudentDict);
  keys.splice(0,1);   // remove the key ("name")

  console.log(keys);
  for (var i = 0; i < keys.length/2 ; i++){
    temp += checkID(eachStudentDict[keys[i*2]] , eachStudentDict[keys[i*2+1]]) // cradit Dome
  }
  
  return temp;
}

Object.size = function(obj) {   // ********** count element in dict (student : arrayDictStudents)
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}

class StudentTakeTest extends React.Component {
  constructor(props) {
    super(props);
    this.fireStoreData = firestore().collection("Users");
    this.state = {
      students : arrayDictStudents,
      userArr: []
    }
  }


  componentDidMount() {
    this.unsubscribe = this.fireStoreData.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }
  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const {Name, Score} = res.data();
      userArr.push({
        key: res.id,
        res,
        Name,
        Score
      })
    })
    this.setState({
      userArr
    })
  }

  render() {
    
    {
      this.state.userArr.map((item, i) => {
        arrayDictStudents.push({
              name: item.Name,
              score: item.Score
            }
            )

      })
    }

    return (
      <View>
        {this.state.students.map(eachStudent => (
          
          <Text>
            {eachStudent.name + "\n" /* Display each student name*/}
            {eachStudent.score + "\n" /* Display each student name*/}
            {countExam(eachStudent) /* Display each student's score*/}
          </Text>

        ))}
      </View>
    );
  }
}


const styles = StyleSheet.create({
    title: {
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      marginVertical: 10,
      marginBottom: 15,
    },
    loginButton: {
      marginVertical: 32,
    },
  
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginBottom: 100
  
    }
  });


  export default StudentTakeTest;