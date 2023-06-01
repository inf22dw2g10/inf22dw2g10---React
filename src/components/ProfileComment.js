import styles from '../pages/styles/Profile.module.css'

const ProfileComment = ({comment}) => {
  return (
    <div>
        {comment.text}
    </div>
  )
}

export default ProfileComment