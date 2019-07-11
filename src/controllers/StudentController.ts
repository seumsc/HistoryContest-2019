import {getRepository,Like,AdvancedConsoleLogger}from "typeorm"
import {JsonController,Param,Body,Get,Post,Put,Delete} from "routing-controllers"
import {Student}from "../entity/Student"


@JsonController("/user")
export class StudentController{
    
    @Get("")
    async getAll(){
        //return await User.find();
    }
}