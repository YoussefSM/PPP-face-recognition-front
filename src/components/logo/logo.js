import React from "react" ;
import Tilt from 'react-tilt' ;
import Brain from './brain.png' ;

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 150, width: 150 , background:  'linear-gradient(to right, rgb(171, 58, 212), rgb(29, 215, 153))'  }} >
                <div className="Tilt-inner pa3">
                    <img style={{paddingTop:'5px'}} src={Brain} /> 
                </div>
            </Tilt>
        </div>
        
    )
}

export default Logo ;