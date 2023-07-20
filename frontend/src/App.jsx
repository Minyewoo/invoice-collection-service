import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store';
import Routes from '@/routes';

function App() {
    return (
        <Router>
            <Provider store={store}>
                <Routes />
            </Provider>
        </Router>
    );
}

export default App;
