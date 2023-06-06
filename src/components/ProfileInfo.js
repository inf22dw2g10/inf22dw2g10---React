import styles from '../pages/styles/Profile.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../providers/AuthProvider'


const ProfileInfo = ({userProfile}) => {
  const { user } = useContext(AuthContext);

  return (
    <div className={styles.profileMain}>
      <div className={styles.profileAvatarContainer}>
        <img src={userProfile.avatar} alt='user avatar' className={styles.profileAvatar}/>
        <h1>{userProfile.username}</h1>
        <p className={styles.editProfileButton}>
          {userProfile.id === user.id &&
            <Link to="/editProfile">Edit Profile</Link>}
        </p>
      </div>
      <div className={styles.userDescription}>
        <h2>Description:</h2>
        <p>{userProfile.description ? userProfile.description : "No description"} </p>
      </div>
    </div>
    
  )
}

export default ProfileInfo