import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Drop extends Component() {

    drop = (e) => {
        e.preventDefault()
        const data = e.dataTransfer.getData('tranfer')
        e.target.appendChild(document.getElementById(data))
    }

    alloDrop = () => {
        e.preventDefault()

    }

    render() {
        return(
            <div id={this.props.id } onDrop={this.drop} onDragOver={this.allowDrop}>
                {this.props.children}
            </div>
        )
    }
}

Drop.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node
}


// import PropTypes from 'prop-types'

// export default class Drag extends Component{
    
//     drag = (e) => {
//         e.dataTransfer.setData('transfer', e.target.id)
//     }

//     noAllowDrop = () => {
//         e.stopPropagation()
//     }
    
//     render() {
//         return(
//             <div id={this.props.id} draggable='true' onDragOver={this.noAllowDrop}>
//                 {this.props.children}
//             </div>
//         )
//     }
// } 

// Drag.propTypes = {
//     id: PropTypes.string,
//     children: PropTypes.node
// }