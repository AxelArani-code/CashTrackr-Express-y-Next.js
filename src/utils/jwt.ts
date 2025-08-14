import  Jwt  from "jsonwebtoken";


export const generateJWT = (id: string) : string =>{
    const token = Jwt.sign({id}, process.env.JWL_SECRET, {
        expiresIn: '30d'
    })
    return token
}