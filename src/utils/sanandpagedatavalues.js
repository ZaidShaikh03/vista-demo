import Landmark from "../assets/Filtericon/landmark.svg";
import Retail from "../assets/Filtericon/retail.svg";
import Education from "../assets/Filtericon/education.svg";
import Hotels from "../assets/Filtericon/hotels.svg";
import Religious from "../assets/Filtericon/religious.svg";
import Fuel from "../assets/Filtericon/fuel.svg";
import Health from "../assets/Filtericon/Health.png";

import Gladone from "../assets/Secondpage/NewImage/g1.jpg";
import appleschool from "../assets/Secondpage//NewImage/appleschool.jpg";
import areaclub from "../assets/Secondpage//NewImage/areaclub.jpg";
import bioltd from "../assets/Secondpage//NewImage/bioltd.jpg";
import cocacola from "../assets/Secondpage//NewImage/cocacola.jpg";
import esrltd from "../assets/Secondpage//NewImage/esrlimited.jpg";
import gulmahorgreen from "../assets/Secondpage//NewImage/gaulmahorgreen.jpg";
import pgltd from "../assets/Secondpage//NewImage/pgltd.jpg";
import tereindia from "../assets/Secondpage//NewImage/terexidiapvt.jpg";

import Airport from "../assets/Secondpage//NewImage/image 229.png";
import university from "../assets/Secondpage//NewImage/image 223.png";
import justcricket from "../assets/Secondpage/NewImage//image 224.png";
import hospital from "../assets/Secondpage/NewImage//image 225.png";
import saividhya from "../assets/Secondpage/NewImage//image 226.png";
import rajrailway from "../assets/Secondpage/NewImage//image 227.png";
import dravidcenter from "../assets/Secondpage/NewImage//image 228.png";
import vishwavidhyapith from "../assets/Secondpage/NewImage//image 230.png";
import dmart from "../assets/Secondpage/NewImage//image 231.png";
import galleriamall from "../assets/Secondpage/NewImage//image 232.png";
import mallofasia from "../assets/Secondpage/NewImage//image 233.png";

import schoolblack from "../assets/Secondpage/schoolblack.svg";
import schoolwhite from "../assets/Secondpage/schoolwhite.svg";
import golfblack from "../assets/Secondpage/golfblack.svg";
import golfwhite from "../assets/Secondpage/golfwhite.svg";
import industryblack from "../assets/Secondpage/industryblack.svg";
import industrywhite from "../assets/Secondpage/industrywhite.svg";
import beachblack from "../assets/Secondpage/beachblack.svg";
import beachwhite from "../assets/Secondpage/beachwhite.svg";
import FortIcon from "../assets/icons/FortIcon.jsx";
import SunIcon from "../assets/icons/SunIcon.jsx";
import AntaraGange from "../assets/icons/AntaraGange.jsx";
import DamIcon from "../assets/icons/DamIcon.jsx";
import InstituteIcon from "../assets/icons/InstituteIcon.jsx";
import MallIcon from "../assets/icons/MallIcon.jsx";
import CricketIcon from "../assets/icons/CricketIcon.jsx";
import HospitalIcon from "../assets/icons/HospitalIcon.jsx";
import railwayicon from "../assets/icons/railwayicon.jsx";
import airporticon from "../assets/icons/airporticon.jsx";

import RoseateTag from "../assets/logos/roseate-tag.svg";
import RoyceOneTag from "../assets/logos/royceone-tag.svg";

import locatiob from "../assets/Secondpage/rajyashsec/entypo_location.png";
import locatiow from "../assets/Secondpage/rajyashsec/Vector (4).png";
import locatio from "../assets/Secondpage/rajyashsec/image 22.png";
import bharatpertrolb from "../assets/Secondpage/rajyashsec/Vector (5).png";
import bharatpertrolw from "../assets/Secondpage/rajyashsec/Vector (6).png";
import bharatpertrol from "../assets/Secondpage/rajyashsec/image 20.png";
import macolchokdi from "../assets/Secondpage/rajyashsec/Screenshot 2025-02-06 125049 (1) 1.png";
import shreejib from "../assets/Secondpage/rajyashsec/Vector (8).png";
import shreejiw from "../assets/Secondpage/rajyashsec/Vector (7).png";
import shreeji from "../assets/Secondpage/rajyashsec/image 19.png";
import resortb from "../assets/Secondpage/rajyashsec/fontisto_holiday-village.png";
import resortw from "../assets/Secondpage/rajyashsec/Vector (9).png";
import resort from "../assets/Secondpage/rajyashsec/image 13.png";
import sarovarb from "../assets/Secondpage/rajyashsec/Vector (10).png";
import sarovarw from "../assets/Secondpage/rajyashsec/Vector (11).png";
import sarovar from "../assets/Secondpage/rajyashsec/image 14.png";

export const SecondPageMapData = [
  {
    id: 1,
    subtitle: "ten",
    title: "Rajankunte",
    position: "right",
    points:
      "751,959,747,929,763,929,763,940,770,940,774,936,766,921,747,921,732,925,732,936,675,940,675,970,694,970,694,967,717,963,717,952,732,948,736,959",
    startPoint: "767,922",
  },
];

export const sanandlandMarkData = [
  {
    id: 1,
    // img: jamamasjid,
    title: `Sanand`,
    points: "1583,721,5",
    parentId: 2,
    pinLinePoints:
      "914,1168,911,1154,956,1112,983,1089,1003,1067,1053,1047,1097,1044,1176,1015,1276,971,1390,825,1406,814,1549,747,1567,717,1583,718",
    angle: 150,
    icon: airporticon,
    bimg: locatiob,
    wimg: locatiow,
    img: locatio,
    islandmark: true,
    type: "landmarks",
    description: `It’s a city and a municipality in Ahmedabad district in the Indian state of Gujarat.`,
    imageURL: RoyceOneTag,
    eta: "30 min",
    km: "22 km",
    statPoint: 1345,
    endPoint: 1400,
  },

  {
    id: 2,
    // img: jamamasjid,
    title: `Bharat Petrol Pump`,
    points: "1341,912,5",
    parentId: 2,
    pinLinePoints:
      "914,1168,911,1154,956,1112,983,1089,1003,1067,1050,1054,1097,1044,1176,1015,1276,973,1325,910,1341,911",
    angle: 150,
    icon: airporticon,
    bimg: bharatpertrolb,
    wimg: bharatpertrolw,
    img: bharatpertrol,
    type: "landmarks",
    islandmark: true,
    description: `It is a top player in the category Petrol Pumps-Bharat Petroleum in the Sanand.`,
    imageURL: RoyceOneTag,
    eta: "22 min",
    statPoint: 1000,
    endPoint: 1100,
    km: "15.6 km",
  },
  {
    id: 3,
    // img: jamamasjid,
    title: `Mankol Chokdi`,
    points: "1176,1018,5",
    parentId: 2,
    pinLinePoints:
      "914,1168,911,1154,956,1112,983,1089,1003,1067,1050,1054,1097,1044,1176,1015",
    angle: 50,
    icon: airporticon,
    bimg: bharatpertrolb,
    wimg: bharatpertrolw,
    img: macolchokdi,
    islandmark: true,
    type: "landmarks",
    description: `It is a Locality in Sanand City in Gujarat State, India & postal head office is Bavla ..`,
    imageURL: RoyceOneTag,
    eta: "15 min",
    km: "10 km",
    statPoint: 900,
    endPoint: 1100,
  },
  {
    id: 4,
    // img: jamamasjid,
    title: `Shreeji Hospital `,
    points: "1156,1014,5",
    parentId: 2,
    pinLinePoints:
      "914,1168,911,1154,956,1112,983,1089,1003,1067,1050,1054,1097,1044,1155,1012",
    angle: 150,
    icon: airporticon,
    islandmark: true,
    bimg: shreejib,
    wimg: shreejiw,
    img: shreeji,
    type: "landmarks",
    description: `It’s accredited for providing specialty treatments in Obstetrics Problems,Diagnostic And Pathology etc.`,
    imageURL: RoyceOneTag,
    eta: "15 min",
    km: "10 km",
    statPoint: 900,
    endPoint: 1100,
  },
  // {
  //   id: 5,
  //   // img: jamamasjid,
  //   title: `Greenland Resort`,
  //   points: "840,1380,5",
  //   parentId: 2,
  //   pinLinePoints: "912,1167,894,1167,717,1314,771,1343,831,1388,840,1377",
  //   angle: 150,
  //   icon: airporticon,
  //   bimg: resortb,
  //   wimg: resortw,
  //   img: resort,
  //   islandmark: true,
  //   type: "landmarks",
  //   description: `It’s the perfect place to spend your weekend away from the city bustle.`,
  //   imageURL: RoyceOneTag,
  //   eta: "14 min",
  //   km: "9.5 km",
  //   statPoint: 771,
  //   endPoint: 1450,
  // },
  {
    id: 6,
    // img: jamamasjid,
    title: `Nalsarovar Bird Sanctury`,
    points: "470,1343,5",
    parentId: 2,
    pinLinePoints:
      "912,1167,894,1167,717,1314,688,1312,661,1312,614,1308,585,1303,556,1292,484,1330,470,1341",
    angle: 150,
    icon: airporticon,
    bimg: sarovarb,
    wimg: sarovarw,
    img: sarovar,
    islandmark: true,
    type: "landmarks",
    description: `Spread over an area of 120.82 sq km, this sanctuary is a paradise for bird watchers and nature enthusiasts.`,
    imageURL: RoyceOneTag,
    eta: "15 min",
    km: "15 km",
    statPoint: 771,
    endPoint: 1450,
  },

  //   {
  //     id: 17,
  //     // img: jamamasjid,
  //     title: `100 Acres Club`,
  //     points: "664,1146,5",
  //     parentId: 2,
  //     pinLinePoints: "",
  //     angle: 150,
  //     bimg: industryblack,
  //     wimg: industrywhite,
  //     icon: airporticon,
  //     islandmark: true,
  //     type: "landmarks",
  //     description: `The mosque was built by Ahmad Shah I, the founder of Ahmedabad in 1423 AD.`,
  //     imageURL: RoyceOneTag,
  //     eta: "17 min",
  //     km: "9.7 km",
  //   },

  // {
  //   id: 12,
  //   title: "Sattva Lumina",
  // img: esrltd,
  //   description:
  //     "Grade A+ Warehouses India — Future ready industrial & logistics parks in strategic locations for sustainable growth.",
  // bimg: industryblack,
  // wimg: industrywhite,
  //   points: "831,954,5",
  //   parentId: 2,
  //   pinLinePoints: "641, 891,467,975,414,957,371,879,354,827,319,723,345,680",
  //   statPoint: 371,
  //   endPoint: 879,
  //   angle: 30,
  // eta: "17 min",
  // km: "9.7 km",
  //   type: "landmarks",
  //   islandmark: true,
  // },
];

export const tagData = [
  {
    id: 1,
    title: "5 Auguda",
    // img: kalhaargulf,
    points: "918,1166,5",
    parentId: 1,
    // pinLinePoints:
    //   "996,1262,1019,1260,1057,1258,1091,1257,1104,1260,1117,1282,1129,1300,1138,1314,1147,1327,1166,1354,1187,1369,1211,1378,1227,1389,1238,1374,1249,1360,1260,1347",
    angle: 180,
    // icon: HillIcon,
    type: "landmarks",
    description: `Skandagiri iis nestled amongst 700 world class villas, it houses one of India’s finest 18 hole golf course.`,
    imageURL: RoseateTag,
  },
  //   {
  //     id: 2,
  //     // img: jamamasjid,
  //     title: `5 Race course`,
  //     points: "1373,737,5",
  //     parentId: 2,
  //     // pinLinePoints: "1373,737,353,1274",
  //     pinLinePoints:
  //       "1373,737, 1346, 740, 1314, 753, 1327, 769, 1328, 782, 1317, 800, 1307, 827, 1298, 845, 1298, 867, 1296, 883, 1261, 885, 1243, 885, 1220, 888, 1186, 896, 1136, 894, 1106, 894, 1073, 890, 1064, 903, 1041, 915, 1054, 910, 1030, 915, 1021, 921, 1008, 921, 990, 921, 976, 921, 958, 917, 943, 908, 833, 957, 717, 1107, 614, 1150, 547, 1176, 452, 1199, 401, 1243, 353,1274",
  //     angle: 320,
  //     // icon: HillIcon,
  //     type: "landmarks",
  //     description: `The mosque was built by Ahmad Shah I, the founder of Ahmedabad in 1423 AD.`,
  //     imageURL: RoyceOneTag,
  //     islandmark: true,
  //     startPoints: "988,1164",
  //     endPoint: "1348,1094",
  //   },
];
