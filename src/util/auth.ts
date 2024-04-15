import axios from 'axios'

export const authenticate = async(mode: 'signInWithPassword' | 'signUp', email: string, password: string) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${process.env.API_KEY}`

    const resp = await axios.post(url,{
        email,
        password,
        returnSecureToken: true
    })

    console.log(resp.data)
}

export const createUser = async(email: string, password: string) => {
    try{
        await authenticate('signUp',email, password)
    }catch(err){
        console.log(err)
    }
}

export const login = async (email: string, password: string) => {
    try{
        await authenticate('signInWithPassword', email, password)
    }catch(err){
        console.log(err)
    }
}