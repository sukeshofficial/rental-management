import React from "react"
import { BrowserRouter ,Route,Routes} from 'react-router-dom'
import store from "./redux/Store"
import { Provider } from "react-redux"
import HealthStatus from "./components/health/health"
import Justinput from "./components/justinput/input"
import ComponentTestBed from "./components/test/ComponentTestBed"



function App() {
  return (
    <Provider store={store}>
     <BrowserRouter>
         <Routes>
           <Route path="/dev/health/status" element={<HealthStatus />} />
           <Route path="/dev/input" element={<Justinput/> } />
           <Route path="/test/components/ui" element={<ComponentTestBed />} />
         </Routes>
     </BrowserRouter>

    </Provider>
  )
}

export default App
