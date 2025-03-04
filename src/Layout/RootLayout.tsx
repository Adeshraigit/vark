import { Outlet,ScrollRestoration} from 'react-router-dom'  
import Navbar from '../components/Navbar'
import Footer from '../components/Footer' 

const RootLayout = () => {

    return (
      <>
         <ScrollRestoration/>
          <Navbar/>
              <Outlet/>
          <Footer/>
       </>
    )
  }
  
  export default RootLayout;