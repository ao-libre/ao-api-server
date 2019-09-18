import React, { Component } from 'react';
import { FileManager, FileNavigator } from '@opuscapita/react-filemanager';
import connectorNodeV1 from '@opuscapita/react-filemanager-connector-node-v1'
import './App.css';

class App extends Component {
  state = {
    response: '',
    fileSaved: false,
    fileContent: '',
    fileName: ''
  };

  setFilenameSelectedOnState() {
    let fileManagerFileSelected;
    fileManagerFileSelected = document.querySelector(".oc-fm--list-view__row--last-selected")
    if (fileManagerFileSelected) {
      let value = fileManagerFileSelected.querySelector(".oc-fm--name-cell__title");
      this.setState({ fileName: value.title });
    }
  }

  onItemClick = e =>  {
    this.setFilenameSelectedOnState()
  }

  handleSubmit = async e => {
    e.preventDefault();

    const response = await fetch(`http://localhost:1337/api/v1/admin/getFileByName`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName: this.state.fileName }),
    });
    const body = await response.text();
    this.setState({ fileContent: body });
  };

  handleSubmitSaveFile = async e => {
    e.preventDefault();

    const response = await fetch(`http://localhost:1337/api/v1/admin/editFileByName`, {
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

    const apiOptions = {
      ...connectorNodeV1.apiOptions,
      apiRoot: `http://localhost:1337/fileManager` // Or you local Server Node V1 installation.
    }

    
    const fileManager = (
     <div style={{ height: '480px' }}>
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
    


    return (
      <div className="App" onClick={this.onItemClick}>
        {fileManager}
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
            style={{width: 50 + 'em', height: 60 + 'em'}}
            id="fileEditor" 
            value={this.state.fileContent}
            onChange={e => this.setState({ fileContent: e.target.value })}
          />
          <button type="submit">Guardar</button>
        </form>
      </div>
    );
  }
}

function MessageInformation (props) {
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