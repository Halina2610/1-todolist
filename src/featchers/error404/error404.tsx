import React from 'react'
import error404 from '../../assets/404.svg'


export const Error404 = () => {
    return (
        <div >
            <div style={{ margin: '200px auto', width: '451px'}}>
                <img src={error404} alt={'error 404'}
                     style={{ alignItems: 'center', display: 'flex', height: 'calc(100vh - var(--header_height))', justifyContent: 'center'}} />
            </div>
        </div>
    )
}