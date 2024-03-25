import React from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from './state/index';
const Shop = () => {
  const dispatch = useDispatch();
  const action = bindActionCreators(actionCreators, dispatch);



  return (
    <div>
      {/* 
      <button className="btn-primary my-5 mx-5" onClick={()=>{dispatch(actionCreators.depositMoney(100))}}>-</button>
      <strong>Add Card</strong>
      <button className="btn-primary my-5 mx-5" onClick={()=>{dispatch(actionCreators.withdrawMoney(100))}}>+</button>
      */}

      <button className="btn-primary my-5 mx-5" onClick={() => {action.depositMoney(100)}}>-</button>
      <strong>Add Card</strong>
      <button className="btn-primary my-5 mx-5" onClick={() => {action.withdrawMoney(100)}}>+</button>

    </div>
  )
}

export default Shop
