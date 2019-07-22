import * as jwt from "jsonwebtoken"
import {Key} from "../utils/keys"
import { Student } from "../entity/Student";
import { Admin } from "../entity/Admin";
import { Counsellor } from "../entity/Counsellor";

//验证是否为学生
export async function verifyToken_Student(ctx,next){
    const dataString = ctx.header.authorization;
    try{
        const dataArr = dataString.split(' ');
        const token =dataArr[1];
        let playload = await jwt.verify(token,Key)
        const data=playload;
        if(data.identity=='0'){
            ctx.status = 200
            await next()
        }
        else{ctx.status =400;
            ctx.body={msg:"failed"}
            return ctx
            }
    } catch(err){
        ctx.body= err;
    }
}

//验证是否用户
export async function verifyToken_User(ctx,next){
    const dataString = ctx.header.authorization;
    try{
        const dataArr = dataString.split(' ');
        const token =dataArr[1];

        let playload = await jwt.verify(token,Key)
        const data=playload;
        if(data.identity=='0'||'1'||'2'){
            ctx.status = 200
            await next()
        }
    } catch(err){
        ctx.body= err;
        return ctx;
    }
}

//验证是否拥有管理员权限
export async function verifyToken_CousellorOrAdmin(ctx,next){
    const dataString = ctx.header.authorization;
    try{
        const dataArr = dataString.split(' ');
        const token =dataArr[1];

        let playload = await jwt.verify(token,Key)
        const data=playload;
        if(data.identity=='1'||'2'){
            ctx.status = 200
            await next()
        }
    } catch(err){
        ctx.body= err;
        return ctx;
    }
}

//验证是否为超管
export async function verifyToken_Admin(ctx,next){
    const dataString = ctx.header.authorization;
    try{
        const dataArr = dataString.split(' ');
        const token =dataArr[1];

        let playload = await jwt.verify(token,Key)
        const data=playload;
        if(data.identity=='1'){
            ctx.status = 200
            await next()
        }
    } catch(err){
        ctx.body= err;
        return ctx;
    }
}

//验证是否用户名存在
export async function verifyToken_Username(ctx,next){
    const dataString = ctx.header.authorization;
    try{
        const dataArr = dataString.split(' ');
        const token =dataArr[1];
        
        let playload = await jwt.verify(token,Key)
        const data=playload;
        switch(data.identity)
        {
            case '0':
                const stu=await Student.findOne({username:ctx.request.body.Username});
                if(!stu)
                {
                    ctx.status=400
                }
                else
                {
                    ctx.status=200
                    await next();
                }
                break;
            case '1':
                    const admin=await Admin.findOne({username:ctx.request.body.Username});
                    if(!admin)
                    {
                        ctx.status=400
                    }
                    else
                    {
                        ctx.status=200
                        await next();
                    }
                    break;
            case '2':
                    const counsellor=await Counsellor.findOne({username:ctx.request.body.Username});
                    if(!counsellor)
                    {
                        ctx.status=400
                    }
                    else
                    {
                        ctx.status=200
                        await next();
                    }
                    break;
        }
    } catch(err){
        ctx.body= err;
        return ctx;
    }
}