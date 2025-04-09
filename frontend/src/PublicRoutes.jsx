import { Route, Routes } from "react-router-dom";
import Detection from "./component/Detection";
import Detected from "./component/Detected";
import MyForm from "./component/MyForm";
import Test from "./component/test";
import DetectedVideos from "./component/DetectedVideos";
import Dashboard from "./component/Dashboard";
import Home from "./component/Home";
import Profile from "./component/Profile";

function  PublicRoutes(){
    return (<>
     <Routes>
     <Route path="/detection" element={<Detection />} />
   
     <Route path="/detected/:video" element={<Detected />} />

     <Route path="/myform" element={<MyForm />} />

     <Route path="/test" element={<Test />} />

     <Route path="/detectedvideos" element={<DetectedVideos />} />

     <Route path="/dashboard" element={<Dashboard/>}></Route>
     
     <Route path="/home" element={<Home/>}></Route>
     
     <Route path="/profile" element={<Profile/>}></Route>
     </Routes>
    </>)
}




export default PublicRoutes;