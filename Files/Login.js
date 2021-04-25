import React, {useState}  from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import { isEmpty } from 'lodash'

import { LoginWithEmailAndPassword, validateEmail } from '../utils/action'

import Loading from './Components/Loading'

export default function Login({navigation}) {

    const [showPassword, setshowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [loading, setLoading] = useState(false)
    
    const DoOnChange=(e , type) =>{
        setFormData({...formData, [type]: e.nativeEvent.text})
    }
    
    const doLogin =async() =>{
        if(!validateData()){
            return
        }

        setLoading(true)
        const result = await LoginWithEmailAndPassword(formData.email, formData.password)
        setLoading(false)
        if(!result.StatusResponse){
            setErrorEmail(result.error)
            setErrorPassword(result.error)
            return
        }
        navigation.navigate("tasks")

    }

    const validateData= () =>{
        setErrorEmail("")
        setErrorPassword("")
        let isValid= true

        if(!validateEmail(formData.email)){
            setErrorEmail("Debes ingresar un email valido.")
            isValid= false
        }

        if(isEmpty(formData.password)){
            setErrorPassword("Debes ingresar tu contraseña.")
            isValid = false
        }
        return isValid
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerform}>
                <Input
                    containerStyle={styles.input}
                    placeholder="Ingresa tu email..."
                    onChange={(e) => DoOnChange(e, "email")}
                    keyboardType="email-address"
                    errorMessage={errorEmail}
                    defaultValue= {formData.email}
                />
                <Input
                    containerStyle={styles.input}
                    placeholder="Ingresa tu contraseña..."
                    onChange={(e) => DoOnChange(e, "password")}
                    password={true}
                    secureTextEntry={!showPassword}
                    errorMessage={errorPassword}
                    defaultValue= {formData.password}
                    rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={()=> setshowPassword(!showPassword)}
                    />
                    }
                />
                <Button
                    title="Iniciar Session"
                    containerStyle={styles.btncontainer}
                    buttonStyle={styles.btn}
                    onPress={() => doLogin()}
                 />
                 <Loading  isVisible={loading} text="Iniciando Session"/>
            </View>
            
        </View>
    )
}

const defaultFormValues = ()=>{
    return { email: "", password:""}
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:40
    },
    containerform: {
        flex:1,
        alignItems: "center",
        justifyContent:"center",
        marginTop: 30
    },
    btncontainer:{
        marginTop:20,
        width: "95%",
        alignSelf: "center"
    },
    btn:{
        backgroundColor: "#0e5f6a"
    },
    icon:{
        color:"#c1c1c1"
    },
    input:{
        width: "100%"
    }
})
