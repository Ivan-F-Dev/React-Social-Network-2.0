import React, {useState} from 'react'
import s from './Navbar.module.scss';
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {useStylesNavBar} from "../../MUI/MIU Styles";

const Navbar = () => {

    const [linkState, setLinkState] = useState(1)

    const classes = useStylesNavBar()

    return (

        <div className={s.navBar}>
            <div>
                <NavLink className={s.link} to="/profile">
                    <Button fullWidth={true} className={classes.root} color={linkState === 1 ? "primary" : "default"} onClick={() => setLinkState(1)}>Profile</Button>
                </NavLink>
            </div>
            <div>
                <NavLink className={s.link} to="/messages">
                    <Button fullWidth={true} className={classes.root} color={linkState === 2 ? "primary" : "default"} onClick={() => setLinkState(2)}>Messages</Button>
                </NavLink>
            </div>
            <div>
                <NavLink className={s.link} to="/friends">
                    <Button fullWidth={true} className={classes.root} color={linkState === 3 ? "primary" : "default"} onClick={() => setLinkState(3)}>Friends</Button>
                </NavLink>
            </div>
            <div>
                <NavLink className={s.link} to="/findUsers">
                    <Button fullWidth={true} className={classes.root} color={linkState === 4 ? "primary" : "default"} onClick={() => setLinkState(4)}>Find Users</Button>
                </NavLink>
            </div>
            <div>
                <NavLink className={s.link} to="/test">
                    <Button fullWidth={true} className={classes.root} color={linkState === 5 ? "primary" : "default"} onClick={() => setLinkState(5)}>Test</Button>
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar;