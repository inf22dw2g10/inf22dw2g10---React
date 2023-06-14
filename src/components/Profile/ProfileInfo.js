import styles from '../../pages/styles/Profile.module.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../providers/AuthProvider'


const ProfileInfo = ({userProfile}) => {
  const { user } = useContext(AuthContext);

  
  const openModal =()=>{
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  const closeModal =()=>{
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  } 

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
        <p>{userProfile.description ? userProfile.description : "No description"}</p>
        <span onClick={openModal}className={styles.descriptionLink} >See description</span>
        <div id="myModal" className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}> &times;</span>
            <h3>Description</h3>
            <p>{userProfile.description ? userProfile.description : "No description"}</p>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default ProfileInfo