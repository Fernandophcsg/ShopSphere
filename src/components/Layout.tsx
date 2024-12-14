
import { ReactNode, useContext, useEffect, useState } from 'react';
import Navbar from './Navbar';
import ProductAddButton from './ProductAddButton';
import { AuthContext } from '../Contexts/AuthContext';
import { AddProductDialog } from './ProductAddModal';

interface LayoutProps {
  children: ReactNode;
}

const Layout:React.FC<LayoutProps> = ({ children }) => {
  const { isLoggedin } = useContext(AuthContext)
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);
  
  return (
    <div>
        <Navbar />
        {children}
        {
          isLoggedin && <ProductAddButton handleOpen={handleOpen} />
        }
        <AddProductDialog open={open} handleOpen={handleOpen} />
    </div>
  )
}

export default Layout