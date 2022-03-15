import React from 'react'

import { DateComponent } from 'react-dropdown-date-picker';
// import { DateComponent } from 'react-dropdown-date-picker'
import 'react-dropdown-date-picker/dist/index.css'

const App = () => {
  return <DateComponent endDate={new Date()} containerClass={'width-100'} />
}

export default App
