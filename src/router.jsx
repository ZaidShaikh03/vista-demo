import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Timelapse from "./components/Timelapse";
// const AhmedabadMap = lazy(() => import("./components/AhmedabadMap"));
import BangaloreMap from "./components/BangaloreMap.jsx";
// const Sanand = lazy(() => import(".././src/components/Sanand.jsx"));
import Rajankunte from "./components/Rajankunte.jsx";
// const Header = lazy(() => import("./components/Header"));
import Header from "./components/Headers/Header.jsx";
import TimelapseDataPointMap from "./components/Timelapse/TimelapseDataPointMap.jsx";
// const BlueValley = lazy(() => import("./components/Bluevalley.jsx"));
import Sattvalumina from "./components/Sattvalumina.jsx";
import WingDetails from "./components/WingDetail.jsx";
import View360 from "./components/View360.jsx";
import ImagePage from "./components/ImagePage.jsx";
import Clubthreesixtyimage from "./components/Clubthreesixtyimage.jsx";
import BangaloreMapTest from "./components/BangaloreMapTest.jsx";
import Rajyash from "./components/Rajyash.jsx";
import Roseate from "./components/Roseate.jsx";
import FloorPlanModal from "./components/FloorPlanModal.jsx";

import PlotDetail from "./components/Headers/PlotDetail.jsx";

import FloorPlanRajyash from "./components/FloorPlanRajyash.jsx";
import FloorPlan from "./components/FloorPlan.jsx";
import Sanand from "./components/Sanand.jsx";
import RoyceLTWO from "./components/RoyceLTWO.jsx";
import RoycelOne from "./components/RoycelOne.jsx";
import NewDummy from "./components/NewDummy.jsx";
// const SanandTimelapse = lazy(() =>
//   import("./components/Timelapse/SanandTimelapse.jsx")
// );
// import SanandTimelapse from "./components/Timelapse/SanandTimelapse.jsx";
// const AhmedabadTimelapse = lazy(() =>
//   import("./components/Timelapse/AhmedabadTimelapse.jsx")
// );
// import AhmedabadTimelapse from "./components/Timelapse/AhmedabadTimelapse.jsx";
// import PageLoader from "./components/Loader/PageLoader.jsx";

// import Villa from "./components/Villa.jsx";
// import InteractiveVid from "./components/InteractiveVideo/InteractiveVid.jsx";
// import GokulDham from "./components/InteractiveVideo/GokulDham.jsx";
// import Karnavati from "./components/InteractiveVideo/Karnavati.jsx";

const MainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Rajyash />,
      },
      {
        path: "/sanand",
        element: <Sanand />,
      },
      {
        path: "/royceltwo",
        element: <RoyceLTWO />,
      },
      {
        path: "/roseate",
        element: <Roseate />,
      },
      {
        path: "/yelahanka",
        element: (
          // <Suspense fallback={<PageLoader />}>
          <Rajankunte />
          // </Suspense>
        ),
      },
      {
        path: "/test",
        element: (
          // <Suspense fallback={<PageLoader />}>
          <BangaloreMapTest />
          // </Suspense>
        ),
      },
      {
        path: "/sattvalumina",
        element: (
          // <Suspense fallback={<PageLoader />}>
          <Sattvalumina />
          // </Suspense>
        ),
      },
      {
        path: "/image",
        element: (
          // <Suspense fallback={<PageLoader />}>
          <ImagePage />
          // </Suspense>
        ),
      },
      {
        path: "/clubimage",
        element: (
          // <Suspense fallback={<PageLoader />}>
          <Clubthreesixtyimage />
          // </Suspense>
        ),
      },

      {
        path: "/sattvalumina/:wing",
        element: <WingDetails />,
      },
      // {
      //   path: "/floorplan",
      //   element: (
      //     // <Suspense fallback={<PageLoader />}>
      //     <FloorPlan />
      //     // </Suspense>
      //   ),
      // },
      {
        path: "/view360",
        element: <View360 />,
      },
      {
        path: "/floorplanmodal",
        element: <FloorPlanModal />,
      },
      {
        path: "/plotdetail",
        element: <PlotDetail />,
      },
      {
        path: "/floorplan",
        element: <FloorPlanRajyash />,
      },
      {
        path: "/roycefloorplan",
        element: <FloorPlan />,
      },
      // {
      //   path: "/header",
      //   element: (
      //     // <Suspense fallback={<PageLoader />}>
      //     <Header />
      //     // </Suspense>
      //   ),
      // },
      // {
      //   path: "/villa",
      //   element: (
      //     // <Suspense fallback={<PageLoader />}>
      //     <Villa />
      //     // </Suspense>
      //   ),
      // },

      // {
      //   path: "/test",
      //   element: (
      //     // <Suspense fallback={<PageLoader />}>
      //     <TimelapseDataPointMap />
      //     // </Suspense>
      //   ),
      // },

      // { path: "/testtwo", element: <TimelapseDataPointMap /> },
      // {
      //   path: "/ahmedabadtimelapse",
      //   element: (
      //     // <Suspense fallback={<PageLoader />}>
      //     <AhmedabadTimelapse />
      //     // </Suspense>
      //   ),
      // },
      // {
      //   path: "/sanandtimelapse",
      //   element: (
      //     // <Suspense fallback={<PageLoader />}>
      //     <SanandTimelapse />
      //     // </Suspense>
      //   ),
      // },
      // {
      //   path: "/interactive",
      //   element: <InteractiveVid />,
      // },
      // {
      //   path: "/gokuldham",
      //   element: <GokulDham />,
      // },
      // {
      //   path: "/karnavati",
      //   element: <Karnavati />,
      // },
      {
        path: "/roycelone",
        element: <RoycelOne />,
      },
      {
        path: "/roycelthree",
        element: <NewDummy />,
      },
    ],
  },
]);

function MainRoute({ children }) {
  return (
    <React.Fragment>
      {/* <Suspense fallback={<PageLoader />}> */}
      <RouterProvider router={MainRoutes}>{children}</RouterProvider>
      {/* </Suspense> */}
    </React.Fragment>
  );
}

export default MainRoute;
