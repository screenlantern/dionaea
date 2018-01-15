import { render } from 'react-dom';
import 'normalize.css';
import './index.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import Dashboard from './components/Dashboard';

render(<Dashboard />, document.getElementById('root'));