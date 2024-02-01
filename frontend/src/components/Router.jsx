import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Error from "./Error";
import Posts from "./Post/Posts";
import Chats from "./Chat/Chats";
import Friends from "./Friend/Friends";
import Requests from "./Request/Requests";
import Messages from "./Chat/Message/Messages";
const router = createBrowserRouter([
    {
        path: "/", 
        element: <App />,
        errorElement: <Error />, 
        children: [
            {   index: true, 
                element:<Posts /> },
            {
                path: "posts/",
                element: <Posts />, 
                children: [
                    {
                        path: ":postId"
                    }
                ]
            }, 
            {
                path: "chats/", 
                element: <Chats />, 
                children: [
                    {
                        path: ":chatId/messages", 
                        element: <Messages />
                    }
                ]

            }, 
            {
                path: "friends/", 
                element: <Friends />, 
                
            }, 
            {
                path: "requests/", 
                element: <Requests />
            }, 
            {
                path: "/signup", 
                element: <Signup />,
                errorElement: <Error />
        
            }
            ,
            {
                path: "/login", 
                element: <Login />,
                errorElement: <Error />, 
            }
        ]

    }, 
    
])
export default function Router() {
    return(
        <RouterProvider router={router} />
    )
}
