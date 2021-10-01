import Vue from 'vue'
import App from './App.vue'
import VueHighlightJS from 'vue-highlightjs'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark.css';

import VueRouter from 'vue-router';
import CodeRunner from "./components/CoderRunner.vue";

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [{
		name: "code",
		path: '/code/:codeBase',
		component: CodeRunner,
		props: true
	}]
});

Vue.use(VueHighlightJS, {
	// Register only languages that you want
	languages: {
		javascript
	}
});

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	router
}).$mount('#app')