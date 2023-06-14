import styles from './Navbar.module.css'
import { Link } from "react-router-dom"
import AuthContext from "../../providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import SearchUser from './SearchUser';
import UserAvatar from './UserAvatar';
import BurgerMenu from './BurgerMenu';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'


const Navbar = () => {

    const [balance, setBalance] = useState(null)

    const location = useLocation();
    let currentPath = location.pathname;
    currentPath = currentPath.split('/')[1]
    const { user,logout } = useContext(AuthContext);



    // Show Add&Hide Balance Dropdown

    const openBalanceModal = () =>{
      const dropdown = document.querySelector('#dropdownContent')
      const dropdownMobile = document.querySelector('#dropdownContentMobile')
        if(dropdown && dropdownMobile ){
            if(dropdown.style.display === "block" && dropdownMobile.style.display === "block"){
                dropdown.style.display = "none";
                dropdownMobile.style.display = "none";
            }else{
                dropdown.style.display = "block";
                dropdownMobile.style.display = "block";
            }
        }
    }

    window.onclick = function(event) {
        const dropdown = document.querySelector('#dropdownContent')
        const dropdownMobile = document.querySelector('#dropdownContentMobile')
        const addBalanceButton = document.querySelector('#addBalanceButton')
        const addBalanceButtonMobile = document.querySelector('#addBalanceButtonMobile')
        const addBalanceContainer = document.querySelector('#addBalanceContainer')
        const addBalanceContainerMobile = document.querySelector('#addBalanceContainerMobile')
        const addBalanceForm = document.querySelector('#addBalanceForm')
        const addBalanceFormMobile = document.querySelector('#addBalanceFormMobile')
        const addBalanceField = document.querySelector('#addBalanceField')
        const addBalanceFieldMobile = document.querySelector('#addBalanceFieldMobile')
        const submitBalance = document.querySelector('#submitBalance')
        const submitBalanceMobile = document.querySelector('#submitBalanceMobile')

        if(dropdown && dropdownMobile){
            if (event.target !== dropdown && event.target !== dropdownMobile && event.target !== addBalanceButton && event.target !== addBalanceButtonMobile && event.target !== addBalanceContainer && event.target !== addBalanceContainerMobile && event.target !== addBalanceForm  && event.target !== addBalanceFormMobile  && event.target !== addBalanceField && event.target !== addBalanceFieldMobile && event.target !== submitBalance && event.target !== submitBalanceMobile) {
                dropdown.style.display = "none";
                dropdownMobile.style.display = "none";
            }
        }
    } 


    // AddBalance Form
    const addBalanceSchema = yup.object().shape({
        balance: yup.number('Has to be a number').required('You have to insert an amount').positive('Insert a positive value'),
    });



    const { register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(addBalanceSchema),
    });

    const addBalanceSubmit = async (data) =>{    
        const balance = data.balance !== "" ? data.balance : data.balance2

        try{
            await axios.patch(
                `http://${window.location.hostname}:5000/users/addBalance`,
                {
                    depositValue:balance
                },{
                  withCredentials: true
                } 
            )
            setBalance(null)
            
        }catch(err){
        }
    }

    useEffect(() => {
        if(user){
            axios.get(`http://${window.location.hostname}:5000/users/balance`, {withCredentials: true}).then((res) => {
                setBalance(res.data.balance)
            })
            .catch((err)=>{
            })
        }
    }, [balance,user])

    return (
        <>

        <nav className={styles.navLayout}>
            {user && <SearchUser/>}
            <div className={styles.middleNav}>
                <Link to="/" className={`${currentPath === "" ? styles.currentPageLink : ''} ${styles.navLinks}` } ><p>Store</p></Link>   
                {user?.admin && <Link to="/admin" className={`${currentPath === "admin" ? styles.currentPageLink : ''} ${styles.navLinks}` }  ><p>Admin</p></Link>}
                {user &&
                    <>
                        <Link to={`/profile/${user.id}`} className={`${currentPath === "profile" || currentPath === "editProfile"  ? styles.currentPageLink : ''} ${styles.navLinks}` }  ><p>Profile</p></Link>
                        <Link className={styles.navLinks} onClick={logout}><p>Logout</p></Link>  
                    </>
                }
                {!user &&    
                    <>
                    <Link to="/login" className={`${currentPath === "login" ? styles.currentPageLink : ''} ${styles.navLinks}` }  ><p>Login</p></Link>
                    <Link to="/register" className={`${currentPath === "register" ? styles.currentPageLink : ''} ${styles.navLinks}` }  ><p>Register</p></Link>
                    </>
                }

            </div>
            {user &&
                <div className={styles.userNav}>
                    <Link to={`/profile/${user?.id}`}>{user && <UserAvatar/>}</Link>&nbsp;<span><Link to={`/profile/${user?.id}`}>{user?.username}</Link><div className={styles.addBalance} id="addBalanceButton" onClick={openBalanceModal}>{balance}€</div></span>
                    <div className={styles.dropdownContent} id="dropdownContent">
                        <div id="addBalanceContainer">
                            <form action="" method="post" id="addBalanceForm" onSubmit={handleSubmit(addBalanceSubmit)}>
                                <p>{errors.balance?.message}</p>
                                <input type="text" name="balance" placeholder='Insert a value' id="addBalanceField" autoComplete='off' {...register("balance")}  />
                                <input type="submit" value="Add Balance" id="submitBalance" />
                            </form>
                        </div>
                    </div>
                </div> 
            }
        </nav>
        <nav className={styles.navMobile}>
            <div>
                <BurgerMenu/>
            </div>
            {user &&
                <div className={styles.mobileUserNav}>
                    <Link to={`/profile/${user?.id}`}>{user && <UserAvatar/>}</Link>&nbsp;<span><Link to={`/profile/${user?.id}`}>{user?.username}</Link><div className={styles.addBalance} id="addBalanceButtonMobile" onClick={openBalanceModal}>{balance}€</div></span>
                    <div className={styles.dropdownContentMobile} id="dropdownContentMobile">
                        <div id="addBalanceContainerMobile">
                            <form action="" method="post" id="addBalanceFormMobile" onSubmit={handleSubmit(addBalanceSubmit)}>
                                <p>{errors.balance?.message}</p>
                                <input type="text" name="balance" placeholder='Insert a value' id="addBalanceFieldMobile" {...register("balance2")}   autoComplete='off' />
                                <input type="submit" value="Add Balance" id="submitBalanceMobile" />
                            </form>
                        </div>
                    </div>
                </div>
            }
        </nav>
       </>
    )
}

export default Navbar