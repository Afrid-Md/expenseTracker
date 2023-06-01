import React from "react";
import Form from './Form';
import classes from '../SignUpPage/SignUpPage.module.css'

function SignInPage(){
    return(
        <div className={classes.authPage}>
             <Form/>
        </div>
    )
}
export default SignInPage;