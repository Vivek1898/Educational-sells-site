import bcrypt, { hash } from "bcrypt";

//8 12 14
//Hash password with Genrating salt and resolve hashed password
export const hashPassword =(password) =>{
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(12,(err,salt)=>{
            if(err) reject(err)
            bcrypt.hash(password,salt,(err,hash)=>{
                if(err) reject(err)
                resolve(hash);

            })
        })
    })
};
//Compare hashed and already saved password
export const comparePassword =(password,hashed) =>{
    return bcrypt.compare(password,hashed);
};

