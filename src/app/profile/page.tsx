'use client'
import {  updateUser, useSession } from "@/lib/auth-client";
import { Button, Input, Label, TextField } from "@heroui/react";

const ProfilePage = () => {
     const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    
    await updateUser({
        name:data.name
    })
}



    const {data:session} = useSession()
    // console.log(session);
    return (
        <main className="min-h-[70vh] bg-gray-50 px-4 py-10 sm:py-16">
            <div className="mx-auto w-full max-w-3xl">
                <header className="mb-8">
                    <p className="mb-2 text-sm font-semibold text-green-700">আপনার অ্যাকাউন্ট</p>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">প্রোফাইল সেটিংস</h1>
                    <p className="mt-3 text-gray-600">আপনার ব্যক্তিগত তথ্য এখানে দেখুন ও আপডেট করুন।</p>
                </header>

                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="flex items-center gap-4 border-b border-gray-100 bg-gradient-to-r from-green-50 to-white px-6 py-6 sm:px-8">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-700 text-xl font-bold text-white ring-4 ring-green-100">
                            {session?.user.name?.charAt(0) || "ব"}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm text-gray-500">বর্তমান নাম</p>
                            <p className="truncate text-lg font-semibold text-gray-900">
                                {session?.user.name || "ব্যবহারকারী"}
                            </p>
                        </div>
                        </div>
                        

                    <div className="p-6 sm:p-8">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900">নাম পরিবর্তন</h2>
                            <p className="mt-1 text-sm text-gray-600">আপনার অ্যাকাউন্টে যে নামটি দেখাতে চান তা লিখুন।</p>
                        </div>

                        <form onSubmit={onSubmit}>
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                                <TextField className="flex-1" name="name">
                                    <Label>নতুন নাম</Label>
                                    <Input name="name" placeholder="আপনার নাম লিখুন" />
                                </TextField>
                                <Button
                                    className="min-h-11 w-full rounded-xl bg-green-700 px-6 font-semibold text-white shadow-sm transition-colors hover:bg-green-800 sm:w-auto"
                                    type="submit"
                                    >
                                    নাম আপডেট করুন
                                </Button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        
    </main>
    );
};

export default ProfilePage;