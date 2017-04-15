class PublicationStore {
	constructor() {
		this.data = [
			{
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
				reactions: 10
			}, {
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
				reactions: 30
			}, {
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
				reactions: 40
			}
		];
	}

	getData() {
		return this.data;
	}
}

const publicationStore = new PublicationStore;
export default publicationStore;
