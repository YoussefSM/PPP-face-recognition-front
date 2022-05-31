import React from "react" ; 
import './imageLinkForm.css' ;

const ImageLinkForm = ({ onInputChange , onSubmit }) => {
    return (
        <div className='ma4 mt0'>
            <p className='f3'>
                {'this will detect faces in your picture try it !'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input type='text' className='f4 pa2 w-70 center' placeholder='paste an image url here' onChange={onInputChange} />
                    <button 
                    className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                    onClick={onSubmit}>
                        Detect
                    </button>
                </div>     
            </div>
        </div>
        
    )
}

export default ImageLinkForm ;