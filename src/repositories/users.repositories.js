
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import {  collection, addDoc, setDoc, doc, getDoc,query,where,getDocs } from "firebase/firestore"

import { auth,db } from '../firebase/firebaseappconfig'
import { CartsRepositories } from './carts.repositories.js'
import { DEFAULT_PROFILE_PICTURE } from './constants.js';

const collectionName = 'users'
const usersCollection = collection(db,collectionName)



export class UsersRepositories{


    static async getUser({userId}){
        //Como me van a mandar uid y nosotros guardamos el id del user en la coleccon user con el uid, lo buscamos con ese criterio y lo devolvemos
         // Obtener el documento recién creado
         try{
            //Obtengo la referencia al documento.
            const userDocRef = doc(db,'users',userId)
            //Pido el documento a la base de datos.
            const userDocSnap = await getDoc(userDocRef)
            // El metodo getDoc devuelve un objeto del tipo DocumentSnapShot.
            /*Los objetos documentSnapShot tienen un metodo data() que devuelve  el registro de la base de datos en formato de objeto de JS, y si no existe el documento devuelve undefined*/
            const searchedUser = userDocSnap.data()

            if (!searchedUser) throw new Error('No existe el usuario buscado...')

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


    static async find({userName,email}){
        //Busca usuarios en la coleccion por userName y/o email.
        //Si los encuentra devuelve un dto con su data, si no existe, devuelve null.
        try{

        }catch(error){
            throw error
        }
    }


    /*
    const buscarEnColeccion = async (emailBuscado, nombreBuscado) => {
    const coleccionRef = collection(db, "usuarios");
    
    // Definir la consulta con múltiples condiciones
    const consulta = query(
        coleccionRef, 
        where("email", "==", emailBuscado), 
        where("nombre", "==", nombreBuscado)
    );

    const querySnapshot = await getDocs(consulta);
    
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
    
    */

    static  login({userName,password}){
        //Iniciamos la sesion y si todo salio ok devolvemos la data del user y el idToken del user

        try{
             signInWithEmailAndPassword(auth,userName,password)

        }catch(error){
            throw error
        }
    }

    static async register({email,password,userName,name,lastName}){
        //Creamos un usuario y le seteamos su userName,name,lastname.
        //Seteo un profilePicture por defecto.
        //Le creamos un carro
        try{
            console.log('Me llego: ', email,password,userName,name,lastName)
            /*ANTES MIRAMOS QUE NO EXISTE UN USER EN LA BASE DE DATOS CON ESTE USERNAME, */
            const filter =  query(usersCollection,where("userName","==",userName))
            const querySnapshot = await getDocs(filter)
            console.log(querySnapshot)
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
                    password: password,
                    name: name,
                    lastName: lastName,
                    profilePic: DEFAULT_PROFILE_PICTURE,
                    cartId: cartId,
                    createdAt: registeredUser.user.metadata.creationTime,
                    phoneNumber: registeredUser.user.phoneNumber,
                })

            //Ahora leo, para devolverlo...
            console.log(registeredUser)
            const userDTO = await this.getUser({userId:userId})
            return userDTO
           

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