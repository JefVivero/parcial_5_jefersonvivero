import { isEmpty } from 'lodash'
import React,{ useState , useRef} from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { DeleteTask, updateDocument } from '../utils/action'
import Loading from './Components/Loading'
import Toast from 'react-native-easy-toast'

export default function EditTask({navigation, route}) {
    const toasRef = useRef()
    const {id, task} = route.params
    const [newTask, setNewTask] = useState(null)
    const [errorTask, seterrorTask] = useState(null)
    const [loading, setLoading] = useState(false)

    const Edit = async() =>{
        if(isEmpty(newTask)){
            seterrorTask("Por favor ingresa la nueva tarea.")
            return
        }
        if(newTask === task){
            seterrorTask("Por favor ingresa una tarea diferente.")
            return
        }
        setLoading(true)        
        const response = await updateDocument("Tasks", id, {task:newTask})
        setLoading(false)
        if(!response.statusResponse){
            toasRef.current.show("La tarea no ha sido editada. Por favor intente mas tarde..", 3000)
            return
        }
        //Pendiente
        toasRef.current.show("La tarea ha sido editada.", 3000)
        setTimeout(() => {
            navigation.navigate("tasks")
        }, 3000)
    }

    const Delete = () =>{
        Alert.alert(
            "Eliminar Tarea",
            "¿Estas seguro de eliminar la tarea?",
            [
                {
                    text:"No",
                    style:"cancel"
                },
                {
                    text:"Si",
                    onPress: remover
                }
            ],
            {
                cancelable:false
            }
        )
    }

    const remover = async() =>{
        setLoading(true)   
        const response = await DeleteTask(id)
        setLoading(false)   

        if(!response.statusResponse){
            toasRef.current.show("La tarea no se pudo eliminar. Por favor intente mas tarde.", 3000)
            return
        }
        
        toasRef.current.show("La tarea ha sido eliminada.", 3000)
        setTimeout(() => {
            navigation.navigate("tasks")
        }, 3000)
        
    }

    return (
        <View style={styles.viewBody}>
            <Input
                containerStyle={styles.input}
                placeholder= "Edita la tarea."
                onChange={(e) => setNewTask(e.nativeEvent.text)}
                errorMessage={errorTask}
                defaultValue= {task}
            />
            <Button
                title="Editar Tarea"
                containerStyle={styles.btncontainer}
                buttonStyle={styles.btn}
                onPress={() => Edit()}
            />
            <Button
                title="Completar Tarea"
                containerStyle={styles.btncontainer}
                buttonStyle={styles.btnDel}
                onPress={() => Delete}
            />
            <Loading  isVisible={loading} text="Por favor espere.."/>
            <Toast ref={toasRef} position="center" opacity={0.9}/>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex: 1,
        backgroundColor: "#f2f2f2"
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
    btnDel:{
        backgroundColor: "red"
    },
})
