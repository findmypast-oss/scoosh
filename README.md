# scoosh

A code generation tool to make adding code a scoosh
<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [scoosh](#scoosh)
	- [Setup](#setup)
	- [Usage](#usage)
	- [Creating snippet templates.](#creating-snippet-templates)
		- [The EJS Template File](#the-ejs-template-file)
		- [The Snippet JSON Configuration File](#the-snippet-json-configuration-file)
			- [Properties](#properties)

<!-- /TOC -->

## Setup

```sh
sudo npm install scoosh -g
```

## Usage

If you are using Scoosh for the first time then create a .scoosh file in your project root folder and specify the path to your code generation templates.

.scoosh

```
{
  "snippetFolders": ["snippetFolders"]
}
```

Now run

```scoosh preview```

Previews a code generation task with interactive questions.

```scoosh generate```

Generates the files for the chosen template.


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
  "operations": [
    {
      "operation": "create",
      "templateFile": "newcomponent.js",
      "createFile": "<%- _.kebabCase(ComponentName) %>"
    }
  ],
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
