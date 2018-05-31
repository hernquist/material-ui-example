import React from 'react';
import ViewportContext from './ViewportContext';

class WindowResizeTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewport: { width: 0, height: 0 },
            loading: true,
            orgs: [],
        };
    }
    updateWindowDimensions = () => {
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        console.log('window size:', viewport);
        this.setState({ viewport });
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    render() {
        return (
            <ViewportContext.Provider value={this.state.viewport}>
                {this.props.children}
            </ViewportContext.Provider>
        );
    }
}

export default WindowResizeTracker;
