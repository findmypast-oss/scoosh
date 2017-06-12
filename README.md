# scoosh

A code generation tool to make adding code a scoosh
<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [turingsnip](#turingsnip)
	- [Setup](#setup)
	- [Usage](#usage)
	- [Creating snippet templates.](#creating-snippet-templates)
		- [The EJS Template File](#the-ejs-template-file)
		- [The Snippet JSON Configuration File](#the-snippet-json-configuration-file)
			- [Properties](#properties)

<!-- /TOC -->

## Setup

```sh
sudo apt install xsel
sudo npm install turingsnip -g
```

## Usage

1. Clone an existing snippets folder.
  ```sh
  git clone git@github.com:findmypast/turingsnip-titan-snippets.git
  ```

* If the folder is in our home folder called snippets then run this command.

  ```sh
  turingsnip addfolder ~/snippets
  ```

* Create a multi-file snippet with create, make sure you are in the folder where the files should be created.
  ```sh
  turingsnip create component
  ```

* Put a snippet into the clipboard with

  ```sh
  turingsnip clip newcomponent
  ```

## Creating snippet templates.

Each snippet has a template file in [EJS syntax](https://github.com/mde/ejs/blob/master/docs/syntax.md), and a JSON configuration file.

### The EJS Template File

The extension should indicate the language for the snippet and not '.ejs'.



For example : `newcomponent.js`
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
import React, { Component } from 'react';
import Relay from 'react-relay';

In this example there are three template substitutions
```js
<%- ComponentName %>
<%- InterestingList %>
<%- SomeBoolean %>
```

### The Snippet JSON Configuration File
This file specifies how the template substitutions are fetched from user input. It should have a `.json` extension.

#### Properties
- **templateFile** - This should be the filename of the template above.
- **question** - This is the json used by the [inquirer library](https://github.com/SBoudrias/Inquirer.js) for fetching interactive input from users.
[Guide for inquirer question syntax](https://github.com/SBoudrias/Inquirer.js#questions)

`newcomponent.json`
```json
{
  "templateFiles": {
    "template": "newcomponent.js",
  },
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
