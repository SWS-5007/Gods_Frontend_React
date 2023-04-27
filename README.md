## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Axios (axios)

https://github.com/axios/axios

HTTP client for making API calls.
It is configured [here](/src/api/axios.js) and that's where the following things are handled:

- JWT token attached to each request
- X-Whitelabel header attached to each request
- Pause requests when token is expired, and get a new refresh token

The endpoints URLs are all defined under [endpoints](/src/api/endpoints).
You should always import the configured axios instance instead of the default improt from the library.

### react-auth-kit

https://github.com/react-auth-kit/react-auth-kit

This is the module that is used for JWT authentication. The session is created [here](/src/screens/Login.js#44) and it stores the session data in local storage. Axios pulls the auth data directly out of local storage for use in [authentication](/src/api/interceptors.js).

To get the current user token, we can use: `localStorage.getItem("_auth")` <br>

To get the current user object, we can use: `localStorage.getItem("_auth_state")`

### react-hot-toast

https://github.com/timolins/react-hot-toast

This library is wrapped into the [useToast hook](/src/hooks/useToast.js).
API calls can be used in the following way:

- Connect with the hook:

```
const { toast, loading } = useToast({
    options: { id: 'unique-request-id' },
})
```

- Wrap your request with the `toast` function:
```
    // axios is a wrapper from the /src/api/index.js
    // use this instead of importing directly from "axios"
    // since it is already configured with interceptors

    // the `login` method lives within endpoints directory
    // this should contain a simple request object 
    const promise = axios(
        login({
            email: username,
            password,
            remember_me: remember,
        })
    )
    toast(promise)
    const response = await promise
    // do anything with the response
```

- Use `loading` indicator when needed:
```
    <Button disabled={loading} onClick={onSubmit}>
       Submit
    </Button>
```