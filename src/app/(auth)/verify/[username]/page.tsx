"use client";
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { verifySchema } from '@/schemas/verifySchema';
import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useParams , useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import React from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";


const VerifyUsername = () => {
    const router = useRouter();
    const params = useParams<{username : string}>();
    const {toast} = useToast();

    const form =  useForm<z.infer<typeof verifySchema>>({
        resolver : zodResolver(verifySchema)
      })


      const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        
        try {
          const response = await axios.post<ApiResponse>('/api/verify-code' , {
            username : params.username,
            code: data.code
          })

          toast({
            title : 'Success',
            description: response.data.message
          })
          router.replace(`sign-in`);
        } catch (error) {
          console.log("Error in signup of user ", error);
          const axiosError = error as AxiosError<ApiResponse>;
          let errorMessage = axiosError.response?.data.message;
          toast({
            title : "Signup failed",
            description: errorMessage,
            variant : "destructive"
          })
        }
      }


  return (
    <div className='sign-up md:flex justify-center items-center h-[100vh] bg-gray-100 '>

        <div className='sign-up-child w-[100vw] h-[56vh] my-4 md:w-[32vw] bg-white rounded-md shadow-xl'>

            <div className="description my-4">
                <h1 className='text-center text-5xl font-extrabold'>Verify Your<br />Account</h1>
                <p className='text-center text-md my-2'>Enter the verification code sent to your email</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto space-y-6 w-5/6">
                <FormField
                control={form.control}
                name="code"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Verify Code</FormLabel>
                    <FormControl>
                      <Input placeholder="verify code"
                      {...field}
                      />
                    </FormControl>
                  </FormItem>
                )} 
                />
                <button className="bg-black text-white px-4 rounded-lg py-1" type="submit">Submit</button>
              </form>
            </Form>
        </div>

    </div>
  )
}

export default VerifyUsername
