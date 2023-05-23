import { useEffect } from "react"

const App = () =>{
    
    useEffect(()=>{
        const fetchData = async()=>{
            const res = await fetch('http://localhost:5000/games/')
            const data =await res.json()
            console.log(data)
        }
        fetchData()
    },[])
    return(
        <>
            <form method="POST" action="http://localhost:5000/users/login">
                <input type="email" name="email" id="" />
                <input type="password" name="password" id="" />
                <input type="submit" value="Submeter" />
            </form>
        </>
    )

}

export default App
