/* eslint-disable react/react-in-jsx-scope */
import Login from './login/Login'
import SpacioApp from './dash/SpacioApp'
import EntriesListing from './dash/EntriesListing'
import EntriesDetail from './dash/EntriesDetail'
import EntriesEdit from './dash/EntriesEdit'

import {  Route } from "react-router-dom";


// const mainRoutes = [
//     {
//         path: "/login",
//         name: "Login",
//         component: Login,
//         layout: "/app"
//       },
//       {
//         path: "/",
//         name: "SpacioApp",
//         component: SpacioApp,
//         layout: "/app"
//       }
// ]

const appRoutes = [
    {
        path: "/",
        name: "EntriesListing",
        component: EntriesListing,
        layout: "/admin"
      },
      {
        path: "/:id",
        name: "EntriesDetail",
        component: EntriesDetail,
        layout: "/admin"
      },
      {
        path: "/edit",
        name: "EntriesEdit",
        component: EntriesEdit,
        layout: "/admin"
      }
]

const appReactRoutes = appRoutes.map((prop, key) => {
  const Component = prop.component;
  return (
    <Route
            path= {prop.path}
            element= {<Component />}
            key={key}
          />
)
})


export default  appReactRoutes 