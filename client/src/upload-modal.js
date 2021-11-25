import { Component } from "react";

export default class UploadModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <>
                <div id="upload">
                    <div id="modal">
                        <h3>Upload a new profile pic</h3>
                    </div>
                </div>
            </>
        );
    }
}
