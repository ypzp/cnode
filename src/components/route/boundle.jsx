import React from 'react';
import PropTypes from 'prop-types';

export default class Bundle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            component: null
        };
    }

    componentWillMount() {
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load(props) {
        this.setState({
            component: null
        });
        props.load((mod) => {
            this.setState({
                component: mod.default ? mod.default : mod
            });
        });
    }

    render() {
        return this.state.component ? this.props.children(this.state.component) : null;
    }
}
Bundle.propTypes = {
    load: PropTypes.func,
    children: PropTypes.func
  };