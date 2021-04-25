import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

import Login from './Login'
import Tasks from './Tasks'
import AddTask from './AddTask'
import EditTask from './EditTask'

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name ="login"
                    component= {Login}
                    options={{title:"Inicio Sesión"}}
                />
                <Stack.Screen
                    name ="tasks"
                    component= {Tasks}
                    options={{title:"Tareas"}}
                />
                <Stack.Screen
                    name ="addTask"
                    component= {AddTask}
                    options={{title:"Agregar Tareas"}}
                />
                <Stack.Screen
                    name ="editTask"
                    component= {EditTask}
                    options={{title:"Editar Tarea"}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
