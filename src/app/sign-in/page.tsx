'use client'
import { signIn } from "@/lib/auth-client";
import { Check, LogoGithub, LogoGooglePlay } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";

const SignInPage = () => {
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};
        // Convert FormData to plain object
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        const { data: singInData, error } = await signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
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
        <div className=" w-full max-w-7xl flex flex-col items-center justify-center  m-auto lg:pt-10">
            <div className="flex flex-col items-center gap-2 mb-3">
                <h1 className="text-3xl font-bold">সাইন ইন</h1>
                <p className="text-gray-500">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
            </div>
            <Form className="flex pt-10 w-100 flex-col gap-4 bg-white p-4 rounded-2xl" onSubmit={onSubmit}>
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
                    <Description>সঠিক পাসওয়ার্ড দিন</Description>
                    <FieldError />
                </TextField>
                <div className="flex py-3 justify-center gap-2">
                    <Button className="btn w-full rounded-xl bg-green-600 text-white" type="submit">

                        সাইন ইন
                    </Button>
                </div>
                <div className="flex items-center gap-3 py-1 text-gray-500">
                    <span className="h-px flex-1 bg-gray-300" />
                    <span>অথবা</span>
                    <span className="h-px flex-1 bg-gray-300" />
                </div>
                <div className="flex gap-2 justify-center">
                    <Button onClick={handleGoogleSignIn} className="btn bg-none"> <LogoGooglePlay /> Google দিয়ে এগিয়ে যান</Button>
                    <Button onClick={handleGithubSignIn} className="btn bg-none"> <LogoGithub />Github দিয়ে এগিয়ে যান</Button>
                </div>
            </Form>
        </div>
    );
};

export default SignInPage;