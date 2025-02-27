import CricketIcon from "../assets/Sattvalumina/CricketIcon.svg";
import oneB_oneT_T1 from "../assets/floorplanImages/1b+1t_T1.png";
import oneB_oneT_T2 from "../assets/floorplanImages/1b+1t_T2.png";
import twoB_twoT_T1 from "../assets/floorplanImages/2b+2t_T1.png";
import twoB_twoT_T2 from "../assets/floorplanImages/2b+2t_T2.png";
import twoB_twoT_T3 from "../assets/floorplanImages/2b+2t_T3.png";
import threeB_twoT_T1 from "../assets/floorplanImages/3b+2t_T1.png";
import threeB_twoT_T2 from "../assets/floorplanImages/3b+2t_T2.png";
import threeB_twoT_T3 from "../assets/floorplanImages/3b+2t_T3.png";
import threeB_threeT_T1 from "../assets/floorplanImages/3b+3t_T1.png";
import threeB_threeT_T2 from "../assets/floorplanImages/3b+3t_T2.png";
import threeB_threeT_T3 from "../assets/floorplanImages/3b+3t_T3.png";
import studioFP from "../assets/floorplanImages/StudioFP.png";
import { APARTMENTTYPESENUM } from "./apartmentTypes";

export const floorplaladmarkdata = [
  {
    id: 1,
    type: "Cricket",
    title: "Cricket",
    color: "black",
    points: "357,266",
    image: CricketIcon,
  },
  {
    id: 2,
    type: "Cricket",
    title: "Cricket",
    color: "black",
    points: "653,235",
    image: CricketIcon,
  },
  {
    id: 3,
    type: "Cricket",
    title: "Cricket",
    color: "black",
    points: "692,478",
    image: CricketIcon,
  },
];

export const floorPlanImages = [
  {
    type: "studioFP",
    img: studioFP,
  },
  {
    type: "oneBHK_oneT_Type1",
    img: oneB_oneT_T1,
  },
  {
    type: "oneBHK_oneT_Type2",
    img: oneB_oneT_T2,
  },
  {
    type: "twoBHK_twoT_Type1",
    img: twoB_twoT_T1,
  },
  {
    type: "twoBHK_twoT_Type2",
    img: twoB_twoT_T2,
  },
  {
    type: "twoBHK_twoT_Type3",
    img: twoB_twoT_T3,
  },
  {
    type: "threeBHK_twoT_Type1",
    img: threeB_twoT_T1,
  },
  {
    type: "threeBHK_twoT_Type2",
    img: threeB_twoT_T2,
  },
  {
    type: "threeBHK_twoT_Type3",
    img: threeB_twoT_T3,
  },
  {
    type: "threeBHK_threeT_Type1",
    img: threeB_threeT_T1,
  },
  {
    type: "threeBHK_threeT_Type2",
    img: threeB_threeT_T2,
  },
  {
    type: "threeBHK_threeT_Type3",
    img: threeB_threeT_T3,
  },
];

export const floornumberdata = [
  // A wing Ground Floor Mapping

  {
    plot: 7,
    id: 7,
    points:
      "1629, 2439, 2003, 2440, 2002, 2746, 1741, 2743, 1741, 2643, 1629, 2643",
    color: "rgba(161, 185, 68, 0.35)",
    hoveredcolor: "rgba(161, 185, 68, 0.2)",
    strokborder: "rgba(161, 185, 68, 1)",
    filterType: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1,
    apartmentNum: 5,
    saleable: 64.09,
    balcony: 5.277,
    carpet: 39.38,
    centerPoint: "1841,2551",
    wingsAndFloors: [
      {
        wing: "a",
        floors: Array.from({ length: 31 }, (_, i) => i),
      },
    ],
  },
  {
    plot: 10,
    id: 10,
    points:
      "1629, 2447, 2004, 2446, 2003, 2139, 1743, 2139, 1741, 2139, 1741, 2241, 1629, 2240",
    color: "rgba(161, 185, 68, 0.35)",
    hoveredcolor: "rgba(161, 185, 68, 0.2)",
    strokborder: "rgba(161, 185, 68, 1)",
    filterType: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1,
    apartmentNum: 4,
    centerPoint: "1865,2298",
    saleable: 63.49,
    balcony: 5.277,
    carpet: 39.38,
    wingsAndFloors: [
      {
        wing: "a",
        floors: Array.from({ length: 31 }, (_, i) => i),
      },
    ],
  },
  {
    plot: 6,
    id: 6,
    points:
      "1632, 1963, 2002, 1963, 2004, 2142, 1744, 2141, 1744, 2116, 1631, 2115",
    color: "rgba(222, 190, 126, 0.35)",
    hoveredcolor: "rgba(222, 190, 126, 0.2)",
    strokborder: "rgba(222, 190, 126, 1)",
    // filterType: "massimoTower",
    filterType: APARTMENTTYPESENUM.STUDIO_APARTMENT,
    apartmentNum: 3,
    saleable: 39.36,
    balcony: 2.208,
    carpet: 24.98,
    centerPoint: "1853,2049",
    wingsAndFloors: [
      {
        wing: "a",
        floors: Array.from({ length: 31 }, (_, i) => i),
      },
    ],
  },
  {
    plot: 8,
    id: 8,
    points:
      "1628, 1967, 2003, 1967, 2004, 1787, 1741, 1788, 1741, 1812, 1630, 1813",
    color: "rgba(222, 190, 126, 0.35)",
    hoveredcolor: "rgba(222, 190, 126, 0.2)",
    strokborder: "rgba(222, 190, 126, 1)",
    filterType: APARTMENTTYPESENUM.STUDIO_APARTMENT,
    apartmentNum: 2,
    saleable: 39.36,
    balcony: 2.208,
    carpet: 24.98,
    centerPoint: "1862,1868",
    wingsAndFloors: [
      {
        wing: "a",
        floors: Array.from({ length: 31 }, (_, i) => i),
      },
    ],
  },
  {
    plot: 5,
    id: 5,
    points:
      "1632, 1612, 2002, 1612, 2004, 1791, 1744, 1790, 1744, 1765, 1631, 1764",
    color: "rgba(222, 190, 126, 0.35)",
    hoveredcolor: "rgba(222, 190, 126, 0.2)",
    strokborder: "rgba(222, 190, 126, 1)",
    filterType: APARTMENTTYPESENUM.STUDIO_APARTMENT,
    apartmentNum: 1,
    centerPoint: "1847,1696",
    saleable: 40.34,
    balcony: 2.208,
    carpet: 24.98,
    wingsAndFloors: [
      {
        wing: "a",
        floors: Array.from({ length: 31 }, (_, i) => i),
      },
    ],
  },
  {
    plot: 11,
    id: 11,
    points:
      "1633, 1428, 2008, 1428, 2009, 1248, 1746, 1249, 1746, 1273, 1635, 1274",
    color: "rgba(222, 190, 126, 0.35)",
    hoveredcolor: "rgba(222, 190, 126, 0.2)",
    strokborder: "rgba(222, 190, 126, 1)",
    filterType: APARTMENTTYPESENUM.STUDIO_APARTMENT,
    apartmentNum: 16,
    saleable: 40.21,
    balcony: 2.208,
    carpet: 24.98,
    centerPoint: "1844,1315",
    wingsAndFloors: [
      {
        wing: "a",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
    ],
  },
  {
    plot: 3,
    id: 3,
    points:
      "1631, 1074, 2001, 1074, 2003, 1253, 1743, 1252, 1743, 1227, 1630, 1226",
    color: "rgba(222, 190, 126, 0.35)",
    hoveredcolor: "rgba(222, 190, 126, 0.2)",
    strokborder: "rgba(222, 190, 126, 1)",
    filterType: APARTMENTTYPESENUM.STUDIO_APARTMENT,
    apartmentNum: 15,
    saleable: 39.96,
    balcony: 2.208,
    carpet: 24.98,
    centerPoint: "1841,1149",
    wingsAndFloors: [
      {
        wing: "a",
        floors: Array.from({ length: 31 }, (_, i) => i),
      },
    ],
  },
  {
    id: 9,
    points:
      "1628, 1077, 2003, 1077, 2004, 897, 1741, 898, 1741, 922, 1630, 923",
    color: "rgba(222, 190, 126, 0.35)",
    hoveredcolor: "rgba(222, 190, 126, 0.2)",
    strokborder: "rgba(222, 190, 126, 1)",
    filterType: APARTMENTTYPESENUM.STUDIO_APARTMENT,
    apartmentNum: 14,
    saleable: 39.36,
    balcony: 2.208,
    carpet: 24.98,
    centerPoint: "1853,985",
    wingsAndFloors: [
      {
        wing: "a",
        floors: Array.from({ length: 31 }, (_, i) => i),
      },
    ],
  },
  {
    plot: 4,
    id: 4,
    points: "1631, 723, 2001, 723, 2003, 902, 1741, 902, 1743, 876, 1630, 875",
    color: "rgba(222, 190, 126, 0.35)",
    hoveredcolor: "rgba(222, 190, 126, 0.2)",
    strokborder: "rgba(222, 190, 126, 1)",
    // filterType: "massimoTower",
    filterType: APARTMENTTYPESENUM.STUDIO_APARTMENT,
    apartmentNum: 13,
    saleable: 39.36,
    balcony: 2.208,
    carpet: 24.98,
    centerPoint: "1841,810",
    wingsAndFloors: [
      {
        wing: "a",
        floors: Array.from({ length: 31 }, (_, i) => i),
      },
    ],
  },

  {
    plot: 2,
    id: 2,
    points:
      "1628, 728, 2003, 727, 2002, 420, 1742, 420, 1740, 420, 1740, 524, 1628, 521",
    color: "rgba(161, 185, 68, 0.35)",
    hoveredcolor: "rgba(161, 185, 68, 0.2)",
    strokborder: "rgba(161, 185, 68, 1)",
    filterType: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1,
    apartmentNum: 12,
    saleable: 64.09,
    balcony: 5.277,
    carpet: 39.38,
    centerPoint: "1835,577",
    wingsAndFloors: [
      {
        wing: "a",
        floors: Array.from({ length: 31 }, (_, i) => i),
      },
    ],
  },

  // A wing  => 1 to 19 and 21 to 29 Floor Mapping

  {
    plot: 12,
    id: 12,
    points:
      "1180, 2441, 1560, 2441, 1559, 2646, 1448, 2646, 1448, 2750, 1180, 2748",
    color: "rgba(161, 185, 68, 0.35)",
    hoveredcolor: "rgba(161, 185, 68, 0.2)",
    strokborder: "rgba(161, 185, 68, 1)",
    filterType: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1,
    apartmentNum: 6,
    saleable: 64.09,
    balcony: 5.277,
    carpet: 39.38,
    centerPoint: "1362,2562",
    wingsAndFloors: [
      {
        wing: "a",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
    ],
  },
  {
    plot: 15,
    id: 15,
    points:
      "1183, 1022, 1447, 1023, 1448, 1128, 1559, 1129, 1562, 1331, 1185, 1330",
    type: "winga",
    color: "rgba(161, 185, 68, 0.35)",
    hoveredcolor: "rgba(161, 185, 68, 0.2)",
    strokborder: "rgba(161, 185, 68, 1)",
    area: 7550,
    pi: "801,362",
    saleable: 64.35,
    balcony: 5.277,
    carpet: 39.38,
    // filterType: "massimoTower",
    filterType: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1,
    apartmentNum: 9,
    centerPoint: "1374,1150",
    // Note ====> doesnt contain 20 & 30 due to the different floorplan    ***********************

    wingsAndFloors: [
      {
        wing: "a",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21,
          22, 23, 24, 25, 26, 27, 28, 29,
        ],
      },
    ],
  },
  {
    plot: 14,
    id: 14,
    points:
      "1181, 723, 1561, 723, 1560, 928, 1449, 928, 1449, 1032, 1181, 1030",
    color: "rgba(161, 185, 68, 0.35)",
    hoveredcolor: "rgba(161, 185, 68, 0.2)",
    strokborder: "rgba(161, 185, 68, 1)",
    filterType: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1,
    apartmentNum: 10,
    saleable: 63.49,
    balcony: 5.277,
    carpet: 39.38,
    centerPoint: "1374,847",
    wingsAndFloors: [
      {
        wing: "a",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
    ],
  },
  {
    plot: 1,
    id: 1,
    points: "1178,417,1448,417,1451,521,1493,521,1558,521,1555,730,1178,726",
    color: "rgba(161, 185, 68, 0.35)",
    hoveredcolor: "rgba(161, 185, 68, 0.2)",
    strokborder: "rgba(161, 185, 68, 1)",
    filterType: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1,
    apartmentNum: 11,
    saleable: 64.95,
    balcony: 5.277,
    carpet: 39.38,
    centerPoint: "1353,584",
    wingsAndFloors: [
      {
        wing: "a",
        floors: Array.from({ length: 31 }, (_, i) => i),
      },
    ],
  },
  {
    plot: 16,
    id: 16,
    points:
      "1184, 2135, 1448, 2136, 1449, 2241, 1560, 2242, 1563, 2444, 1186, 2443",
    color: "rgba(161, 185, 68, 0.35)",
    hoveredcolor: "rgba(161, 185, 68, 0.2)",
    strokborder: "rgba(161, 185, 68, 1)",
    filterType: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1,
    apartmentNum: 7,
    saleable: 63.49,
    balcony: 5.277,
    carpet: 39.38,
    centerPoint: "1371,2276",
    wingsAndFloors: [
      {
        wing: "a",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
    ],
  },
  {
    plot: 13,
    id: 13,
    points:
      "1183, 1835, 1563, 1835, 1562, 2040, 1451, 2040, 1451, 2144, 1183, 2142",
    color: "rgba(161, 185, 68, 0.35)",
    hoveredcolor: "rgba(161, 185, 68, 0.2)",
    strokborder: "rgba(161, 185, 68, 1)",
    filterType: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1,
    apartmentNum: 8,
    saleable: 64.64,
    balcony: 5.277,
    carpet: 39.38,
    centerPoint: "1359,1953",
    wingsAndFloors: [
      {
        wing: "a",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
    ],
  },
  // ******************** wing b, f,h ground floor data *********************** \\\\
  {
    plot: 21,
    id: 21,
    points:
      "2183,1315,2722,1315,2725,2083,2647,2083,2647,2151,2591,2151,2594,2247,2371,2244,2371,2333,2183,2330,2183,1762,2341,1762,2341,1711,2183,1711",
    color: "rgba(228, 105, 36, 0.35)",
    hoveredcolor: "rgba(228, 105, 36, 0.2)",
    strokborder: "rgba(228, 105, 36, 1)",
    saleable: 169.32,
    balcony: 19.268,
    carpet: 101.24,
    filterType: APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_2,
    apartmentNum: 2,
    centerPoint: "2481,1738",
    wingsAndFloors: [
      {
        wing: "b",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "f",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "h",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
    ],
  },
  {
    id: 22,
    points:
      "2088,684,2091,1032,2142,1032,2142,1133,2296,1134,2296,1224,2698,1222,2698,1163,2802,1161,2802,1005,2915,1005,2915,684,2320,685",
    color: "rgba(145, 119, 250, 0.35)",
    hoveredcolor: "rgba(145, 119, 250, 0.2)",
    strokborder: "rgba(145, 119, 250, 1)",
    filterType: APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_4,
    apartmentNum: 1,
    centerPoint: "2514,945",
    saleable: 134.28,
    balcony: 16.131,
    carpet: 78.88,
    wingsAndFloors: [
      {
        wing: "b",
        floors: [20, 30],
      },
      {
        wing: "f",
        floors: [20, 30],
      },
      {
        wing: "h",
        floors: [20, 30],
      },
    ],
  },
  {
    plot: 23,
    id: 23,
    points:
      "1555,1860,1555,1319,1651,1319,1651,1402,2100,1402,2100,1649,2002,1646,1999,1813,1915,1813,1915,1857",
    color: "rgba(126, 200, 124, 0.35)",
    hoveredcolor: "rgba(126, 200, 124, 0.2)",
    strokborder: "rgba(126, 200, 124, 1)",
    filterType: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_2,
    apartmentNum: 1,
    centerPoint: "1805,1605",
    saleable: 81.04,
    balcony: 4.354,
    carpet: 50.99,
    wingsAndFloors: [
      {
        wing: "f",
        floors: [0],
      },
      {
        wing: "h",
        floors: [0],
      },
    ],
  },
  {
    plot: 20,
    id: 20,
    points:
      "2088,680,2912,680,2912,1002,2802,1002,2802,1162,2698,1162,2698,1219,2299,1219,2299,1130,2139,1130,2139,1028,2100,1028,2097,1222,1853,1219,1853,862,1984,862,1984,781,2088,781",
    color: "rgba(223, 194, 34, 0.35)",
    hoveredcolor: "rgba(223, 194, 34, 0.2)",
    strokborder: "rgba(223, 194, 34, 1)",
    saleable: 166.7,
    balcony: 18.593,
    carpet: 98.85,
    filterType: APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_3,
    apartmentNum: 1,
    centerPoint: "2460,922",
    wingsAndFloors: [
      {
        wing: "b",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21,
          22, 23, 24, 25, 26, 27, 28, 29,
        ],
      },
      {
        wing: "f",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21,
          22, 23, 24, 25, 26, 27, 28, 29,
        ],
      },
      {
        wing: "h",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21,
          22, 23, 24, 25, 26, 27, 28, 29,
        ],
      },
    ],
  },

  {
    plot: 19,
    id: 19,
    points:
      "1335,1529,1338,1853,1996,1850,1996,1642,2097,1642,2100,1315,1871,1312,1871,1398,1654,1400,1654,1311,1550,1312,1550,1425,1395,1428,1392,1529",
    color: "rgba(76, 208, 169, 0.35)",
    hoveredcolor: "rgba(76, 208, 169, 0.2)",
    strokborder: "rgba(76, 208, 169, 1)",
    saleable: 110.05,
    balcony: 7.864,
    carpet: 69.17,
    filterType: APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_1,
    apartmentNum: 3,
    centerPoint: "1686,1566",
    wingsAndFloors: [
      {
        wing: "b",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "f",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "h",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
    ],
  },
  {
    plot: 17,
    id: 17,
    points:
      "1215, 1770, 1110, 1770, 1111, 1703, 1213, 1704, 1215, 1626, 1342, 1627, 1342, 1317, 997, 1319, 996, 1476, 729, 1476, 730, 1877, 785, 1876, 786, 1980, 700, 1980, 703, 2369, 1025, 2368, 1025, 2264, 1216, 2265",
    color: "rgba(225, 110, 235, 0.35)",
    hoveredcolor: "rgba(225, 110, 235, 0.2)",
    strokborder: "rgba(225, 110, 235, 1)",
    filterType: APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_1,
    apartmentNum: 4,
    saleable: 167.62,
    balcony: 16.822,
    carpet: 101.39,
    centerPoint: "999,1766",
    wingsAndFloors: [
      {
        wing: "b",
        floors: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "f",
        floors: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "h",
        floors: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
    ],
  },
  {
    plot: 18,
    id: 18,
    points:
      "879, 397, 1109, 394, 1110, 763, 1006, 763, 1006, 1056, 1109, 1055, 1110, 1226, 1004, 1226, 1005, 1396, 565, 1397, 565, 1211, 642, 1210, 643, 467, 878, 466",
    color: "rgba(120, 97, 213, 0.35)",

    hoveredcolor: "rgba(120, 97, 213, 0.2)",
    saleable: 142.66,
    balcony: 11.07,
    carpet: 89.04,
    strokborder: "rgba(120, 97, 213, 1)",
    filterType: APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_1,
    apartmentNum: 5,
    centerPoint: "841,866",
    wingsAndFloors: [
      {
        wing: "b",
        floors: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "f",
        floors: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "h",
        floors: [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
    ],
  },

  // {
  //   plot: 3,
  //   id: 3,
  //   points:
  //     "841,387,1229,386,1230,470,1328,471,1323,705,860,709,860,407,841,400",
  //   type: "wingc",
  //   color: "rgba(195, 87, 245, 0.3)",
  //   hoveredcolor: "rgba(195, 87, 245, 0.2)",
  //   strokborder: "rgba(195, 87, 245, 1)",
  //   area: 7550,
  //   pi: "801,362",
  //   // filterType: "massimoTower",
  //   filterType: "Studio Apartment",
  //   title: "floor 2",
  //   centerPoint: "275,512",
  //   floor: 4,
  // },
  // {
  //   plot: 3,
  //   id: 3,
  //   points: "94,33,408,31,407,250,25,246,25,170,60,169,61,134,93,131",
  //   type: "wingc",
  //   color: "rgba(145, 119, 250, 0.35)",
  //   hoveredcolor: "rgba(145, 119, 250, 0.2)",
  //   strokborder: "rgba(145, 119, 250, 1)",
  //   area: 7550,
  //   pi: "801,362",
  //   filterType: "2BHK + 2T - Type 3",

  //   title: "floor 3",
  //   centerPoint: "225,134",
  // },
  // {
  //   plot: 4,
  //   id: 4,
  //   points:
  //     "449,21,709,21,711,116,675,116,673,212,534,210,534,199,498,198,498,210,405,210,406,67,448,67",
  //   type: "wingc",
  //   color: "rgba(0, 206, 201, 0.35)",
  //   hoveredcolor: "rgba(0, 206, 201, 0.2)",
  //   strokborder: "rgba(0, 206, 201, 1)",
  //   area: 7550,
  //   pi: "801,362",
  //   filterType: "2BHK + 2T - Type 2",

  //   title: "floor 4",
  //   centerPoint: "547,104",
  // },
  // {
  //   plot: 5,
  //   id: 5,
  //   points:
  //     "755,22,1012,23,1013,111,974,115,974,209,937,211,934,241,896,243,896,211,840,211,840,200,803,199,802,210,709,210,709,69,753,68",
  //   type: "wingc",
  //   color: "rgba(118, 175, 242, 0.35)",
  //   hoveredcolor: "rgba(118, 175, 242, 0.2)",
  //   strokborder: "rgba(118, 175, 242, 1)",
  //   area: 7550,
  //   pi: "801,362",
  //   filterType: "3BHK + 2T - Type 3",
  //   title: "floor 5",
  //   centerPoint: "849,120",
  // },

  // "c", "d", "e", "g" wing mappig
  {
    plot: 27,
    id: 27,
    points:
      "1053,1342,1439,1345,1431,1678,1282,1678,1279,1759,1169,1762,1172,1845,1291,1842,1291,2388,1082,2385,1082,2503,996,2503,996,2491,725,2491,722,2075,821,2075,818,1959,755,1959,755,1524,1050,1521",
    color: "rgba(225, 110, 235, 0.35)",
    hoveredcolor: "rgba(225, 110, 235, 0.2)",
    strokborder: "rgba(225, 110, 235, 1)",
    filterType: APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_1,
    apartmentNum: 1,
    centerPoint: "1008,1926",
    saleable: 168.02,
    balcony: 16.82,
    carpet: 101.39,
    wingsAndFloors: [
      {
        wing: "d",
        floors: [0],
      },
      {
        wing: "e",
        floors: [0],
      },
      {
        wing: "g",
        floors: [0],
      },
    ],
  },

  {
    plot: 22,
    id: 22,
    points:
      "1434,1344,1051,1343,1048,1520,752,1520,744,1953,813,1954,813,2072,730,2072,726,2485,1073,2493,1069,2377,1283,2381,1286,1676,1431,1676",
    type: "wingc",
    color: "rgba(225, 110, 235, 0.35)",
    hoveredcolor: "rgba(225, 110, 235, 0.2)",
    strokborder: "rgba(225, 110, 235, 1)",
    area: 7550,
    pi: "801,362",
    // filterType: "massimoTower",
    filterType: APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_1,
    // wing: ["c", "d", "e", "g"],
    apartmentNum: 1,
    saleable: 168.02,
    balcony: 16.82,
    carpet: 101.39,
    centerPoint: "1008,1926",
    wingsAndFloors: [
      {
        wing: "c",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "d",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "e",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "g",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
    ],
  },
  {
    plot: 26,
    id: 26,
    points:
      "2746,2203,2565,2207,2566,2324,2208,2324,2215,1809,2392,1812,2392,1737,2211,1737,2215,1335,2775,1332,2779,1733,2742,1733",
    type: "wingc",
    color: "rgba(145, 119, 250, 0.35)",
    hoveredcolor: "rgba(145, 119, 250, 0.2)",
    strokborder: "rgba(145, 119, 250, 1)",
    filterType: APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_3,
    // wing: ["c", "d", "e", "g"],
    saleable: 143.28,
    balcony: 10.13,
    carpet: 90.89,
    apartmentNum: 5,
    centerPoint: "2461,1875",
    wingsAndFloors: [
      {
        wing: "c",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "d",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "e",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "g",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
    ],
  },
  {
    plot: 25,
    id: 25,
    points:
      "2764,1227,2660,1231,2663,1130,2519,1134,2518,1101,2410,1101,2410,1134,2165,1134,2175,758,2287,761,2287,628,2988,631,2988,877,2884,881,2880,1126,2768,1126",
    type: "wingc",
    color: "rgba(118, 175, 242, 0.35)",
    hoveredcolor: "rgba(118, 175, 242, 0.2)",
    strokborder: "rgba(118, 175, 242, 1)",
    filterType: APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_3,
    // wing: ["c", "d", "e", "g"],
    saleable: 106.65,
    balcony: 5.38,
    carpet: 68.8,
    apartmentNum: 4,
    centerPoint: "2547,863",
    wingsAndFloors: [
      {
        wing: "c",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "d",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "e",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "g",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
    ],
  },
  {
    plot: 24,
    id: 24,
    points:
      "1362,762,1358,1130,1600,1134,1601,1104,1702,1104,1701,1134,1853,1137,1850,1231,1950,1231,1954,1137,2055,1137,2062,874,2171,874,2171,632,1553,628,1459,631,1459,762",
    type: "wingc",
    color: "rgba(0, 206, 201, 0.35)",
    hoveredcolor: "rgba(0, 206, 201, 0.2)",
    strokborder: "rgba(0, 206, 201, 1)",
    filterType: APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_2,
    // wing: ["c", "d", "e", "g"],
    saleable: 106.09,
    balcony: 5.38,
    carpet: 68.81,
    apartmentNum: 3,
    centerPoint: "1742,875",
    wingsAndFloors: [
      {
        wing: "c",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "d",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "e",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "g",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
    ],
  },
  {
    plot: 23,
    id: 23,
    points:
      "1355,1233,965,1233,965,1128,784,1129,784,1197,665,1197,665,1230,426,1230,332,1230,332,1028,419,1028,419,937,520,933,520,670,1348,666",
    type: "wingc",
    color: "rgba(250, 119, 174, 0.35)",
    hoveredcolor: "rgba(250, 119, 174, 0.2)",
    strokborder: "rgba(250, 119, 174, 1)",
    // filterType: "massimoTower",
    filterType: APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_2,
    // wing: ["c", "d", "e", "g"],
    saleable: 139.81,
    balcony: 11.45,
    carpet: 88.07,
    apartmentNum: 2,
    centerPoint: "885,958",
    wingsAndFloors: [
      {
        wing: "c",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "d",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "e",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
      {
        wing: "g",
        floors: [
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
          21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        ],
      },
    ],
  },
  {
    plot: 28,
    id: 28,
    points:
      "1350,671,1353,1233,966,1227,966,1135,785,1135,785,1206,681,1203,681,1236,336,1236,336,1031,419,1031,419,930,520,930,523,671",
    color: "rgba(250, 119, 174, 0.35)",
    hoveredcolor: "rgba(250, 119, 174, 0.2)",
    strokborder: "rgba(250, 119, 174, 1)",
    filterType: APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_2,
    apartmentNum: 2,
    centerPoint: "885,958",
    saleable: 140.39,
    balcony: 11.45,
    carpet: 88.07,
    wingsAndFloors: [
      {
        wing: "d",
        floors: [0],
      },
      {
        wing: "e",
        floors: [0],
      },
      {
        wing: "g",
        floors: [0],
      },
    ],
  },
];
