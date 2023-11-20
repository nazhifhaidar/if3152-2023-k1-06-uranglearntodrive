'use client'

import Button1 from "@/app/components/Buttons/Button1";
import PasswordField from "@/app/components/TextField/PasswordField";
import TextField1 from "@/app/components/TextField/TextField1";
import TextField2 from "@/app/components/TextField/TextField2";
import { useState, ChangeEvent } from "react";

const CreateAdminForm:React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [isShowConfirmPassowrd, setShowConfirmPassword] = useState(false);

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Create a data object to send in the POST request
        const formData = new FormData(event.currentTarget);
        // console.log(formData.get("username"))
        // console.log(formData.get("password"))
        console.log(formData);
    };

    const handlePasswordVisibilityToggle = () => {
        setShowPassword(!showPassword);
    };
    const handleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!isShowConfirmPassowrd);
    }
    return (
        <div>
            <h1>Create Admin</h1>
            <form onSubmit={handleSubmit} >
                <TextField2 label="Username" name='username' value={username} type="text" onChange={handleUsernameChange} />
                <PasswordField label="Password" value={password} onChange={handlePasswordChange} onToggleVisibility={handlePasswordVisibilityToggle} style={{border:'2px solid #ccc',paddingLeft: '4px', width:'450px'  }} />
                <PasswordField label="Password" value={confirmPassword} onChange={handleConfirmPasswordChange} onToggleVisibility={handleConfirmPasswordVisibility} style={{border:'2px solid #ccc',paddingLeft: '4px', width:'450px' }} />
                <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'flex-start' }}>
                    <Button1 id="submit-button" text="Create Admin" textColor="black" bgColor="yellow" type='submit' style={{margin:'8px'}}/>
                </div>
            </form>
        </div>
       
  )
}

export default CreateAdminForm