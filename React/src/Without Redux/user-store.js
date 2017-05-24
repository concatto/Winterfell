class UserStore {
  constructor() {
    this.information = {
      id: 30,
      avatar: "assets/avatar.jpg",
      name: "Samuel Brati Favarin",
      following: 1024
    }
  }

  getInformation() {
    return this.information;
  }
}

const userStore = new UserStore;
export default userStore;
