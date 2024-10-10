
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import {  collection, addDoc, setDoc, doc, getDoc,query,where,getDocs } from "firebase/firestore"

import { auth,db } from '../firebase/firebaseappconfig'
import { CartsRepositories } from './carts.repositories.js'
import { DEFAULT_PROFILE_PICTURE } from './constants.js';

const collectionName = 'users'
const usersCollection = collection(db,collectionName)



export class UsersRepositories{


    static async getUser({userId}){
       //Retorna un userDTO del user. Simel user no existe devuelve null.
         try{
            //Obtengo la referencia al documento.
            const userDocRef = doc(db,'users',userId)
            //Pido el documento a la base de datos.
            const userDocSnap = await getDoc(userDocRef)
            // El metodo getDoc devuelve un objeto del tipo DocumentSnapShot.
            /*Los objetos documentSnapShot tienen un metodo data() que devuelve  el registro de la base de datos en formato de objeto de JS, y si no existe el documento devuelve undefined*/
            const searchedUser = userDocSnap.data()

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
            throw(error)
         }
       
    }

    static  login({userName,password}){
        //Iniciamos la sesion y si todo salio ok devolvemos la data del user y el idToken del user

        try{
             signInWithEmailAndPassword(auth,userName,password)

        }catch(error){
            throw error
        }
    }

    static async register({email,password,userName,name,lastName}){
        //1- Miramos que no exista en la coleccion users un usuario con el username ingresado
        //2- De que el mail no se repita, se encarga firebase
        //3- Creamos el usuario en firebase y tomamos su uid. Creamos un carro para asignarle y tomamos su id.
        //4- Creamos el user en la coleccion users con sus datos
        //5- Devolvemos el userId del user creado.

        try{
            console.log('Me llego: ', email,password,userName,name,lastName)
            /*ANTES MIRAMOS QUE NO EXISTE UN USER EN LA BASE DE DATOS CON ESTE USERNAME, */
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
            if (querySnapshot.docs.length>0) throw new Error("Ya existe un user con el username ingresado.")
           
            //Creo el usuario en el servicio de usuarios de firebase
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

}

export class UserDTO{
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