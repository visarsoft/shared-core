// @flow

import * as React from 'react';
import { StyledForm } from './Styled';
import Input from './Input';
import Textarea from './Textarea';
import Button from './Button';

const availableElements = {
  module_form_input: Input,
  module_form_textarea: Textarea,
  module_form_button: Button
};

type Props = {
  loading: boolean,
  error: string,
  onSubmitRequest: Function,
  onClose: Function,
  content: {
    title: string,
    elements: Array<any>
  },
};

type State = {
  [string]: string,
};

class Form extends React.Component<Props, State> {
  static state = {};
  constructor(props: any) {
    super(props);
    this.onFieldChanged = this.onFieldChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props.loading && !nextProps.loading && !nextProps.error) {
      this.clearForm();
    }
  }
  onFieldChanged(event: SyntheticEvent<any> & { currentTarget: any }) {
    const { name, value } : { name: string, value: string } = event.currentTarget.name;
    this.setState({
      [name]: value
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.props.onSubmitRequest && !this.props.loading && this.state) {
      this.props.onSubmitRequest({
        subject: this.props.content.title,
        sender: this.state.sender,
        body: `${this.state.message} \n \n Name: ${this.state
          .senderName}`
      });
    }
  }

  onFieldChanged: Function;
  onSubmit: Function;
  formEl: HTMLFormElement;
  clearForm: Function;
  renderElements() {
    const result = [];
    const { elements } = this.props.content;
    if (elements) {
      elements.forEach(({ entity }) => {
        if (entity) {
          const Element = availableElements[entity.entityBundle];
          if (Element) {
            result.push(
              <Element
                content={entity}
                key={entity.title}
                loading={this.props.loading}
              />
            );
          }
        } else {
          console.log('element not found', entity);
        }
      });
    }
    return result;
  }
  render() {
    if (this.props.content) {
      return (
        <StyledForm>
          <div className='container'>
            <div className='row'>
              <div className='col-md-6 offset-md-3'>
                <form
                  ref={(el: any) => { this.formEl = el; }}
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
