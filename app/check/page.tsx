import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { options } from '../api/auth/[...nextauth]/options';

const MyPage = async () => {
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //       redirect('/api/auth/signin?callbackUrl=/check');
  //   },
  // });

  const session = await getServerSession(options);
  if (!session){
    redirect('/api/auth/signin?callbackUrl=/check');
  }

  if (session?.user.role === "OWNER"){
    redirect('/owner')
  }else{
    redirect('/')
  }

  return <div>Checking session...</div>;
};

export default MyPage;
