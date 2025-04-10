import dom from '../shared/dom.js';
import chatComponent from '../component/chatComponent.js';

function homeView() {
    //return dom.create(`<p>Bienvenue sur mon site !</p>`);
    return chatComponent();
}
export default homeView;
