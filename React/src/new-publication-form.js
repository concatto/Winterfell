import React from 'react';

export default class NewPublicationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {image: null};
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.image) {
      this.props.callback(this.title.value, this.state.image);
    } else {
      alert("Escolha uma imagem!");
    }
  }

  handleFile(event) {
    const input = event.target;

    const self = this;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        self.setState({
          image: e.target.result
        });
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  render() {
    return (
      <form id="new-publication-form" onSubmit={(e) => this.handleSubmit(e)}>
        <div className="form-group">
          <label htmlFor="publication-title">Título:</label>
          <input type="text" className="form-control" required id="publication-title"
            placeholder="Digite um título para sua nova publicação" ref={(i) => this.title = i}/>
        </div>

        <div className="publicationBox text-center">
          <img id="actualImage" className={"img-square avatarImage " + (this.state.image ? "" : "hidden")}
            src={this.state.image}/>

          <div id="placeholderBlock" className={"center-block " + (this.state.image ? "hidden" : "")}>
            <div className="avatarImage" id="placeholderSquare">
              <span className="glyphicon glyphicon-picture" id="imagePlaceholder"></span>
            </div>
          </div>
          <label className="btn btn-default" htmlFor="newImage">Escolha uma imagem</label>
          <input className="hidden" type="file" name="newImage" id="newImage" accept="image/*"
            onChange={(e) => this.handleFile(e)}/>
        </div>
      </form>
    );
  }
}
