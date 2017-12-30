// @flow

import React from 'react';
import { StyledForm } from './Styled';
import Input from './Input';
import Textarea from './Textarea';
import Button from './Button';

const availableElements = {
  module_form_input: Input,
  module_form_textarea: Textarea,
  module_form_button: Button
};

class Form extends React.Component {
  constructor(props: any) {
    super(props);
    this.onFieldChanged = this.onFieldChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  state: {

  };
  componentWillReceiveProps(nextProps: any) {
    if (this.props.loading && !nextProps.loading && !nextProps.error) {
      this.clearForm();
    }
  }

  onFieldChanged(event: Event & { target: EventTarget }) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  clearForm() {
    if (this.props.onClose) {
      this.props.onClose();
    }
    if (this.formEl) {
      this.formEl.reset();
    }
    this.setState({});
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (!this.props.loading && this.state) {
      this.props.onSubmitRequest({
        subject: this.props.content.title,
        sender: this.state.sender,
        body: `${this.state.message} \n \n Name: ${this.state
          .senderName}`
      });
    }
  }

  formEl: HTMLFormElement;
  clearForm: Function;
  onSubmit: Function;
  onFieldChanged: Function;

  renderElements() {
    const elements = [];
    const { fieldFormElements } = this.props.content;
    if (fieldFormElements) {
      fieldFormElements.forEach(content => {
        if (content) {
          const Element = availableElements[content.entityBundle];
          if (Element) {
            elements.push(
              <Element
                content={content}
                key={content.title}
                loading={this.props.loading}
              />);
          }
        } else {
          console.log('element not found', content);
        }
      });
    }
    return elements;
  }
  render() {
    if (this.props.content) {
      return (
        <StyledForm>
          <div className='container'>
            <div className='row'>
              <div className='col-md-6 offset-md-3'>
                <form
                  ref={el => this.formEl = el}
                  className='contact-form'
                  onSubmit={this.onSubmit}
                  onChange={this.onFieldChanged}
                >
                  {this.renderElements()}
                  {this.props.error &&
                    <div className='alert alert-warning' role='alert'>
                      {this.props.error}
                    </div>
                  }
                </form>
              </div>
            </div>
          </div>
        </StyledForm>
      );
    }
    return null;
  }
}

export default Form;
