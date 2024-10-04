
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import {  collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore"

import { auth,db } from '../firebase/firebaseappconfig'
import { CartsRepositories } from './carts.repositories.js'
import { DEFAULT_PROFILE_PICTURE } from './constants.js';

const collectionName = 'users'
const usersCollection = collection(db,collectionName)



export class UsersRepositories{


    static async getUser({userId}){
        //Como me van a mandar uid y nosotros guardamos el id del user en la coleccon user con el uid, lo buscamos con ese criterio y lo devolvemos
         // Obtener el documento recién creado
         console.log('Me ejecute')
         try{
            const userDocRef = doc(db,'users',userId)
            const userDoc = await getDoc(userDocRef)
            // Verificar si el documento existe
             if (!userDoc.exists()) {
                throw new Error('No existe el usuario con este ID');
            }

            console.log('En get user', userDoc.data())
            const {user} =userDoc.data();
            return user
         }catch(error){
            throw(error)
         }
       
    }

    static async login({userName,password}){
        //Iniciamos la sesion y si todo salio ok devolvemos la data del user

        try{
            const res = await signInWithEmailAndPassword(auth,userName,password)
            //Como a la app solo quiero devolverle algunos datos y no toda la cochinada que me da firebase....
            return res
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
           const registeredUser = await createUserWithEmailAndPassword(auth,email,password)
           //De la respuesta de creacion de user voy a tomar uuid.
           const {uuid} = registeredUser
           //Voy a crear y obtener un carro para este nuevo user
            const createdCart = await CartsRepositories.createCart() //onsole.log('Carro creado: ',createdCart.id)
            const {id:cartId} = createdCart
            //Ya tengo un usuario registrado, su uuid de authFirebase, voy a ingresarlo en la coleccion users y usare para su userId el uuid de su mail para cuando el servicio de suscripcion de cambio de sesion me avise que uuid inicie sesion entonces obtengo de ese modo la data del userio que inicia para setear en la app
            //El metodo setDoc edita(crea si no existe,el documento con la referencia pasada por paretro)
            //el metodo docRef devuelve una referencia aun documento de una coleccion, si no existe, crea el doc vacio,

            const userDocRef = doc(db,'users',registeredUser.user.uid)
            //hago la creacion modificaicon
            await setDoc(userDocRef,{
                    email:registeredUser.user.email,
                    name: name,
                    lastName: lastName,
                    profilePic: DEFAULT_PROFILE_PICTURE,
                    cartId: cartId,
                    createdAt: registeredUser.user.metadata.creationTime,
                    phoneNumber: registeredUser.user.phoneNumber,
                    
                })

            //Ahora leo, para devolverlo...
            const docSnapshot = await getDoc(userDocRef);
            if (docSnapshot.exists()) {
                console.log('CreatedUser: ', docSnapshot.data());
                return docSnapshot.data(); // Devuelve los datos del documento
            } else {
                throw error
            }

        }catch(error){
            throw error
            
        }
    }

}

export class UserDTO{

    constructor({userId,email,name,lastName,profilePic,cartId,createdAt,phoneNumber}){
        console.log('dgdg')
    }

}