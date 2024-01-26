# TODO
1. [] store username in a store
  - [x] get userinfo from endpoint https://docs.aws.amazon.com/cognito/latest/developerguide/userinfo-endpoint.html
  - [x] store it in hooks' locals
  - [x] redirect to website/vault/home
  - [ ] when the website is open in another tab it doesn't get logged out even if you are logged out in the other tab
2. create bookmarks page
3. create works page
4. create notes page
5. create gpt page
6. create projects page
7. create tasks page


# NOTE# S
1. cookies -  persistent you don't have to set it everytime unless a certain property is dynamic (eg. expiry)
2. locals - non-persistent. which means you have to set it every single time if you're using it in hooks. its basically an object where YOU CAN DO WHATEVER YOU WANT FOR WHATEVER PURPOSE.
  - define locals type in app.d.ts
  eg.  
  type User = {
    username: string,
    email: string
  }
  interface Locals {
    user: User | null
  } 




  1. lib/server is a private folder, you can save private javascript files there
  2. handle hook is like a middle ware
  3. documentation, check it, API reference is a good starting point
  4. I still don't understand +server.ts how its used. as well as +page.server actions
  5. locals can be accessed by any 'server' documents eg( page.server.svelte, server.ts, layout.server) in the load function. though if you want to define multiple hook functions use [sequence][https://kit.svelte.dev/docs/modules#sveltejs-kit-hooks]
