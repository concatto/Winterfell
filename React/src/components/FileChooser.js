import React from 'react';
import { Button } from 'react-bootstrap';

export default class FileChooser extends React.Component {
  handleChange() {
    //Something was chosen
    if (this.fileInput.files && this.fileInput.files[0]) {
      this.props.onChoose(this.fileInput.files[0]);
    }
  }

  handleRef(ref) {
    this.fileInput = ref;
    if (this.props.refCallback) {
      this.props.refCallback(ref);
    }
  }

  render() {
    return (
      <div className={"text-center " + this.props.className}>
        <Button onClick={(e) => this.fileInput.click()}>
          {this.props.children}
        </Button>

        <input type="file" style={{display: "none"}}
          onChange={() => this.handleChange()}
          ref={(r) => this.handleRef(r)}
        />
      </div>
    );
  }
}
