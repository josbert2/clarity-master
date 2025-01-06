
import './App.css'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isBlank } from 'common'

import { IStaticMethods } from 'flyonui/flyonui';



function App() {

  console.log(IStaticMethods)
  return (
    <>
      <p>undefined isBlank - {isBlank(undefined) ? 'true' : 'false'}</p>
      <p>false isBlank - {isBlank(false) ? 'true' : 'false'}</p>
      <p>true isBlank - {isBlank(true) ? 'true' : 'false'}</p>
      <p>Empty object isBlank - {isBlank({}) ? 'true' : 'false'}</p>

    </>
  )
}

export default App
