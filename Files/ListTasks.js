import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'

export default function ListTasks({navigation, setloading, tasks, setReload}) {
    return (
        <View style={styles.viewBody}>
            {
               tasks && (
                    tasks.length === 0 ? (
                        <Text style={styles.notask}>No tienes tareas registradas</Text>
                    ) : (
                        <FlatList
                            data={tasks}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={(tasks) => (
                                <Task
                                    tasks= {tasks}
                                    setloading= {setloading}
                                    navigation ={navigation}
                                    setReload={setReload}
                                />
                            )}
                        />
                    )
               )
            }
        </View>
    )
}

function Task({tasks, setloading, navigation, setReload }){
    const {id, idUser, task } = tasks.item

    return(
        <View style={styles.view}>
            <TouchableOpacity 
                onPress = {() => navigation.navigate("editTask", {id, task})}
            >
                <Text style={styles.task}>
                    {task}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex: 1,
        backgroundColor: "#f2f2f2"
    },
    view:{
        margin: 10,
        borderWidth: 1,
        borderColor: "#0e5f6a"
    },
    task:{
        margin: 5,
        fontWeight: "bold"        
    },
    notask:{
        margin: 5,
        textAlign: "center",
        marginTop: 200
    }
})
