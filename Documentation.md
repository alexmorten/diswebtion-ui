## services

* Store
methods:
  - authenticate(email,password,callback,failCallback)
  - deauthenticate()
  - receive(url,callback,failCallback) : [string "login"]  (if not authenticated)
  - send(url,payload,callback,failCallback) : [string "login"]  (if not authenticated)
  - destroy(url,callback,failCallback) : [string "login"] (if not authenticated)
  - isAuthenticated() : boolean

## helperComponents

* AuthComponent
methods:
  - find(url,callback,failCallback)
  - post(url,payload,callback,failCallback)
  - delete(url,callback,failCallback)

* BasicAdddialogButton
attributes:
  - add: callback
  - title: string (Title for Dialog)
  - [message]: string (Message in Dialog)
  - [mini]: boolean (set to true for smaller Button)

* BasicDeleteDialogButton
attributes:
  - delete: callback
  - itemTitle: string (Name of item, which is about to be deleted)
  - [iconClass]: string (class of the icon for styling)
