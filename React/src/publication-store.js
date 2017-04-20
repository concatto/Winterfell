import {EventEmitter} from 'events';
import UserStore from './user-store.js';

class PublicationStore extends EventEmitter {
	constructor() {
		super();

		this.filter = false;
		this.data = {
			99: {
				author: {
					id: 30,
					avatar: "assets/avatar.jpg",
					name: "Samuel Brati Favarin"
				},
				timestamp: 1492061255,
				content: {
					title: "Prova de que o React funciona",
					image: "assets/react.png"
				},
				reactions: [100, 184, 28, 81, 72, 116, 131, 177, 47],
				ownReaction: 8,
				pubId: 99
			},
			233: {
				author: {
					id: 50,
					avatar: "assets/avatar.jpg",
					name: "Vinicius Almeida"
				},
				timestamp: 1492060255,
				content: {
					title: "Prova de que o React funciona",
					image: "assets/react.png"
				},
				reactions: [119, 52, 185, 67, 112, 189, 36, 166, 32],
				ownReaction: 3,
				pubId: 233
			},
			177: {
				author: {
					id: 99,
					avatar: "assets/avatar.jpg",
					name: "Miguel Copatti"
				},
				timestamp: 1492058255,
				content: {
					title: "Prova de que o React funciona",
					image: "assets/react.png"
				},
				reactions: [38, 81, 96, 177, 81, 196, 63, 116, 166],
				ownReaction: null,
				pubId: 177
			},
			123: {
				author: {
					id: 30,
					avatar: "assets/avatar.jpg",
					name: "Samuel Brati Favarin"
				},
				timestamp: 1492061254,
				content: {
					title: "Prova de que o React funciona e deleta direito",
					image: "assets/react.png"
				},
				reactions: [188, 24, 111, 20, 29, 143, 92, 56, 154],
				ownReaction: 1,
				pubId: 123
			}
		};
	}

	getPublication(pubId) {
		return this.data[pubId];
	}

	setFilter(filter) {
		if (this.filter !== filter) {
			this.filter = filter;
			this.emit("change");
		}
	}

	setActivePublication(pubId) {
		this.activePublication = pubId;
		this.emit("active-change", {pubId});
	}

	getData() {
		const publications = Object.keys(this.data).map((k) => this.data[k]);
		if (this.filter === true) {
			return publications.filter((pub) => {
				return UserStore.getInformation().id == pub.author.id;
			});
		} else {
			return publications;
		}
	}
}

const publicationStore = new PublicationStore;
export default publicationStore;
