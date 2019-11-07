import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import fetchBackendApi from '../actions/fetchBackendApi'
import {exampleSelector} from '../selectors/exampleSelector'
import {sources} from '../services/dataSources'
import Result from '../components/Result'
import { Card, Spinner} from 'react-bootstrap'


const Home = ({fetchBackendApi, result, jsondata}) => {

    
    const [websocket, setWsStatus] = useState('checking...')
    const [apiEndpoint, SetEndpointStatus] = useState('checking...')
    
    
    const checkWebsocket = (wsUrl) => {
        
        const check = new WebSocket(wsUrl)

        check.onopen = function (event) 
        {
            setWsStatus('connected, Sending PING');
            check.send(JSON.stringify({ message: 'PING' }))
        }
        
        check.onmessage = function (event) 
        {
            setWsStatus(`Receiving ${JSON.parse(event.data).message.reply}`)
            
        }
        check.onclose = function (event) {setWsStatus('closed')}
        check.onerror = function (event) {setWsStatus('error')}
        
        
    }

    const checkApiEndpoint = (Url) => {

        fetch(Url)
        .then((response) => {SetEndpointStatus(response.statusText)})
        .catch((error) => {SetEndpointStatus('error')})


    }


    useEffect(() => {
        
        checkWebsocket(sources.WSocket)
        checkApiEndpoint(sources.backEndpoint)
        

    }, [])


    return (
        <div className='m-5'>
            <h1 >Home Page</h1>
            <Card>
                <Card.Header>Services Check</Card.Header>
                <Card.Body>
                <li className="mt-2">Api Endpoint State 
                {   apiEndpoint === 'OK' ? 
                        <ul className='text-success'>{apiEndpoint}</ul> 
                        : 
                        <ul className='text-danger'>{apiEndpoint}</ul> 
                }
            
                <li className="mt-2">Backend Api request
                    <ul>
                    <button type="button" className="btn btn-primary mt-2"
                            onClick={() => fetchBackendApi(sources.checkApiUrl)}>
                        check Request        
                    </button>    
                    {    
                        !result.data  &&
                        <></>
                    
                    }        
                    
                    {    
                        result.loading === true &&
                        <div className='mt-3'>
                        <Card.Header>
                            <Spinner animation="border" role="status" variant='dark'/>
                            Loading
                        </Card.Header>
                        </div>
                    }
                
                    {
                        (result.data && result.data.length > 0) &&

                        <Result type='Success' message={jsondata}/>
                                    
                        
                    }
                    
                    {   (result.error && result.error.message) &&

                        <Result type='Error' message={result.error.message}/>
                    }

            
                    </ul>
                </li>     
            
                </li>
            
            
                <li>Websocket state 
                    {
                    websocket === 'connected' ||  websocket === 'Receiving PONG' ? 
                    <ul className='text-success'>{websocket}</ul> 
                        : 
                    <ul className='text-danger'>{websocket}</ul> 
                    }
                </li>
            
                <li>
                Scheduled tasks
                    <ul>
                        <a className="btn btn-primary mt-2" role="button" href={sources.taskMonitor}>
                            check tasks
                        </a>
                    </ul>
                </li>

                <li>
                Django admin Page
                    <ul>
                        <a className="btn btn-primary mt-2" role="button" href={sources.djangoAdmin}>
                            go to page
                        </a>
                    </ul>
                </li>
                </Card.Body>
            </Card>
        </div>
    )
}


const mapStateToProps = state => {
    return {
      result: state.example,
      jsondata: exampleSelector(state)
    }
  }
  

export default connect(mapStateToProps, { fetchBackendApi })(Home)
