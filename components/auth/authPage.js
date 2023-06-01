import React from "react";
import  classes from './authPage.module.css';
import AuthForm from "./authForm/form";
function authPage(){
    return(
    <div className={classes.authPage}>
        <AuthForm/>
    </div>
    )
}
export default authPage;