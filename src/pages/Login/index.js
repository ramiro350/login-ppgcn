import React, { useState } from 'react'
import axios from 'axios'
import './login.css'

import { MdEmail, MdLock } from "react-icons/md"
import { HiEye, HiEyeOff } from "react-icons/hi"

function Login() {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [show, setShow] = useState(false)

   const handleClick = (e) => {
      e.preventDefault()
      setShow(!show);
   }

  async function login(){
      
      const formData = new FormData()
      console.log(email,password)
      await axios({
         method: "post",
         url: "https://ppgcn.herokuapp.com/admin/login",
         data: {
           email: email,
           senha: password
         },
         headers: { "Content-Type": "application/json" },
       })
       .then(e => e.data)
       .then(res => {
          console.log(res)
          localStorage.setItem('token', res)
       })
       .catch(console.log("Ocorreu um erro!"));
   }

   return (
      <div className="login">
         <div className="login-logo col-3">
            <img
               src="https://anzuns.org/wp-content/uploads/2018/02/admin_login.png"
               alt="MdLockLogin App"
            />
         </div>

         <div className="login-right col-6 ">
            <h1>Acessar Administração</h1>
            
            <form>

            <div className="login-loginInputEmail col-4">
               <MdEmail />
               <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  required
                  onChange={e => setEmail(e.target.value)}
               />
            </div>

            <div className="login-loginInputPassword col-4">
               <MdLock />
               <input
                  placeholder="Senha"
                  type={show ? "text" : "password"}
                  value={password}
                  required
                  onChange={e => setPassword(e.target.value)}
               />
               <div className="login-eye">
                  {show ? (
                     <HiEye
                        size={20}
                        onClick={handleClick}
                     />
                  ) : (
                        <HiEyeOff
                           size={20}
                           onClick={handleClick}
                        />
                     )}
               </div>
            </div>
            </form>

            <button type="submit" onSubmit={()=>login()}>
               Login
            </button>

         </div>
      </div>
   )
}

export default Login