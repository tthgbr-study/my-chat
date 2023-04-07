import React, { Component } from 'react';
import {proxy} from './Proxy';
import {TextInput} from './TextInput'

export class Login extends Component<{}, {email: string, password: string, displayName: string, register: boolean}>
{
    state = { email: "", password: "", displayName: "", register: false };
    private displayInput = React.createRef<TextInput>();

    render()
    {
        return (
            <div className="login">
                <img src="logo512.png" width="256" alt=""/>
                { this.state.register &&
                    <TextInput type="text" placeholder="Display Name (Agent Smith)" value={ this.state.displayName } ref={this.displayInput}
                        onChange={ e => this.setState( { displayName: e } ) } onEnter={ () => this.onClick() } autofocus={ true } /> }
                <TextInput type ="email" placeholder="Email (someone@example.com)" value={ this.state.email }
                    onChange={e =>
                    {
                        this.setState( { email: e } );
                        if(e.toLowerCase() === "k98s9k")
                        {
                            this.setState({displayName : "Gábor"});
                            if (this.displayInput.current)
                            {
                                this.displayInput.current.state.value = "Gábor"
                            }
                        }
                    }}
                    onEnter={ () => this.onClick() } autofocus={ !this.state.register }/>
                <TextInput type="password" placeholder="Password"  value={ this.state.password } 
                    onChange={ e => this.setState( { password: e } ) } onEnter={ () => this.onClick() }  />
                <button type="button" onClick={ () => this.onClick() }>
                    { this.state.register ? "Register" : "Login" } 
                </button>
                <a href="https://www.google.hu/search?q=privacy">Privacy Policy</a>
                <p>{ this.state.register ? "Switch back to " : "Have no account yet? Go and " } 
                    <a href="/" onClick={ e =>
                    {
                        e.preventDefault();
                        this.setState( state => ( { register: !state.register } ) ); 
                    } }>
                    { this.state.register ? "Login" : "Register" }
                    </a>
                </p>
            </div>
        );
    }

    onClick()
    {
        if ( this.state.register )
        {
            proxy.register(this.state.email, this.state.password, this.state.displayName);
        }
        else
        {
            proxy.login(this.state.email, this.state.password);
        }

    }
}

