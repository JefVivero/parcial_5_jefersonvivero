import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import Toast from 'react-native-easy-toast'

import { isEmpty } from 'lodash'
import Modal from './Components/Modal'

import { addDocumentWithoutId } from '../utils/action'

export default function AddTask({navigation, route}) {
    const toasRef = useRef()
    const { Datauser, setloading, setReload } = route.params
    const [isvisibleModal, setIsvisibleModal] = useState(true)
    const [task, setTask] = useState(null)
    const [errorTask, setErrorTask] = useState("")

    const Add= async() =>{
        if(isEmpty(task)){
            setErrorTask("Por favor ingresa la tarea.")
            return
        }
        setloading(true)
        const data= {
            idUser: Datauser.uid,
            task: task
        }
        const response = await addDocumentWithoutId("Tasks",data)
        setloading(false)
        if(!response.statusResponse){
            toasRef.current.show("No se ha podido crear la tarea. Por favor intente mas tarde.", 3000)
            return
        }
        setIsvisibleModal(false)
        setReload(true)
        toasRef.current.show("La tarea ha sido creada.", 2000)

        setTimeout(() => {
            navigation.navigate("tasks")
        }, 3000)
        
    }

    return (
        <View style={styles.viewBody}>
            <View>
                <Input
                    containerStyle={styles.input}
                    placeholder="Ingresa la tarea..."
                    onChange={(e) => setTask(e.nativeEvent.text)}
                    errorMessage={errorTask}
                />
                <Button
                    title="Crear tarea"
                    containerStyle={styles.btncontainer}
                    buttonStyle={styles.btn}
                    onPress={() => Add()}
                />
            </View>
            <Toast ref={toasRef} position="center" opacity={0.9}/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex: 1,
        marginTop: 105,
    },
    input:{
        width: "100%"
    },
    btncontainer:{
        marginTop:20,
        width: "95%",
        alignSelf: "center"
    },
    btn:{
        backgroundColor: "#0e5f6a"
    },
})
