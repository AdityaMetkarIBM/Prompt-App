import {connectToDB} from '@utils/database';
import Prompt from '@models/prompt'
import User from '@models/user';

export const GET = async (request) => {
    try{
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), {status:200})

    }catch(error){
        return new Response(JSON.stringify("Prompt Fetch Failed"), {status:500})
    }
}