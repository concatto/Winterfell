export default class ModalBase {
  constructor(id) {
    this.id = id;
  }

  open(args) {
    this.willOpen(args);
    this.element = $("#" + this.id);
    this.element.modal();
  }

  willOpen(args) {
    //do nothing
  }

  close() {
    this.element.modal("toggle");
  }
}
