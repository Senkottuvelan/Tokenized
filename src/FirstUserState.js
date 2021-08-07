import React, { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


function FirstUserState() {
    const supabaseUrl = 'https://vdwqdynfeifvlczhjfqz.supabase.co'
    const supabaseKey = process.env.SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)


    const [currentToken, setToken] = useState(0)
    const [yourToken, setyourToken] = useState(0)
    const [totalToken, setTotalToken] = useState(0)
    useEffect(() => {
        const initialSetup = async () => {
            let { data: TotalToken, error: TotalTokenerror } = await supabase
                .from('RegisterTokenTable')
                .select('token_no')
            setTotalToken(TotalToken[0].token_no)

            ///////////
            let { data, error } = await supabase
                .from('AdminTable')
                .select('CurrentToken')
            setToken(data[0].CurrentToken)
            
        }

        initialSetup()
    }, [])

    //Listening to updates



    const AdminTable = supabase
        .from('AdminTable')
        .on('UPDATE', payload => {
            setToken(payload.new.CurrentToken)
            
        })
        .subscribe()

    const bookToken = async () => {



        let { data:TotalToken, error:TotalTokenerror } = await supabase
            .from('RegisterTokenTable')
            .select('token_no')
        
const { data, error } = await supabase
.from('RegisterTokenTable')
.update({ token_no: TotalToken[0].token_no + 1 })
.eq('id', '1')

        setyourToken(data[0].token_no)


        let { data: userToken, error: userError } = await supabase
            .from('MedicalTokenUser')
            .update({ token_no: data[0].token_no  })
            .eq('user', 'user1')
        console.log(userToken)
        setyourToken(userToken[0].token_no)
    }
    
    return (
        <div className="container">
            {(yourToken)
                ? <div><h1 className="CurrentToken main-texts">Current Token Number is {currentToken}</h1><h1 className="YourToken main-texts">Your Token Number is {yourToken}.</h1><h1 className="YourToken main-texts">You are {yourToken - currentToken} Token numbers behind. Be patient!</h1>
                    <Link to="/"><button style={{backgroundColor:"#55a9e6"}} className="btn-simple">Home</button></Link>
                </div>

                : <div><h1 className="CurrentToken main-texts">Current Token Number is {currentToken}</h1>
                    <h1 className="TotalToken main-texts">Total Token Numbers are {totalToken}</h1>
                    <button onClick={bookToken} className="BookToken btn-simple">Book Token</button><Link to="/"><button style={{backgroundColor:"#55a9e6"}} className="btn-simple">Home</button></Link></div>
            }

        </div>
    )
}

export default FirstUserState


