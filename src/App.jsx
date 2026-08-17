import { useContext } from 'react'
import './App.css'
import ItemContext from './component/store/items-context'
import Users from './pages/Users'
import Admin from './pages/Admin'
import Footer from './component/Footer'

function App() {
  const itemsCtx = useContext(ItemContext);

  return (
    <>
      {itemsCtx.switchPage ? <Users /> : <Admin/>}
      <Footer />
    </>
  )
}

export default App
