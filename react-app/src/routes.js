 
 export const Routes = {
  
    NotFound: { path: "/404" },
    ServerError: { path: "/Unauthorized" },


    //admin
    AdminHome : {path: "/adminHomePage"},
    ViewAllUsers : {path: "/user/viewAllUsers"},
    ViewAllFeedbacks : {path: "/feedbackandreport/viewAllFeedbacks"},
    ViewAllReports : {path: "/feedbackandreport/viewAllReports"},
    BroadcastAllUsers : {path: "/broadcast/broadcastAllUsers"},
    BroadcastSelectedUsers : {path: "/broadcast/broadcastSelectedUsers"},
    Admin : {path: "/adminHomePage"},

    
    UserHomePage : {path: "/UserHomePage"},

    Stream: {path: "/stream"},
    StreamInfo: { path: "/streamsinfo" },

    //content
    Video: {path: "/videos"},
    PlayVideo: { path: "/video/play" },
    UploadVideo: { path: "/video/upload" },
    EditVideo: { path: "/video/edit" },
    Analytics: { path: "/video/analytics" },

    //gig routes
    GigPlanAll: {path: "/gigs"},
    GigPlanNew: {path: "/gigs/new-plan"},
    GigMyRequestAll : {path:"/gigs/id/my-request"},
    GigPlanUpdate : {path: "/gigs/gigId/update"},
    GigPlanRequestAll : {path:"/gigs/gigId/view-all-request"},

 
};



export default Routes;  