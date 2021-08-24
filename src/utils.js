export const isLoggedIn = () => {
    if(localStorage.getItem("accessToken") !== null && localStorage.getItem("userInfo") !== null) {
        return true
    }
    else{
        return false
    }
}


// export const hasAnAccount = () => {
//   const userInfo = JSON.parse(localStorage.getItem("userInfo"))
//   const data = JSON.parse(localStorage.getItem("data"))

//     if(userInfo.email === data.email ) {
//         return true
//     }
//     else {
//       return  false
//     }
// }

