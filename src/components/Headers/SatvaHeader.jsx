import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  useMediaQuery,
  Drawer,
  MenuItem,
  IconButton,
  Menu,
  Tab,
  Tabs,
  Input,
  InputLabel,
  Select,
} from "@mui/material";
import "../styles.css";
import { MdSportsCricket } from "react-icons/md";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FullScreenIcon from "../../assets/full-screen-icon.svg";
import FullScreenIconToogle from "../../assets/fullscreentoogle.svg";
import AldarLogo from "../../assets/dubai-img-2.png";
import AldarLogo2 from "../../assets/dubai-logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import LocationFilter from "./LocationFilter";
import LocationFilterTwo from "./LocationFilterTwo";

import ForwardIcon from "../../assets/forward-icon.svg";
import BackwardIcon from "../../assets/backward-icon.svg";
import ExpandIcon from "../../assets/expand.svg";
import ExploreArrow from "../../assets/Filtericon/Explorearrow.svg";
import Landimg from "../../assets/Filtericon/Landimage.svg";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import Profile from "../../assets/Filtericon/icon/profile.svg";
import Login from "../../assets/Filtericon/icon/login.svg";
import Share from "../../assets/Filtericon/icon/share.svg";
// import Broucher from "../../assets/Filtericon/icon/broucherimg.svg";

import Broucher from "../../assets/Filtericon/icon/broucher.png";
import detasils from "../../assets/Filtericon/icon/detasils.png";
import gallery from "../../assets/Filtericon/icon/gallery.png";
import video from "../../assets/Filtericon/icon/video.png";

import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Sanandimage from "../../assets/Filtericon/sanand.webp";
import ahmedabadimage from "../../assets/Filtericon/ahmedabad.webp";
import childrenPark from "../../assets/Secondpage/childrenPlayArea.png";
import BoxCricket from "../../assets/Secondpage/BoxCricket.png";
import { sanandlandMarkData } from "../../utils/sanandpagedatavalues.js";
import { landMarkData } from "../../utils/seconpagedatavalues.js";
import leftarrowcrop from "../../assets/Filtericon/leftarrowcrop.png";
import rightarrow from "../../assets/Filtericon/rightarrow.svg";
import Compass from "../../components/Compass.jsx";
import Fade from "@mui/material/Fade";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import styles from "../styles.js";
import { SlArrowUp } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";
import kidsplay from "../../assets/Secondpage/kidsplayarea.jpg";
import lawn from "../../assets/Secondpage/lawn.jpg";
import playarea from "../../assets/Secondpage/playarea.jpg";
import badmintoncurt from "../../assets/Secondpage/badmintoncuart.jpg";
import FloorPlanModal from "../FloorPlanModal";

import Micron from "../../assets/sidebarimg/macrons.svg";
import Pg from "../../assets/sidebarimg/p&g.svg";
import Signalling from "../../assets/sidebarimg/signalling.svg";
import American from "../../assets/sidebarimg/american.svg";
import Toi from "../../assets/sidebarimg/toi.svg";
import Tata from "../../assets/sidebarimg/tata.svg";
import Esr from "../../assets/sidebarimg/esr.svg";
import BackIcon from "../../assets/backiconup.svg";
import { motion, AnimatePresence } from "framer-motion";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Brochure from "../../assets/brochures/TheGrowthLand.pdf";
import BluevalleyBrochure from "../../assets/brochures/bluevalley.pdf";
import DynamicModal from "../Login/DynamicModal.jsx";
import LoginModal from "../Login/Login.jsx";
import VideoModal from "../Login/VideoModal.jsx";
import Brouchermodal from "../Login/Brouchermodal.jsx";
import CricketIcon from "../../assets/Sattvalumina/CricketIcon.svg";
import { amenitiesData } from "../../utils/amenitiesdata.js";
import { color } from "chart.js/helpers";
import {
  borderRadius,
  fontSize,
  lighten,
  minWidth,
  textAlign,
} from "@mui/system";
import { pageFlowData } from "../../utils/pageFlowData";
import { floornumberdata } from "../../utils/floorpladata.js";
import { roseateAmenetiesImagessData } from "../../utils/roseAteData.js";

import baskball from "../../assets/sixtyimg/basketBall360.png";
import children from "../../assets/sixtyimg/Kids-&-Kabbadi_wm.jpg";
import play from "../../assets/sixtyimg/kidsPlay360.png";
import workingpods from "../../assets/sixtyimg/Working-Pods_wm.jpg";
import workingPods from "../../assets/sixtyimg/workingPod360.png";
import clubHouse from "../../assets/sixtyimg/clubHouse360.png";
import Cookies from "js-cookie";

import PlayArea from "../../assets/Sattvalumina/small size/Play-Area_WM.png";
import WorkingPods from "../../assets/Sattvalumina/small size/Working-Pods_wm.png";
import DriveWayToClubHouse from "../../assets/Sattvalumina/small size/Driveway-to-Clubhouse_WM.png";
import BasketBallCourt from "../../assets/Sattvalumina/small size/Baskball-Court_360_WM.png";

import onebhkexterior from "../../assets/amenitiesGalleryImages/1bhkexterior.jpg";
import twobhkexterior from "../../assets/amenitiesGalleryImages/2bhkexterior.jpg";
import Verandah from "../../assets/amenitiesGalleryImages/Verandah.jpg";
import interiorview from "../../assets/amenitiesGalleryImages/interiorview.jpg";
import locatio from "../../assets/Secondpage/rajyashsec/image 22.png";

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "#C7C7C7",
  padding: "13px 0",
  pointerEvents: "all",
  "& .MuiSlider-thumb": {
    height: 15,
    width: 22,
    backgroundColor: "#C7C7C7",
    borderRadius: "5px",
    display: "grid",
    "&:hover": {
      boxShadow: "0 0 0 8px transparent",
    },
    "& .airbnb-bars": {
      display: "flex",
      justifyContent: "center",
      gap: "0.2rem",
    },

    "& .airbnb-bar": {
      height: "1px",
      width: "1px",
      backgroundColor: "#060606",
    },
  },
}));

const DropdownAnimation = ({ showmapfilters, children }) => {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, [children]); // Recalculate when children content changes

  useEffect(() => {
    if (showmapfilters && ref.current) {
      setHeight(ref.current.scrollHeight); // Recalculate on visibility change
    }
  }, [showmapfilters]);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: showmapfilters ? height : 0,
        opacity: showmapfilters ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
};

const DropdownAnimation360 = ({ data2, children }) => {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, [data2]);

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: data2 ? height : 0,
        opacity: data2 ? 1 : 0,
      }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{ overflow: "hidden" }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  );
};

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <div className="airbnb-bars">
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
      </div>
      <div className="airbnb-bars">
        <span className="airbnb-bar" />
        <span className="airbnb-bar" />
      </div>
    </SliderThumb>
  );
}
const TwoBHKData = [
  { name: "Living", size: "24'9\" X 14'9\"" },
  { name: "Verandah", size: "29'3\" X 5'0\"" },
  { name: "Toilet 1", size: "7'3\" X 5'3\"" },
  { name: "Bedroom 1", size: "13'3\" X 13'0\"" },
  { name: "Toilet 2", size: "8'3\" X 5'3\"" },
  { name: "Bedroom 2", size: "13'0\" X 12'3\"" },
  { name: "Parking", size: "37'9\" X 8'3\"" },
  { name: "Lawn", size: "45'3\" X 30'0\"" },
];
const OneBHKData = [
  { name: "Living", size: "24'9\" X 14'9\"" },
  { name: "Verandah", size: "29'3\" X 5'0\"" },
  { name: "Toilet 1", size: "5'9\" X 5'9\"" },
  { name: "Bedroom", size: "15'6\" X 11'9\"" },
  { name: "Toilet 2", size: "5'6\" X 10'9\"" },
  { name: "Parking", size: "30'9\" X 8'3\"" },
  { name: "Lawn", size: "45'3\" X 21'6\"" },
];
function SatvaHeader({
  props,
  scale,
  setMapFilterValue,
  mapfiltervalue,
  activePin,
  onSendData,
  pricerange,
  setPriceRange,
  setBoxPriceSqyard,
  boxpricesqyard,
  open,
  setOpen,
  flattenedFilterValues,
  selectedName,
  setSelectedName,
  filtersData,
  filtersfloorData,
  floorssss,
  currentFloor,
  setCurrentFloor,
  mapfiltervaluefiltertwo,
  setMapFilterValuefiltertwo,
  ParentId,
  selectedFloor,
  setselectedFloorNum,
  plotData,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [loginmodal, setloginmodal] = useState(false);
  const [forgototpmodal, setforgototpmodal] = useState(false);
  const [otpmodal, setotpmodal] = useState(false);
  const [percentage, setPercentage] = useState(100);
  const [floornum, setFloornum] = useState(selectedFloor);
  const toggleDrawersidebar = (newOpen) => () => {
    setOpen(newOpen);
  };

  console.log("HHHHHHHHHHHHh", plotData);

  const handleFloorchange = (type) => {
    setFloornum(type);
    setselectedFloorNum(type);
  };

  const floorplangalleryimages = [
    onebhkexterior,
    twobhkexterior,
    Verandah,
    interiorview,
  ];

  const floorplangalleryname = [
    "1 BHK Exterior",
    "2 BHK Exterior",
    "Verandah",
    "Interior View",
  ];

  const [openModal, setOpenModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  console.log("price", pricerange);

  const handleSelect = (name) => {
    // setSelectedName((prevSelected) => {
    //   if (prevSelected?.includes(name)) {
    //     return prevSelected.filter((item) => item !== name); // Remove
    //   } else {
    //     return [...prevSelected, name]; // Add
    //   }
    // });
    if (name === "Show All") {
      // Toggle between showing all amenities or not
      setSelectedName(
        (prevSelected) =>
          prevSelected.length === amenitiesData.length
            ? [] // If all amenities are selected, deselect them
            : amenitiesData.map((item) => item.name) // Otherwise, select all amenities
      );
    } else {
      // Normal selection for individual amenities
      setSelectedName((prevSelected) => {
        if (prevSelected?.includes(name)) {
          return prevSelected.filter((item) => item !== name); // Remove
        } else {
          return [...prevSelected, name]; // Add
        }
      });
    }
  };
  const jwt = Cookies.get("jwt");
  const isAuthenticated = jwt !== undefined && jwt !== null;

  const Location = location.pathname;
  const [value, setValue] = React.useState("2");

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
  };

  const handleBoxPriceRangeChange = (e) => {
    setBoxPriceSqyard(e.target.value);
  };

  const handleChangesss = (event, newValue) => {
    event.stopPropagation();
    setValue(newValue);
  };
  const GetPercentage = () => {
    const newPercentage = ((3 - scale) * 100) / 2;
    return Math.round(newPercentage);
  };
  const [show, setShow] = React.useState(false);
  const [showmapfilters, setShowMapFilters] = React.useState(true);
  const [pinPointsVisible, setPinPointsVisible] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRadiusVisible, setIsRadiusVisible] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterdrawerOpen, setFilterDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true);

  // const totalFloors = floorssss;
  const totalFloors = 37;

  const defaultFloor = Math?.min(Math?.max(1, Math.ceil(floorssss)), floorssss);
  // const [currentFloor, setCurrentFloor] = useState(defaultFloor);

  useEffect(() => {
    // console.log(`Floor initialized to: ${currentFloor}`);
  }, [currentFloor]);

  // console.log(totalFloors, "totalFloors");

  const visibleFloorsCount = 4;

  const getVisibleFloors = () => {
    let start = Math.max(currentFloor - Math.floor(visibleFloorsCount / 2), 1);
    let end = start + visibleFloorsCount - 1;

    if (end > totalFloors) {
      end = totalFloors;
      start = Math.max(end - visibleFloorsCount + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handleUpClick = () => {
    if (currentFloor < totalFloors) {
      setCurrentFloor(currentFloor + 1);
    }
  };

  const handleDownClick = () => {
    if (currentFloor > 1) {
      setCurrentFloor(currentFloor - 1);
    }
  };

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeFloor = document.getElementById(`floor-${currentFloor}`);
      if (activeFloor) {
        activeFloor.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [currentFloor]);

  const handleShow = () => {
    setShow(!show);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleFilterDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setFilterDrawerOpen(open);
  };

  const handleShowMapFilters = () => {
    setShowMapFilters(!showmapfilters);
  };

  const handlemapfilter = () => {
    const allFilters = [
      // "landmarks",
      // "retail",
      "nonplc",
      // "hotels",
      // "religious",
      // "fuelstation",
      "plc",
      // "shopping",
    ];

    if (
      mapfiltervalue?.length === allFilters?.length &&
      mapfiltervalue.every((filter) => allFilters?.includes(filter))
    ) {
      setMapFilterValue([]);
    } else {
      setMapFilterValue(allFilters);
    }
  };

  const handlemapfilterinfra = () => {
    const allFilterslagoonfour = [
      "reconnectpark",
      "rejoiceclub",
      "revivezone",
      "zengarden",
    ];

    if (
      mapfiltervaluefiltertwo?.length === allFilterslagoonfour.length &&
      mapfiltervaluefiltertwo?.every((filter) =>
        allFilterslagoonfour?.includes(filter)
      )
    ) {
      setMapFilterValuefiltertwo([]);
    } else {
      setMapFilterValuefiltertwo(allFilterslagoonfour);
    }
  };

  const allFilterslagoonfour = [
    "3BHK + 2T - Type 2",
    "2BHK + 2T - Type 3",
    "2BHK + 2T - Type 2",
    "3BHK + 2T - Type 3",
    "1BHK + 1T - Type 1",
    "1BHK + 1T - Type 2",
    "2BHK + 2T - Type 1",
    "3BHK + 2T - Type 1",
    "3BHK + 3T - Type 1",
    "3BHK + 3T - Type 2",
    "3BHK + 3T - Type 3",
    "2BHK + 2T - Type 4",
    "Studio Apartment",
    "simplex",
    "duplex",
    "triplex",
    "0",
    "1",
    "2",
    "18",
  ];

  const handlemapfilterbluevalley = () => {
    if (
      mapfiltervalue?.length === allFilterslagoonfour?.length &&
      mapfiltervalue.every((filter) => allFilterslagoonfour?.includes(filter))
    ) {
      setMapFilterValue([]);
    } else {
      setMapFilterValue(allFilterslagoonfour);
    }
  };
  {
    /* 
    
    const allFilters = Array.from(
      new Set(
        pageFlowData.flatMap((item) =>
          item.floorData.flatMap((floor) =>
            floor.apartmentDistribution.map((dist) => dist.type)
          )
        )
      )
    );
  
    const handlemapfilterbluevalley = () => {
      if (
        mapfiltervalue.length === allFilters.length &&
        mapfiltervalue.every((filter) => allFilters.includes(filter))
      ) {
        setMapFilterValue([]); // Reset to no filters
      } else {
        setMapFilterValue(allFilters); // Apply all filters
      }
    };  
    */
  }

  const allFiltersSelected = mapfiltervalue?.length
    ? floornumberdata.filter((item) => mapfiltervalue.includes(item.filterType))
    : floornumberdata; // Default to all floors if no filter is active

  const flatdata =
    JSON.parse(localStorage.getItem("mapData"))?.filterType?.flat() ||
    flattenedFilterValues;

  const handlemapwingdetail = () => {
    if (
      mapfiltervalue.every((filter) =>
        allFilterslagoonfour?.includes(filter)
      ) &&
      mapfiltervalue?.length !== 0
    ) {
      setMapFilterValue([]);
    } else if (mapfiltervalue?.length === 0) {
      setMapFilterValue(allFilterslagoonfour);
    } else {
      setMapFilterValue(allFilterslagoonfour);
    }
  };

  const toggleRadiusBtn = () => {
    setIsRadiusVisible(!isRadiusVisible);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const enterFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      // Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      // Chrome, Safari, Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      // IE/Edge
      element.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari, Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
  };

  const togglePinPointsVisibility = () => {
    setPinPointsVisible(!pinPointsVisible);
  };

  const [dialogopen, setdialogopen] = React.useState(false);
  const handleOpen = () => {
    setdialogopen(true);
  };
  const handleClosemodal2 = () => setdialogopen(false);

  const [data1, setData1] = useState(false);
  const [roycedata, setRoyceData] = useState(false);
  const [data2, setData2] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const mouseenter = (id) => {
    setHoveredIndex(id);
  };

  const mouseleave = () => {
    setHoveredIndex(null);
  };

  const handleClick = () => {
    setData1((prev) => !prev);
    if (data1 === false && data2 === true) {
      setData2(false);
      setData1(true);
    } else if (data1 === true && data2 === true) {
      setData2(false);
      setData1(false);
    } else {
      setData2(false);
    }
  };

  const handleRoyceClick = () => {
    if (roycedata === true) {
      setRoyceData(false);
    } else {
      setRoyceData(true);
    }
  };

  const handleClick2 = () => {
    setData2((prev) => !prev);
  };

  // const threebuttonmapimage = [
  // {
  //   id: 1,
  //   name: "Kids Play Area",
  //   url: kidsplay,
  //   color: "#85aff2",
  //   icon: childrenPark,
  // },
  // {
  //   id: 2,
  //   name: "Lawn",
  //   url: lawn,
  //   color: "#d7afed",
  //   icon: BoxCricket,
  // },
  // {
  //   id: 3,
  //   name: "Play Area",
  //   url: playarea,
  //   color: "#ed9fb0",
  //   icon: childrenPark,
  // },
  // {
  //   id: 4,
  //   name: "Badminton court",
  //   url: badmintoncurt,
  //   color: "#ede78e",
  //   icon: BoxCricket,
  // },
  // ];

  const threebuttonmapimage = [
    {
      id: 1,
      name: "Kids Play Area",
      url: PlayArea,
      color: "#85aff2",
      icon: play,
      img: PlayArea,
    },
    {
      id: 2,
      name: "Club House",
      url: DriveWayToClubHouse,
      color: "#d7afed",
      icon: clubHouse,
      img: DriveWayToClubHouse,
    },
    {
      id: 3,
      name: "Working Pods",
      url: WorkingPods,
      color: "#ed9fb0",
      icon: workingPods,
      img: WorkingPods,
    },
    {
      id: 4,
      name: "Basketball court",
      url: BasketBallCourt,
      color: "#ede78e",
      icon: baskball,
      img: BasketBallCourt,
    },
  ];

  const newsandartical = [
    {
      id: 1,
      url: Micron,
      typo1: "Micron's Sanand facility to become operational next year..",
      typo2: "India’s first operational International ..",
      price: 22500,
      redirect:
        "https://www.hindustantimes.com/business/micron-begins-construction-of-2-75-billion-semiconductor-plant-in-gujarat-101695478422567.html",
    },
    {
      id: 2,
      url: Pg,
      typo1: "Procter & Gamble India announced on Thursday that it..",
      typo2: "The first fund will focus on Indian ...",
      price: 2000,
      redirect:
        "https://www.business-standard.com/companies/news/p-g-india-to-invest-rs-2-000-cr-to-set-up-manufacturing-facility-in-gujarat-123062800889_1.html",
    },
    {
      id: 3,
      url: Signalling,
      typo1: "Signalling a rising interest in investing in Sanand Industri ..",
      typo2: "the state-owned Bank of India ...",
      price: 1500,
      redirect:
        "https://timesofindia.indiatimes.com/city/ahmedabad/vibrant-growth-3-lakh-sq-metres-of-land-allotted-to-mncs-in-ahmedabads-sanand-gidc/articleshow/99856877.cms",
    },
    {
      id: 4,
      url: American,
      typo1: "American multinational beverage manufacturer The Coc ..",
      typo2: "According to legal experts and indust...",
      price: 3000,
      redirect:
        "https://timesofindia.indiatimes.com/city/ahmedabad/coca-cola-to-invest-rs-3000-crore-to-set-up-plant-in-sanand/articleshow/105824471.cms",
    },
    {
      id: 5,
      url: Toi,
      typo1: "The government of Gujarat on Friday signed an MoU (memor..",
      typo2: "According to legal experts and indust...",
      price: 1250,
      redirect:
        "https://www.thehindubusinessline.com/info-tech/south-korean-simmtech-to-set-up-1250-crore-unit-for-semiconductor-ecosystem/article67729990.ece",
    },
    {
      id: 6,
      url: Toi,
      typo1: "Ghuma will be the destination for loading and unloading goo..",
      typo2: "According to legal experts and indust...",
      price: 900,
      redirect:
        "https://www.tndindia.com/kei-plans-rs-900-crore-capex-on-greenfield-sanand-plant-in-fy25/",
    },
    {
      id: 7,
      url: Tata,
      typo1:
        "Tata Group has signed an outline deal for building a lithium-ion..",
      typo2: "Ahmedabad—the capital of Gujarat..",
      price: 16000,
      redirect:
        "https://www.tatamotors.com/press-releases/tata-passenger-electric-mobility-commences-production-at-its-state-of-the-art-new-facility-in-sanand-gujarat/",
    },
    {
      id: 8,
      url: Esr,
      typo1: "ESR Group plans Rs 400-crore logistics park in Gujarat",
      typo2: "The newly established operations...",
      price: 400,
      redirect:
        "https://economictimes.indiatimes.com/industry/transportation/esr-group-plans-rs-400-crore-logistics-park-in-gujarat/articleshow/99540747.cms?from=mdr",
    },
  ];

  const handlebangalore = () => {
    navigate("/");
  };

  const handlerajankunte = () => {
    navigate("/roseate");
  };

  const handlesanand = () => {
    navigate("/sanand");
  };

  const handleroyceone = () => {
    navigate("/roycelone");
  };

  const handleroycefloorplan = () => {
    navigate("/roycefloorplan");
  };

  const handlesattvalumina = () => {
    navigate("/sattvalumina");
  };

  const handleClickwebsite = () => {
    // window.location.href = "https://goyalco.com/blue-valley/";
  };

  const [profilemodal, setProfilemodal] = useState(false);
  const handleOpenModal = () => setProfilemodal(true);
  const handleCloseModal = () => setProfilemodal(false);

  const [brouchermodal, setBrouchermodal] = useState(false);
  const handleOpenModalbroucher = () => setBrouchermodal(true);

  const [videomodal, setVideomodal] = useState(false);
  const handleOpenModalVideomodal = () => setVideomodal(true);

  const [residency, setResidency] = useState("Resident");

  const handleResidencyChange = (event) => {
    setResidency(event.target.value);
  };

  const [city, setCity] = useState("Surat");

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const wingDisplayNames = {
    winga: "Wing - A",
    wingb: "Wing - B",
    wingc: "Wing - C",
    wingd: "Wing - D",
    winge: "Wing - E",
    wingf: "Wing - F",
    wingg: "Wing - G",
    wingh: "Wing - H",
  };

  const [displayName, setDisplayName] = useState("Unknown Wing");
  const mapData = location?.state?.mapData;

  useEffect(() => {
    if (mapData?.type) {
      const currentWingType = mapData.type;
      localStorage.setItem("lastWingType", currentWingType);
      setDisplayName(wingDisplayNames[currentWingType] || "Unknown Wing");
    } else {
      const lastWingType = localStorage.getItem("lastWingType");
      if (lastWingType) {
        setDisplayName(wingDisplayNames[lastWingType] || "Unknown Wing");
      } else {
        setDisplayName("Unknown Wing");
      }
    }
  }, [mapData]);

  {
    /* 
      const wingDisplayNames = {
    winga: "Wing - A",
    wingb: "Wing - B",
    wingc: "Wing - C",
    wingd: "Wing - D",
    winge: "Wing - E",
    wingf: "Wing - F",
    wingg: "Wing - G",
  };

  const mapData = location.state?.mapData;
  const displayName = wingDisplayNames[mapData?.type] || "Unknown Wing";
    */
  }
  const wingApartNumbers = {
    A: "488",
    B: "152",
    C: "150",
    D: "152",
    E: "152",
    F: "153",
    G: "152",
    H: "153",
  };
  const wingName = Location?.split("/")?.at(2)?.toUpperCase();
  console.log("Location", Location?.split("/")?.at(2));
  const drawerContent = (
    <>
      {isSmallScreen ? (
        <>
          <Box
            sx={{
              display: "grid",
              gap: "1rem",
            }}
          >
            {/** Always show Ahmedabad */}
            <Button sx={ahmedabadtypo} onClick={handlebangalore}>
              Dubai Marina
            </Button>

            {/** Show Sanand Nalsarovar on /sanand and /roseate */}
            {(Location === "/sanand" ||
              Location === "/roseate" ||
              Location === "/floorplan") && (
              <Button sx={shelatypo} onClick={handlesanand}>
                Sanand Nalsarovar
              </Button>
            )}

            {/** Show Roseate Roots only on /roseate */}
            {Location === "/roseate" ||
              (Location === "/floorplan" && (
                <Button sx={shelatypo} onClick={handlerajankunte}>
                  Roseate Roots
                </Button>
              ))}

            {Location === "/floorplan" && (
              <Button
                sx={shelatypo}
                onClick={() => {
                  navigate("/floorplan");
                }}
              >
                FloorPlan
              </Button>
            )}

            {Location === "/roycelone" && (
              <Button
                sx={shelatypo}
                onClick={() => {
                  navigate("/roycelone");
                }}
              >
                Sky Royale
              </Button>
            )}

            {Location === "/dummy" && (
              <Button
                sx={shelatypo}
                onClick={() => {
                  navigate("/dummy");
                }}
              >
                New Route
              </Button>
            )}

            {Location === "/roycefloorplan" && (
              <Button
                sx={shelatypo}
                onClick={() => {
                  navigate("/roycefloorplan");
                }}
              >
                Royce FloorPlan
              </Button>
            )}

            {/* {Location !== "/roseate" &&
              Location !== "/sanand" &&
              Location !== "/sattvalumina" && (
                <>
                  <Button sx={shelatypo} onClick={handlesattvalumina}>
                    Sattva Lumina
                  </Button>
                </>
              )} */}

            {/* {Location !== "/roseate" &&
              Location !== "/sanand" &&
              Location !== "/sattvalumina" &&
              !Location.startsWith("/sattvalumina/") && (
                <>
                  <Button
                    sx={shelatypo}
                    onClick={() => {
                      navigate(
                        `/sattvalumina/${localStorage
                          .getItem("lastWingType")
                          .replace("wing", "")}`,
                        {
                          state: {
                            mapData: flatdata,
                          },
                        }
                      );
                    }}
                  >
                    {displayName}
                  </Button>
                </>
              )} */}

            {Location !== "/roseate" &&
              Location !== "/sanand" &&
              Location !== "/sattvalumina" &&
              Location !== "/roycelone" &&
              Location !== "/dummy" &&
              Location !== "/roycefloorplan" &&
              !Location.startsWith("/sattvalumina/") &&
              Location !== "/floorplan" &&
              Location !== "/plotdetail" && (
                <>
                  <Button
                    sx={shelatypo}
                    onClick={() => {
                      navigate("/floorplan");
                    }}
                  >
                    FloorPlan
                  </Button>
                </>
              )}

            {Location !== "/roseate" &&
              Location !== "/sanand" &&
              Location !== "/roycelone" &&
              Location !== "/dummy" &&
              Location !== "/roycefloorplan" &&
              Location !== "/sattvalumina" &&
              !Location.startsWith("/sattvalumina/") &&
              Location !== "/floorplan" &&
              Location !== "/plotdetail" &&
              Location !== "/view360" && (
                <>
                  <Button
                    sx={shelatypo}
                    onClick={() => {
                      navigate("/view360");
                    }}
                  >
                    360 View
                  </Button>
                </>
              )}
          </Box>
        </>
      ) : (
        <>
          <Button sx={ahmedabadtypoone} onClick={handlebangalore}>
            Dubai Marina
          </Button>
          <ArrowRightIcon sx={{ color: "#595959" }} />
          <Button sx={shelatypoone} onClick={handlerajankunte}>
            Roseate Roots
          </Button>
          <ArrowRightIcon sx={{ color: "#595959" }} />
          <Button sx={shelatypoone} onClick={handlesanand}>
            Sanand Nalsarovar
          </Button>
          {/* {Location === "/sattvalumina" || Location === "/villa" ? (
            <>
              <ArrowRightIcon sx={{ color: "#595959" }} />
              <Button sx={shelatypoone} onClick={handlesattvalumina}>
                Sattva Lumina
              </Button>
            </>
          ) : null} */}

          {/* {Location === "/villa" && (
            <>
              <ArrowRightIcon sx={{ color: "#595959" }} />
              <Button sx={shelatypoone}>{displayName}</Button>
            </>
          )} */}
        </>
      )}
    </>
  );

  const FilterData = (
    <>
      {isSmallScreen ? (
        <>
          {Location === "/floorplan" ? (
            <>
              <Box
                sx={{
                  ...MapFilterMainStyleVilla(showmapfilters, textStyle),
                  width: "350px",
                }}
                // className="villasidecard"
              >
                <Box
                  sx={{
                    p: 1,
                  }}
                >
                  {/*   <Typography sx={typovilla}>Plot</Typography> */}

                  {showmapfilters && (
                    <Box sx={typovillamainbox}>
                      <Typography
                        sx={{
                          color: "#949494",
                          display: "flex",
                          alignItems: "start",
                          // textTra,
                        }}
                      >
                        PLOT
                      </Typography>
                      <Box sx={typovillachildbox}>
                        <Typography sx={typovillanum}>
                          Unit No. {location?.state?.mapData?.plot}
                        </Typography>
                        <Typography sx={typovillanum}>2  Bedrooms</Typography>
                      </Box>
                      <Box sx={typovillachildbox}>
                        <Typography sx={typoarea}>
                          Gross Saleable Area
                        </Typography>
                        <Typography sx={typoareaans}>
                          {location?.state?.mapData?.area || 70} Sq. Yd.
                        </Typography>
                      </Box>
                      <Button
                        // onClick={handleClickwebsite}
                        sx={{
                          ...visitnowbutton,
                          width: {
                            xl: "70%",
                            lg: "70%",
                            md: "70%",
                            xs: "100%",
                            sm: "100%",
                          },
                        }}
                      >
                        Visit Now
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </>
          ) : Location === "/360view" ||
            Location === "/plotdetail" ||
            Location === "/sanand" ? (
            ""
          ) : (
            <>
              <Box>
                <Button sx={smallscreenmapfilter}>Map Filters</Button>

                {Location.startsWith("/sattvalumina/") ||
                Location === "/floorplan" ||
                Location === "/roycefloorplan" ||
                Location === "/dummy" ||
                Location === "/roycelone" ? (
                  <>
                    <Button sx={showallbuttoncss} onClick={handlemapwingdetail}>
                      Show All
                    </Button>
                  </>
                ) : (
                  <>
                    {Location === "/sattvalumina" ? (
                      <>
                        <Button
                          sx={showallbuttoncss}
                          onClick={handlemapfilterbluevalley}
                        >
                          Show All
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button sx={showallbuttoncss} onClick={handlemapfilter}>
                          Show All
                        </Button>
                      </>
                    )}
                  </>
                )}

                <LocationFilter
                  mapData={mapData}
                  filteroneData={filtersData}
                  mapfiltervalue={mapfiltervalue}
                  setMapFilterValue={setMapFilterValue}
                  flattenedFilterValues={flatdata}
                  show={show}
                  setShow={setShow}
                  showmapfilters={showmapfilters}
                  setShowMapFilters={setShowMapFilters}
                  mapfilterstyled={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.1rem",
                    borderRadius: "0px",
                    borderRadiusForButton1: "10px 10px 0px 0px",
                    borderRadiusForButton3: "0px 0px 10px 10px",
                    width: "100%",
                    imgheight: "15px",
                    imgwidth: "15px",
                    btnbg: "#595959",
                    ...textStyle,
                  }}
                  pinPointsVisible={pinPointsVisible}
                  filtersfloorData={filtersfloorData}
                  defaultFloor={defaultFloor}
                />

                {Location === "/roseate" ? (
                  <>
                    <Typography
                      sx={{
                        ...pricetyponame,
                        mt: 1,
                      }}
                    >
                      Total Area{" "}
                      <span
                        style={{
                          color: "#C7C7C7",
                        }}
                      >
                        &nbsp;/Sq. Yard.
                      </span>
                    </Typography>

                    <Box sx={pricerangemainbox}>
                      <Typography sx={pricerangetypo}>
                        {pricerange?.at(0)}
                      </Typography>
                      <Typography sx={pricerangetypo}>
                        {pricerange?.at(1)}
                      </Typography>
                    </Box>
                    <AirbnbSlider
                      slots={{ thumb: AirbnbThumbComponent }}
                      disabled={mapfiltervalue.length === 0 ? true : false}
                      value={pricerange}
                      step={1}
                      min={434}
                      max={2720}
                      onChange={handlePriceRangeChange}
                      sx={{
                        width: "75%",
                        margin: "0px 7px",
                      }}
                    />

                    <Button sx={{ ...mapfiltertext, mt: 1 }}>Amenities</Button>

                    <Button
                      sx={showallbuttoncss}
                      onClick={handlemapfilterinfra}
                    >
                      Show All
                    </Button>

                    <LocationFilterTwo
                      mapfiltervaluefiltertwo={mapfiltervaluefiltertwo}
                      setMapFilterValuefiltertwo={setMapFilterValuefiltertwo}
                      show={show}
                      setShow={setShow}
                      showmapfilters={showmapfilters}
                      setShowMapFilters={setShowMapFilters}
                      mapfilterstyled={{
                        display: "grid",
                        gap: "0.1rem",
                        borderRadius: "0px",
                        borderRadiusForButton1: "8px 8px 0px 0px",
                        borderRadiusForButton3: "0px 0px 8px 8px",
                        width: "100%",
                        imgheight: "15px",
                        imgwidth: "15px",
                        btnbg: "#595959",
                      }}
                      pinPointsVisible={pinPointsVisible}
                    />
                    <Typography
                      sx={{
                        mt: -2,
                      }}
                    >
                      &nbsp;
                    </Typography>
                  </>
                ) : null}

                {Location === "/sattvalumina" && (
                  <>
                    <Typography
                      sx={{
                        ...pricetyponame,
                        mt: 2,
                        color: "white",
                        mb: 1,
                      }}
                    >
                      Total 1552 Units
                    </Typography>
                  </>
                )}

                {(Location.startsWith("/sattvalumina/") ||
                  Location === "/floorplan") && (
                  <>
                    <Typography
                      sx={{
                        ...pricetyponame,
                        mt: 2,
                        color: "white",
                        mb: 1,
                      }}
                    >
                      Total 1552 Units
                    </Typography>

                    <Box
                      sx={{
                        background: "#2B2B2B",
                        p: 1,
                        lineHeight: "15px",
                        borderRadius: "12px",
                        fontFamily: "Roboto",
                        fontSize: 13,
                        fontWeight: 400,
                        textAlign: "left",
                        color: "#BDBDBD",
                      }}
                    >
                      Doddaballapur Main Rd, Yelahanka, Bengaluru, Karnataka
                      560064
                    </Box>
                  </>
                )}

                {(Location === "/roycelone" ||
                  Location === "/roycefloorplan") && (
                  <>
                    <Typography
                      sx={{
                        ...pricetyponame,
                        mt: 2,
                        color: "white",
                        mb: 1,
                      }}
                    >
                      Exclusive Residences - Only 62 Available
                    </Typography>

                    <Box
                      sx={{
                        background: "#2B2B2B",
                        p: 1,
                        lineHeight: "15px",
                        borderRadius: "12px",
                        fontFamily: "Roboto",
                        fontSize: 13,
                        fontWeight: 400,
                        textAlign: "left",
                        color: "#BDBDBD",
                      }}
                    >
                      Palm Jumeirah Blvd, Dubai, UAE
                    </Box>
                  </>
                )}
              </Box>
            </>
          )}
        </>
      ) : (
        <>
          {Location === "/floorplan" ? (
            <>
              {" "}
              <Box
                sx={MapFilterMainStyleVilla(showmapfilters, textStyle)}
                // className="villasidecard"
              >
                {/* <Typography
                  sx={{
                    color: "#949494",
                    display: "flex",
                    alignItems: "start",
                    p: 1,
                  }}
                >
                  PLOT
                </Typography> */}
                <Typography sx={{ ...typovillanum, p: 1, textAlign: "left" }}>
                  Unit No. {plotData?.plot}
                </Typography>
                <DropdownAnimation showmapfilters={showmapfilters}>
                  <Box
                    sx={{
                      p: 1,
                    }}
                  >
                    {/*  <Typography sx={typovilla}>Plot</Typography> */}
                    {showmapfilters && (
                      <Box sx={typovillamainbox}>
                        {/* <Typography
                          sx={{
                            color: "#949494",
                            display: "flex",
                            alignItems: "start",
                          }}
                        >
                          Apartment
                        </Typography> */}
                        <Box sx={typovillachildbox}>
                          <Typography sx={typovillanum}>
                            {floornum === "1BHK" ? "1 Bedroom" : "2 Bedrooms"}
                          </Typography>
                        </Box>
                        <Box sx={typovillachildbox}>
                          <Typography sx={typoarea}>
                            Gross Saleable Area
                          </Typography>
                          <Typography sx={typoareaans}>
                            {plotData?.area} Sq. Yd.
                          </Typography>
                        </Box>
                        {floornum === "1BHK"
                          ? OneBHKData.map((room, index) => (
                              <Box key={index} sx={typovillachildbox}>
                                <Typography sx={typoarea}>
                                  {room.name}
                                </Typography>
                                <Typography sx={typoareaans}>
                                  {room.size}
                                </Typography>
                              </Box>
                            ))
                          : TwoBHKData.map((room, index) => (
                              <Box key={index} sx={typovillachildbox}>
                                <Typography sx={typoarea}>
                                  {room.name}
                                </Typography>
                                <Typography sx={typoareaans}>
                                  {room.size}
                                </Typography>
                              </Box>
                            ))}
                        {/* {TwoBHKData.map((room, index) => (
                          <Box key={index} sx={typovillachildbox}>
                            <Typography sx={typoarea}>{room.name}</Typography>
                            <Typography sx={typoareaans}>
                              {room.size}
                            </Typography>
                          </Box>
                        ))} */}
                        <Button
                          // onClick={handleClickwebsite}
                          sx={visitnowbutton}
                        >
                          Visit Now
                        </Button>
                        <Box sx={{ display: "flex" }}>
                          <Button
                            onClick={() => handleFloorchange("1BHK")}
                            sx={{
                              ...floorbutton,
                              borderRadius: "8px 0px 0px 8px",
                              backgroundColor:
                                floornum === "1BHK" ? "white" : "#4E4E4E",
                              color: floornum === "1BHK" ? "black" : "#8E8E8E",
                              "&:hover": {
                                backgroundColor:
                                  floornum === "1BHK" ? "white" : "#4E4E4E",
                                color:
                                  floornum === "1BHK" ? "black" : "#8E8E8E",
                              },
                            }}
                          >
                            1BHK
                          </Button>
                          <Button
                            onClick={() => handleFloorchange("2BHK")}
                            sx={{
                              ...floorbutton,
                              borderRadius: "0px 8px 8px 0px",
                              backgroundColor:
                                floornum === "2BHK" ? "white" : "#4E4E4E",
                              color: floornum === "2BHK" ? "black" : "#8E8E8E",
                              "&:hover": {
                                backgroundColor:
                                  floornum === "2BHK" ? "white" : "#4E4E4E",
                                color:
                                  floornum === "2BHK" ? "black" : "#8E8E8E",
                              },
                            }}
                          >
                            2BHK
                          </Button>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </DropdownAnimation>
              </Box>{" "}
            </>
          ) : Location === "/360view" ||
            Location === "/view360" ||
            Location === "/royceltwo" ||
            Location === "/plotdetail" ||
            Location === "/sanand" ? (
            ""
          ) : (
            <>
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Box
                  sx={MapFilterMainStyle(showmapfilters, textStyle, Location)}
                >
                  <Button sx={mapfiltertext}>Map Filters</Button>
                  <DropdownAnimation showmapfilters={showmapfilters}>
                    {/* {showmapfilters && ( */}

                    <>
                      {Location.startsWith("/sattvalumina/") ||
                      Location === "/floorplan" ||
                      Location === "/roycefloorplan" ||
                      Location === "/dummy" ||
                      Location === "/roycelone" ? (
                        <>
                          <Button
                            sx={showallbuttoncss}
                            onClick={handlemapwingdetail}
                          >
                            Show All
                          </Button>
                        </>
                      ) : (
                        <>
                          {Location === "/sattvalumina" ? (
                            <>
                              <Button
                                sx={{
                                  ...showallbuttoncss,
                                  backgroundColor: allFiltersSelected
                                    ? "#BDBDBD"
                                    : "#595959",
                                  color: allFiltersSelected
                                    ? "black"
                                    : "#BDBDBD",
                                }}
                                onClick={handlemapfilterbluevalley}
                              >
                                Show All
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                sx={showallbuttoncss}
                                onClick={handlemapfilter}
                              >
                                Show All
                              </Button>
                            </>
                          )}
                        </>
                      )}

                      <LocationFilter
                        mapData={mapData}
                        filteroneData={filtersData}
                        mapfiltervalue={mapfiltervalue}
                        setMapFilterValue={setMapFilterValue}
                        flattenedFilterValues={flatdata}
                        show={show}
                        setShow={setShow}
                        showmapfilters={showmapfilters}
                        setShowMapFilters={setShowMapFilters}
                        mapfilterstyled={{
                          display: "grid",
                          gap: "0.1rem",
                          borderRadius: "0px",
                          borderRadiusForButton1: "8px 8px 0px 0px",
                          borderRadiusForButton3: "0px 0px 8px 8px",
                          width: "100%",
                          imgheight: "15px",
                          imgwidth: "15px",
                          btnbg: "#595959",
                        }}
                        pinPointsVisible={pinPointsVisible}
                        filtersfloorData={filtersfloorData}
                        defaultFloor={defaultFloor}
                        roycedata={roycedata}
                        selectedName={selectedName}
                      />

                      {Location === "/roseate" && (
                        <>
                          <Typography
                            sx={{
                              ...pricetyponame,
                              mt: 1,
                            }}
                          >
                            Total Area{" "}
                            <span
                              style={{
                                color: "#C7C7C7",
                              }}
                            >
                              &nbsp;/Sq. Yard.
                            </span>
                          </Typography>

                          <Box sx={pricerangemainbox}>
                            <Typography sx={pricerangetypo}>
                              {pricerange?.at(0)}
                            </Typography>
                            <Typography sx={pricerangetypo}>
                              {pricerange?.at(1)}
                            </Typography>
                          </Box>
                          <AirbnbSlider
                            slots={{ thumb: AirbnbThumbComponent }}
                            disabled={
                              mapfiltervalue.length === 0 ? true : false
                            }
                            value={pricerange}
                            step={1}
                            min={434}
                            max={2720}
                            onChange={handlePriceRangeChange}
                            sx={{
                              width: "75%",
                              margin: "0px 7px",
                            }}
                          />

                          <Button sx={{ ...mapfiltertext }}>Amenities</Button>

                          <Button
                            sx={showallbuttoncss}
                            onClick={handlemapfilterinfra}
                          >
                            Show All
                          </Button>

                          <LocationFilterTwo
                            mapfiltervaluefiltertwo={mapfiltervaluefiltertwo}
                            setMapFilterValuefiltertwo={
                              setMapFilterValuefiltertwo
                            }
                            show={show}
                            setShow={setShow}
                            showmapfilters={showmapfilters}
                            setShowMapFilters={setShowMapFilters}
                            mapfilterstyled={{
                              display: "grid",
                              gap: "0.1rem",
                              borderRadius: "0px",
                              borderRadiusForButton1: "8px 8px 0px 0px",
                              borderRadiusForButton3: "0px 0px 8px 8px",
                              width: "100%",
                              imgheight: "15px",
                              imgwidth: "15px",
                              btnbg: "#595959",
                            }}
                            pinPointsVisible={pinPointsVisible}
                          />
                          <Typography
                            sx={{
                              mt: -2,
                            }}
                          >
                            &nbsp;
                          </Typography>

                          <Typography
                            sx={{
                              ...pricetyponame,
                              // mt: 2,
                              color: "white",
                              mb: 1,
                            }}
                          >
                            Total 250 Units
                          </Typography>

                          <Box
                            sx={{
                              background: "#2B2B2B",
                              p: 1,
                              lineHeight: "15px",
                              borderRadius: "12px",
                              fontFamily: "Roboto",
                              fontSize: 11,
                              fontWeight: 400,
                              textAlign: "left",
                              color: "#BDBDBD",
                            }}
                          >
                            Roseate Roots, Sanand-Nalsarovar road, Rethal,
                            Gujarat 382220
                          </Box>
                        </>
                      )}
                      {Location === "/sattvalumina" && (
                        <>
                          <Typography
                            sx={{
                              ...pricetyponame,
                              mt: 2,
                              color: "white",
                              mb: 1,
                            }}
                          >
                            Total 1552 Units
                          </Typography>
                        </>
                      )}

                      {(Location.startsWith("/sattvalumina/") ||
                        Location === "/floorplan") && (
                        <>
                          <Typography
                            sx={{
                              ...pricetyponame,
                              mt: 2,
                              color: "white",
                              mb: 1,
                            }}
                          >
                            {Location === "/floorplan"
                              ? null
                              : `Total ${wingApartNumbers[wingName]} Units`}
                          </Typography>

                          <Box
                            sx={{
                              background: "#2B2B2B",
                              p: 1,
                              lineHeight: "15px",
                              borderRadius: "12px",
                              fontFamily: "Roboto",
                              fontSize: 13,
                              fontWeight: 400,
                              textAlign: "left",
                              color: "#BDBDBD",
                            }}
                          >
                            Doddaballapur Main Rd, Yelahanka, Bengaluru,
                            Karnataka 560064
                          </Box>
                        </>
                      )}

                      {(Location === "/roycelone" ||
                        Location === "/roycefloorplan") && (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              sx={{
                                ...pricetyponame,
                                mt: 2,
                                color: "white",
                                mb: 1,
                              }}
                            >
                              Exclusive Residences -
                            </Typography>

                            <Typography
                              sx={{
                                ...pricetyponame,
                                mt: 2,
                                color: "white",
                                mb: 1,
                              }}
                            >
                              Only 62 Available
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              background: "#2B2B2B",
                              p: 1,
                              lineHeight: "15px",
                              borderRadius: "12px",
                              fontFamily: "Roboto",
                              fontSize: 13,
                              fontWeight: 400,
                              textAlign: "left",
                              color: "#BDBDBD",
                            }}
                          >
                            Palm Jumeirah Blvd, Dubai, UAE
                          </Box>
                        </>
                      )}
                    </>
                  </DropdownAnimation>
                </Box>
              </Box>
            </>
          )}
        </>
      )}
    </>
  );

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOpen2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMenuClose2 = () => {
    setAnchorEl2(null);
  };

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    if (!checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawerr = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (initialLoad) {
      setTimeout(() => {
        setShow(true);
        setInitialLoad(false);
      }, 1400);
    }
  }, [initialLoad]);

  const handleIconClick = (landMark) => {
    const { icon, ...remainingPinData } = landMark;

    navigate("/image", { state: { landMark: remainingPinData } });
  };

  const matchingImages = roseateAmenetiesImagessData
    .filter((item) => item.parentID === ParentId)
    .map((item) => item.image);

  const matchingNames = roseateAmenetiesImagessData
    .filter((item) => item.parentID === ParentId)
    .map((item) => item.name);

  const matchingId = roseateAmenetiesImagessData
    .filter((item) => item.parentID === ParentId)
    .map((item) => item.parentID);

  console.log("wwwwwwwwwwwwwww", matchingId[0]);

  const IDforImg = matchingId[0];

  const getNameByParentId = (IDforImg) => {
    if (IDforImg === 501) {
      return "Rejoice Club";
    } else if (IDforImg === 502) {
      return "Zen Garden";
    } else if (IDforImg === 503) {
      return "Revive Zone";
    } else if (IDforImg === 504) {
      return "Reconnect Park";
    } else {
      return "Unknown";
    }
  };

  return (
    <>
      <Box sx={mainbox}>
        <Grid container sx={gridcontainer}>
          <Grid item xs={12} sm={11} md={11} lg={11}>
            <Box sx={griditem1box(isSmallScreen)}>
              <Box sx={griditembox2(isSmallScreen)}>
                <Button
                  sx={{
                    ...aldarlogo,
                    display: {
                      xl: Location === "/" ? "none" : "flex",
                      lg: Location === "/" ? "none" : "flex",
                      md: Location === "/" ? "none" : "flex",
                      sm: Location === "/" ? "none" : "flex",
                      // xs: "flex", // Show on extra small screens
                      // sm: "flex", // Show on small screens
                      // md: "none", // Hide on medium screens
                      // lg: "flex", // Hide on large screens
                      // xl: "none", // Hide on extra large screens
                    },
                  }}
                >
                  <img
                    src={Location === "/dummy" ? AldarLogo2 : AldarLogo}
                    onClick={() => navigate("/")}
                    style={{ width: "50px" }}
                  />
                </Button>

                {isSmallScreen ? (
                  <>
                    {Location === "/" ? null : (
                      <>
                        <Box sx={draweropegoyal(show)}>
                          <Button
                            sx={goyalandcosmallscreen}
                            onClick={toggleDrawer(true)}
                          >
                            <span style={{ flex: 1, textAlign: "center" }}>
                              Dubai Marina
                            </span>
                            <span
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <ArrowDropDownIcon />
                            </span>
                          </Button>
                        </Box>
                        <Drawer
                          anchor="top"
                          open={drawerOpen}
                          onClose={toggleDrawer(false)}
                          sx={{
                            "& .MuiPaper-root": {
                              background: "transparent",
                            },
                          }}
                        >
                          <Box
                            sx={smallscreendrawer}
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                          >
                            {drawerContent}
                          </Box>
                        </Drawer>
                      </>
                    )}
                    {Location !== "/" && (
                      <Button
                        onClick={handleMenuOpen}
                        sx={{ pointerEvents: "all" }}
                      >
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M21.0347 8.15C21.0347 7.51487 20.5199 7 19.8847 7C19.2496 7 18.7347 7.51487 18.7347 8.15V8.20039H7.79395C7.35546 8.20039 7 8.51379 7 8.90039C7 9.28699 7.35546 9.60039 7.79395 9.60039H18.7347V9.65C18.7347 10.2851 19.2496 10.8 19.8847 10.8C20.5199 10.8 21.0347 10.2851 21.0347 9.65V9.60039H24.6371C25.0756 9.60039 25.4311 9.28699 25.4311 8.90039C25.4311 8.51379 25.0756 8.20039 24.6371 8.20039H21.0347V8.15ZM7.79395 14.9555C7.35546 14.9555 7 15.2689 7 15.6555C7 16.0421 7.35546 16.3555 7.79395 16.3555H10.4937V16.418C10.4937 17.0531 11.0085 17.568 11.6437 17.568C12.2788 17.568 12.7937 17.0531 12.7937 16.418V16.3555H24.6371C25.0756 16.3555 25.4311 16.0421 25.4311 15.6555C25.4311 15.2689 25.0756 14.9555 24.6371 14.9555H12.7937V14.918C12.7937 14.2829 12.2788 13.768 11.6437 13.768C11.0085 13.768 10.4937 14.2829 10.4937 14.918V14.9555H7.79395ZM7 22.4355C7 22.0489 7.35546 21.7355 7.79395 21.7355H14.0991V21.6856C14.0991 21.0505 14.614 20.5356 15.2491 20.5356C15.8842 20.5356 16.3991 21.0505 16.3991 21.6856V21.7355H24.6371C25.0756 21.7355 25.4311 22.0489 25.4311 22.4355C25.4311 22.8221 25.0756 23.1355 24.6371 23.1355H16.3991V23.1856C16.3991 23.8207 15.8842 24.3356 15.2491 24.3356C14.614 24.3356 14.0991 23.8207 14.0991 23.1856V23.1355H7.79395C7.35546 23.1355 7 22.8221 7 22.4355Z"
                            fill="#BDBDBD"
                          ></path>
                        </svg>
                      </Button>
                    )}

                    {Location === "/" ? null : (
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        sx={menuiteminsmallscreen}
                      >
                        {FilterData}
                      </Menu>
                    )}
                  </>
                ) : (
                  <>
                    {Location === "/" ? null : (
                      <>
                        <AnimatePresence>
                          {show && (
                            <motion.div
                              initial={{ width: 0, opacity: 0 }}
                              animate={{
                                width: show ? "fit-content" : 0,
                                opacity: show ? 1 : 0,
                              }}
                              exit={{ width: 0, opacity: 0 }}
                              transition={{
                                duration: 0.3,
                                ease: "easeInOut",
                              }}
                              style={{ overflow: "hidden" }}
                            >
                              <Box
                                sx={{ display: "flex", alignItems: "center" }}
                              >
                                <Button sx={ahmtext} onClick={handlebangalore}>
                                  Dubai Marina
                                </Button>
                                <ArrowRightIcon sx={{ color: "#595959" }} />

                                {Location !== "/sanand" &&
                                  Location !== "/roycelone" &&
                                  Location !== "/dummy" &&
                                  Location !== "/view360" &&
                                  Location !== "/roycefloorplan" && (
                                    <>
                                      <Button
                                        sx={sanandtex}
                                        onClick={handlesanand}
                                      >
                                        Sanand Nalsarovar
                                      </Button>
                                      <ArrowRightIcon
                                        sx={{ color: "#595959" }}
                                      />
                                    </>
                                  )}

                                {Location !== "/roycelone" &&
                                  Location !== "/sanand" &&
                                  Location !== "/dummy" &&
                                  Location !== "/roseate" &&
                                  Location !== "/floorplan" && (
                                    <>
                                      <Button
                                        sx={sanandtex}
                                        onClick={handleroyceone}
                                      >
                                        Sky Royale
                                      </Button>
                                      <ArrowRightIcon
                                        sx={{ color: "#595959" }}
                                      />
                                    </>
                                  )}

                                {Location !== "/roycefloorplan" &&
                                  Location !== "/sanand" &&
                                  Location !== "/roycelone" &&
                                  Location !== "/dummy" &&
                                  Location !== "/roseate" &&
                                  Location !== "/floorplan" && (
                                    <>
                                      <Button
                                        sx={sanandtex}
                                        // onClick={handleroycefloorplan}
                                        onClick={() => {
                                          navigate(-1);
                                        }}
                                      >
                                        Royce FloorPlan
                                      </Button>
                                      <ArrowRightIcon
                                        sx={{ color: "#595959" }}
                                      />
                                    </>
                                  )}

                                {Location !== "/sanand" &&
                                  Location !== "/roseate" &&
                                  Location !== "/roycelone" &&
                                  Location !== "/dummy" &&
                                  Location !== "/view360" &&
                                  Location !== "/roycefloorplan" && (
                                    <>
                                      <Button
                                        sx={sanandtex}
                                        onClick={handlerajankunte}
                                      >
                                        Roseate Roots
                                      </Button>
                                      <ArrowRightIcon
                                        sx={{ color: "#595959" }}
                                      />
                                    </>
                                  )}

                                {/* {Location !== "/roseate" &&
                                  Location !== "/sanand" &&
                                  Location !== "/sattvalumina" && (
                                    <>
                                      <Button
                                        sx={bangloretex}
                                        onClick={handlesattvalumina}
                                      >
                                        Sattva Lumina
                                      </Button>
                                      <ArrowRightIcon
                                        sx={{ color: "#595959" }}
                                      />
                                    </>
                                  )} */}

                                {/* {Location !== "/roseate" &&
                                  Location !== "/sanand" &&
                                  Location !== "/sattvalumina" &&
                                  !Location.startsWith("/sattvalumina/") && (
                                    <>
                                      <Button
                                        sx={bangloretex}
                                        onClick={() => {
                                          navigate(
                                            `/sattvalumina/${localStorage
                                              .getItem("lastWingType")
                                              .replace("wing", "")}`,
                                            {
                                              state: {
                                                mapData: flatdata,
                                              },
                                            }
                                          );
                                        }}
                                      >
                                        {displayName}
                                      </Button>
                                      <ArrowRightIcon
                                        sx={{ color: "#595959" }}
                                      />
                                    </>
                                  )} */}

                                {Location !== "/roseate" &&
                                  Location !== "/sanand" &&
                                  Location !== "/sattvalumina" &&
                                  Location !== "/roycelone" &&
                                  Location !== "/dummy" &&
                                  Location !== "/roycefloorplan" &&
                                  Location !== "/view360" &&
                                  !Location.startsWith("/sattvalumina/") &&
                                  Location !== "/plotdetail" &&
                                  Location !== "/floorplan" && (
                                    <>
                                      <Button
                                        sx={bangloretex}
                                        onClick={() => {
                                          navigate(-1);
                                        }}
                                      >
                                        FloorPlan
                                      </Button>
                                      <ArrowRightIcon
                                        sx={{ color: "#595959" }}
                                      />
                                    </>
                                  )}

                                {Location !== "/roseate" &&
                                  Location !== "/sanand" &&
                                  Location !== "/roycelone" &&
                                  Location !== "/dummy" &&
                                  Location !== "/sattvalumina" &&
                                  !Location.startsWith("/sattvalumina/") &&
                                  Location !== "/floorplan" &&
                                  Location !== "/roycefloorplan" &&
                                  Location !== "/plotdetail" &&
                                  Location !== "/view360" && (
                                    <>
                                      <Button
                                        sx={bangloretex}
                                        onClick={() => {
                                          navigate("/view360");
                                        }}
                                      >
                                        360 View
                                      </Button>
                                    </>
                                  )}
                              </Box>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {Location === "/roseate" && (
                            <>
                              <Button
                                sx={textActive}
                                onClick={handlerajankunte}
                              >
                                Roseate Roots
                              </Button>
                            </>
                          )}

                          {Location === "/sanand" && (
                            <>
                              <Button sx={textActive} onClick={handlesanand}>
                                Sanand Nalsarovar
                              </Button>
                            </>
                          )}

                          {Location === "/roycelone" && (
                            <>
                              <Button sx={textActive} onClick={handleroyceone}>
                                Sky Royale
                              </Button>
                            </>
                          )}

                          {Location === "/dummy" && (
                            <>
                              <Button sx={textActive} onClick={handleroyceone}>
                                New Route
                              </Button>
                            </>
                          )}

                          {Location === "/roycefloorplan" && (
                            <>
                              <Button
                                sx={textActive}
                                // onClick={handleroycefloorplan}
                              >
                                Royce Floorplan
                              </Button>
                            </>
                          )}

                          {/* {Location === "/sattvalumina" && (
                            <>
                              <Button
                                sx={textActive}
                                onClick={handlesattvalumina}
                              >
                                Sattva Lumina
                              </Button>
                            </>
                          )} */}

                          {/* {Location.startsWith("/sattvalumina/") && (
                            <>
                              <Button
                                sx={textActive}
                                onClick={() => {
                                  navigate(
                                    `/sattvalumina/${localStorage
                                      .getItem("lastWingType")
                                      .replace("wing", "")}`,
                                    {
                                      state: {
                                        mapData: flatdata,
                                      },
                                    }
                                  );
                                }}
                              >
                                {displayName}
                              </Button>
                            </>
                          )} */}

                          {Location === "/floorplan" && (
                            <>
                              <Button
                                sx={textActive}
                                onClick={() => {
                                  navigate("/floorplan");
                                }}
                              >
                                Floorplan
                              </Button>
                            </>
                          )}

                          {Location === "/view360" && (
                            <>
                              <Button sx={textActive}>360 View</Button>
                            </>
                          )}

                          {Location === "/plotdetail" && (
                            <>
                              <Button sx={textActive}>Plot Details</Button>
                            </>
                          )}
                        </Box>

                        <Button onClick={handleShow} sx={handleShowbutton}>
                          {!show ? (
                            <img
                              src={BackwardIcon}
                              style={{ transform: "rotate(180deg)" }}
                              alt="Backward"
                            />
                          ) : (
                            <img src={ForwardIcon} alt="Forward" />
                          )}
                        </Button>
                      </>
                    )}
                  </>
                )}
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: "1rem", paddingTop: "1rem" }}>
              {!isSmallScreen && (
                <>
                  <Box
                    sx={{
                      display: "grid",
                      gap: "1rem",
                      opacity: !pinPointsVisible ? 0.2 : 1,
                    }}
                  >
                    {Location === "/" ? null : FilterData}

                    {Location === "/view360" ||
                    Location === "/plotdetail" ||
                    Location === "/royceltwo" ||
                    Location === "/sanand" ||
                    Location === "/" ? null : (
                      <Box sx={{ textAlign: "center" }}>
                        <Button
                          sx={handleShowMapFiltersbutton}
                          onClick={handleShowMapFilters}
                        >
                          {" "}
                          <img
                            src={ExpandIcon}
                            style={{
                              transform: !showmapfilters
                                ? "rotate(180deg)"
                                : "none",
                            }}
                          />
                        </Button>
                      </Box>
                    )}
                  </Box>
                  {Location === "/roycefloorplan" && (
                    <>
                      <Box
                        sx={{
                          backgroundColor: "rgba(0, 0, 0, 1)",
                          color: "white",
                          borderRadius: "10px",
                          textAlign: "center",
                          padding: "10px",
                          width: "50px",
                          pointerEvents: "all",
                          display: "flex",
                          alignItems: "center",
                          height: "250px",
                          gap: "0.2rem",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            marginBottom: "5px",
                            fontSize: "10px",
                            fontFamily: "Roboto",
                          }}
                        >
                          Floor
                        </Typography>

                        <Button
                          onClick={handleUpClick}
                          disabled={currentFloor === totalFloors}
                          sx={{
                            width: "30px",
                            height: "20px",
                            backgroundColor: "rgba(50, 50, 50, 1)",
                            color: "white",
                            borderRadius: "0px",
                            minWidth: "0px",
                          }}
                        >
                          ▲
                        </Button>

                        <Button
                          onClick={handleDownClick}
                          disabled={currentFloor === 0}
                          sx={{
                            width: "30px",
                            height: "20px",
                            backgroundColor: "rgba(50, 50, 50, 1)",
                            color: "white",
                            borderRadius: "0px",
                            minWidth: "0px",
                            marginBottom: "30px",
                          }}
                        >
                          ▼
                        </Button>

                        <Box
                          ref={scrollContainerRef}
                          sx={{
                            display: "flex",
                            flexDirection: "column-reverse",
                            gap: "5px",
                            pointerEvents: "all",
                            overflowY: "auto",
                            "&::-webkit-scrollbar": {
                              display: "flex",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              backgroundColor: "#8d8e90",
                              minHeight: "10px",
                              borderRadius: "8px",
                            },
                            "&::-webkit-scrollbar-thumb:vertical": {
                              maxHeight: "30px",
                            },
                          }}
                        >
                          {Array.from(
                            { length: totalFloors + 1 },
                            (_, i) => i
                          ).map((floorNumber) => (
                            <Box
                              id={`floor-${floorNumber}`} // Assign an ID for each floor
                              key={floorNumber}
                              sx={{
                                width: "35px",
                                height: "35px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "5px",
                                backgroundColor:
                                  currentFloor === floorNumber
                                    ? "white"
                                    : "rgba(0, 0, 0, 0.2)",
                                color:
                                  currentFloor === floorNumber
                                    ? "black"
                                    : "white",
                                border: "1px solid #444",
                                cursor: "pointer",
                                gap: "2px",
                                transition: "background-color 0.2s",
                              }}
                              onClick={() => setCurrentFloor(floorNumber)}
                            >
                              {/* {floorNumber === 0 ? "G" : floorNumber}{" "} */}

                              {displayName === "Wing - C"
                                ? floorNumber === 0
                                  ? null
                                  : floorNumber
                                : floorNumber === 0
                                ? "G"
                                : floorNumber}

                              {/* Display "G" for Ground floor */}
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </>
                  )}
                </>
              )}

              {Location === "/" ? null : (
                <>
                  {sanandlandMarkData.find((item) => item.id === activePin)
                    ?.img && (
                    <Box sx={hoverandclickimgshow(activePin)}>
                      <Box
                        component={"img"}
                        src={
                          sanandlandMarkData.find(
                            (item) => item.id === activePin
                          )?.img
                        }
                        sx={imghover}
                      />
                      <Box sx={cardmainbox}>
                        <Typography sx={titlehovercard}>
                          {
                            sanandlandMarkData.find(
                              (item) => item.id === activePin
                            )?.title
                          }
                        </Typography>
                        <Typography sx={descriptioncard}>
                          {
                            sanandlandMarkData.find(
                              (item) => item.id === activePin
                            )?.description
                          }
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </>
              )}

              {/* {Location === "/" ? (
                <>
                  <Box sx={{ ...hoverandclickimgshow(activePin), mt: 4 }}>
                    <Box component={"img"} src={locatio} sx={imghover} />
                    <Box sx={cardmainbox}>
                      <Typography sx={titlehovercard}>TRP Mall</Typography>
                      <Typography sx={descriptioncard}>
                        Skandagiri iis nestled amongst 700 world class villas,
                        it houses one of India’s finest 18 hole golf course.
                      </Typography>
                    </Box>
                  </Box>
                </>
              ) : null} */}

              {Location === "/" ? (
                <>
                  {/* {landMarkData.find((item) => item.id === activePin)
                    ?.img && (  */}
                  <Box sx={{ ...hoverandclickimgshow(activePin), mt: 4 }}>
                    <Box
                      component={"img"}
                      src={
                        landMarkData.find((item) => item.id === activePin)?.img
                      }
                      sx={imghover}
                    />
                    <Box sx={cardmainbox}>
                      <Typography sx={titlehovercard}>
                        {
                          landMarkData.find((item) => item.id === activePin)
                            ?.title
                        }
                      </Typography>
                      <Typography sx={descriptioncard}>
                        {
                          landMarkData.find((item) => item.id === activePin)
                            ?.description
                        }
                      </Typography>
                    </Box>
                  </Box>
                  {/* )}  */}
                </>
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={12} sm={1} md={1} lg={1} sx={griditemsecond}>
            <Box
              sx={{
                display: "grid",
                gap: "1rem",
              }}
            >
              {isSmallScreen ? (
                <>
                  <IconButton
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleMenuOpen2}
                    // Always show on small screens
                    sx={iconbutton}
                  >
                    <MoreVertIcon />
                  </IconButton>

                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl2}
                    keepMounted
                    open={Boolean(anchorEl2)}
                    onClose={handleMenuClose2}
                    sx={menusx}
                  >
                    <MenuItem onClick={toggleFullscreen}>
                      <Button sx={fullscreenbuttonsmscrren(isFullscreen)}>
                        {!isFullscreen ? (
                          <>
                            <img src={FullScreenIcon} alt="Full Screen" />
                          </>
                        ) : (
                          <img
                            src={FullScreenIconToogle}
                            alt="Exit Full Screen"
                          />
                        )}
                      </Button>
                      {!isFullscreen ? (
                        <>
                          <span style={{ color: "white", ...textStyle }}>
                            Full Screen
                          </span>
                        </>
                      ) : (
                        <span style={{ color: "white", ...textStyle }}>
                          Exit Full Screen
                        </span>
                      )}
                    </MenuItem>

                    {isAuthenticated ? (
                      <MenuItem
                        onClick={() => {
                          togglePinPointsVisibility();
                          handleOpen();
                          handleMenuClose2();
                        }}
                      >
                        <Button
                          onClick={() => {
                            handleOpenModalbroucher();
                          }}
                          sx={timelapsebuttonsmscrren(pinPointsVisible)}
                        >
                          {pinPointsVisible ? (
                            <img src={Broucher} alt="Broucher" />
                          ) : (
                            <img src={Broucher} alt="Broucher" />
                          )}
                        </Button>
                        {pinPointsVisible ? (
                          <>
                            <span style={{ color: "white", ...textStyle }}>
                              Broucher
                            </span>
                          </>
                        ) : (
                          <span
                            style={{
                              color: "white",
                              pointerEvents: "all",
                              ...textStyle,
                            }}
                          >
                            Broucher
                          </span>
                        )}
                      </MenuItem>
                    ) : null}

                    <MenuItem onClick={togglePinPointsVisibility}>
                      <Button
                        sx={vrbuttonsmscrren(pinPointsVisible)}
                        onClick={() => {
                          togglePinPointsVisibility();
                          navigate("/plotdetail");
                        }}
                      >
                        {pinPointsVisible ? (
                          <img src={detasils} alt="detasils" />
                        ) : (
                          <img src={detasils} alt="detasils" />
                        )}
                      </Button>
                      {pinPointsVisible ? (
                        <>
                          <span style={{ color: "white", ...textStyle }}>
                            Plot Details
                          </span>
                        </>
                      ) : (
                        <span style={{ color: "white", ...textStyle }}>
                          Plot Details{" "}
                        </span>
                      )}
                    </MenuItem>

                    <MenuItem onClick={togglePinPointsVisibility}>
                      <Button
                        sx={vrbuttonsmscrren(pinPointsVisible)}
                        onClick={togglePinPointsVisibility}
                      >
                        {pinPointsVisible ? (
                          <img src={gallery} alt="gallery" />
                        ) : (
                          <img src={gallery} alt="gallery" />
                        )}
                      </Button>
                      {pinPointsVisible ? (
                        <>
                          <span style={{ color: "white", ...textStyle }}>
                            Gallery
                          </span>
                        </>
                      ) : (
                        <span style={{ color: "white", ...textStyle }}>
                          Gallery
                        </span>
                      )}
                    </MenuItem>

                    <MenuItem>
                      <Box
                      // component="a"
                      // href={Location === "/" ? Brochure : BluevalleyBrochure}
                      // target="_blank"
                      >
                        <Button
                          sx={vrbuttonsmscrren(pinPointsVisible)}
                          onClick={() => {
                            handleOpenModalVideomodal();
                          }}
                        >
                          {pinPointsVisible ? (
                            <img src={video} alt="video" />
                          ) : (
                            <img src={video} alt="video" />
                          )}
                        </Button>
                      </Box>
                      {pinPointsVisible ? (
                        <>
                          <span style={{ color: "white", ...textStyle }}>
                            Video
                          </span>
                        </>
                      ) : (
                        <span style={{ color: "white", ...textStyle }}>
                          Video
                        </span>
                      )}
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  {/* ||   !isAuthenticated */}
                  {open === true || Location === "/" ? null : (
                    <>
                      <Button
                        sx={vrcss}
                        onClick={() => {
                          handleOpenModalbroucher();
                        }}
                      >
                        <img src={Broucher} width="13px" height="13px" />
                        <Box className="button-text" sx={styles.SideBarBtns}>
                          <Box
                            sx={{
                              fontSize: "11px",
                            }}
                          >
                            Brochure
                          </Box>
                        </Box>
                      </Button>

                      {Location === "/floorplan" && (
                        <Button
                          sx={vrcss}
                          // onClick={() => navigate("/interactive")}
                          // onClick={() => {
                          //   setloginmodal(true);
                          // }}
                          onClick={() => setOpenModal(true)}
                        >
                          <img src={gallery} width="13px" height="13px" />
                          <Box className="button-text" sx={styles.SideBarBtns}>
                            <Box
                              sx={{
                                fontSize: "11px",
                              }}
                            >
                              Gallery
                            </Box>
                          </Box>
                        </Button>
                      )}

                      <Button
                        sx={vrcss}
                        // onClick={() => navigate("/interactive")}
                        onClick={() => {
                          handleOpenModalVideomodal();
                        }}
                      >
                        <img src={video} width="13px" height="13px" />
                        <Box className="button-text" sx={styles.SideBarBtns}>
                          <Box
                            sx={{
                              fontSize: "11px",
                            }}
                          >
                            Video
                          </Box>
                        </Box>
                      </Button>
                    </>
                  )}

                  {/* {open !== true && (
                    <>
                      {Location === "/villa" ? null : (
                        <Button
                          onClick={toggleDrawersidebar(true)}
                          sx={{
                            ...sidebarbutton,
                          }}
                        >
                          <Box className="button-text" sx={styles.SideBarBtns}>
                            <Box
                              sx={{
                                fontSize: "11px",
                              }}
                            >
                              News & Projects
                            </Box>
                          </Box>
                          <Box
                            component={"img"}
                            sx={{
                              cursor: "pointer",
                            }}
                            src={rightarrow}
                          />
                        </Button>
                      )}
                    </>
                  )} */}

                  {/* <AnimatePresence>
                    {Location === "/villa" ? null : (
                      <>
                        <Drawer
                          anchor="right"
                          open={open}
                          onClose={toggleDrawersidebar(false)}
                          sx={{
                            ...drawerright,
                            mt: Location === "/" ? 5 : 0,
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: open ? "fit-content" : 0,
                              // opacity: open ? 1 : 0,
                            }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{
                              duration: 1,
                              ease: "easeInOut",
                            }}
                            style={{ overflow: "hidden" }}
                          >
                            <Box sx={drawermainbox}>
                              <Button sx={drawerbutton}>
                                <Box
                                  component={"img"}
                                  onClick={toggleDrawersidebar(false)}
                                  sx={imgleftarrowcrop}
                                  src={leftarrowcrop}
                                />
                              </Button>
                              <Box sx={drawerleftarrowmainbox}>
                                <Box sx={drawerleftarrowmainboxone}>
                                  <Tabs
                                    value={value}
                                    onChange={handleChangesss}
                                    sx={{ ...muitabcss, position: "fixed" }}
                                  >
                                    {Location === "/data" ? (
                                      <Tab
                                        label="Projects"
                                        sx={tab}
                                        value="1"
                                      />
                                    ) : null}
                                    <Tab
                                      label="News & Articles"
                                      sx={tab}
                                      value="2"
                                    />
                                  </Tabs>
                                </Box>
                                <Box sx={scrollcss}>
                                  {Location === "/data" ? (
                                    <>
                                      {value === "1" && (
                                        <Box sx={valueoneandtwo}>
                                          {[...Array(6)].map((data, idx) => (
                                            <>
                                              <Box
                                                key={idx}
                                                sx={{
                                                  ...mainboxtabcss,
                                                  mt: idx === 0 ? 0 : 2.5,
                                                }}
                                              >
                                                <Box
                                                  component={"img"}
                                                  src={Landimg}
                                                  sx={{
                                                    borderRadius: "12px",
                                                  }}
                                                />
                                                <Box sx={mainboxtypobox}>
                                                  <Typography
                                                    variant="body2"
                                                    sx={mainboxtypo}
                                                  >
                                                    Landmark
                                                  </Typography>
                                                </Box>
                                                <Box>
                                                  <Typography
                                                    sx={mainboxtyposecond}
                                                  >
                                                    Sky Villa
                                                  </Typography>
                                                  <Typography
                                                    sx={mainboxtypothree}
                                                  >
                                                    2 Plots
                                                  </Typography>
                                                  <Typography
                                                    sx={mainboxtypofour}
                                                  >
                                                    Plots
                                                  </Typography>
                                                  <Typography
                                                    sx={mainboxtypofive}
                                                  >
                                                    Sold Out
                                                  </Typography>
                                                  <Box sx={exploremainbox}>
                                                    <Typography sx={exptypo}>
                                                      Explore
                                                    </Typography>
                                                    <Box
                                                      component={"img"}
                                                      src={ExploreArrow}
                                                    />
                                                  </Box>
                                                </Box>
                                              </Box>
                                              <Typography
                                                sx={{
                                                  borderBottom:
                                                    "1px solid gray",
                                                }}
                                              >
                                                &nbsp;
                                              </Typography>
                                            </>
                                          ))}
                                        </Box>
                                      )}
                                    </>
                                  ) : null}
                                  {value === "2" && (
                                    <Box sx={valueoneandtwo}>
                                      {newsandartical.map((data, idx) => (
                                        <a
                                          href={data?.redirect}
                                          style={achorcss}
                                          target="_blank"
                                        >
                                          <Box
                                            key={idx}
                                            sx={{
                                              ...mainboxsecondtabcss,
                                              mt: idx === 0 ? 0 : 2.5,
                                            }}
                                          >
                                            <Box
                                              component={"img"}
                                              src={data?.url}
                                            />
                                            <Box>
                                              <Typography
                                                sx={mainboxsecondtabcsstypoone}
                                              >
                                                {data?.typo1}
                                              </Typography>
                                              <Typography
                                                sx={mainboxsecondtabcsstypotwo}
                                              >
                                                {data?.typo2}
                                              </Typography>
                                              <Typography
                                                sx={{
                                                  ...mainboxsecondtabcsstypotwo,
                                                  width: "190px",
                                                }}
                                              >
                                                Amount (INR Cr) : {data?.price}
                                              </Typography>
                                            </Box>
                                          </Box>
                                        </a>
                                      ))}
                                    </Box>
                                  )}
                                </Box>
                              </Box>
                            </Box>
                          </motion.div>
                        </Drawer>
                      </>
                    )}
                  </AnimatePresence> */}
                </>
              )}
            </Box>
          </Grid>
        </Grid>

        {Location !== "/view360" && (
          <Box
            // sx={{
            //   ...mainboxbottom,
            //   position: "fixed", // Set position to fixed
            //   // bottom: {
            //   //   xl: Location === "/" ? 70 : 2, // Responsive bottom values
            //   //   lg: 70,
            //   //   md: 65,
            //   //   sm: 65,
            //   //   xs: 25,
            //   // },
            //   bottom: {
            //     xl: 0, // Responsive bottom values
            //     lg: 0,
            //     md: 25,
            //     sm: 25,
            //     xs: 25,
            //   },
            //   left: 0, // This can be adjusted according to your layout, e.g., left, right or center it
            //   right: 0, // If you want it centered horizontally, include both left and right
            // }}
            sx={{
              ...mainboxbottom, // spread existing styles
              position: "fixed", // set fixed positioning
              bottom: {
                xl: 0, // Responsive bottom values
                lg: 0,
                md: 0,
                sm: 20,
                xs: 25,
              },
              left: 0, // optional: align to left edge
              right: 0, // optional: align to right edge (for full width)
              zIndex: 1000, // optional: ensure it stays on top of other content
            }}
          >
            <Box sx={mainboxbottomsecond}>
              {open === true ||
              Location === "/floorplan" ||
              Location.startsWith("/sattvalumina/") ||
              Location === "/sattvalumina" ? null : (
                <Box>
                  <Compass />
                </Box>
              )}

              {Location === "/villa" && (
                <Box sx={returnmainbox}>
                  <Button
                    onClick={() => {
                      navigate(-1);
                    }}
                    sx={returnmainboxbutton}
                  >
                    <Typography sx={returnmaintypo}>Return to plots</Typography>
                    <img src={BackIcon} />{" "}
                  </Button>
                </Box>
              )}

              <Box sx={{ ...mainboxpercetage(open) }}>
                {open === true ||
                Location === "/roseate" ||
                Location === "/floorplan" ? null : (
                  <>
                    {Location === "/" ||
                    Location === "/plotdetail" ||
                    Location.startsWith("/sattvalumina/") ||
                    Location === "/floorplan" ||
                    Location === "/roycelone" ||
                    Location === "/dummy" ||
                    Location === "/roycefloorplan" ||
                    Location === "/sanand" ? null : (
                      <Box sx={percentagebox}>
                        <Button
                          onClick={() => {
                            onSendData("ZoomOut");
                          }}
                          sx={percentageremoveadd}
                        >
                          <RemoveIcon sx={{ width: "20px", height: "20px" }} />
                        </Button>

                        <Typography sx={percentageshow}>
                          {GetPercentage()} %
                        </Typography>
                        <Button
                          onClick={() => {
                            onSendData("ZoomIn");
                          }}
                          sx={percentageremoveadd}
                        >
                          <AddIcon sx={{ width: "20px", height: "20px" }} />
                        </Button>
                      </Box>
                    )}

                    {isSmallScreen ? null : (
                      <Box
                        sx={{
                          mt:
                            Location.startsWith("/sattvalumina/") ||
                            Location === "/sattvalumina"
                              ? "-3.5%"
                              : "0%",
                        }}
                      >
                        <Button
                          onClick={toggleFullscreen}
                          sx={fullscreecss(isFullscreen)}
                        >
                          {!isFullscreen ? (
                            <img
                              src={FullScreenIcon}
                              width="18px"
                              height="auto"
                            />
                          ) : (
                            <img
                              src={FullScreenIconToogle}
                              width="18px"
                              height="auto"
                            />
                          )}
                        </Button>
                      </Box>
                    )}
                  </>
                )}

                {Location === "/sattvalumina" ||
                Location === "/roycelone" ||
                Location === "/dummy" ||
                Location.startsWith("/sattvalumina/") ? (
                  <>
                    <Box sx={mapdatamainbox(data1)}>
                      <AnimatePresence>
                        {data2 && (
                          <>
                            <DropdownAnimation360 data2={data2}>
                              <Box sx={data2open(data2)}>
                                <Box sx={data2openmainbox}>
                                  {threebuttonmapimage.map(
                                    (landMark, index) => {
                                      return (
                                        <>
                                          <Box
                                            key={index}
                                            onClick={() =>
                                              handleIconClick(landMark)
                                            }
                                            sx={{
                                              position: "relative",
                                              cursor: "pointer",
                                              pointerEvents: "all",
                                            }}
                                            onMouseEnter={() =>
                                              mouseenter(landMark?.id)
                                            }
                                            onMouseLeave={() => mouseleave()}
                                          >
                                            <Box
                                              component="img"
                                              src={landMark?.icon}
                                              sx={{
                                                ...mappeddatabox,
                                              }}
                                            />

                                            {/* Overlay */}
                                            <Box
                                              sx={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                height: {
                                                  xl: "90px",
                                                  lg: "90px",
                                                  md: "90px",
                                                  sm: "80px",
                                                  xs: "80px",
                                                },
                                                width: {
                                                  xl: "130px",
                                                  lg: "130px",
                                                  md: "130px",
                                                  sm: "120px",
                                                  xs: "120px",
                                                },
                                                backgroundColor:
                                                  "rgba(0, 0, 0, 0.2)", // Semi-transparent overlay
                                                zIndex: 1,
                                                borderRadius: "12px", // Matches the border radius of the image
                                              }}
                                            />

                                            <Box
                                              sx={{
                                                ...mappeddatabox2,
                                                opacity:
                                                  hoveredIndex === landMark?.id
                                                    ? 0
                                                    : 1,
                                                transition:
                                                  hoveredIndex === landMark?.id
                                                    ? "opacity 0.6s"
                                                    : "opacity 0.6s",
                                                zIndex: 2, // Ensure the text is above the overlay
                                              }}
                                            >
                                              <Typography
                                                variant="body2"
                                                sx={typoname}
                                              >
                                                {landMark?.name}
                                              </Typography>
                                            </Box>
                                          </Box>
                                        </>
                                      );
                                    }
                                  )}
                                </Box>
                              </Box>
                            </DropdownAnimation360>
                            {/* </motion.div> */}
                          </>
                        )}
                      </AnimatePresence>
                    </Box>
                    {/* Walk Through Button and 360 view button hidden for now  */}
                    <Box sx={mainboxwalkand360(showmapfilters, data1)}>
                      <Box sx={mainboxwalkand360child1}>
                        {!Location.startsWith("/sattvalumina/") && (
                          <Button
                            onClick={() => {
                              handleClick2();
                            }}
                            sx={threesixtybutton(data1, data2)}
                          >
                            <SlArrowUp
                              style={{
                                ...arrowup,
                                transform: data2 === true && "rotate(180deg)",
                              }}
                            />
                            &nbsp;Skyline Panorama View
                          </Button>
                        )}

                        {Location === "/sattvalumina" ? (
                          <Button
                            onClick={() => {
                              handleClick();
                            }}
                            sx={buttonwalk(data1)}
                          >
                            <SlArrowUp
                              style={{
                                ...arrowup,
                                transform: data1 === false && "rotate(180deg)",
                              }}
                            />

                            <Box sx={walkbox}>Amenities</Box>
                          </Button>
                        ) : Location === "/roycelone" ? (
                          <Button
                            onClick={() => {
                              handleRoyceClick();
                            }}
                            sx={buttonwalk(roycedata)}
                          >
                            <SlArrowUp
                              style={{
                                ...arrowup,
                                transform:
                                  roycedata === false && "rotate(180deg)",
                              }}
                            />

                            <Box sx={walkbox}>Luxury Features & Sky Club</Box>
                          </Button>
                        ) : (
                          <Typography sx={{ width: "120px" }}>
                            &nbsp;
                          </Typography>
                        )}
                      </Box>
                      <Box sx={mainboxwalkand360child2}>
                        {data1 && (
                          <Grid
                            container
                            spacing={2}
                            sx={{ justifyContent: "flex-end" }}
                          >
                            <Grid
                              item
                              xs={12}
                              md={8.5}
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <Box sx={mainboxwalkand360child2box}>
                                <Box sx={mainboxwalkand360child2box2}>
                                  {amenitiesData.map((data, index) => (
                                    <Button
                                      key={index}
                                      sx={{
                                        ...AmenitiesBox,
                                        backgroundColor: selectedName?.includes(
                                          data.name
                                        )
                                          ? "white"
                                          : "black",
                                        color: selectedName?.includes(data.name)
                                          ? "black"
                                          : "white",
                                        "&:hover": {
                                          backgroundColor:
                                            selectedName?.includes(data.name)
                                              ? lighten(
                                                  "rgba(255, 255, 255, 0.5)",
                                                  0.5
                                                )
                                              : lighten(
                                                  "rgba(0, 0, 0, 0.5)",
                                                  0.5
                                                ),
                                          color: selectedName?.includes(
                                            data.name
                                          )
                                            ? "black"
                                            : "white",
                                        },
                                      }}
                                      onClick={() => handleSelect(data.name)}
                                    >
                                      {data.name !== "Show All" && (
                                        <Box
                                          component={"img"}
                                          src={data.icon}
                                          alt={data.name}
                                        />
                                      )}
                                      {data.name}
                                    </Button>
                                  ))}
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                        )}
                      </Box>
                    </Box>
                  </>
                ) : null}

                {Location === "/roseate" && scale === 3 && (
                  <>
                    {/* <Typography
                      sx={{
                        position: "absolute",
                        bottom: 60,
                        textAlign: "center",
                        // width: "200px",
                        right: "2.5%",
                        marginLeft: "auto",
                        fontSize: "12px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {getNameByParentId(IDforImg)}
                    </Typography> */}
                    <Box sx={galleryImageBox}>
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          marginLeft: "auto",
                        }}
                      >
                        {matchingImages.map((img, index) => (
                          <div key={index} style={{ textAlign: "center" }}>
                            <Typography
                              sx={{
                                fontSize: "10px",
                                color: "white",
                                marginBottom: "4px",
                              }}
                            >
                              {matchingNames[index]}{" "}
                            </Typography>
                            <img
                              src={img}
                              style={{
                                width: "60px",
                                height: "40px",
                                border: "1px solid white",
                                borderRadius: "10px",
                                flexShrink: 0,
                                cursor: "pointer",
                                pointerEvents: "all",
                              }}
                              // onClick={() => setOpenModal(true)}
                              onClick={() => {
                                setSelectedImage(img); // Set the selected image
                                setOpenModal(true); // Open the modal
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/*  <Modal
        open={dialogopen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Fade in={dialogopen}>
          <Box sx={style} className="timelapsemodal">
            <Box sx={modalbox}>
              <CloseIcon onClick={handleClose} style={modalclosecss} />
            </Box>
            <Box sx={modalparentbox}>
              <Box
                onClick={() => {
                  navigate("/sanandtimelapse");
                }}
                sx={modalchildbox}
              >
                <Box component={"img"} src={Sanandimage} sx={modalimg} />
                <Typography sx={modaltypotext}> Rajankunte</Typography>
              </Box>
              <Box
                onClick={() => {
                  navigate("/ahmedabadtimelapse");
                }}
                sx={modalchildbox}
              >
                <Box component={"img"} src={ahmedabadimage} sx={modalimg} />
                <Typography sx={modaltypotext}>Bangalore</Typography>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal> */}

      {openModal && (
        <FloorPlanModal
          open={openModal}
          setOpen={setOpenModal}
          images={
            Location === "/floorplan" ? floorplangalleryimages : matchingImages
          }
          names={
            Location === "/floorplan" ? floorplangalleryname : matchingNames
          }
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}

      <DynamicModal
        profilemodal={profilemodal}
        setProfilemodal={setProfilemodal}
      />

      <VideoModal videomodal={videomodal} setVideomodal={setVideomodal} />

      {Location === "/" ? null : (
        <LoginModal
          loginmodal={loginmodal}
          setloginmodal={setloginmodal}
          otpmodal={otpmodal}
          setotpmodal={setotpmodal}
          setIsLogin={setIsLogin}
          isLogin={isLogin}
          setforgototpmodal={setforgototpmodal}
          forgototpmodal={forgototpmodal}
        />
      )}

      <Brouchermodal
        brouchermodal={brouchermodal}
        setBrouchermodal={setBrouchermodal}
      />
    </>
  );
}

export default SatvaHeader;
const textStyle = {
  fontFamily: "Roboto",
  textTransform: "capitalize",
};

const tab = {
  color: "#ffffff",
  fontWeight: 700,
  fontSize: "15px",
  textTransform: "none",
  fontFamily: "Roboto",
  opacity: 0.4,
  transition: "opacity 0.3s, font-weight 0.3s",
  "&:hover": {
    opacity: 1,
    color: "#ffffff",
    fontWeight: 700,
  },
  "&.Mui-selected": {
    opacity: 1,
    color: "#ffffff",
  },
};

const modalbox = {
  width: "100%",
  display: "flex",
  justifyContent: "flex-end",
};

const modalclosecss = {
  color: "white",
  cursor: "pointer",
};

const modalparentbox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: { xs: "0.5rem" },
};

const modalchildbox = {
  textAlign: "center",
  width: { xs: "100%", sm: "48%" },
  cursor: "pointer",
};

const goyaltypo = {
  background: "#595959",
  color: "#BDBDBD",
  padding: "0px 6px",
  fontWeight: 500,
  width: "100%",

  ...textStyle,
  "&:hover": {
    color: "white",
  },
};

const ahmedabadtypo = {
  background: "#595959",
  color: "#BDBDBD",
  padding: "0px 6px",
  width: "100%",
  pointerEvents: "all",
  ...textStyle,
};

const shelatypo = {
  background: "#595959",
  color: "#BDBDBD",
  padding: "0px 6px",
  width: "100%",
  pointerEvents: "all",
  ...textStyle,
};

const goyaltypoone = {
  background: "#595959",
  color: "#BDBDBD",
  padding: "0px 15px",
  fontWeight: 500,
  ...textStyle,
  "&:hover": {
    color: "white",
  },
};
const shelatypoone = {
  background: "#595959",
  color: "#BDBDBD",
  padding: "0px 10px",
  pointerEvents: "all",
  ...textStyle,
};
const ahmedabadtypoone = {
  background: "#595959",
  color: "#BDBDBD",

  padding: "0px 10px",
  pointerEvents: "all",
  ...textStyle,
};

const smallscreenmapfilter = {
  color: "#BDBDBD",
  fontSize: "8px",
  textAlign: "center",
  width: "100%",
  textTransform: "capitlized",
  ...textStyle,
};

const fullscreecss = (isFullscreen) => ({
  mt: 2,
  height: "65%",
  pointerEvents: "all",
  borderRadius: "7px !important",
  minWidth: "0px",
  ...textStyle,
  backgroundColor: !isFullscreen ? "rgba(0, 0, 0, 1)" : "white",
  color: !isFullscreen ? "white" : "rgba(0, 0, 0, )",
  ...textStyle,
  "&:hover": {
    backgroundColor: !isFullscreen ? "rgba(0,0,0,1)" : "white",
  },
  "&:hover .button-text": {
    visibility: "visible",
    opacity: 1,
    transform: "translateX(-80%)",
    animation: "slideInFromRight 0.5s ease-out forwards",
  },
});

const mainboxpercetage = (open) => ({
  positon: "absolute",
  mt: !open === true ? 0 : -10,
  height: "90%",
  color: "white",
  display: "flex",
  gap: "10px",
  justifyContent: "flex-end",
  minWidth: "100%",
  padding: "0px",
  pb: 1.5,
  borderRadius: "12px",
  pointerEvents: "none",
});

const mainboxtabcss = {
  display: "flex",
  flexDirection: "row",
  gap: "30px",

  position: "relative",
};

const mainboxtypobox = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "flex-end",
  padding: "8px",
};

const mainboxtypo = {
  color: "white",
  fontWeight: "bold",
  fontSize: "14px",
  background: "#999999B2",
  p: 1,
  borderRadius: "12px",
};

const mainboxtyposecond = {
  fontFamily: "Segoe UI",
  fontSize: 14,
  fontWeight: 700,
  textAlign: "left",
};

const mainboxtypothree = {
  fontFamily: "Segoe UI",
  fontSize: 12,
  fontWeight: 400,

  textAlign: "left",
};

const mainboxtypofour = {
  fontFamily: "Segoe UI",
  fontSize: 12,
  fontWeight: 400,

  textAlign: "left",
  color: "#7A7A7A",
};

const mainboxtypofive = {
  fontFamily: "Segoe UI",
  fontSize: 12,
  fontWeight: 400,
  textAlign: "left",
  color: "red",
};

const mainboxsecondtabcss = {
  display: "flex",
  flexDirection: "row",
  gap: "10px",
};

const mainboxsecondtabcsstypoone = {
  width: "220px",
  fontFamily: "Roboto",
  fontSize: "11px",
  lineHeight: "17px",
  letterSpacing: "0.25px",
  fontWeight: 400,
  textAlign: "left",
};

const mainboxsecondtabcsstypotwo = {
  width: "220px",
  fontFamily: "Roboto",
  fontSize: "12px",
  fontWeight: 400,
  color: "#FFFFFFBF",
  mt: 1,
  letterSpacing: "0.25px",
  textAlign: "left",
};

const scrollcss = {
  // width: "350px",
  height: "88%",
  overflowY: "auto",
  mt: 4,
};

const sidebarbutton = {
  position: "absolute",
  right: 0,
  top: "35%",
  opacity: 1,
  cursor: "pointer",
  pointerEvents: "all",
  paddingRight: "0px !important",
  zIndex: 1301,
  "& .MuiBackdrop-root": {
    cursor: "pointer",
    pointerEvents: "all",
  },
  "&:hover .button-text": {
    visibility: "visible",
    opacity: 1,
    transform: "translateX(-80%)",
    animation: "slideInFromRight 0.5s ease-out forwards",
  },
};

const timelapescss = {
  backgroundColor: "black",
  color: "rgba(0, 0, 0, 0.6)",
  pointerEvents: "all",
  padding: "7px !important",
  borderRadius: "7px !important",
  ...textStyle,
  "&:hover .button-text": {
    visibility: "visible",
    opacity: 1,
    transform: "translateX(-80%)",
    animation: "slideInFromRight 0.5s ease-out forwards",
  },
};

const vrcss = {
  backgroundColor: "black",
  color: "rgba(0, 0, 0, 0.6)",
  pointerEvents: "all",
  padding: "12px 12px !important",
  minWidth: "0px",

  borderRadius: "7px !important",
  ...textStyle,
  zIndex: 1,
  position: "relative",
  "&:hover .button-text": {
    visibility: "visible",
    opacity: 1,
    transform: "translateX(-80%)",
    animation: "slideInFromRight 0.5s ease-out forwards",
  },
  "&:hover": {
    backgroundColor: "rgba(0,0,0,1)",
  },
};

const vrcsstypotext = {
  width: "130px !important",
  visibility: "visible",
  opacity: 1,
  position: "absolute",
  marginRight: "-70px",
  right: "100%",
  transform: "translateX(-80%)",
  backgroundColor: "rgba(0,0,0,0.8)",
  color: "white",
  padding: "5px 10px",
  height: "90%",
  whiteSpace: "nowrap",
  zIndex: 1,
  transition: "none",
  animation: "none",
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: 400,
  letterSpacing: "0.4px",
  textAlign: "cneter",
  borderRadius: "12px",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  zIndex: 0,
  transform: "translate(-50%, -50%)",
  width: {
    xs: "90%",
    sm: "80%",
    md: "60%",
    lg: "50%",
    xl: "40%",
  },
  maxHeight: "90vh",
  bgcolor: "rgba(0,0,0,0.7)",
  boxShadow: 24,
  borderRadius: "12px",
  p: 2,
};

const modalimage = {
  height: { lg: "250px", md: "250px", sm: "120px", xs: "120px" },
  width: { lg: "250px", md: "250px", sm: "120px", xs: "120px" },
};

const modaltypotext = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Roboto",
  fontSize: { lg: "25px", md: "25px", sm: "15px", xs: "15px" },
  fontWeight: 400,
  color: "white",
  textUnderlineOffset: "3px",
  textDecoration: "underline",
};

const newsprojecttypo = {
  visibility: "visible",
  opacity: 1,
  position: "absolute",
  marginRight: "-105px",
  right: "100%",
  transform: "translateX(-80%)",
  backgroundColor: "rgba(0,0,0,0.8)",
  color: "white",
  padding: "5px 10px",
  whiteSpace: "nowrap",
  zIndex: 1,
  transition: "none",
  animation: "none",
  fontFamily: "Roboto",
  fontSize: "14px",
  fontWeight: 400,
  letterSpacing: "0.4px",
  textAlign: "cneter",
  borderRadius: "12px",
  textTransform: "none",
};

const showallbuttoncss = {
  color: "#BDBDBD",
  fontSize: "13px",
  background: "#595959",
  width: "100%",
  fontWeight: 500,
  padding: "4px 0px",
  marginBottom: "7px",
  borderRadius: "8px",
  pointerEvents: "all",
  lineHeight: "1.3",
  ...textStyle,
  display: "inline-block",
  transition: "background  0.3s ease",
  "&:hover": {
    color: "#BDBDBD",
    background: "#606060",
  },
};

const goyalandcosmallscreen = {
  background: "#595959",
  color: "#BDBDBD",
  display: "flex",
  alignItems: "center",
  justifyContent: "center", // Center the text in the button
  padding: "5px 6px",
  pointerEvents: "all",
  fontWeight: 500,
  width: "200px",
  ...textStyle,
  position: "relative", // Ensure better control for positioning
  "&:hover": {
    color: "white",
  },
};

const smallscreendrawer = {
  padding: "1rem",
  backgroundColor: "#333",
  color: "white",
  marginTop: "70px",
  ...textStyle,
};

const menuiteminsmallscreen = {
  "& .MuiPaper-root": {
    backgroundColor: "rgba(0,0,0,1)",
    top: "90px !important",
    left: "15px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    ...textStyle,
  },
  "& ul": {
    width: "100%",
    padding: "20px",
    ...textStyle,
  },
  "& li": {
    backgroundColor: "#313131",
    margin: "10px",
    gap: "0.5rem",
    ...textStyle,
  },
};

const goyaltext = {
  background: "#DADADA",
  color: "#2F2F2F",
  padding: "0px 13px",
  fontWeight: 500,
  pointerEvents: "all",
  display: {
    xl: "flex",
    lg: "flex",
    md: "flex",
    sm: "none",
    xs: "none",
  },
  ...textStyle,
  "&:hover": {
    color: "black",
    background: "#DADADA",
  },
  borderRadius: "6px",
};

const ahmtext = {
  background: "#595959",
  color: "#BDBDBD",
  padding: "0px 13px",
  pointerEvents: "all",
  ...textStyle,
  "&:hover": {
    background: "#606060",
    color: "#BDBDBD",
  },
};

const sanandtex = {
  background: "#595959",
  color: "#BDBDBD",
  padding: "0px 13px",
  pointerEvents: "all",
  ...textStyle,
  "&:hover": {
    background: "#606060",
    color: "#BDBDBD",
  },
};

const textActive = {
  background: "#BDBDBD",
  color: "rgba(0,0,0,1)",
  padding: "0px 13px",
  pointerEvents: "all",
  ...textStyle,
  "&:hover": {
    background: "#BDBDBD",
    color: "rgba(0,0,0,1)",
  },
};

const bangloretex = {
  background: "#595959",
  color: "#BDBDBD",
  padding: "0px 13px",
  pointerEvents: "all",
  ...textStyle,
  "&:hover": {
    background: "#606060",
    color: "#BDBDBD",
  },
};

const handleShowbutton = {
  minWidth: "0px",
  padding: "18px 8px",
  backgroundColor: "#595959",
  "&:hover": {
    color: "white",
    background: "#444444",
  },
  color: "white",
  marginLeft: "1rem",
  borderRadius: "0px 6px 8px 0px",
  pointerEvents: "all",
  ...textStyle,
};

const toggleDrawersidebarbutton = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100% !important",
  background: "rgba(35, 35, 35, 0.95)",
  color: "#BDBDBD",
  padding: "5px 6px",
  marginRight: "10px",
  zIndex: "4",
  height: "30px",
  pointerEvents: "all",
  borderRadius: "unset !important",
};

const toggleDrawersidebarbuttonone = {
  transition: "0.3s top",
  position: "absolute",
  height: "6px",
  width: "60px !important",
  background: "#595959",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 3,
  borderRadius: "30px",
  top: "7px",
  padding: "0px",
};

const mainboxtypoabsolute = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  alignItems: "flex-end",
  padding: "8px",
};

const typobody2 = {
  color: "white",
  fontWeight: "bold",
  fontSize: "14px",
  background: "#999999B2",
  p: 1,
  borderRadius: "12px",
};

const typovillaname = {
  fontFamily: "Segoe UI",
  fontSize: 16,
  fontWeight: 700,
  textAlign: "left",
};

const typovillatype = {
  fontFamily: "Segoe UI",
  fontSize: 14,
  fontWeight: 400,

  textAlign: "left",
};

const modalimg = {
  width: "100%",
  height: "auto",
  maxHeight: { xs: 200, sm: 300, md: 400 },
  objectFit: "cover",
  borderRadius: 1,
};

const mapdata1main = {
  display: "flex",
  flexDirection: "row",
  gap: "30px",
  position: "relative",
};

const exploremainbox = {
  display: "flex",
  flexDirection: "row",
  gap: "20px",
  cursor: "pointer",
};

const exptypo = {
  fontFamily: "Segoe UI",
  fontSize: 14,
  fontWeight: 400,
  textAlign: "center",
};

const MapFilterMainStyle = (showmapfilters, textStyle, Location) => ({
  backgroundColor: "rgba(0,0,0,1)",
  color: "white",
  borderRadius: "10px",
  textAlign: "center",
  height: "fit-content",
  padding: showmapfilters ? "0px 14px 14px 14px" : "0px 10px 0px 10px",
  ...textStyle,
  transition: "all 0.3s",
  width:
    Location === "/sattvalumina" ||
    Location.startsWith("/sattvalumina/") ||
    Location === "/floorplan"
      ? "160px"
      : "200px",
});

const MapFilterMainStyleVilla = (showmapfilters, textStyle) => ({
  backgroundColor: "rgba(0,0,0,1)",
  color: "white",
  borderRadius: "10px",
  width: "250px",
  textAlign: "center",
  // height: "fit-content",
  padding: showmapfilters ? "0px 14px 15px 14px" : "0px 10px 0px 10px",
  ...textStyle,
  transition: "all 0.5s",
});

const mainboxwalkand360 = (showmapfilters, data1) => ({
  position: "absolute",
  // bottom: (showmapfilters && data1) || data1 ? 55 : 0,
  bottom: 100,
  right: "15.3px",
});

const mainboxwalkand360child1 = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginBottom: "10px",
};

const mainboxwalkand360child2 = {
  position: "absolute",
  mb: "20%",
  right: "0%",
};

const buttonwalk = (data1) => ({
  pointerEvents: "all",
  width: "200px",
  textTransform: "none",
  borderRadius: "8px",
  // fontSize: "8px",
  fontFamily: "Roboto",
  fontSize: 12.5,
  gap: "5px",
  // p: 1.5,
  // padding: "8px 10px",
  ...textStyle,
  color: data1 === true ? "black" : "white",
  backgroundColor: data1 === true ? "white" : "black",
  "&:hover": {
    backgroundColor: "white",
    color: "black",
  },
});

const walkbox = {
  display: "flex",
  flexDirection: "row",
  gap: "5px",
  alignItems: "center",
  fontFamily: "Roboto",
  fontSize: 12.5,
  fontWeight: 500,
  whiteSpace: "nowrap",
  ...textStyle,
};

const threesixtybutton = (data1, data2) => ({
  pointerEvents: "all",
  width: "180px",
  fontFamily: "Roboto",
  fontSize: 12.5,
  gap: "5px",

  fontWeight: 500,
  whiteSpace: "nowrap",
  // p: 1.5,
  // padding: "8px 10px",
  textTransform: "none",
  transition: "all 0.3s",
  borderRadius: "8px",
  ...textStyle,
  transitionProperty: "color, backgroundColor, borderRadius,p",
  transitionTimingFunction: "ease-in-out",
  // animation: data1
  //   ? "slideInFromtop 0.5s ease-out forwards"
  //   : "slideInFromBottom 0.5s ease-out forwards",
  color: data2 === true ? "black" : "white",
  backgroundColor: data2 === true ? "white" : "black",
  ...textStyle,
  "&:hover": {
    backgroundColor: "white",
    color: "black",
  },
});

const arrowdown = {
  height: "19px",
  width: "19px",
};

const arrowup = {
  height: "13px",
  width: "13px",
};

const mainboxwalkand360child2box = {
  display: "flex",
  flexDirection: "row",
  width: "max-content",
  justifyContent: "flex-end",
  flexWrap: "wrap",
  animation: "slideInFromBottom 0.5s ease-out forwards",
  // "&::-webkit-scrollbar": {
  //   display: "none",
  // },
};

const mainboxwalkand360child2box2 = {
  display: "flex",
  justifyContent: {
    xl: "end",
    lg: "end",
    md: "flex-start",
    sm: "flex-start",
    xs: "flex-start",
  },
  gap: {
    xl: "10px",
    lg: "10px",
    md: "30px",
    sm: "30px",
    xs: "30px",
  },
  maxWidth: {
    xl: "80%",
    lg: "80%",
    md: "400px",
    sm: "400px",
    xs: "400px",
  },
  overflowX: "scroll",
  pointerEvents: "all",
  flexWrap: {
    xl: "wrap",
    lg: "wrap",
    md: "nowrap",
    sm: "nowrap",
    xs: "nowrap",
  },
};

const mapdatamainbox = (data1) => ({
  position: "absolute",

  // bottom: data1 ? 130 : 70,
  bottom: 200,
  right: "2%",
});

const galleryImageBox = {
  position: "absolute",
  bottom: 10,
  right: "2%",
  width: "260px", // Ensure this width is smaller than the total width of the content
  overflowX: "auto", // Enable horizontal scrolling
  display: "flex",
  whiteSpace: "nowrap", // Prevent images from wrapping to the next line
  "::-webkit-scrollbar": {
    height: "0px",
  },
};

const data2open = (data2) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  height: data2
    ? {
        xl: "300px",
        lg: "300px",
        md: "300px",
        sm: "200px",
        xs: "200px",
      }
    : "0px",
  opacity: data2 ? 1 : 0,
  maxHeight: {
    xl: "300px",
    lg: "300px",
    md: "300px",
    sm: "200px",
    xs: "200px",
  },
  //height: "fit-content",
  overflowY: "auto",
  // transition: "height 0.8s ease-out, opacity 0.8s ease-out",
  // p: 0.5,
  // animation: "slideInFromBottom 0.8s ease-out forwards",
  // transitionDuration: "4s",
  "::-webkit-scrollbar": {
    width: "3px",
    display: "flex",
  },
  "::-webkit-scrollbar-thumb": {
    background: "rgba(0, 0, 0, 0.4)",
    borderRadius: "3px",
  },
  "::-webkit-scrollbar-thumb:vertical": {
    maxHeight: "2px",
    minHeight: "10px",
  },
  "::-webkit-scrollbar-thumb:horizontal": {
    minWidth: "10px",
  },
});

const data2openmainbox = {
  display: "flex",
  gap: "5px",
  flexDirection: "column",
  mt: {
    xl: 0,
    lg: 0,
    md: 0,
    sm: 0,
    xs: 5,
  },
  height: {
    xl: "300px",
    lg: "300px",
    md: "300px",
    sm: "200px",
    xs: "200px",
  },
  overflowY: "auto",
};

const mappeddatabox = {
  pointerEvents: "all",
  height: {
    xl: "90px",
    lg: "90px",
    md: "90px",
    sm: "80px",
    xs: "80px",
  },
  width: {
    xl: "130px",
    lg: "130px",
    md: "130px",
    sm: "120px",
    xs: "120px",
  },
  zIndex: 1000,
  transition: "all 0.6s",
  borderRadius: "12px",
  cursor: "pointer",
};

const mappeddatabox2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px",
};

const typoname = {
  whiteSpace: "nowrap",
  fontFamily: "Roboto",
  fontSize: 13,
  fontWeight: 600,
  textAlign: "left",
};

const muitabcss = {
  "& .MuiTabs-indicator": {
    backgroundColor: "#e11b22",
    height: "3px",
    color: "white",
  },
};

const menusx = {
  "& .MuiPaper-root": {
    backgroundColor: "rgba(0,0,0,1)",
  },
  "& li": {
    backgroundColor: "#313131",
    margin: "10px",
    gap: "0.5rem",
    borderRadius: "10px",
  },
};

const mainbox = {
  position: "fixed",
  zIndex: 2,
  width: "100%",
  paddingTop: "10px",
  minHeight: "100vh",
  pointerEvents: "none",
};

const gridcontainer = {
  width: "98%",
  margin: "auto",
  paddingTop: "10px",
};

const griditem1box = (isSmallScreen) => ({
  backgroundColor: "rgba(0,0,0,1)",
  color: "white",
  borderRadius: "8px",
  width: isSmallScreen ? "100%" : "fit-content",
  animation: "slideInFromLeft 0.4s ease-out forwards",
  animationDelay: "1s",
});

const griditembox2 = (isSmallScreen) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: isSmallScreen ? "space-between" : "center",
  "& button": {
    fontSize: "12px",
    whiteSpace: "nowrap",
    ...textStyle,
    textTransform: "capitalize",
  },
});

const aldarlogo = {
  color: "white",
  pointerEvents: "all",
  padding: "0px",
};

const hoverandclickimgshow = (activePin) => ({
  backgroundColor: "rgba(0, 0, 0, 1)",
  color: "white",
  borderRadius: "12px",
  alignItems: "center",
  width: "400px",
  textAlign: "center",
  display: "flex",
  gap: "1rem",

  height: "110px",
  animation: activePin ? "slideInFromLeft 0.4s ease-out forwards" : null,
  opacity: activePin ? 1 : 0,
  transition: "opacity 0.5s",
});

const imghover = {
  width: "170px",
  height: "110px",
  borderRadius: "12px",
  borderBottomLeftRadius: "10px",
  borderTopLeftRadius: "10px",
  ...textStyle,
};

const cardmainbox = {
  textAlign: "left",
  p: 1.5,
};

const titlehovercard = {
  fontSize: "12px",
  ...textStyle,
};

const descriptioncard = {
  color: "#BDBDBD",
  fontSize: "10px",
  ...textStyle,
};

const griditemsecond = {
  gap: "1rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "end",
  "& button": {
    borderRadius: "10px",
    padding: { lg: "10px", md: "10px", sm: "10px", xs: "auto" },
    width: "fit-content",
    minWidth: "0px",
  },
};

const iconbutton = {
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  minWidth: "auto",
  display: "block",
  color: "white",
  pointerEvents: "all",
  padding: "5px 7px 2px 7px",
};

const fullscreenbuttonsmscrren = (isFullscreen) => ({
  backgroundColor: !isFullscreen ? "rgba(0,0,0,1)" : "white",
  color: !isFullscreen ? "white" : "rgba(0, 0, 0, 0.6)",
  minWidth: "0px",
  pointerEvents: "all",
  ...textStyle,
});

const timelapsebuttonsmscrren = (pinPointsVisible) => ({
  backgroundColor: pinPointsVisible ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.5)",
  color: pinPointsVisible ? "white" : "rgba(0, 0, 0, 0.6)",
  minWidth: "0px",
  pointerEvents: "all",
  ...textStyle,
});

const vrbuttonsmscrren = (pinPointsVisible) => ({
  backgroundColor: pinPointsVisible ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.5)",
  color: pinPointsVisible ? "white" : "rgba(0, 0, 0, 0.6)",
  minWidth: "0px",
  pointerEvents: "all",
  ...textStyle,
});

const drawerright = {
  "& .MuiDrawer-paper": {
    width: "380px",
    backgroundColor: "transparent",
    borderRadius: "12px",
    boxShadow: "none",
  },
  position: "relative",
  "& .MuiBackdrop-root": {
    backgroundColor: "transparent",
  },
};

const drawermainbox = {
  display: "flex",
  position: "fixed",
  zIndex: 2,
  height: "100%",
};

const drawerbutton = {
  pointerEvents: "all",
  zIndex: 3,
  padding: "0px",
  minWidth: "0px",
};

const imgleftarrowcrop = {
  cursor: "pointer",
  pointerEvents: "all",
  zIndex: 3,
  height: "160px",
  width: "40px",
};

const drawerleftarrowmainbox = {
  width: "340px",
  height: "100%",
  color: "white",
  backgroundColor: "rgba(0,0,0,1)",
  position: "relative",
  zIndex: 2,
};

const drawerleftarrowmainboxone = {
  p: 2,
  width: "100%",
};

const mainboxbottom = {
  position: "absolute",
  width: "100%",
  mx: "auto",
};

const mainboxbottomsecond = {
  width: "98%",
  mx: "auto",
  display: "flex",
  justifyContent: "space-between",
};

const percentagebox = {
  positon: "absolute",
  height: "100%",
  pointerEvents: "all",
  color: "white",
  display: "flex",
  gap: "10px",
  justifyContent: "flex-end",
  backgroundColor: "black",
  minWidth: "auto",
  padding: "0px",
  p: 0.8,
  borderRadius: "8px",
  mt: 2,
};

const percentageshow = {
  color: "white",
  minWidth: "auto",
  padding: "0px",
  fontSize: "13px",
};

const percentageremoveadd = {
  minWidth: "auto",
  padding: "0px",
  color: "white",
};

const timelapsebutton = (isFullscreen) => ({
  backgroundColor: "rgba(0,0,0,1)",
  color: "rgba(0, 0, 0, 0.6)",
  pointerEvents: "all",
  padding: "12px 10px !important",

  minWidth: "0px",
  borderRadius: "7px !important",
  ...textStyle,
  zIndex: 1,
  position: "relative",
  "&:hover .button-text": {
    visibility: "visible",
    opacity: 1,
    transform: "translateX(-80%)",
    animation: "slideInFromRight 0.5s ease-out forwards",
  },
  "&:hover": {
    backgroundColor: !isFullscreen ? "rgba(0,0,0,1)" : "white",
  },
});

const drawerbottomsmscreenboxmain = {
  width: "300px",
  height: "85%",
  color: "white",
};

const drawerbottomsmscreensecondbox = {
  p: 2,
  width: "100%",
};

const drawerdata = {
  width: "350px",
  height: "90%",
  overflowY: "auto",
  mt: 7,
};

const valueoneandtwo = {
  width: "100%",
  p: 2,
};

const pricerangemainbox = {
  padding: "4px 4px 0px 4px",
  display: "flex",
  justifyContent: "space-between",
};

const pricerangetypo = {
  color: "#c7c7c7",
  fontSize: "12px",
  ...textStyle,
};

const pricetyponame = {
  fontSize: "12px",
  color: "#9F9F9F",
  ...textStyle,
};

const mapfiltertext = {
  color: "#BDBDBD",
  fontSize: "8px",
  ...textStyle,
  textTransform: "capitlized",
};

const handleShowMapFiltersbutton = {
  backgroundColor: "rgba(0,0,0,1)",
  "&:hover": {
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  color: "#ffffff",
  width: "fit-content",

  padding: "6px 15px",
  minWidth: "0px",
  pointerEvents: "all",
  ...textStyle,
};

const visitnowbutton = {
  background: "rgba(204, 169, 89, 1)",
  color: "#EDFF9F",
  width: "100%",
  textTransform: "capitalize",
  height: "30px",
  borderRadius: "8px",
  fontSize: "13px",
  pointerEvents: "all",
  textDecoration: "underline",
  mt: 2,
  "&:hover": {
    background: "rgba(204, 169, 89, 1)",
    color: "#EDFF9F",
  },
};

const floorbutton = {
  background: "#4E4E4E",
  color: "#8E8E8E",
  width: "100%",
  textTransform: "capitalize",
  height: "30px",
  borderRadius: "8px",
  fontSize: "13px",
  pointerEvents: "all",
  textDecoration: "none",
  mt: 2,
  "&:hover": {
    background: "#4E4E4E",
    color: "#8E8E8E",
  },
};

const typovilla = {
  display: "flex",
  alignItems: "start",
  justifyContent: "start",
  mt: 2,
};

const typovillamainbox = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: {
    xl: "100%",
    lg: "100%",
    md: "100%",
    sm: "75%",
    xs: "75%",
  },
};

const typovillachildbox = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  mt: 1,
};

const typovillanum = {
  color: "#EEEEEE",
  fontSize: "16px",
  fontFamily: "Roboto",
  fontWeight: 500,
};

const typoarea = {
  color: "#BDBDBD",
  fontSize: "13px",
  fontWeight: 400,
  fontFamily: "Roboto",
};

const typoareaans = {
  color: "#EEEEEE",
  fontSize: "13px",
  fontWeight: 400,
  fontFamily: "Roboto",
};

const achorcss = {
  color: "white",
  textDecoration: "none",
  cursor: "pointer",
};

const draweropegoyal = (show) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

const AnimatedTray = (show) => ({
  display: "flex",
  alignItems: "center",
});

const returnmainbox = {
  width: {
    xl: "100%",
    lg: "100%",
    md: "100%",
    sm: "55%",
    xs: "55%",
  },
  mt: {
    xl: "0px",
    lg: "0px",
    md: "-100px",
    sm: "-100px",
    xs: "-100px",
  },
  ml: {
    xl: "0px",
    lg: "0px",
    md: "80px",
    sm: "80px",
    xs: "80px",
  },
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
};
const returnmainboxbutton = {
  pointerEvents: "all",
  width: "145px",
  color: "white",
  fontFamily: "Roboto",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  textTransform: "none",
  borderRadius: "12px",
  fontSize: "12px",
  p: 1.5,
  mt: {
    xl: "-40px",
    lg: "-40px",
    md: "-40px",
    sm: "-60px",
    xs: "-60px",
  },
  height: "40px",
  ...textStyle,
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  display: "flex",
  gap: "10px",
  whiteSpace: "nowrap",
};

const returnmaintypo = {
  fontFamily: "Roboto",
  fontSize: 14,
  fontWeight: 500,
};

const InputBox = {
  width: "auto",
  height: "40px",
  background: "#1E1E1E",
  border: "1px solid #333333",
  borderRadius: "3px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  alignContent: "center",
  pl: 3,
  pr: 1,
  mt: 1,
};

const PlaceHolderColor = {
  width: "100%",
  maxWidth: "380px",
  height: "100%",
  bgcolor: "transparent",
  color: "white",
  fontFamily: "Roboto",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "15px",
  lineHeight: "21px",
  display: "flex",
  alignItems: "center",
  // color: " rgba(107, 122, 153, 0.2)",
  // color: "cadetblue",
};

const InputLableText = {
  fontStyle: "normal",
  lineHeight: "21px",
  display: "flex",
  alignItems: "center",
  fontFamily: "Roboto",
  fontSize: 13,
  fontWeight: 400,
  color: "#BDBDBD",
  textAlign: "left",
};

const CountryCode = {
  color: "white",
  fontSize: "15px",
  fontWeight: 400,
  marginRight: "10px", // Space between country code and input field
};

const formtextfeildmainbox = {
  display: "flex",
  flexDirection: "row",
  gap: "30px",
};

const AmenitiesBox = {
  background: "black",
  color: "#BDBDBD",
  padding: "8px 10px",
  pointerEvents: "all",
  whiteSpace: "nowrap",
  minWidth: {
    xl: "auto",
    lg: "auto",
    md: "120px",
    sm: "120px",
    xs: "120px",
  },
  fontFamily: "Roboto",
  fontSize: {
    xl: "10px",
    lg: "10px",
    md: "12px",
    sm: "12px",
    xs: "12px",
  },
  textTransform: "capitalize",
  gap: "5px",
  borderRadius: "8px",
  "&:hover": {
    background: "white",
    color: "black",
  },
};
