import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SignupInputState, userSignupSchema } from "@/schema/userSchema"
import { Contact, Contact2, Loader2, LockKeyhole, Mail, PhoneCall, User, User2 } from "lucide-react" 
import { ChangeEvent, FormEvent, useState } from "react"
import { Link } from "react-router-dom"

// type SignupInputState = {
//     fullname:string,
//     email:string,
//     password:string,
//     contact:string    
// } // we can get this from zod validation as well
const Signup = () => {
    const [input,setInput] = useState<SignupInputState>({
        fullname:"",
        email:"",
        password:"",
        contact:"",
    });
    const [error,setError] = useState<Partial<SignupInputState>>({})
    const changeEventHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setInput({...input,[name]:value});
    };
    const loginSubmitHandler = (e:FormEvent) => {
        e.preventDefault();

        const result = userSignupSchema.safeParse(input);
        if(!result.success){
            const fieldErrors = result.error.formErrors.fieldErrors;
            setError(fieldErrors as Partial<SignupInputState>);
            return;
        }
        console.log(input);
    }
    const loading = false;
  return (
    <div className="flex justify-center items-center min-h-screen">
        <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200 mx-4">
            <div className="mb-4">
                <h1 className="font-bold text-2xl">CRAVECAST</h1>
            </div>
            <div className="mb-4">
            <div className="relative">
            <Input type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} placeholder="Enter your full name" className="pl-10 focus-visible:ring-1"/>
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
            {
                error && <span className="text-sm text-red-500">{error.fullname}</span>
            }
            </div>
            </div>
            <div className="mb-4">
            <div className="relative">
            <Input type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="Enter your email" className="pl-10 focus-visible:ring-1"/>
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
            {
                error && <span className="text-sm text-red-500">{error.email}</span>
            }
            </div>
            </div>
            <div className="mb-4">
            <div className="relative">
            <Input type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="Enter your password" className="pl-10 focus-visible:ring-1"/>
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
            {
                error && <span className="text-sm text-red-500">{error.password}</span>
            }
            </div>
            </div>
            <div className="mb-4">
            <div className="relative">
            <Input type="phone" name="contact" value={input.contact} onChange={changeEventHandler} placeholder="Enter your contact number" className="pl-10 focus-visible:ring-1"/>
            <PhoneCall className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
            {
                error && <span className="text-sm text-red-500">{error.contact}</span>
            }
            </div>
            </div>
            <div className="mb-10">
                {
                    loading ? (<Button disabled className="w-full bg-orange hover:bg-hoverOrange"><Loader2 className="animate-spin mr-2 h-4 w-4"/>Please Wait</Button>) : (<Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">Signup</Button>)
                }
            </div>
            <Separator/>
            <p className="mt-2">Don't have an account?{" "}<Link to="/login" className="text-blue-500">Login</Link></p>
        </form>
    </div>
  )
}

export default Signup