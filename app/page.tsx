import Link from 'next/link';
import AppBar from '@/app/components/AppBar';
import LoginLogout from '@/app/utils/loginlogout';
import { Montserrat } from 'next/font/google';
import Row from '@/app/components/Row';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import SessionLink from './utils/SessionLink';

const montserrat = Montserrat({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font montserrat'
})


const HomePage: React.FC = async () => {
  const session = await getServerSession(options);
  return (
    <>
      <AppBar>
        <Row>
          <Link href="/classlist" >
            <h2 style={{ marginRight: '10rem' }}>
              Daftar Kelas
            </h2>
          </Link>
          <Link href="/about" >
            <h2 style={{ marginRight: '10rem' }}>
              Tentang Perusahaan
            </h2>
          </Link>
          <SessionLink></SessionLink>
          <LoginLogout></LoginLogout>
        </Row>
      </AppBar>
      <br />
      <br />
      <h1> Apa itu Urang Learn to Drive? </h1>
      <br />
      <p style={{ paddingLeft: '4rem', paddingRight: '4rem' }}> Urang Learn to Drive adalah perusahaan kursus mengemudi asal Kota Bandung yang didirikan pada tahun 2022. Urang Learn to Drive menjadi pionir dalam lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus neque, consequat nec condimentum ac, sagittis ut tortor. Nam malesuada luctus neque vitae euismod. In at scelerisque risus, in sodales mi. Pellentesque ultrices maximus consequat.
        Nunc vel finibus magna. Nulla vel convallis dui. Duis molestie nunc eu quam ultrices, vel laoreet lorem elementum. Quisque commodo, felis a ultricies lacinia, lectus tortor placerat purus, non scelerisque arcu magna sit amet purus. Nunc pharetra dolor vel pellentesque vestibulum. Nunc a diam feugiat, tincidunt velit quis, mollis libero. Aliquam dignissim et augue quis consectetur.
        Donec facilisis congue arcu sollicitudin ultricies. Sed sollicitudin vitae urna eget sagittis. Praesent pretium quam et sapien vulputate, sit amet posuere purus vulputate. Maecenas nulla odio, eleifend vitae fermentum in, maximus eget lectus. Donec dapibus elit et tortor ullamcorper cursus. Proin vel luctus lorem. Morbi vehicula massa eget porttitor tristique. Nulla commodo aliquam ullamcorper.
        Maecenas accumsan turpis ac hendrerit euismod. Curabitur dapibus felis vitae odio congue aliquam. Morbi aliquam tellus et egestas ullamcorper. Pellentesque condimentum sapien odio, eu hendrerit odio lacinia in. Proin scelerisque lectus id aliquet blandit. Aliquam eleifend neque non nulla iaculis, a vestibulum enim sollicitudin. Integer id dolor aliquet mi posuere rhoncus.
        Morbi auctor arcu vitae tellus placerat, nec ultrices sem dignissim. Vivamus nec turpis neque. Aliquam ut maximus justo. Praesent vehicula faucibus efficitur. Quisque a sem blandit, semper turpis vitae, porta eros. Duis at cursus orci. Nullam dignissim justo metus, ac euismod nunc convallis et. Vivamus vitae nisi elit. Quisque rutrum egestas felis condimentum imperdiet.
        Duis condimentum erat vitae massa fermentum faucibus.</p>
    </>
  )
}

export default HomePage;