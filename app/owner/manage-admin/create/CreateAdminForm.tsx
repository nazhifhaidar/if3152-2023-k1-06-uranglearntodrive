'use client'

// "app/owner/manage-admin/create"

import Button1 from "@/app/components/Buttons/Button1";
import { useMessageContext } from '@/app/components/Providers/MessageProvider';
import PasswordField from "@/app/components/TextField/PasswordField";
import TextField1 from "@/app/components/TextField/TextField1";
import TextField2 from "@/app/components/TextField/TextField2";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";

const url = process.env.NEXTAUTH_URL;

const CreateAdminForm:React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [isShowConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading,setLoading] = useState(false);

    const { showMessage } = useMessageContext();

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }; 

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage(null);

        // Create a data object to send in the POST request
        const formData = new FormData(event.currentTarget);

        const username = formData.get("username");
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirm_password = formData.get("confirm_password");

        //cek apakah passwordnya sama
        if (password !== confirm_password){
             console.error("Password harus sama");
             setErrorMessage("Password harus sama");
             showMessage("Password harus sama", "error");
             return;
            }
        
        const response = await fetch('/api/admin', {
            method:'POST',
            body: JSON.stringify({
                username:username,
                password:password,
                name: name,
                email: email
            }),
            headers: { "Content-Type": "application/json" }
        })
        if (response.ok){
            const data= await response.json();
            console.log(data?.data);
            showMessage("Admin created successfully!", "success");
            router.push('/owner/manage-admin');
        } else{
            const data= await response.json();
            console.error(data?.message);
            showMessage(data?.message || 'An error occurred during submission.', "error");
            setErrorMessage(data?.message || 'An error occurred during submission.');
        }
    };

    const handlePasswordVisibilityToggle = () => {
        setShowPassword(!showPassword);
    };
    const handleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!isShowConfirmPassword);
    }
    return (
        <div style={{width:'max-content'}}>
            <h1 style={{paddingBottom:'8px'}}>Create Admin</h1>
            <form onSubmit={handleSubmit} >
                <TextField2 label="Username" name='username' value={username} type="text" onChange={handleUsernameChange} loading ={loading}/>
                <TextField2 label="Nama" name='name' value={name} type="text" onChange={handleNameChange} loading ={loading}/>
                <TextField2 label="Alamat Email" name='email' value={email} type="text" onChange={handleEmailChange} loading = {loading}/>
                <PasswordField label="Password" name='password' value={password} onChange={handlePasswordChange} onToggleVisibility={handlePasswordVisibilityToggle} style={{border:'2px solid #ccc',paddingLeft: '4px', width:'450px'  }} />
                <PasswordField label="Confirm Password" name='confirm_password' value={confirmPassword} onChange={handleConfirmPasswordChange} onToggleVisibility={handleConfirmPasswordVisibility} style={{border:'2px solid #ccc',paddingLeft: '4px', width:'450px' }} />
                <div style={{ maxWidth: '100%', display: 'flex', justifyContent: 'center', flexDirection:'row' }}>
                    <Button1 id="submit-button" text="Create Admin" textColor="black" bgColor="yellow" type='submit' style={{margin:'8px'}}/>
                    <Link href={"/owner/manage-admin"}>
                        <Button1 id="cancel_button" text="Cancel" textColor="black" bgColor="white" type='button' style={{margin:'8px'}}/>
                    </Link>
                    
                </div>
            </form>
        </div>
       
  )
}

export default CreateAdminForm