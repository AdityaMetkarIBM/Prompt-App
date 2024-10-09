import {connectToDB} from '@utils/database';
import Prompt from '@models/prompt'

export const POST = async (req,res) =>{

    const {userID, prompt, tag} = await req.json();

    try{
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userID,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status:200})

    }catch (error){
        return new Response(JSON.stringify("Server Encountered ERROR"), {status:500})
    }
}