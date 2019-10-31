import React, {useEffect, useState} from 'react'

const Home = () => {

    const [websocket, setWsStatus] = useState('checking...')
    const [api, setApiStatus] = useState('checking...')
    
    
    const checkWebsocket = (wsUrl) => {
        
        const check = new WebSocket(wsUrl)

        check.onopen = function (event) {setWsStatus('connected')}
        check.onmessage = function (event) {setWsStatus('communicating')}
        check.onclose = function (event) {setWsStatus('closed')}
        check.onerror = function (event) {setWsStatus('error')}
        
        
    }

    const checkApi = (Url) => {

        fetch(Url)
        .then((response) => {setApiStatus(response.statusText)})
        .catch((error) => {setApiStatus('error')})


    }


    useEffect(() => {
        
        checkWebsocket('ws://localhost/ws/test')
        checkApi('http://localhost/api/')

    }, [])


    return (
        <div className='mt-5 ml-5'>
            <h1 >Home Page</h1>
            <h3>Services Check</h3>
            <li className="mt-5">Api Endpoint State {api === 'OK' ? 
                    <ul className='text-success'>{api}</ul> 
                    : 
                    <ul className='text-danger'>{api}</ul> }
            <ul><a href='http://localhost/api/'>check root api endpoint</a></ul>
            </li>
            
            
            <li>Websocket state {websocket === 'connected' ? 
                    <ul className='text-success'>{websocket}</ul> 
                    : 
                    <ul className='text-danger'>{websocket}</ul> }
            </li>
            
            <li>
            Celery tasks
            <ul><a href='http://localhost/flower/'>check tasks</a></ul>
            </li>

            <li>
            Django admin Page
            <ul><a href='http://localhost/admin/'>go to page</a></ul>
            </li>

        </div>
    )
}

export default Home
