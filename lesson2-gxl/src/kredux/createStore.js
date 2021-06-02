export default function createStore(reducer,enhancer) {

  if(enhancer){
    // enhancer:applyMiddleWare返回的函数
    return enhancer(createStore)(reducer);
  }

  let currentState;
  let listeners = [];

  function getState() {
    return currentState;
  }
 function dispatch(action) {
    currentState = reducer(currentState,action)
    listeners.forEach(listener => {
      listener();
    })
  }
  function subscribe(listener){
    listeners.push(listener);
    // 用于在注销组件时取消监听
    return () => {
        listeners = [];
    }
  }

  dispatch({type: "ADD"});

  return {
    getState,
    dispatch,
    subscribe
  }
}
