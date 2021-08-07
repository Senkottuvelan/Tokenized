
import { createClient } from '@supabase/supabase-js'
import React, { useState,useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';











function AdminUpdateNew() {
  const supabaseUrl = 'https://vdwqdynfeifvlczhjfqz.supabase.co'
  const supabaseKey = process.env.REACT_APP_SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)
  const [currentToken, setToken] = useState(0)
  useEffect(()=>{
    const initialSetup = async () => {
      
      ///////////
      let { data, error } = await supabase
          .from('AdminTable')
          .select('CurrentToken')
      setToken(data[0].CurrentToken)
      
  }

  initialSetup()
  },[])
const addToken = async ()=>{
setToken(currentToken+1)

const { data, error } = await supabase
  .from('AdminTable')
  .update({ CurrentToken: currentToken+1 })
  .eq('id', '1')

console.log(data)
}
const subtractToken =async ()=>{
  setToken(currentToken-1)
  const { data, error } = await supabase
  .from('AdminTable')
  .update({ CurrentToken: currentToken-1 })
  .eq('id', '1')
  console.log(data)
  }
  
  return (
    <div className="container">

  <button onClick={addToken} className="Adder btn-simple">Add</button>
  <button onClick={subtractToken} className="Subtractor btn-simple">Reduce</button>

<h1 className="CurrentToken main-texts">Token Number is {currentToken}</h1>
<Link to="/"><button className="btn-simple" style={{backgroundColor:"#55a9e6"}}>Home</button></Link>
    </div>
  )
}

export default AdminUpdateNew

