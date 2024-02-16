import React from 'react'
import "./signupComp.css"

const SignupComp = () => {
  return (
    <>
    <div className='signup-page-container'>
        <div className='sign-up-page'>
            <div className='welome-to-signup'>
                <div className='welome-to-signup-inner-div'>
                <h2>Welcome to Signup!</h2>
                <p>To keep contected with us, Please login with youe personal email info</p>
                <button> Sign In</button>
                </div>
            </div>
            <div className='signup-form-div'>
                <div className='signup-form-inner-div'>
                    <h2>Create An Account</h2>
                    <p className='useEmail'>Use your Email for registration</p>
                    <div className='input-area-box'>
                        <input type='text' placeholder='First Name'/>
                        <input type='text' placeholder='Last Name'/>
                        <input type='email' placeholder='Email Address'/>
                        <input type='password' placeholder='Password'/>
                        <button>SIGN UP</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </>
  )
}

export default SignupComp
