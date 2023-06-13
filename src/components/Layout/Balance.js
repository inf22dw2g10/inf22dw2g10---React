import axios from "axios";
import { useQuery } from "react-query";
import { useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";





const Balance = () => {

    
    // Get balance
    const { data: balance, isLoading, error} = useQuery("balance", () => {
        return axios.get(`http://${window.location.hostname}:5000/users/balance`, {withCredentials: true}).then((res) => res.data);
    },{ 
        retry: false,
    });

    let newBalance = balance?.balance.toFixed(2);


    // Check Balance display

    if (isLoading || error) {
        return <LoadingSpinner/>;
    }

  return (
    <>{newBalance}</>
  )
}

export default Balance