# Auth-Server

## API

* */token/get*
  * 功能：產生 token
  * request

  ```js
  無
  ```

  * response
  
  ```js
  200 OK
  `string` token string

  500 Server Error
  ```

* */token/check*
  * 功能： 驗證 token
  * request
  
  ```js
  header: jwt: {{token string}}
  ```

  * response

  ```js
  200 OK
  `string` token verify OK

  403 Forbidden

  500 Server Error
  ```

* */session/get*
  * 功能： get session object
  * request
  
  ```js
  header: jwt: {{token string}}
  ```

  * response

  ```js
  200 OK
  `object` session object

  403 Forbidden

  500 Server Error
  ```

* */session/set*
  * 功能： replace session object
  * request
  
  ```js
  header: jwt: {{token string}}
  body: session object
  ```

  * response

  ```js
  200 OK

  403 Forbidden

  500 Server Error
  ```