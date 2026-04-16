import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js"; // Assuming you have an assets file for images
import Input from "../components/Input.jsx";
import { validateEmail } from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.js"
import { API_ENDPOINTS } from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { AppContext } from "../context/AppContext.jsx";

const Login = () => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error , setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const {setUser} = useContext(AppContext)

    const navigate = useNavigate();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setIsLoading(true);
        
        //basic validation
        if(!validateEmail(email)){
            setError("Please enter valid email");
            setIsLoading(false);
            return;
        }
        if(!password.trim()){
            setError("Please enter your password");
            setIsLoading(false);
            return;
        }

        setError("");

        //Login API call
        try{
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                password
            })
            const {token, user} = response.data;
            if(token){
                localStorage.setItem("token",token);
                setUser(user);
                navigate("/dashboard");
            }
        }catch(err){
            console.error("Something went wrong", err);
            toast.error("Something went wrong");
            setError(err.response?.data?.message || "Login failed");
        }finally{
            setIsLoading(false);
        }

    }

    
    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* Background Image with blur*/}
            <img src={assets.login_bg} alt="Background" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />
        
            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Welcome Back to Money Manager
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Log in with your Email and Password!
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Input Fields */}

                        <Input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                            placeholder="john@example.com"
                            type="text"
                        />            
                        <Input 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            placeholder="* * * * * * *"
                            type="password"
                        />

                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}

                        <button
                            disabled={isLoading}
                            className={`w-full py-3 text-lg font-medium bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed': ''}`}
                            type="submit"
                        >
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5"/>
                                </>
                            ):("Login")}
                        </button>

                        <p className="text-sm text-slate-800 text-center mt-6">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-medium text-emerald-600 underline hover:text-emerald-700 transition-colors"
                            >
                                Signup
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        
        </div>
    )
}
export default Login;