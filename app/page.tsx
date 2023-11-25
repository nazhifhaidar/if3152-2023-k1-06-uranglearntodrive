import Link from 'next/link';
import AppBar from '@/app/components/AppBar';
import LoginLogout from '@/app/utils/loginlogout';
import { Montserrat } from 'next/font/google';
import Row from '@/app/components/Row';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';

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
<<<<<<< HEAD
      <div style={{ position: 'sticky', top: '0px' }}>
        <AppBar>
          <Row>
            <Link href="/" >
=======
      <AppBar>
        <Row>
          <Link href={"/"} >
            <h2 style={{ marginRight: '10rem' }}>
              Dashboard
            </h2>
          </Link>
          <Link href={"/classlist"} >
            <h2 style={{ marginRight: '10rem' }}>
              Daftar Kelas
            </h2>
          </Link>
          <Link href={"/about"} >
            <h2 style={{ marginRight: '10rem' }}>
              Tentang Perusahaan
            </h2>
          </Link>
          {session && (
            <Link href={session.user.role === 'OWNER' ? '/owner' : '/admin'}>
>>>>>>> parent of af6df23 (Merge branch 'dashboard' into 'main')
              <h2 style={{ marginRight: '10rem' }}>
                {session.user.role === 'OWNER' ? 'Owner' : 'Admin'}
              </h2>
            </Link>
<<<<<<< HEAD
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
            {session && (
              <Link href={session.user.role === 'OWNER' ? '/owner' : '/admin'}>
                <h2 style={{ marginRight: '10rem' }}>
                  {session.user.role === 'OWNER' ? 'Owner' : 'Admin'}
                </h2>
              </Link>
            )}
            <LoginLogout></LoginLogout>
          </Row>
        </AppBar>
      </div>
      <div style={{ position: 'relative', zIndex: -1 }}>
        <div className='bg-gradient-to-t from-white to-transparent h-full w-full' style={{ position: 'absolute', zIndex: -2 }}></div>
        <Image
          src='/D.jpg'
          width={1520}
          height={900}
          alt='resing'
          style={{ position: 'relative', marginTop: '-60px', zIndex: -10 }}>
        </Image>
        <h1 style={{ marginTop: '-14rem', paddingBottom: '8rem', fontSize: '68px', textAlign: 'center', fontWeight: 'bolder', fontStyle: 'italic' }}> Mengemudi bersama Urang Learn to Drive </h1>
      </div>
      <div style={{ display: 'flex', marginTop: '2rem', flexDirection: 'row' }}>
        <div style={{ marginLeft: '2rem', marginRight: '2rem', marginTop: '-4rem', display: 'flex', flexDirection: 'row' }}>
          <div style={{ margin: '8px' }}>
            <SectionContainer w={100} bg_col='azure' bdr_col=''>
              <>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h1> Cepat Mendapatkan SIM </h1>
                  <p style={{ textAlign: 'left' }}> Urang Learn to Drive unggul dalam memberikan pengajaran kemampuan mengemudi lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus neque, consequat nec condimentum ac, sagittis ut tortor. Nam malesuada luctus neque vitae euismod. In at scelerisque risus, in sodales mi. Pellentesque ultrices maximus consequat.</p>
                </div>
              </>
            </SectionContainer>
          </div>
          <div style={{ margin: '8px' }}>
            <SectionContainer w={100} bg_col='azure' bdr_col='' >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1> Jadwal Kelas Fleksibel </h1>
                <p style={{ textAlign: 'left' }}> Urang Learn to Drive unggul dalam memberikan pengajaran kemampuan mengemudi lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus neque, consequat nec condimentum ac, sagittis ut tortor. Nam malesuada luctus neque vitae euismod. In at scelerisque risus, in sodales mi. Pellentesque ultrices maximus consequat.</p>
              </div>
            </SectionContainer>
          </div>
          <div style={{ margin: '8px' }}>
            <SectionContainer w={100} bg_col='azure' bdr_col='' >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1> Harga Lebih Murah </h1>
                <p style={{ textAlign: 'left' }}> Urang Learn to Drive unggul dalam memberikan pengajaran kemampuan mengemudi lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus neque, consequat nec condimentum ac, sagittis ut tortor. Nam malesuada luctus neque vitae euismod. In at scelerisque risus, in sodales mi. Pellentesque ultrices maximus consequat.</p>
              </div>
            </SectionContainer>
          </div>
        </div>
      </div>
      <div style={{ alignItems: 'center', maxWidth: '100%', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontWeight: 'bolder', fontSize: '36px' }}> Mulai Pilih Kelasmu Sekarang. </h1>
        <Link href='/classlist'>
          <Button2 text='Cari Kelas' type='button'></Button2>
        </Link>
      </div>
      <br />
=======
          )}
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
>>>>>>> parent of af6df23 (Merge branch 'dashboard' into 'main')
    </>
  )
}

export default HomePage;