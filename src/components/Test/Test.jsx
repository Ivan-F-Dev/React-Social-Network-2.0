import React, {useState} from 'react'
import s from './Test.module.scss';
import Button from '@material-ui/core/Button';
import {makeStyles, TextField} from "@material-ui/core";
import {comparePasswords, useInput} from "../../utils/validation";
import Smith from "../../img/Smith.jpg"

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,

        '& .MuiFilledInput-root': {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0
        }
    },
}));

const Test = () => {
    const classes = useStyles()

    const nickname = useInput('', {isEmpty: true, minLength: 6, maxLength: 10, ownSpaces: true})
    const name = useInput('', {isEmpty: true, minLength: 6, maxLength: 10, ownSpaces: true})
    const email = useInput('', {isEmpty: true, isEmail: true})
    const password = useInput('', {isEmpty: true, minLength: 6, maxLength: 10, ownSpaces: true, ownUpperCase: true, ownLowerCase: true, ownNumbers: true})
    const checkpassword = useInput('', {isEmpty: true, minLength: 6, maxLength: 10,ownSpaces: true, ownUpperCase: true, ownLowerCase: true, ownNumbers: true})

    const [submit, setSubmit] = useState(0)

    window.nickname = nickname

    return (
        <div className={s.test}>
            {submit > 99
                ? <div>FATAL ERROR</div>
            : <form action="">
                    <div className={s.form}>
                        <div className={s.formWrap}>
                            <div className={s.errorWrap}>
                                {(nickname.isDirty && nickname.minLengthError) && <div className={s.error}>Недостаточно символов</div>}
                                {(nickname.isDirty && nickname.maxLengthError) && <div className={s.error}>Слишком много символов</div>}
                                {(nickname.isDirty && nickname.isEmpty) && <div className={s.error}>Поле не должно быть пустым</div>}
                                {(nickname.isDirty && nickname.spaces) && <div className={s.error}>Присутствуют пробелы</div>}
                            </div>
                            <TextField onChange={e => nickname.onChange(e)} value={nickname.value}
                                       onBlur={e => nickname.onBlur(e)}
                                       fullWidth={true}
                                       color={(nickname.isDirty && nickname.commonError)? "secondary" : "primary"} label="Write your nickname" variant="filled"/>
                            <div className={s.errorWrap}>
                                {(name.isDirty && name.minLengthError) && <div className={s.error}>Недостаточно символов</div>}
                                {(name.isDirty && name.maxLengthError) && <div className={s.error}>Слишком много символов</div>}
                                {(name.isDirty && name.isEmpty) && <div className={s.error}>Поле не должно быть пустым</div>}
                                {(name.isDirty && name.spaces) && <div className={s.error}>Присутствуют пробелы</div>}
                            </div>
                            <TextField onChange={e => name.onChange(e)} value={name.value} onBlur={e => name.onBlur(e)}
                                       fullWidth={true}
                                       color={(name.isDirty && name.commonError)? "secondary" : "primary"} label="Write your name" variant="filled" className={classes.root}/>
                            <div className={s.errorWrap}>
                                {(email.isDirty && email.emailError) && <div className={s.error}>Некорректный Email</div>}
                                {(email.isDirty && email.isEmpty) && <div className={s.error}>Поле не должно быть пустым</div>}
                            </div>
                            <TextField onChange={e => email.onChange(e)} value={email.value} onBlur={e => email.onBlur(e)}
                                       fullWidth={true}
                                       color={(email.isDirty && email.commonError)? "secondary" : "primary"} label="Write your email" variant="filled" className={classes.root}/>
                            <div className={s.errorWrap}>
                                {(password.isDirty && password.minLengthError) && <div className={s.error}>Недостаточно символов</div>}
                                {(password.isDirty && password.maxLengthError) && <div className={s.error}>Слишком много символов</div>}
                                {(password.isDirty && password.isEmpty) && <div className={s.error}>Поле не должно быть пустым</div>}
                                {(password.isDirty && password.spaces) && <div className={s.error}>Присутствуют пробелы</div>}
                                {(password.isDirty && !password.numbers) && <div className={s.error}>Нет ни одной цифры</div>}
                                {(password.isDirty && !password.upperCase) && <div className={s.error}>Нет ни одной заглавной буквы</div>}
                                {(password.isDirty && !password.lowerCase) && <div className={s.error}>Нет ни одной строчной буквы</div>}
                            </div>
                            <TextField onChange={e => password.onChange(e)} value={password.value}
                                       onBlur={e => password.onBlur(e)}
                                       fullWidth={true} type={password && "password"}
                                       color={(password.isDirty && password.commonError)? "secondary" : "primary"} label="Write your password" variant="filled" className={classes.root}/>
                            <div className={s.errorWrap}>
                                {/*{(checkpassword.isDirty && checkpassword.minLengthError) && <div className={s.error}>Недостаточно символов</div>}
                            {(checkpassword.isDirty && checkpassword.maxLengthError) && <div className={s.error}>Слишком много символов</div>}
                            {(checkpassword.isDirty && checkpassword.isEmpty) && <div className={s.error}>Поле не должно быть пустым</div>}
                            {(checkpassword.isDirty && checkpassword.spaces) && <div className={s.error}>Присутствуют пробелы</div>}
                            {(checkpassword.isDirty && !checkpassword.numbers) && <div className={s.error}>Нет ни одной цифры</div>}
                            {(checkpassword.isDirty && !checkpassword.upperCase) && <div className={s.error}>Нет ни одной заглавной буквы</div>}
                            {(checkpassword.isDirty && !checkpassword.lowerCase) && <div className={s.error}>Нет ни одной строчной буквы</div>}*/}
                            </div>
                            <div className={s.errorWrap}>
                                {!(comparePasswords(checkpassword.value, password.value)) && checkpassword.isDirty && <div className={s.error}>Пароли не совпадают</div>}
                            </div>
                            <TextField onChange={e => checkpassword.onChange(e)} value={checkpassword.value}
                                       onBlur={e => checkpassword.onBlur(e)}
                                       fullWidth={true} type={checkpassword.value && "password"}
                                       color={(checkpassword.isDirty && checkpassword.commonError)? "secondary" : "primary"} label="Write your password for verification" variant="filled" className={classes.root}/>

                            <Button disabled={!(comparePasswords(checkpassword.value, password.value)) || nickname.commonError || name.commonError || email.commonError || password.commonError || checkpassword.commonError}
                                    onClick={() => setSubmit(submit + 1)} variant="contained" className={classes.root} color="primary" fullWidth={true}>Login</Button>
                            {submit === 1 && <div>loading...</div>}
                            {submit === 2 && <div>loading...loading...loading...</div>}
                            {submit === 3 && <div>loading...loading...loading...loading...loading...</div>}
                            {submit === 4 && <div>Это не настоящая форма а просто шаблон...(((</div>}
                            {submit > 4 && submit < 20 && <div>Попытка №{submit}</div>}
                            {submit > 19 && submit < 50 && <div>Безнадежная попытка №{submit}</div>}
                            {submit > 49 && <div><div>Попытка №{submit}</div><img src={Smith} alt=""/></div>}
                        </div>
                    </div>
                </form>}
        </div>
    )
}

export default Test;