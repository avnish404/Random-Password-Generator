import { useCallback, useEffect, useRef, useState } from 'react'
import './style.css'


function App() {
  const [length, setLength] = useState(0)
  const[numAllowed,setNumAllowed]=useState(false)
  const[charAllowed,setCharAllowed]=useState(false)
  const[password,setPassword]=useState('')
  let passwordRef=useRef(null)

  let copyPasswordToClipboard = useCallback(()=>
  {   passwordRef.current?.select();
      window.navigator.clipboard.writeText(password)
        alert('Password Copied')
  },[password])

  let generatePassword=useCallback(()=>
  {
      let char='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
      let nums='0123456789'
      let chars='~`!@#$%^&*()_+{}[]"":;?/><.,'
      let validChar=char
      let newPssword=''
      if(numAllowed) validChar +=nums
      if(charAllowed) validChar +=chars

      for(let i=1;i<length;i++)
      {
          let a=Math.floor(Math.random() * validChar.length + 1)
          newPssword += validChar.charAt(a)
          console.log(newPssword)
      }
      setPassword(newPssword)
     
  },[length,charAllowed,numAllowed,password])

  useEffect(()=>
  {
      generatePassword()
  },[length,numAllowed,charAllowed])

  return (
    <div>
      <div className="container">

        <h1 className='h1'>Random Password Generator</h1>

        <div className="main">
          <div className="top">
            <input type="text" placeholder='Password' className='inp'readOnly value={password} ref={passwordRef}/>
            <button className='btn' onClick={copyPasswordToClipboard}>Copy</button>
          </div>

          <div className="bottom">
            <input type="range" min={5} max={100} onChange={(e)=>(setLength(e.target.value))} value={length}/>
            <p>Length {length}</p>
            <label htmlFor=""><input type="checkbox" placeholder='Numbers' onChange={()=>setNumAllowed(!numAllowed)}/>Numbers</label>
            <label htmlFor=""><input type="checkbox" placeholder='Characters'onChange={()=>setCharAllowed(!charAllowed)}/>Characters</label>
            
            
            
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
