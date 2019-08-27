import * as React from 'react'

function log(target: any):any{
    console.log(target)
}

@log
class Test extends React.Component{
    render(){
        return (
            <div>test</div>
        )
    }
}

export default Test
