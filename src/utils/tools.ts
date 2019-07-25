import * as bcrypt from "bcryptjs"
export const tools ={
        enbcrypt(password:string){
            let salt =bcrypt.genSaltSync(10);
            let hash =bcrypt.hashSync(password,salt);
            return hash;
        }
        
}