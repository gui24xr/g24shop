import React from 'react';
import { auth,db } from '../firebase/firebaseappconfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {  collection, addDoc, setDoc, doc, getDoc,query,where,getDocs } from "firebase/firestore"
import { CartsRepositories } from '../repositories/carts.repositories';

const useSession = () => {
   

    const collectionName = 'users'
    const usersCollection = collection(db,collectionName)


    const login = async ({email,password})=>{
        //Inicia la sesion del user,si todo salio ok devuelve el id, de lo contrario, error.
        try{
            const loggedUser = await signInWithEmailAndPassword(auth,email,password)
            return loggedUser.user.uid
       }catch(error){
           throw error
       }
    }

    const checkUserNameAvailability = async ({userName}) =>{
        //Devuelve true si el nombre esta disponible, si no, devuelve false
        try{
            const filter =  query(usersCollection,where("userName","==",userName))
            const querySnapshot = await getDocs(filter)
            /* El metodo getDocs devuelve un objeto querySnapshot el cual tiene 3 caracteristicas importantes:
            
                1- un metodo forEach que recibe un callback para indicar que hacer con los elementos de la consulta (igual que el meotdo de arrays pero no es un array)
                        querySnapshot.forEach(item => console.log('Item: ', item))
                2- una propiedad size que indica la cantidad de resultados.
                                console.log('QerySnapShote propiedad size: ', querySnapshot.size)
                3- Un array de objetos docSnapShot. Si la consulta no tiene resultados es vacio el array 
                     console.log('propiedad docs', querySnapshot.docs)
        
                */
            if (querySnapshot.docs.length>0)  return false
            else return true
        }catch(error){
            throw error
        }

    }

    const registerAndLogin = async ({email,password,userName,name,lastName}) =>{
        //Crea un nuevo usuario (Siempre y cuando el userName no existe en la base de datos) y si todo salio ok le inicia la sesion
        //2Do paso crea el user en la base de datos con el uid del user creado.
        try{
            //Comprueba la disponibilidad del user name, si no esta dispoble lanza error.
            const userNameIsAvailabity = await checkUserNameAvailability({userName:userName})
            if (!userNameIsAvailabity) throw new Error("Ya existe un user con el username ingresado.")

            //Procedemos a crear el nuevo user...
            const registeredUser = await createUserWithEmailAndPassword(auth,email,password)
            //Si salio bien la registracion tomo el uid del user creado en el servicio de usuarios de firebase
            const userId = registeredUser.user.uid
            //Voy a crear y obtener un carro para este nuevo user
            const createdCart = await CartsRepositories.createCart() //onsole.log('Carro creado: ',createdCart.id)
            const {id:cartId} = createdCart
           

            /*Creo en mi coleccion users de la base de datos un documento para el usuario y al documento le pongo el mismo id que tiene el email en el servicio de usuarios */
            const userDocRef = doc(db,'users',userId)
            //hago la creacion modificaicon
            await setDoc(userDocRef,{
                    email:registeredUser.user.email,
                    userName: userName,
                    //password: password, password no, pues es problema de firebase.
                    name: name,
                    lastName: lastName,
                    profilePic: DEFAULT_PROFILE_PICTURE,
                    cartId: cartId,
                    createdAt: registeredUser.user.metadata.creationTime,
                    phoneNumber: registeredUser.user.phoneNumber,
                })

            //Ahora leo, para devolverlo...
            console.log(registeredUser)
           return registeredUser.user.uid
        }catch(error){
            throw error
        }
    }


    const getUser = async ({userId})=>{
        try{
             //Obtengo la referencia al documento.
             const userDocRef = doc(db,'users',userId)
             //Pido el documento a la base de datos.
             const userDocSnap = await getDoc(userDocRef)
             // El metodo getDoc devuelve un objeto del tipo DocumentSnapShot.
             /*Los objetos documentSnapShot tienen un metodo data() que devuelve  el registro de la base de datos en formato de objeto de JS, y si no existe el documento devuelve undefined*/
             const searchedUser = userDocSnap.data()
 
             console.log('Searched: ', searchedUser)
             if (!searchedUser) return null
 
             return new UserDTO({
                 userId:userId,
                 email:searchedUser.email,
                 name: searchedUser.name,
                 lastName: searchedUser.lastName,
                 profilePic:searchedUser.profilePic,
                 cartId:searchedUser.cartId,
                 createdAt: searchedUser.createdAt,
                 phoneNumber: searchedUser.phoneNumber
             })
        }catch(error){
            throw error
        }
    }
   

    return {
        login, getUser
    }
 
}


class UserDTO{
    constructor({ userId, email, name, lastName, profilePic, cartId, createdAt, phoneNumber }) {
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.lastName = lastName;
        this.profilePic = profilePic;
        this.cartId = cartId;
        this.createdAt = createdAt;
        this.phoneNumber = phoneNumber;
    }
    

}

export default useSession;
