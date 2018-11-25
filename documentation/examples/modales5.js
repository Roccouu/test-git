'use strict';
// La pseudoclase constructora
function Modal(props) {
	this.props = props || {};
	this.modalDOM = null; // El modal
}
// El prototipo de la pseudoclase
Modal.prototype = {
	modalContainer: null, // Contenedor para albergar al modal
	buildModal: function () {
		var	styles = ['warning', 'info', 'error', 'success', 'default'], // Los estilos
				buttons = {'cancel': null, 'accept': null, 'close': null, 'quit': null}, // Los botones
				modalHeader = null, modalLogo = null, modalContent = null, modalFooter = null, i = 0,
				that = this,
				close = function () { // Elimina el Componente del DOM
					that.modalContainer.removeChild(that.modalDOM);
					that.modalDOM = null;
				},
				accept = function () { // Ejecuta la función determinada después de puslar Aceptar
					if('callback' in that.props) that.props.callback();
					close(); // Cierra el Modal
				},
				bindEvent = function (e) { // 
					e.preventDefault();
					e = e.target.id.split('-')[0];
					if (e === 'accept') accept();
					else if (!e.search(/\bquit\b|\bcancel\b|\bclose\b|\bmodal\b/)) close();
				},
				modalHeader = null,
				modalBody = null,
				modalFooter = null,
				modalLogo = null,
				modalTitle = null,
				modalSubtitle = null,
				modalContent = null;

		this.modalContainer = ('container' in this.props && typeof this.props.container === 'string')
			? document.getElementById(this.props.container) : document.body;

		this.modalDOM = document.createElement('DIV');
		this.modalDOM.setAttribute('id', 'modal');

		modalHeader = document.createElement('HEADER');
		modalBody = document.createElement('SECTION');
		modalFooter = document.createElement('FOOTER');
		modalHeader.setAttribute('id', 'header-modal');
		modalBody.setAttribute('id', 'body-modal');
		modalFooter.setAttribute('id', 'footer-modal');
		
		modalLogo = new Logo();
		modalLogo = modalLogo.buildLogo().getLogo();
		modalTitle = document.createElement('P');
		modalTitle.setAttribute('id', 'title-modal');
		modalTitle.innerHTML = ('title' in this.props) ? this.props.title : 'My app';

		modalSubtitle = document.createElement('P');
		modalContent = document.createElement('P');
		modalSubtitle.setAttribute('id', 'subtitle-modal');
		modalContent.setAttribute('id', 'content-modal');
		modalSubtitle.innerHTML = ('subtitle' in this.props) ? this.props.subtitle : 'Subtitle';
		modalContent.innerHTML = ('content' in this.props) ? this.props.content : 'Greetings from Modal Content!';

		for(i in buttons) {
			buttons[i] = new Button({'type':i, 'id':i});
			buttons[i] = buttons[i].buildButton().getButton();
			buttons[i].setAttribute('title', (i.split('')[0].toUpperCase() + i.split('').slice(1).join('')));
		}

		modalHeader.appendChild(modalLogo);
		modalHeader.appendChild(modalTitle);
		modalHeader.appendChild(buttons['quit']);

		modalBody.appendChild(modalSubtitle);
		modalBody.appendChild(modalContent);

		if('buttons' in this.props && this.props.buttons.length && this.props.buttons.length <= 1) {
			for (i = 0; i < this.props.buttons.length; i++) {
				if(this.props.buttons[i] in buttons) modalFooter.appendChild(buttons[this.props.buttons[i]]);
			}
		} else {
			modalFooter.appendChild(buttons['accept']);
		}

		this.modalDOM.appendChild(modalHeader);
		this.modalDOM.appendChild(modalBody);
		this.modalDOM.appendChild(modalFooter);
		this.modalDOM.addEventListener('click', bindEvent);

		console.log('El Componente JS:', this, '\n\nEl Componente HTML:', this.modalDOM);

		/*  modalDom adoptará la siguiente característica HTML:
				<div id="modal">
					<header id="modal-header">
						<div class="Logo"></div>
						<p id=”title”></p>
						<button id="quit" title="Cerrar">x</button>
					</header>
					<section id="modal-body">
						<p id="modal-subtitle" >Subtitle</p>
						<p id="modal-content">Greetings from Modal Content!</p>
					</section>
					<footer id="modal-footer">
						<button id="modal-accept">Aceptar</button>
						<button id="modal-cancel">Cancelar</button>
					</footer>
				</div>
		*/
		return this;
	},
	render: function () {
		this.modalContainer.appendChild(this.modalDOM);
	}
}