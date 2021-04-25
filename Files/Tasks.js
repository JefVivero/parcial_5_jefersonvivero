import React, { useState, useCallback} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Icon, Input, Button } from 'react-native-elements'
import Loading from './Components/Loading'

import firebase from 'firebase'
import { getTasks } from '../utils/action'
import ListTasks from './ListTasks'

export default function Tasks({navigation}) {

    const [user, setUser] = useState(null)
    const [Datauser, setDataUser] = useState(null)
    const [loading, setloading] = useState(false)    
    const [tasks, setTasks] = useState([])
    const [reload, setReload] = useState(false)
    

    useFocusEffect(
        useCallback(() => { 
            async function getInfo(){
                firebase.auth().onAuthStateChanged((userInfo) =>{   
                    userInfo ? setDataUser(userInfo) : setDataUser(null)
                    userInfo ? setUser(true) : setUser(false)
                })
                setloading(true) 
                const response = await getTasks()
                if(response.statusResponse){
                    setTasks(response.tasks)
                }                          
                
                setloading(false)
                setReload(false)
            }
            getInfo()
        }, [reload])
    )

    const CreateTask = () =>{
        navigation.navigate("addTask", { Datauser, setloading, setReload})
    }

    return (
        <View style={styles.viewBody}>
            {
               Datauser && (
                <Text style= {styles.title}>Bienvenido: {Datauser.email}</Text>
               ) 
            }
            
            <ListTasks
                navigation={navigation}
                setloading={setloading}
                tasks={tasks}
                setReload={setReload}
            />
           { 
                user && (
                        <Icon
                            type="material-community"
                            name="plus"
                            color="#0e5f6a"
                            reverse                        
                            containerStyle={styles.btnContainer}
                            onPress = {CreateTask}
                        /> 
                ) 
            } 
            <Loading  isVisible={loading} text=" Por favor espere.."/>
        </View>
    )
}


const styles = StyleSheet.create({
    viewBody:{
        flex: 1,
        marginTop: 5,
    },
    title:{
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "#0e5f6a"
    },
    btnContainer:{
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2},
        shadowOpacity: 0.5
    }
})
