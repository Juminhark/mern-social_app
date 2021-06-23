# social media app

- [deploy](https://juminhark-mern-social-app.zeet.app/)

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
  - 일단 react-file-base64 동작하는 version으로 가져옴

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

## [HEROKU](https://www.heroku.com/)

- server side Deploy

```sh
> npm install -g heroku
> heroku -v

> heroku login
```

## [NETLIFY](https://app.netlify.com/)

- sites 하단에 build로 추가

```sh
> npm run build
```

## auth

```sh
// client
> npm install jwt-decode react-google-login


// server
> npm install bcryptjs jsonwebtoken
```

## Optional chaining

- [DOC](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

```js
//? res?. : 있으면 하부 prop 사용. 없으면 undefined
const result = res?.profileObj;
```

- error : syntax error : optional chaining이 안먹히네?
  - version문제 : react-scripts 4+ 이상에서 동작이 될때도 있고 3.x.x에서 될때도 있고 판단하기 어려움
  - [도움](https://www.carlrippon.com/optional-chaining-with-react-and-typescript/)에서 확인한 version
    - TypeScript 3.7 supports optional chaining
    - Babel 7.8.0 supports optional chaining
    - Projects created with create react app 3.3.0 supports optional chaining as well!

```sh
Syntax error: C:/DEV/mern-social_app/client/src/components/Auth/Auth.js: Unexpected token (60:21)

  58 |
  59 |  const googleSuccess = async (res) => {
> 60 |          const result = res?.profileObj;
     |                             ^
  61 |          const token = res?.tokenId;
  62 |
  63 |          try {

```

## useLocation

```ts
import { useLocation } from 'react-router-dom';

const Navbar = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();

	// location(url)의 변화가 있을경우
	useEffect(() => {
		const token = user?.token;

		setUser(JSON.parse(localStorage.getItem('profile')));
	}, [location]);
};
```

## [Zeet - Deploy](https://zeet.co/new)

## update 2.0

```sh
> cd client
> npm install @material-ui/lab material-ui-chip-input

```

## Pagination

- client

```ts
// Home
<Pagination page={page} />;

// Pagination
useEffect(() => {
	if (page) dispatch(getPosts(page));
}, [page]);

// actions/posts
export const getPosts = (page) => async (dispatch) => {
	try {
		const { data } = await api.fetchPosts(page);

		dispatch({ type: FETCH_ALL, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

// api/index
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
```

- server

```ts
// controllers/posts
export const getPosts = async (req, res) => {
	const { page } = req.query;

	try {
		const LIMIT = 8;

		// get the stating index of every page
		const startIndex = (Number(page) - 1) * LIMIT;

		const total = await PostMessage.countDocuments({});

		const posts = await PostMessage.find()
			.sort({ _id: -1 })
			.limit(LIMIT)
			.skip(startIndex);

		res.status(200).json({
			data: posts,
			currentPage: Number(page),
			numberOfPage: Math.ceil(total / LIMIT),
		});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
```

## Loading

```ts
// constants/actionType
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

// reducers/posts
import { START_LOADING, END_LOADING } from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {
	switch (action.type) {
		case START_LOADING:
			return { ...state, isLoading: true };
		case END_LOADING:
			return { ...state, isLoading: false };
		default:
			return state;
	}
};

// actions/posts
import { START_LOADING, END_LOADING } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.fetchPosts(page);

		dispatch({ type: FETCH_ALL, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error.message);
	}
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const {
			data: { data },
		} = await api.fetchPostsBySearch(searchQuery);

		dispatch({ type: FETCH_BY_SEARCH, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};
```

## [Math.ceil()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)

## reference

- [HTTP Status Codes](https://restapitutorial.com/httpstatuscodes.html)
- [Full Stack MERN Project - Build and Deploy an App | React + Redux, Node, Express, MongoDB [Part 1/2]](https://www.youtube.com/watch?v=ngc9gnGgUdA&list=PL6QREj8te1P7VSwhrMf3D3Xt4V6_SRkhu&index=1)
- [Full Stack MERN Project - Build and Deploy an App | React + Redux, Node, Express, MongoDB [Part 2/2]](https://www.youtube.com/watch?v=aibtHnbeuio)
- [MERN Auth - Login with Email (JWT) + Google OAuth Authentication | React, Node, Express, MongoDB](https://www.youtube.com/watch?v=LKlO8vLvUao&list=PL6QREj8te1P7VSwhrMf3D3Xt4V6_SRkhu&index=8)
