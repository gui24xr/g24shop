import {  collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseappconfig";

const cartsCollection = collection(db,'carts')

export class CartsRepositories{

    //Los carros van a llevar objetos de clase producto para que no se pueda meter cochinadas.
    static async createCart(){
        //Crea un carro vacio y devuelve su id.
        try{
            const emptyCart = {products:[]} //Estp uego sera una instancia de la clase cart
            const createdCart = await addDoc(cartsCollection,emptyCart)
            console.log('created Cart', createdCart)
            return createdCart
        }catch(error){
            throw error
        }
    }
}