import React from 'react'

const Filter = (props) => {
    return (
        <div>
            <p>filter shown with <input type="text" onChange={props.onChange} /></p>
        </div>
    )
}

export default Filter