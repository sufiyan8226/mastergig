import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/index";
import Suggestions from "./components/Suggestions/index";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import User from "./components/User";
import UsersList from "./components/UserLists";
import ProfilePage from "./components/ProfilePage";
import NewPostTab from "./components/NewPostTab";

import { restoreUser } from "./store/session";
import Footer from "./components/footer/Footer";
import MessagePage from "./components/MessagePage";
import Video from "./pages/Video/Video";
import Stream from "./pages/Stream/Stream";
import StreamInfo from "./pages/Stream/StreamInfo";
import ContentPublic from "./pages/Content/ContentPublic";
import UploadVideo from "./pages/Content/UploadVideo";
import EditVideo from "./pages/Content/EditVideo";
import NotFound from "./pages/NotFound";
import Unathorized from "./pages/ServerError";

//gig pages
import GigPlanAll from "./pages/Gigs/Content_Creator/GigHomeContentCreator";                      
import GigPlanNew from "./pages/Gigs/Content_Creator/GiGPlanCreateCC";
import GigPlanRequestAll from "./pages/Gigs/Content_Creator/GigAllPending";
import GigPlanUpdate from "./pages/Gigs/Content_Creator/GigPlanUpdateFormCC";
import GigMyRequestAll from "./pages/Gigs/Content_Creator/GigMyReqsTable";
import GigMyReqsTable from "./pages/Gigs/Content_Creator/GigMyReqsTable";
import GigAllPending from "./pages/Gigs/Content_Creator/GigAllPending";


import Routes from "./routes"


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(restoreUser());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <div className="homepage">
        <NavBar />
        {user && <NewPostTab />}
        <Switch>
          <Route path="/login" exact={true}>
            <LoginForm />
            <Footer />
          </Route>
          <Route path="/sign-up" exact={true}>
            <SignUpForm />
            <Footer />
          </Route>
          <Route path="/unauthorized" exact={true}>
            <Unathorized/>
            <Footer />
          </Route>
          <Route path="/notfound" exact={true}>
            <NotFound/>
            <Footer />
          </Route>
          <ProtectedRoute path="/users" exact={true}>
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path="/users/:userId" exact={true}>
            <User />
          </ProtectedRoute>
          <ProtectedRoute path="/messages/:userId(\d*)">
            <MessagePage />
          </ProtectedRoute>
          <ProtectedRoute path="/" exact={true}>
            <div className="main_body">
              <div className="body_container">
                <div>
                  <ContentPublic />
                </div>
                <Suggestions />
              </div>
            </div>
          </ProtectedRoute>
          <ProtectedRoute exact path="/:username">
            <ProfilePage tagged={false} />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/:username/tagged">
            <ProfilePage tagged={true} />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/:username/liked">
            <ProfilePage liked={true} />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/:username/saved">
            <ProfilePage saved={true} />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/video/myVideo">
            <EditVideo />
          </ProtectedRoute>
          <ProtectedRoute path="/video/upload">
            <UploadVideo />
          </ProtectedRoute>
          <ProtectedRoute path="/video/play">
            <Video />
          </ProtectedRoute>
          <ProtectedRoute path="/stream/play">
            <Stream />
          </ProtectedRoute>
          <ProtectedRoute path="/stream/info">
            <StreamInfo />
          </ProtectedRoute>

          <ProtectedRoute path="/gigs">
            <GigPlanAll />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/gigs/id/my-request">
            <GigMyRequestAll/>
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/gigs/new-plan">
            <GigPlanNew />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/gigs/gigId/update">
            <GigPlanUpdate />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/gigs/my-request-table">
            <GigMyReqsTable />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/gigs/all-pending-request">
            <GigAllPending />
            <Footer />
          </ProtectedRoute> 
          <ProtectedRoute path="/:gigs/gigId/view-all-request">
            <GigPlanRequestAll />
            <Footer />
          </ProtectedRoute>  
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
