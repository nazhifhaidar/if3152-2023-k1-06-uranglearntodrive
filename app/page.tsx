import Link from 'next/link';
import Image from 'next/image';
import AppBar from '@/app/components/AppBar';
import LoginLogout from '@/app/utils/loginlogout';
import { Montserrat } from 'next/font/google';
import Row from '@/app/components/Row';
import { getServerSession } from 'next-auth';
import { options } from './api/auth/[...nextauth]/options';
import Button2 from './components/Buttons/Button2';
import SectionContainer from './components/Containers/SectionContainer';

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
      <div style={{ position: 'sticky', top: '0px' }}>
        <AppBar>
          <Row>
            <Link href="/" >
              <h2 style={{ marginRight: '10rem' }}>
                Dashboard
              </h2>
            </Link>
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
    </>
  )
}

export default HomePage;

