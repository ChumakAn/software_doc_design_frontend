import classes from './Header.module.css'
import {Link, useSearchParams} from "react-router-dom";
export const Header = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const userId = parseInt(searchParams.get('userId')!!)
    return (
        <div className={classes.header}>
            <div className={classes.logo}>IOT AJAX</div>
            <div className={classes.headerItems}>
                <Link to={`/devices?userId=${userId}`} className={classes.headerItem}>Devices</Link>
                <Link to={`/hubs?userId=${userId}`} className={classes.headerItem}>Hubs</Link>
                <Link to={`/account?userId=${userId}`} className={classes.headerItem}>Account</Link>
            </div>
        </div>
    )
}