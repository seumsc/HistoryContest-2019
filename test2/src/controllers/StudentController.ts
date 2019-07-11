import {getRepository,Like,AdvancedConsoleLogger}from "typeorm"
import {Controller,Param,Body,Get,Post,Put,Delete} from "routing-controllers"
import {Student}from "../entity/Student"


@Controller("/user")
export class StudentController{
    
    @Get("")
    async getAll(){
        //return await User.find();
    }
}