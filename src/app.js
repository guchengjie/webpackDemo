import Layer from './components/layer/layer.js';
import './css/common.css';

const App = function () {
	const layer = new Layer();
	let app = document.getElementById('app');
	app.innerHTML = layer.html;
}

new App();