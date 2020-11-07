import React, { Component } from "react";
import { Form } from "react-bootstrap";
export default class ImageUpload extends Component {
  fileObj = [];
  fileArray = [];

  constructor(props) {
    super(props);
    this.state = {
      file: [null],
    };
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
  }

  uploadMultipleFiles(e) {
    e.preventDefault();
    this.fileArray = [];
    this.fileObj = e.target.files;
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
    }
    this.props.passFiles(this.fileObj);
  }

  render() {
    return (
      <div>
        <div style={images}>
          {(this.fileArray || []).map((url) => (
            <img src={url} alt="..." style={image} />
          ))}
        </div>

        <div className="form-group">
          <input
            type="file"
            className="form-control"
            onChange={this.uploadMultipleFiles}
            multiple
            required
          />
          <Form.Text className="text-muted">
            Prva označena slika će biti prikazana na naslovnici oglasa.
          </Form.Text>
        </div>
      </div>
    );
  }
}

var images = {
  flex: 1,
  flexDirection: "row",
  flexWrap: "wrap",
};
var image = {
  width: "200px",
  marginRight: "20px",
};
