import React, {Component} from 'react';
import {TextInputOptions} from './TextInput'
import {TextInput} from './TextInput'

export interface TextInputAndButtonOptions extends TextInputOptions
{
    buttonContent?:string;
    onClick?: (text: string) => boolean | void;
}

export class TextInputAndButton extends Component<TextInputAndButtonOptions>
{
    textInput = React.createRef<TextInput>();

    onClick()
    {
        if ( this.props.onClick?.( this.textInput.current?.state.value ?? "" ) )
        {
            if (this.textInput.current) 
            {
                this.textInput.current.state.value = "";
            }
        }
    }

    render()
    {
        return (
            <div className="text-input-and-button">
                <TextInput { ...this.props } ref={ this.textInput } onEnter={ () => this.onClick() } />
                <button type="button" onClick={ () => this.onClick() }>
                    { this.props.buttonContent }
                </button>
            </div>
        );
    }
}