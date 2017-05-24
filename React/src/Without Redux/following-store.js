class FollowingStore {
  constructor() {
    this.following = [
      {
        id: 50,
        avatar: "assets/avatar.jpg",
        name: "Vinícius Almeida dos Santos",
        publications: 50,
        following: 90
      }, {
        id: 70,
        avatar: "assets/avatar.jpg",
        name: "Vinícius Machado",
        publications: 51,
        following: 30
      }, {
        id: 990,
        avatar: "assets/avatar.jpg",
        name: "Halersson Paris",
        publications: 5,
        following: 999
      }, {
        id: 21,
        avatar: "assets/avatar.jpg",
        name: "Miguel Copatti",
        publications: 1,
        following: 65535
      },
    ];
  }

  getAll() {
    return this.following;
  }
}

const followingStore = new FollowingStore;
export default followingStore;
