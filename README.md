# social media app

- [Full Stack MERN Project - Build and Deploy an App | React + Redux, Node, Express, MongoDB [Part 1/2]](https://www.youtube.com/watch?v=ngc9gnGgUdA&list=PL6QREj8te1P7VSwhrMf3D3Xt4V6_SRkhu&index=1)

## server

- init

```sh
> cd server
> npm init -y
> npm install body-parser cors express mongoose nodemon
```

- package

```js
// package.json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "nodemon index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mongoose": "^5.12.12",
    "nodemon": "^2.0.7"
  }
}

```

- connect DB
- Routing
- Backend Folder Structure
  - routes에서 사용하는 function이 길어지면 지저분해지니까 controller에 정리
- Controllers
- JSX Structure

## client

- init

```sh
> npx create-react-app client
> npm install axios moment redux redux-thunk
```

- file reader
  - react-file-base64 이거 설치가 안됨

```js
import React, { useState } from 'react';

const Form = () => {
	const [postData, setPostData] = useState({
		creator: '',
		selectedFile: '',
	});

	const addFileToPost = (e) => {
		let file = e.target.files[0];
		let reader = new FileReader();

		reader.readAsDataURL(file);

		reader.onload = (r) => {
			setPostData({ ...postData, selectedFile: r.target.result });
		};
	};

	return <input type="file" onChange={addFileToPost} />;
};

export default Form;
```

## reference

- [HTTP Status Codes](https://restapitutorial.com/httpstatuscodes.html)
