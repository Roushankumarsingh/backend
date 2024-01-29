import React, { useContext, useReducer } from 'react'
import { createContext } from 'react'

const CartStateContext = createContext() ; 
const CartDispatchContext = createContext() ; 

const reducer = (state,action)=>
{
    switch(action.type)
    {
        case "ADD" : 
            return [...state, {id:action.id , name:action.name , location:action.location , country:action.country , price:action.price , description:action.description , image:action.image }];

            case "REMOVE" : 
                let newArr = [...state] 
                newArr.splice(action.index , 1) ; 
                return newArr ;

            case "DROP" : 
                let emptyArr = [] 
                return emptyArr ;

            default : 
            console.log(`There is some Error in the code or Reducer`);
      }
}

export const CartProvider = ({children})=>
{
    const [state,dispatch] = useReducer(reducer,[]) ; 
    return (
        <CartDispatchContext.Provider value={dispatch} >
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext) ; 
export const useDispatchCart = ()=> useContext(CartDispatchContext) ; 