import styles from '../pages/styles/Comments.module.css'
import axios from 'axios';
import { useQuery} from 'react-query';

const GameComment = ({comment}) => {
    return(
        <h2>{comment.text}</h2>
    )
};

export default GameComment;