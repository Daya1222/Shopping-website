import { useState } from "react"

function Register() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  return (
    <div className="register-page">

      This is register page.
    </div>
  )
}

export default Register
