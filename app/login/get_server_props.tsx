import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

export async function getServerSideProps() {
    const session = await getServerSession();
    
    // Check if the user has an active session
    if (session) {
      // User is already signed in, redirect them to another page
      redirect('/dashboard'); // Replace '/dashboard' with your desired redirect path
    }
  
    // If the user doesn't have an active session, return an empty object
    return { props: {} };
  }
  