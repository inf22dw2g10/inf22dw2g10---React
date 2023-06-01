import { useQuery } from "react-query";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const Balance = () => {
    const { data: balance, isLoading } = useQuery("balance", () => {
        return axios.get(`http://${window.location.hostname}:5000/users/balance`, {withCredentials: true}).then((res) => res.data);
    },{ 
        retry: false,
    });

    if (isLoading) {
        return <LoadingSpinner/>;
    }
    let newBalance = balance.balance.toFixed(2);
  return (
    <>{newBalance}€</>
  )
}

export default Balance