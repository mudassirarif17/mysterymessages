"use client"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import { Form } from "@/components/ui/form"
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {useDebounceValue} from "usehooks-ts";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios , {AxiosError} from 'axios';
import { ApiResponse } from "@/types/ApiResponse";
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";


const page = () => {
  const [username , setUsername] = useState('');
  const [usernamemessage , setusernameMessage] = useState('');
  const [isCheckingUsername , setIsCheckingUsername] = useState(false);
  const [isSubmitting , setIsSubmitting] = useState(false);
  const debouncedUsername = useDebounceValue(username , 300);


  const {toast} = useToast();
  const router = useRouter();

  // Zod implementation
  const form =  useForm({
    resolver : zodResolver(signUpSchema),
    defaultValues : {
      username : '',
      email : '',
      password : ''
    }
  })

  useEffect(()=>{
    const checkUsernameunique = async () => {
      if(debouncedUsername){
        setIsCheckingUsername(true);
        setusernameMessage('');
        try {
          const response = await axios.get(`/api/check-username-unique?username=${debouncedUsername}`)
          setusernameMessage(response.data.message);
        } catch (error) {
          const AxiosError = error as AxiosError<ApiResponse>;
          setusernameMessage(AxiosError.response?.data.message ?? "Error checking username")
        }finally{
          setIsCheckingUsername(false)
        }
      }
    }
    checkUsernameunique();
  },[debouncedUsername])

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up' , data)
      toast({
        title : 'Success',
        description: response.data.message
      })
      router.replace(`/verify/${username}`)
      setIsSubmitting(false);
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
    <div className='sign-up md:flex justify-center bg-gray-100 '>

        <div className='sign-up-child w-[100vw] md:w-[40vw] bg-white shadow-xl'>

            <div className="description my-4">
                <h1 className='text-center text-5xl font-extrabold'>Join Mystery <br />Message</h1>
                <p className='text-center text-md my-2'>Sign up to start your anonymous adventure</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                control={form.control}
                name="username"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username"
                      {...field}
                      onChange={(e)=>{
                        field.onChange(e)
                        setUsername(e.target.value)
                      }}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name
                    </FormDescription>
                  </FormItem>
                )} 
                />
                <FormField
                control={form.control}
                name="email"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email"
                      {...field}
                      />
                    </FormControl>
                  </FormItem>
                )} 
                />
                <FormField
                control={form.control}
                name="password"
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="password"
                      {...field}
                      />
                    </FormControl>
                  </FormItem>
                )} 
                />
                <button type="submit" disabled={isSubmitting}>
                  {
                    isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
                      </>
                    ) : ('Signup')
                  }
                  Signup</button>
              </form>
            </Form>
                  
            <div>
                <p>
                  Already a member?{' '}
                  <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">Sign in</Link>
                </p>
            </div>
        </div>

    </div>
  )
}

export default page