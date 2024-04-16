import axios from 'axios'

export const authenticate = async(mode: 'signInWithPassword' | 'signUp', email: string, password: string) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${process.env.API_KEY}`

    const resp = await axios.post(url,{
        email,
        password,
        returnSecureToken: true
    })

    const token = resp.data.idToken
    return token
}

export const createUser = (email: string, password: string) => {
    try{
        return authenticate('signUp',email, password)
    }catch(err){
        console.log(err)
    }
}

export const login = (email: string, password: string) => {
    try{
        return authenticate('signInWithPassword', email, password)
    }catch(err){
        console.log(err)
    }
}