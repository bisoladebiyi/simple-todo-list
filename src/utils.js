import axios from 'axios'


export const isLoggedIn = () => {
    if(localStorage.getItem("accessToken") !== null && localStorage.getItem("userInfo") !== null) {
        return true
    }
    else{
        return false
    }
}

export const fetch = async (url, method = 'GET', body = {}, headers = {} ) =>  {
    const requestOptions = {
        url,
        method,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    }
    try {
        const response = await axios(requestOptions)
        return response
    } catch(error) {
        throw error
    }
}

export const getCurrentUser = () => {
   const userInfo = localStorage.getItem("userInfo")
   return userInfo === null ? null : JSON.parse(userInfo)
}

export const logOut = (onLogoutComplete) => {
    localStorage.clear()
    onLogoutComplete()
}
