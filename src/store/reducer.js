const initialState={
    IsLoggedIn:sessionStorage.getItem("userid")!==null,
    Username: sessionStorage.getItem("uname")===null ?"":sessionStorage.getItem("uname"),
    Role: sessionStorage.getItem("role")===null ? "":sessionStorage.getItem("role")
}

const reducer=(state=initialState,action)=>{
    switch(action.type)
    {
        case 'IsLoggedIn':
            return {...state,
                IsLoggedIn:true,
                Userid:sessionStorage.getItem("userid"),
                Username:sessionStorage.getItem("Username"),
                Role:sessionStorage.getItem("role")
            } 
        case 'LogOut':
            sessionStorage.clear()
            return {...state,IsLoggedIn:false,Username:'',Role:'',Userid:''}
        default:
            return state
    }
}

export default reducer;