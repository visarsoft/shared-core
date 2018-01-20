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
  onSubmit: Function,
  onClose: Function,
  content: {
    title: string,
    elements: Array<any>
  },
};

type State = {
  fields: {
    [string]: string
  },
};

class Form extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.onFieldChanged = this.onFieldChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      fields: {}
    };
  }

  componentWillReceiveProps(nextProps: any) {
    if (this.props.loading && !nextProps.loading && !nextProps.error) {
      this.clearForm();
    }
  }
  onFieldChanged(event: SyntheticEvent<HTMLInputElement> & { target: HTMLInputElement }) {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      const { name, value } : { name: string, value: string } = event.target;
      const fields = Object.assign(this.state.fields, {
        [name]: value
      });
      this.setState({
        fields
      });
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.props.onSubmit && !this.props.loading && this.state) {
      this.props.onSubmit(this.state.fields);
    }
  }

  onFieldChanged: Function;
  onSubmit: Function;
  formEl: HTMLFormElement;
  clearForm: Function;

  clearForm() {
    if (this.props.onClose) {
      this.props.onClose();
    }
    if (this.formEl) {
      this.formEl.reset();
    }
    this.setState({
      fields: {}
    });
  }
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
