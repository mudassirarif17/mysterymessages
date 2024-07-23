import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
try {
    const prompt = "";
    const result = await streamText({
    model: openai('gpt-4-turbo'),
    prompt,
  });
  return result.toAIStreamResponse();

} catch (error) {
    if(error){
        const {name , status , headers , message} = error
        return NextResponse.json({
            name , status , headers , message
        })
    }else{
        console.log("An unexpexted error occured ",error);
        throw error;
    }
}
}