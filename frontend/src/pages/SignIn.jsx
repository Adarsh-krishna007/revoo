import React, { useState } from 'react'
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios"
import { serverUrl } from '../App';
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function SignIn() {
const [inputClicked,setInputClicked]=useState({
    userName:false,
    password:false
})
const [showPassword,setShowPassword]=useState(false)
const [loading,setLoading]=useState(false)
const [userName,setUserName]=useState("")
const [password,setPassword]=useState("")
const [err,setErr]=useState("")
const navigate=useNavigate()
const dispatch=useDispatch()
const handleSignIn=async ()=>{
  setLoading(true)
  setErr("")
  try {
    const result=await axios.post(`${serverUrl}/api/auth/signin`,{userName,password},{withCredentials:true})
   dispatch(setUserData(result.data))
    setLoading(false)
  } catch (error) {
    console.log(error)
    setLoading(false)
    setErr(error.response?.data?.message)
  }
}


  return (
    <div className='w-full h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col justify-center items-center'>
      <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-gradient-to-r from-pink-500/10 to-purple-500/10 backdrop-blur-lg rounded-3xl flex justify-center items-center overflow-hidden border border-pink-300/20 shadow-2xl shadow-purple-500/20'>
        <div className='w-full lg:w-[50%] h-full bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center p-[10px] gap-[20px] rounded-l-3xl'>
          <div className='flex gap-[10px] items-center text-[24px] font-bold mt-[40px] text-white'>
            <span className='bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent'>Sign In to</span>
            <span className='bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>Revoo</span>
          </div>

          {/* Enhanced Username Input */}
          <div className='relative w-[90%] group'>
            <div className='absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 group-focus-within:opacity-60 transition duration-500'></div>
            <div className='relative'>
              <input 
                type="text" 
                id='userName'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onFocus={() => setInputClicked({...inputClicked, userName: true})}
                onBlur={() => setInputClicked({...inputClicked, userName: !!userName})}
                className='w-full h-14 px-6 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white text-lg placeholder-transparent focus:border-pink-400 focus:bg-white/20 focus:outline-none focus:ring-0 focus:scale-105 transition-all duration-300 shadow-lg'
                placeholder='Enter Username'
                required
              />
              <label 
                htmlFor='userName' 
                className={`absolute left-6 text-pink-200 transition-all duration-300 pointer-events-none ${
                  inputClicked.userName || userName 
                    ? '-top-3 text-sm bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-semibold px-2 bg-purple-900/80 rounded-full'
                    : 'top-4 text-lg'
                }`}
              >
                ✨ Enter Username
              </label>
            </div>
          </div>

          {/* Enhanced Password Input */}
          <div className='relative w-[90%] group'>
            <div className='absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 group-focus-within:opacity-60 transition duration-500'></div>
            <div className='relative'>
              <input 
                type={showPassword ? "text" : "password"}
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setInputClicked({...inputClicked, password: true})}
                onBlur={() => setInputClicked({...inputClicked, password: !!password})}
                className='w-full h-14 px-6 pr-14 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white text-lg placeholder-transparent focus:border-purple-400 focus:bg-white/20 focus:outline-none focus:ring-0 focus:scale-105 transition-all duration-300 shadow-lg'
                placeholder='Enter Password'
                required
              />
              <label 
                htmlFor='password' 
                className={`absolute left-6 text-purple-200 transition-all duration-300 pointer-events-none ${
                  inputClicked.password || password 
                    ? '-top-3 text-sm bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent font-semibold px-2 bg-purple-900/80 rounded-full'
                    : 'top-4 text-lg'
                }`}
              >
                🔒 Enter Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-300 hover:text-pink-200 hover:scale-110 transition-all duration-200 p-1'
              >
                {showPassword ? 
                  <IoIosEyeOff className='w-6 h-6' /> : 
                  <IoIosEye className='w-6 h-6' />
                }
              </button>
            </div>
          </div>

          <div className='w-[90%] px-[20px] cursor-pointer text-cyan-300 hover:text-cyan-200 transition-colors' onClick={() => navigate("/forgot-password")}>Forgot Password?</div>

          {err && <p className='text-red-400 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20'>{err}</p>}

          <button className='w-[70%] px-[20px] py-[10px] bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-500/25' onClick={handleSignIn} disabled={loading}>
            {loading ? <ClipLoader size={30} color='white' /> : "Sign In to Revoo"}
          </button>

          <p className='cursor-pointer text-blue-300 hover:text-blue-200 transition-colors' onClick={() => navigate("/signup")}>Want To Create A New Account? <span className='border-b-2 border-b-cyan-400 pb-[3px] text-cyan-400 hover:text-cyan-300 transition-colors'>Sign Up</span></p>
        </div>

        <div className='md:w-[50%] h-full hidden lg:flex justify-center items-center bg-gradient-to-br from-purple-600 to-pink-600 flex-col gap-[20px] text-white text-[16px] font-semibold rounded-r-3xl shadow-2xl relative overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-purple-400/20'></div>
          <div className='relative z-10 text-center'>
            <h1 className='text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-200 to-white bg-clip-text text-transparent'>Revoo</h1>
            <p className='text-xl text-purple-100'>Social Media Reimagined</p>
            <div className='mt-8 flex justify-center gap-2'>
              <div className='w-3 h-3 bg-pink-300 rounded-full animate-bounce'></div>
              <div className='w-3 h-3 bg-purple-300 rounded-full animate-bounce' style={{ animationDelay: '0.1s' }}></div>
              <div className='w-3 h-3 bg-cyan-300 rounded-full animate-bounce' style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
