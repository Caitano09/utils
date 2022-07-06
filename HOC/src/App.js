import React, {useState, useEffect, useRef} from 'react'
import ReactDOM from 'react-dom';

import MyIp from './MyIp'
import MyUserAgent from './MyUserAgent'
import MyIPUA from './MyIPUA'
import Card from './Card'
import Http from './Http'


function Modal(props) {
  const modal = useRef(document.createElement('div'))
  document.body.appendChild(modal.current)
  useEffect(()=>{
    return () =>{
      document.body.removeChild(modal.current)
    }
  }, [])

  const overlay = {
    background: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh'
  }
  const contents = {
    background: 'white',
    padding: '10px',
    margin: '20px',

  }
  return (
    ReactDOM.createPortal(
      <div style={overlay}>
        <div style={contents}>
          Modal!
          <button onClick={props.onClick}>Mostrar</button>
        </div>
      </div>, modal.current
    )
  )
}

function App() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div style={{position: 'relative'}}>
      {/*<MyIp style={{color: 'red'}}/>
        <MyUserAgent style={{color: 'blue'}}/>
        <MyIPUA/>
        <Card header={(state) => <p>Test {JSON.stringify(state)}</p>} body={<p>Olá</p>}>
          {state => <p>Children {state}</p>}
        </Card>*/}

      <Http url='http://httpbin.org/ip'>
        {ip =>
          <Http url='http://httpbin.org/user-agent'>
            {ua => {
              if (ip.isLoading || ua.isLoading) {
                return <p>Carregando...</p>
              }
              return (<div>
                <p style={{ color: 'red' }}>Meu Ip é: {JSON.stringify(ip)}</p>
                <p>Meu UA é: {JSON.stringify(ua)}</p>
              </div>)
            }}
          </Http>}
      </Http>
      
      {/*{showModal && <Modal onClick={() => setShowModal(!showModal)} />}
          <button onClick={() => setShowModal(!showModal)}>Mostrar</button>*/}
    </div>
  );
}

export default App;
