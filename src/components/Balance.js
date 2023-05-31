import { useQuery } from "react-query";
import axios from "axios";

const Balance = () => {
    const { data: balance, isLoading } = useQuery("balance", () => {
        return axios.get("http://localhost:5000/users/balance", {withCredentials: true}).then((res) => res.data);
    },{ 
        retry: false,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    let newBalance = balance.balance.toFixed(2);
  return (
    <>{newBalance} €</>
  )
}

export default Balance