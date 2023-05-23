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

        </>
    )

}

export default App
