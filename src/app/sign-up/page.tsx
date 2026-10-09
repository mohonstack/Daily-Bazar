"use client";

import {  signIn, signUp } from "@/lib/auth-client";
import {  LogoGithub, LogoGooglePlay } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";

const SignUpPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    const { data: signUpData, error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/"

    })

  };

  const handleGoogleSignIn = async() =>{
      const googleSignInData = await signIn.social({
        provider:'google'
      })
  }

  const handleGithubSignIn = async()=>{
    const githubSingInData = await signIn.social({
      provider:'github'
    })
  }

  return (
    <div className=" w-full max-w-7xl gap-4 flex flex-col items-center justify-center  m-auto py-4">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-gray-500">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </div>
      <Form className=" flex w-100 flex-col gap-4 bg-white p-4 rounded-2xl" onSubmit={onSubmit}>
        <TextField
          isRequired
          name="name"
          validate={(value) => {
            if (value.length < 3) {
              return "Name must be at least 3 characters";
            }
            return null;
          }}
        >
          <Label className="text-xl">নাম</Label>
          <Input placeholder="...." />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label className="text-xl">ইমেইল</Label>
          <Input placeholder="....com" />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label className="text-xl">পাসওয়ার্ড</Label>
          <Input placeholder="●●●●●" />
          <Description>অবশ্যই অন্তত ৮টি অক্ষরের হতে হবে, যার মধ্যে একটি বড় হাতের অক্ষর ও একটি সংখ্যা থাকতে হবে।</Description>
          <FieldError />
        </TextField>
        <div className="flex py-3 justify-center gap-2">
          <Button className="btn w-full rounded-xl bg-green-600 text-white"  type="submit">
           
            অ্যাকাউন্ট তৈরি করুন
          </Button>
        </div>
         <div className="flex items-center gap-3 py-1 text-gray-500">
          <span className="h-px flex-1 bg-gray-300" />
          <span>অথবা</span>
          <span className="h-px flex-1 bg-gray-300" />
         </div>
         <div className="flex gap-2 justify-center">
          <Button onClick={handleGoogleSignIn} className="btn bg-none"> <LogoGooglePlay/> Google দিয়ে এগিয়ে যান</Button>
         <Button onClick={handleGithubSignIn} className="btn bg-none"> <LogoGithub/>Github দিয়ে এগিয়ে যান</Button>
         </div>
         <p className="text-center">অ্যাকাউন্ট আছে? <Link className="text-green-600 underline" href='/sign-in'>সাইন ইন করুন</Link></p>
      </Form>
    </div>
  );
};

export default SignUpPage;