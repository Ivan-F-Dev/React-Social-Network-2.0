import React, {useEffect, useState} from 'react'
import s from './Profile.module.scss';
import Posts from "./Posts/Posts.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {addProfile, saveProfilePhoto} from "../../store/thunkCreators";
import Preloader from "../../MUI/Preloader/Preloader";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {Button, makeStyles} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
    }
}));

const Profile = (props) => {
    const classes = useStyles()

    const dispatch = useDispatch()
    const waiting = useSelector(state => state.authorization.waiting)
    const profilePage = useSelector(state => state.profilePage)

    let mainId = sessionStorage.authId
    let visitedId = props.match.params.userId
    console.log('Profile was rendered')

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            dispatch(saveProfilePhoto(mainId, e.target.files[0]))
        }
    }

    useEffect(() => {
        let id = visitedId
        if (id) {
            dispatch(addProfile(id, true))
        } else {
            id = mainId
            if (id && profilePage.mainProfile.info === null) dispatch(addProfile(id))
        }
    }, [])

    if (!mainId) return <Redirect to={'/login'}/>

    return (
        <div>
            {waiting
                ? <Preloader/>
                : <div className={s.profile}>
                    <div className={s.leftColumn}>
                        <div className={s.leftColumnItem}>
                            <div className={s.avatarWrapper}>
                                <div className={s.avatar}>
                                    {visitedId
                                        ? <img
                                            src={profilePage.visitedProfile.info === null ? "https://www.sentara.com/Assets/Img/Common/Default/placeholder-doctor.svg?width=294" : profilePage.visitedProfile.info.photos.large}
                                            alt="https://via.placeholder.com/600/92c952"/>
                                        : <img
                                            src={profilePage.mainProfile.info === null ? "https://www.sentara.com/Assets/Img/Common/Default/placeholder-doctor.svg?width=294" : profilePage.mainProfile.info.photos.large}
                                            alt="https://via.placeholder.com/600/92c952"/>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={s.leftColumnItem}>
                            <label htmlFor="upload-photo">
                                <input onChange={onMainPhotoSelected} style={{ display: 'none' }} id="upload-photo" name="upload-photo" type="file"/>
                                <Button className={classes.root} fullWidth={true} color="primary" variant="contained" component="span">
                                    Upload photo
                                </Button>
                            </label>
                        </div>
                        {/*<div className={s.leftColumnItem}>
                            <Button onClick={() => setUploadPhoto(!uploadPhoto)} variant="contained" className={classes.root} color="primary"
                                    fullWidth={true}>Upload photo</Button>
                            {uploadPhoto && <input type={"file"} onChange={onMainPhotoSelected}/>}
                        </div>*/}
                    </div>
                    <div className={s.rightColumn}>
                        <div className={s.rightColumnItem}>
                            {visitedId
                                ? <ProfileInfo currentProfile={profilePage.visitedProfile} visitedId={visitedId}/>
                                : <ProfileInfo currentProfile={profilePage.mainProfile} visitedId={visitedId}/>
                            }
                        </div>
                        <div className={s.rightColumnItem}>
                            <Posts visitedId={visitedId}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Profile;