import { useQuery } from "react-query";
import axios from "axios";

const UserAvatar = () => {

    const { data: avatar, isLoading } = useQuery("avatar", () => {
        return axios.get("http://localhost:5000/users/myavatar", {withCredentials: true}).then((res) => res.data);
    },{ 
        retry: false,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <img src={avatar.userAvatar.avatar} alt="avatar" height="50rem"/>
    )
}

export default UserAvatar