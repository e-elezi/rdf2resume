import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { Combobox } from "react-widgets";
import { submitFifthButtonLabel, submitModalRDFaTitle } from '../../../../../translations/translations';
import { ListItem, languages } from "../../../../core/LanguageToggle";

class SubmitRDFaModal extends Component {
    state = {
        language: 'en'
    };

    componentWillMount() { }

    handleSave = e => {
        e.preventDefault();
    };

    handleConverting = () => {
        this.props.generateHTML(this.state.language);
    };

    handleLanguageChange = (value) => {
        this.setState({
            language: value
        })
    }

    render() {

        let lang = this.props.language;

        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="submit-modal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {submitModalRDFaTitle[lang]}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Combobox
                        onChange={this.handleLanguageChange}
                        defaultValue={"en"}
                        containerClassName="languagebox submit-window"
                        data={languages}
                        itemComponent={ListItem}
                    />{" "}
                </Modal.Body>
                <Modal.Footer style={{ justifyContent: "center" }}>
                    <Button variant="primary" onClick={this.handleConverting}>
                        {submitFifthButtonLabel[lang]}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapstateToProps = state => {
    return {
        language: state.utility.language
    };
};

export default connect(
    mapstateToProps,
    {}
)(SubmitRDFaModal);
