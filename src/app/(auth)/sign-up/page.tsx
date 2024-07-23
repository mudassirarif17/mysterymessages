"use client"
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useState } from "react";

const page = () => {
  const [username , setUsername] = useState('');
  const [usernamemessage , setusernameMessage] = useState('');
  const [isCheckingUsername , setIsCheckingUsername] = useState(false);
  const [isSubmitting , setIsSubmitting] = useState(false);

  return (
    <div className='sign-up md:flex justify-center bg-gray-100 '>
        <div className='sign-up-child w-[100vw] md:w-[40vw] bg-white shadow-xl'>
            <div className="description my-4">
                <h1 className='text-center text-5xl font-extrabold'>Join Mystery <br />Message</h1>
                <p className='text-center text-md my-2'>Sign up to start your anonymous adventure</p>
            </div>
        </div>
    </div>
  )
}

export default page