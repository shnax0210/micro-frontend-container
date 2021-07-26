const React = require('react');
const ReactDOM = require('react-dom');

const Router = require('react-router-dom').Router;
const createBrowserHistory = require('history').createBrowserHistory;

const renderMicroFrontend = require('./micro-frontend.jsx').renderMicroFrontend;

const history = createBrowserHistory();

const MAIN_CONTAINER_ID = "mainContainer";

function fetchConfig() {
    return fetch("/config/env-setup.json")
        .then(response => {
            if (!response.ok) {
                console.log("Env configuration is not present, local one will be used instead");
                return fetch("/config/local-setup.json");
            }

            return new Promise(resolve => resolve(response));
        })
        .then(response => response.json());
}

class Application extends React.Component {
    componentDidMount() {
        fetchConfig().then(config => renderMicroFrontend(
            MAIN_CONTAINER_ID, config.miniFrontend.host, config.miniFrontend.name, history));
    }

    render() {
        return <div id={MAIN_CONTAINER_ID}/>
    }
}

ReactDOM.render(<Application/>, document.getElementById("application"));
