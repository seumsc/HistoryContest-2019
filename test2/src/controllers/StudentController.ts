import {getRepository,Like,AdvancedConsoleLogger}from "typeorm"
import {Controller,Param,Body,Get,Post,Put,Delete} from "routing-controllers"
import {User}from "../entity/User"


@Controller("/user")
export class UserController{
    
    @Get("")
    async getAll(){
        //return await User.find();
    }
}