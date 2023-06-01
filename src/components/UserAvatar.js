import { useQuery } from "react-query";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const UserAvatar = () => {

    const { data: avatar, isLoading} = useQuery("avatar", async () => {
        return axios.get(`http://${window.location.hostname}:5000/users/myavatar`, {withCredentials: true}).then((res) => res.data);
    },{ 
        retry: false,
    });

    if (isLoading) {
        return <LoadingSpinner/>;
    }
    return (
        <img src={avatar.userAvatar.avatar} alt="avatar" height="50rem"/>
    )
}

export default UserAvatar