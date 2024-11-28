import './styles.css';
import { main as mainHTMLJS } from './HTMLJS.js';
import { main as mainVue } from './vue.js';


mainHTMLJS(document.getElementById('htmljs'));
mainVue(document.getElementById('vue'));
