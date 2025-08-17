import React, { useState } from 'react'
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios"
import { serverUrl } from '../App';
import { ClipLoader } from "react-spinners";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function SignUp() {
const [inputClicked,setInputClicked]=useState({
    name:false,
    userName:false,
    email:false,
    password:false
})
const [showPassword,setShowPassword]=useState(false)
const [loading,setLoading]=useState(false)
const [name,setName]=useState("")
const [userName,setUserName]=useState("")
const [err,setErr]=useState("")
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const navigate=useNavigate()
const dispatch=useDispatch()
const handleSignUp=async ()=>{
  setLoading(true)
  setErr("")

  try {
    const result=await axios.post(`${serverUrl}/api/auth/signup`,{name,userName,email,password},{withCredentials:true})
    dispatch(setUserData(result.data))
    setLoading(false)
  } catch (error) {
    setErr(error.response?.data?.message)
    console.log(error)
    setLoading(false)
  }
}


  return (
    <div className='w-full h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 flex flex-col justify-center items-center'>
      <div className='w-[90%] lg:max-w-[60%] h-[700px] bg-gradient-to-r from-emerald-500/10 to-blue-500/10 backdrop-blur-lg rounded-3xl flex justify-center items-center overflow-hidden border border-emerald-300/20 shadow-2xl shadow-teal-500/20'>
        <div className='w-full lg:w-[50%] h-full bg-white/5 backdrop-blur-sm flex flex-col items-center p-[10px] gap-[15px] rounded-l-3xl overflow-y-auto'>
          <div className='flex gap-[10px] items-center text-[24px] font-bold mt-[20px] text-white'>
            <span className='bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent'>Join</span>
            <span className='bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>Revoo</span>
          </div>

          {/* Enhanced Name Input */}
          <div className='relative w-[90%] group'>
            <div className='absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-40 group-focus-within:opacity-60 transition duration-500'></div>
            <div className='relative'>
              <input 
                type="text" 
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setInputClicked({...inputClicked, name: true})}
                onBlur={() => setInputClicked({...inputClicked, name: !!name})}
                className='w-full h-12 px-5 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white text-base placeholder-transparent focus:border-emerald-400 focus:bg-white/20 focus:outline-none focus:ring-0 focus:scale-105 transition-all duration-300 shadow-lg'
                placeholder='Enter Your Name'
                required
              />
              <label 
                htmlFor='name' 
                className={`absolute left-5 text-emerald-200 transition-all duration-300 pointer-events-none ${
                  inputClicked.name || name 
                    ? '-top-2.5 text-xs bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent font-semibold px-2 bg-teal-900/80 rounded-full'
                    : 'top-3.5 text-base'
                }`}
              >
                👤 Enter Your Name
              </label>
            </div>
          </div>

          {/* Enhanced Username Input */}
          <div className='relative w-[90%] group'>
            <div className='absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-40 group-focus-within:opacity-60 transition duration-500'></div>
            <div className='relative'>
              <input 
                type="text" 
                id='userName'
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onFocus={() => setInputClicked({...inputClicked, userName: true})}
                onBlur={() => setInputClicked({...inputClicked, userName: !!userName})}
                className='w-full h-12 px-5 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white text-base placeholder-transparent focus:border-teal-400 focus:bg-white/20 focus:outline-none focus:ring-0 focus:scale-105 transition-all duration-300 shadow-lg'
                placeholder='Enter Username'
                required
              />
              <label 
                htmlFor='userName' 
                className={`absolute left-5 text-teal-200 transition-all duration-300 pointer-events-none ${
                  inputClicked.userName || userName 
                    ? '-top-2.5 text-xs bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent font-semibold px-2 bg-teal-900/80 rounded-full'
                    : 'top-3.5 text-base'
                }`}
              >
                ✨ Enter Username
              </label>
            </div>
          </div>

          {/* Enhanced Email Input */}
          <div className='relative w-[90%] group'>
            <div className='absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 group-focus-within:opacity-60 transition duration-500'></div>
            <div className='relative'>
              <input 
                type="email" 
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setInputClicked({...inputClicked, email: true})}
                onBlur={() => setInputClicked({...inputClicked, email: !!email})}
                className='w-full h-12 px-5 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white text-base placeholder-transparent focus:border-blue-400 focus:bg-white/20 focus:outline-none focus:ring-0 focus:scale-105 transition-all duration-300 shadow-lg'
                placeholder='Enter Email'
                required
              />
              <label 
                htmlFor='email' 
                className={`absolute left-5 text-blue-200 transition-all duration-300 pointer-events-none ${
                  inputClicked.email || email 
                    ? '-top-2.5 text-xs bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-semibold px-2 bg-blue-900/80 rounded-full'
                    : 'top-3.5 text-base'
                }`}
              >
                📬 Enter Email
              </label>
            </div>
          </div>

          {/* Enhanced Password Input */}
          <div className='relative w-[90%] group'>
            <div className='absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-40 group-focus-within:opacity-60 transition duration-500'></div>
            <div className='relative'>
              <input 
                type={showPassword ? "text" : "password"}
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setInputClicked({...inputClicked, password: true})}
                onBlur={() => setInputClicked({...inputClicked, password: !!password})}
                className='w-full h-12 px-5 pr-12 bg-white/10 backdrop-blur-md border-2 border-white/20 rounded-2xl text-white text-base placeholder-transparent focus:border-cyan-400 focus:bg-white/20 focus:outline-none focus:ring-0 focus:scale-105 transition-all duration-300 shadow-lg'
                placeholder='Enter Password'
                required
              />
              <label 
                htmlFor='password' 
                className={`absolute left-5 text-cyan-200 transition-all duration-300 pointer-events-none ${
                  inputClicked.password || password 
                    ? '-top-2.5 text-xs bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent font-semibold px-2 bg-cyan-900/80 rounded-full'
                    : 'top-3.5 text-base'
                }`}
              >
                🔒 Enter Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-300 hover:text-emerald-200 hover:scale-110 transition-all duration-200 p-1'
              >
                {showPassword ? 
                  <IoIosEyeOff className='w-5 h-5' /> : 
                  <IoIosEye className='w-5 h-5' />
                }
              </button>
            </div>
          </div>

          {err && <p className='text-red-400 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20 text-sm'>{err}</p>}

          <button className='w-[70%] px-[20px] py-[10px] bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold h-[45px] cursor-pointer rounded-2xl mt-[20px] transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/25' onClick={handleSignUp} disabled={loading}>
            {loading ? <ClipLoader size={28} color='white' /> : "Create Revoo Account"}
          </button>

          <p className='cursor-pointer text-blue-300 hover:text-blue-200 transition-colors text-sm' onClick={() => navigate("/signin")}>Already Have An Account? <span className='border-b-2 border-b-cyan-400 pb-[3px] text-cyan-400 hover:text-cyan-300 transition-colors'>Sign In</span></p>
        </div>

        <div className='md:w-[50%] h-full hidden lg:flex justify-center items-center bg-gradient-to-br from-teal-600 to-emerald-600 flex-col gap-[20px] text-white text-[16px] font-semibold rounded-r-3xl shadow-2xl relative overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-400/20'></div>
          <div className='relative z-10 text-center'>
            <h1 className='text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-200 to-white bg-clip-text text-transparent'>Revoo</h1>
            <p className='text-xl text-emerald-100 mb-2'>Join the Community</p>
            <p className='text-lg text-teal-100'>Connect. Share. Discover.</p>
            <div className='mt-8 flex justify-center gap-2'>
              <div className='w-3 h-3 bg-emerald-300 rounded-full animate-pulse'></div>
              <div className='w-3 h-3 bg-teal-300 rounded-full animate-pulse' style={{ animationDelay: '0.2s' }}></div>
              <div className='w-3 h-3 bg-cyan-300 rounded-full animate-pulse' style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
