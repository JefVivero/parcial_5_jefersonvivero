import { firebaseApp } from './firebase'
import firebase from 'firebase'
import 'firebase/firestore'

const db= firebase.firestore(firebaseApp)

export const getCurrentUser = () =>{
    return firebase.auth().currentUser
}

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

export const LoginWithEmailAndPassword = async(email, password)=>{
    const result = { StatusResponse: true, error: null}

    try {
        await firebase.auth().signInWithEmailAndPassword(email,password)
        
    } catch (error) {
        result.error =  "Usuario o contraseña invalidos."
        result.StatusResponse = false
    }

    return result
}

export const getDocumentById = async(collection, id) => {
    const result = { statusResponse: true, error: null, document: null }
    try {
        const response = await db.collection(collection).doc(id).get()
        result.document = response.data()
        result.document.id = response.id
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const updateDocument = async(collection, id, data) => {
    const result = { statusResponse: true, error: null }
    try {
        await db.collection(collection).doc(id).update(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const addDocumentWithoutId = async(collection, data) => {
    const result = { statusResponse: true, error: null }
    try {
        await db.collection(collection).add(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getTasks = async() => {
    const result = { statusResponse: true, error: null, tasks: [] }
    try {
        const response = await db
        .collection("Tasks")
        .where("idUser", "==", getCurrentUser().uid)
        .get()
    
        response.forEach((doc) =>{
            const task = doc.data()
            task.id = doc.id
            result.tasks.push(task)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const DeleteTask = async(idTask) => {
    const result = { statusResponse: true, error: null }
    try {
            await db.collection("Tasks").doc(idTask).delete()  

    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}