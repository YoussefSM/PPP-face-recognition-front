import React from "react" ; 

const Rank = ({user}) => {
    return (
        <div >
            <span className='white f3'>
                {user.name}, your current entries are 
            </span> &nbsp; &nbsp;
            <span className='white f2'>
                {user.entries}
            </span>
        </div>
        
    )
}

export default Rank ;