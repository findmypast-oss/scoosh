# turingsnip

A tool for putting code snippets on your clipboard.

## Requirements

Unix (preferably Ubuntu).

## Setup

#### Ubuntu

```sh
sudo apt install xsel
npm install turingsnip -g
```

## Creating a snippet.

Each snippet has an EJS template file, and a JSON configuration file.

#### The EJS Template File

The extension should indicate the language for the snippet and not '.ejs'.

[EJS syntax](https://github.com/mde/ejs/blob/master/docs/syntax.md)

For example

`newcomponent.js`
```js
import React, { Component } from 'react';
import Relay from 'react-relay';

class <%- ComponentName %> extends Component {
  // <%- InterestingList %>
  constructor() {
    super();
  }
  render() {
    return (
      <div><%- SomeBoolean %></div>
    );
  }
}
```

In this example there are three template substitutions
```js
<%- ComponentName %>
<%- InterestingList %>
<%- SomeBoolean %>
```

#### The Snippet JSON Configuration File
Thgis file specifies how the template substitutions are fetched from the user. It should have a `.json` extension.

##### Properties
- **templateFile** - This should be the filename of the template above.
- **question** - This is the json used by the inquirer library for fetching interactive input from users.
[Guide for inquirer question syntax](https://github.com/SBoudrias/Inquirer.js#questions)

`newcomponent.json`
```json
{
  "templateFile": "newcomponent.js",
  "questions": [
    {
      "name": "ComponentName",
      "type": "input",
      "default": "<SPECIFYNAMEHERE>",
      "message": "the component name of the blahdeblah"
    },
    {
      "name": "InterestingList",
      "type": "list",
      "choices": [
        "can't code", "social foibles", "doesn't like pizza"
      ],
      "message": "the interesting of the blahdeblah"
    },
    {
      "name": "SomeBoolean",
      "type": "list",
      "choices" : ["true","false"],
      "message": "Select a boolean...because"
    }
  ]
}
```

## Registering a folder of snippets
Once we have a snippets folder we need to register it with turingsnip. If the folder is in our home folder called snippets then run this command.

```sh
turingsnip addfolder ~/snippets
```

## Usage

Put a snippet into the clipboard with

```sh
turingsnip clip newcomponent
```
