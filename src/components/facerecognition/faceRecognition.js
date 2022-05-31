import React from "react" ;
import "./facerecognition.css" ;

const FaceRecognition = ({imageURL , box}) => {
    return (
        <div className='center ma'>
            <div className='absolute m2'>
                <img id='inputimage' src={imageURL} width='500px' height='auto' />
                <div className='bounding-box' style={{top: box.topRow, right:box.rightCol, bottom:box.bottomRow, left: box.leftCol}} ></div>
            </div>
        </div>
    )
}

export default FaceRecognition ;