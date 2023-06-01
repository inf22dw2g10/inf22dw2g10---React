import styles from '../pages/styles/Profile.module.css'

const ProfileInfo = ({user}) => {
  console.log(user)
  return (
    <div className={styles.profileMain}>
      <img src={user.avatar} alt='user avatar' className={styles.profileAvatar}/>
      {user.username}
    </div>
  )
}

export default ProfileInfo