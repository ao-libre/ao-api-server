import React, { Component } from 'react';
import { FileManager, FileNavigator } from '@opuscapita/react-filemanager';
import connectorNodeV1 from '@opuscapita/react-filemanager-connector-node-v1'
import './App.css';

class App extends Component {
  state = {
    fileSaved: false,
    fileContent: '',
    fileName: '',
    loginPassword: '',
    loginMessage: '',
    isLogged: false
  };

  setFilenameSelectedOnState() {
    // Hago esto por que se scrappea el valor del explorador de archivos
    // Por que el mismo no esta terminado y no tiene editar :(

    let fileManagerFileSelected;
    fileManagerFileSelected = document.querySelector(".oc-fm--list-view__row--last-selected")
    if (fileManagerFileSelected) {
      let value = fileManagerFileSelected.querySelector(".oc-fm--name-cell__title");
      this.setState({ fileName: value.title });
    }
  }

  onItemClick = e => {
    this.setFilenameSelectedOnState()
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ fileContent: 'Buscando... si toma mas de 5 segundos el archivo no existe...' });

    const response = await fetch(`http://18.231.37.189:1337/api/v1/admin/getFileByName`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName: this.state.fileName }),
    });
    const body = await response.text();
    this.setState({ fileContent: body });
  };

  handleSubmitLogin = async e => {
    e.preventDefault();

    const response = await fetch(`http://18.231.37.189:1337/api/v1/admin/authorization`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: this.state.loginPassword }),
    });

    // Entramos aca is logeamos bien papa
    if (response.status === 200) {
      this.setState({ 
        isLogged: true,
      });
      return;
    }

    const body = await response.text();
    this.setState({ 
      loginMessage: body,
    });
  };

  handleSubmitSaveFile = async e => {
    e.preventDefault();

    const response = await fetch(`http://18.231.37.189:1337/api/v1/admin/editFileByName`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: this.state.fileName,
        fileContent: this.state.fileContent
      }),
    });

    const body = await response.text();

    this.setState({
      fileSaved: true,
      fileSavedMessage: body
    });
  };

  render() {

    let loginForm = (<div></div>);
    if (!this.state.isLogged) {
      loginForm = (
        <form onSubmit={this.handleSubmitLogin}>
          <h3>Ingresar Password</h3>
          <h5>{this.state.loginMessage}</h5>
          <input
            type="password"
            value={this.state.loginPassword}
            onChange={e => this.setState({ loginPassword: e.target.value })}
          />
          <button type="submit">Login</button>
        </form>
      );
    } else {
      loginForm = (
        <h1>PANEL ADMIN AO-LIBRE</h1>
      )
    }

    let authorizedContent = (<div></div>);
    if (this.state.isLogged) {

      const apiOptions = {
        ...connectorNodeV1.apiOptions,
        apiRoot: `http://18.231.37.189:1337/fileManager` // Or you local Server Node V1 installation.
      }
  
      const fileManager = (
        <div style={{ height: 30 + 'em' }}>
          <FileManager>
            <FileNavigator
              id="filemanager-1"
              api={connectorNodeV1.api}
              apiOptions={apiOptions}
              capabilities={connectorNodeV1.capabilities}
              listViewLayout={connectorNodeV1.listViewLayout}
              viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
            />
          </FileManager>
        </div>
      );
  
      authorizedContent = (
        <div>
          <div onClick={this.onItemClick}>
            {fileManager}
          </div>

          <MessageInformation
            fileSaved={this.state.fileSaved}
            fileSavedMessage={this.state.fileSavedMessage}
            fileName={this.state.fileName}>
          </MessageInformation>

          <form onSubmit={this.handleSubmit}>
            <p>
              <strong>ARCHIVO SELECCIONADO</strong>
            </p>
            <input
              type="text"
              value={this.state.fileName}
              onChange={e => this.setState({ fileName: e.target.value })}
            />
            <button type="submit">Buscar Archivo</button>
          </form>

          <form onSubmit={this.handleSubmitSaveFile}>
            <textarea id="fileEditor"
              style={{ width: 50 + 'em', height: 60 + 'em' }}
              id="fileEditor"
              value={this.state.fileContent}
              onChange={e => this.setState({ fileContent: e.target.value })}
            />
            <button type="submit">Guardar</button>
          </form>
        </div>
      );
    }


    return (
      <div className="App">
        {loginForm}
        {authorizedContent}
      </div>
    );
  }
}

function MessageInformation(props) {
  if (props.fileSaved) {
    return (
      <div>
        <h3>{props.fileSavedMessage}</h3>
      </div>
    );
  }

  return (
    <div></div>
  )

}

export default App;