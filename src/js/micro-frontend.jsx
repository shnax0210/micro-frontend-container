const React = require('react');
const ReactDOM = require('react-dom');

class MicroFrontend extends React.Component {
    componentDidMount() {
        const {name, host} = this.props;
        const scriptId = `micro-frontend-script-${name}`;

        if (document.getElementById(scriptId)) {
            this.renderMicroFrontend();
            return;
        }

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = `${host}/dest/js/bundle.js`;
        script.onload = this.renderMicroFrontend;
        document.head.appendChild(script);
    }
    
    componentWillUnmount() {
        const {name} = this.props;
        window[`unmount${name}`](`${name}-container`);
    }

    renderMicroFrontend = () => {
        const {name, history, basePath} = this.props;
        window[`render${name}`](`${name}-container`, history, basePath);
    };

    render() {
        return <div id={`${this.props.name}-container`}/>;
    }
}

window.renderMicroFrontend = function (containerId, host, name, history, basePath) {
    ReactDOM.render(<MicroFrontend host={host} name={name} history={history} basePath={basePath}/>, document.getElementById(containerId));
}

exports.renderMicroFrontend = window.renderMicroFrontend;
