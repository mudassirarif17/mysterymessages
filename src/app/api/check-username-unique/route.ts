import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod";
import { userNameValidation } from "@/schemas/signUpSchema";


const UsernameQuerySchema = z.object({
    username: userNameValidation
})

export async function GET(request: Request) {
    await dbConnect();
    try {
        const {searchParams } = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }

        // validate with zod
        const result = UsernameQuerySchema.safeParse(queryParam);
        console.log(result) //todo: remove

        if(!result.success){
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json(
                {
                    success : false,
                    message : usernameErrors?.length > 0 ? usernameErrors.join(','):"Invalid Query Parameters"
                },
                {status : 400}
            )
        }

        const user = await UserModel.findOne(result); //incomplete
        if(user){
            return Response.json({
                success: false,
                message: 'Username is already taken',
            }, {status : 400}) 
        }

        return Response.json({
            success: true,
            message: 'Username is unique',
        }, {status : 400})

    } catch (error) {
        console.log("Error checking username ", error);
        return Response.json(
            {
                success : false,
                message : "Error checking username "
            },
            {status : 500}
        )
    }
}