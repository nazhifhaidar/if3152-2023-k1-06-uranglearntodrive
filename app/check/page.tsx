import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { options } from '../api/auth/[...nextauth]/options';
import { useMessageContext } from '../components/Providers/MessageProvider';

const MyPage = async () => {
  // const { data: session } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //       redirect('/api/auth/signin?callbackUrl=/check');
  //   },
  // });
  const {showMessage} =  useMessageContext();

  const session = await getServerSession(options);
  if (!session){
    showMessage(`Invalid Credentials`, "error")
    redirect('/api/login');
  }

  if (session?.user.role === "OWNER"){
    redirect('/owner')
  }else{
    redirect('/admin')
  }

  return <div>Checking session...</div>;
};

export default MyPage;
