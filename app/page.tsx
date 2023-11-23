import Link from 'next/link';
import Image from 'next/image';
import AppBar from '@/app/components/AppBar';
import LoginLogout from '@/app/utils/loginlogout';
import { Montserrat } from 'next/font/google';
import Row from '@/app/components/Row';
import Button2 from './components/Buttons/Button2';
import SectionContainer from './components/Containers/SectionContainer';

const montserrat = Montserrat({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font montserrat'
})

const HomePage: React.FC = async () => {
  return (
    <>
      <AppBar>
        <Row>
          <Link href={"/"} >
            <h2 style={{marginRight:'10rem'}}>
              Dashboard
            </h2>
          </Link>
          <Link href={"/classlist"} >
            <h2 style={{marginRight:'10rem'}}>
              Daftar Kelas
            </h2>
          </Link>
          <Link href={"/about"} >
            <h2 style={{marginRight:'10rem'}}>
              Tentang Perusahaan
            </h2>
          </Link>
          <LoginLogout></LoginLogout>
        </Row>
      </AppBar>
      <br/>
      <br/>
      <div style={{display:'flex', flexDirection:'row'}}>
        <h1 style={{paddingLeft:'4rem', fontSize:'72px', display:'flex', flexDirection:'row', maxWidth:'60%', fontStyle:'italic'}}> Mengemudi bersama Urang Learn to Drive </h1>
        <Image src='/D.jpg' width={720} height={540} alt="resing" style={{marginTop:'1rem', paddingRight:'4rem'}}></Image>
      </div>
      <div style={{display:'flex', marginTop:'2rem', flexDirection:'row'}}>
        <div style={{paddingLeft:'4rem', maxWidth:'35%'}}>
          <p> Urang Learn to Drive menyediakan layanan kelas kursus mengemudi mobil manual maupun matic. Terdapat lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus neque, consequat nec condimentum ac, sagittis ut tortor. Nam malesuada luctus neque vitae euismod. In at scelerisque risus, in sodales mi. Pellentesque ultrices maximus consequat.
              Nunc vel finibus magna. Nulla vel convallis dui. Duis molestie nunc eu quam ultrices, vel laoreet lorem elementum. Quisque commodo, felis a ultricies lacinia, lectus tortor placerat purus, non scelerisque arcu magna sit amet purus.</p>
          <Link href='/classlist' style={{marginLeft:'-8px'}}>
            <Button2 text='Cari Kelas' type='button'></Button2>
          </Link>
        </div>
        <div style={{marginLeft:'2rem', marginRight:'4rem'}}>
          <SectionContainer w={100} bg_col='azure' bdr_col='' children={
            <>
              <div style={{display:'flex', flexDirection:'column'}}>
                <h1> Panduan sebelum mulai mendaftar... </h1>
                <p style={{textAlign:'left'}}> 1. Pastikan bahwa lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus neque, consequat nec condimentum ac, sagittis ut tortor. Nam malesuada luctus neque vitae euismod. In at scelerisque risus, in sodales mi. Pellentesque ultrices maximus consequat.
                Nunc vel finibus magna. Nulla vel convallis dui. Duis molestie nunc eu quam ultrices, vel laoreet lorem elementum. Quisque commodo, felis a ultricies lacinia, lectus tortor placerat purus, non scelerisque arcu magna sit amet purus.</p>
                <p style={{textAlign:'left'}}> 2. Siapkan terlebih dahulu lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus neque, consequat nec condimentum ac, sagittis ut tortor. Nam malesuada luctus neque vitae euismod. In at scelerisque risus, in sodales mi. Pellentesque ultrices maximus consequat.
                Nunc vel finibus magna. Nulla vel convallis dui. Duis molestie nunc eu quam ultrices, vel laoreet lorem elementum. Quisque commodo, felis a ultricies lacinia, lectus tortor placerat purus, non scelerisque arcu magna sit amet purus.</p>
                <p style={{textAlign:'left'}}> 3. Rata-rata waktu yang diperlukan adalah lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus neque, consequat nec condimentum ac, sagittis ut tortor. Nam malesuada luctus neque vitae euismod. In at scelerisque risus, in sodales mi. Pellentesque ultrices maximus consequat.
                Nunc vel finibus magna. Nulla vel convallis dui. Duis molestie nunc eu quam ultrices, vel laoreet lorem elementum. Quisque commodo, felis a ultricies lacinia, lectus tortor placerat purus, non scelerisque arcu magna sit amet purus.</p>
                <p style={{textAlign:'left'}}> 4. Setelah selesai, anda akan lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus neque, consequat nec condimentum ac, sagittis ut tortor. Nam malesuada luctus neque vitae euismod. In at scelerisque risus, in sodales mi. Pellentesque ultrices maximus consequat.
                Nunc vel finibus magna. Nulla vel convallis dui. Duis molestie nunc eu quam ultrices, vel laoreet lorem elementum. Quisque commodo, felis a ultricies lacinia, lectus tortor placerat purus, non scelerisque arcu magna sit amet purus.</p>
              </div>
            </>
          }></SectionContainer>
        </div>
      </div>
      <br/>
      
    </>
  )
}

export default HomePage;