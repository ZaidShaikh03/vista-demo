import { APARTMENTTYPESENUM } from "./apartmentTypes";
import HWINGBACK from "../assets/wingImages/WingH_Back.jpg";
import HWINGFRONT from "../assets/wingImages/WingH_Front.jpg";
import AWINGFRONT from "../assets/wingImages/WingA_Front.jpg";
import AWINGBACK from "../assets/wingImages/WingA_Back.jpg";
import BWINGFRONT from "../assets/wingImages/WingB_Front.jpg";
import BWINGBACK from "../assets/wingImages/WingB_Back.jpg";
import CWINGFRONT from "../assets/wingImages/WingC_Front.jpg";
import CWINGBACK from "../assets/wingImages/WingC_Back.jpg";
import DWINGBACK from "../assets/wingImages/WingD_Front (1).jpg";
import DWINGFRONT from "../assets/wingImages/WingD_Back (1).jpg";
import EWINGFRONT from "../assets/wingImages/WingE-_Back.jpg";
import EWINGBACK from "../assets/wingImages/WingE_Front.jpg";
import FWINGFRONT from "../assets/wingImages/WingF-_Back.jpg";
import FWINGBACK from "../assets/wingImages/WingF_Front (1).jpg";
import GWINGFRONT from "../assets/wingImages/WingG_Front.jpg";
import GWINGBACK from "../assets/wingImages/WingG_Back.jpg";
import {
  Sattvaluminawingdata,
  Sattvaluminawingsubdatafloors,
} from "./sattvaluminawingsdata";

import { SobhaData, Sobhasubdatafloors } from "./royceoneDatavalues";

export const pageFlowData = [
  {
    wing: "royce",
    totalUnits: 140,
    apartMentTypes: [
      {
        type: "5bhk",
        face: "Front View & Back View",
      },
      {
        type: "6bhk",
        face: "Front View",
      },
    ],
    polygondata: SobhaData,
    polygonsubdata: Sobhasubdatafloors,
    floorData: [
      {
        floor: 0,
        apartmentDistribution: [{ type: "5bhk", units: 10 }],
      },
      {
        floor: 1,
        apartmentDistribution: [{ type: "5bhk", units: 10 }],
      },
      {
        floor: 2,
        apartmentDistribution: [{ type: "5bhk", units: 10 }],
      },
      ...Array.from({ length: 8 }, (_, i) => ({
        floor: i + 3,
        apartmentDistribution: [{ type: "5bhk", units: 10 }],
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        floor: i + 11,
        apartmentDistribution: [
          { type: "5bhk", units: 5 },
          { type: "6bhk", units: 5 },
        ],
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        floor: i + 21,
        apartmentDistribution: [{ type: "5bhk", units: 10 }],
      })),
      ...Array.from({ length: 7 }, (_, i) => ({
        floor: i + 31,
        apartmentDistribution: [{ type: "5bhk", units: 10 }],
      })),
    ],
    frontImage: AWINGFRONT,
    backImage: AWINGBACK,
  },

  {
    wing: "a",
    totalUnits: 140,
    apartMentTypes: [
      {
        type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1,
        face: "Front View & Back View",
      },
      {
        type: APARTMENTTYPESENUM.STUDIO_APARTMENT,
        face: "Front View",
      },
    ],
    polygondata: Sattvaluminawingdata,
    polygonsubdata: Sattvaluminawingsubdatafloors,
    floorData: [
      {
        floor: 0,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      {
        floor: 1,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      {
        floor: 2,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      ...Array.from({ length: 8 }, (_, i) => ({
        floor: i + 3,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        floor: i + 11,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 5 },
          { type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1, units: 5 },
        ],
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        floor: i + 21,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1, units: 10 },
        ],
      })),
    ],
    frontImage: AWINGFRONT,
    backImage: AWINGBACK,
  },
  {
    wing: "b",
    totalUnits: 140,
    apartMentTypes: [
      {
        type: APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_1,
        face: "Front View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_3,
        face: "Back View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_2,
        face: "Front View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_1,
        face: "Back View",
      },
      {
        type: APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_1,
        face: "Back View",
      },
      {
        type: APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_4,
        face: "Back View",
      },
    ],
    polygondata: Sattvaluminawingdata,
    polygonsubdata: Sattvaluminawingsubdatafloors,
    floorData: [
      {
        floor: 0,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      {
        floor: 1,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      {
        floor: 2,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      ...Array.from({ length: 8 }, (_, i) => ({
        floor: i + 3,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        floor: i + 11,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 5 },
          { type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1, units: 5 },
        ],
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        floor: i + 21,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1, units: 10 },
        ],
      })),
    ],
    frontImage: BWINGFRONT,
    backImage: BWINGBACK,
  },
  {
    wing: "c",
    totalUnits: 140,
    apartMentTypes: [
      {
        type: APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_1,
        face: "Back View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_2,
        face: "Front View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_3,
        face: "Back View",
      },
      {
        type: APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_2,
        face: "Front View",
      },
      {
        type: APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_3,
        face: "Front View",
      },
      // APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_1,
      // APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_2,
      // APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_3,
      // // APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_1,
      // APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_2,
      // APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_3,
    ],
    polygondata: Sattvaluminawingdata,
    polygonsubdata: Sattvaluminawingsubdatafloors,
    floorData: [
      {
        floor: 1,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      {
        floor: 2,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      ...Array.from({ length: 8 }, (_, i) => ({
        floor: i + 3,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1, units: 10 },
        ],
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        floor: i + 11,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 5 },
          { type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1, units: 5 },
        ],
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        floor: i + 21,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1, units: 10 },
        ],
      })),
    ],
    frontImage: CWINGFRONT,
    backImage: CWINGBACK,
  },
  {
    wing: "d",
    totalUnits: 140,
    apartMentTypes: [
      {
        type: APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_1,
        face: "Back View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_2,
        face: "Front View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_3,
        face: "Back View",
      },
      {
        type: APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_2,
        face: "Front View",
      },
      {
        type: APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_3,
        face: "Front View",
      },
      // APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_1,
      // APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_2,
      // APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_3,
      // APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_2,
      // APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_3,
    ],
    polygondata: Sattvaluminawingdata,
    polygonsubdata: Sattvaluminawingsubdatafloors,
    floorData: [
      {
        floor: 0,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      {
        floor: 1,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      {
        floor: 2,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      ...Array.from({ length: 8 }, (_, i) => ({
        floor: i + 3,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        floor: i + 11,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 5 },
          { type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1, units: 5 },
        ],
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        floor: i + 21,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1, units: 10 },
        ],
      })),
    ],
    frontImage: DWINGFRONT,
    backImage: DWINGBACK,
  },
  {
    wing: "e",
    totalUnits: 140,
    apartMentTypes: [
      {
        type: APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_1,
        face: "Back View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_2,
        face: "Front View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_3,
        face: "Back View",
      },
      {
        type: APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_2,
        face: "Front View",
      },
      {
        type: APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_3,
        face: "Front View",
      },
      // APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_1,
      // APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_2,
      // APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_3,
      // APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_2,
      // APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_3,
    ],
    polygondata: Sattvaluminawingdata,
    polygonsubdata: Sattvaluminawingsubdatafloors,
    floorData: [
      {
        floor: 0,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      {
        floor: 1,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      {
        floor: 2,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      ...Array.from({ length: 8 }, (_, i) => ({
        floor: i + 3,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        floor: i + 11,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 5 },
          { type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1, units: 5 },
        ],
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        floor: i + 21,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1, units: 10 },
        ],
      })),
    ],
    frontImage: EWINGFRONT,
    backImage: EWINGBACK,
  },
  {
    wing: "f",
    totalUnits: 140,
    apartMentTypes: [
      {
        type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_2,
        face: "Back View",
      },
      {
        type: APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_1,
        face: "Back View",
      },
      {
        type: APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_4,
        face: "Front View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_1,
        face: "Back View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_3,
        face: "Front View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_2,
        face: "Back View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_1,
        face: "Back View",
      },
      // APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_2,
      // APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_1,
      // APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_4,
      // // APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_2,
      // APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_1,
      // APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_3,
      // APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_2,
      // APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_1,
    ],
    polygondata: Sattvaluminawingdata,
    polygonsubdata: Sattvaluminawingsubdatafloors,
    floorData: [
      {
        floor: 0,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      {
        floor: 1,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      {
        floor: 2,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      ...Array.from({ length: 8 }, (_, i) => ({
        floor: i + 3,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        floor: i + 11,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 5 },
          { type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1, units: 5 },
        ],
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        floor: i + 21,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1, units: 10 },
        ],
      })),
    ],
    frontImage: FWINGFRONT,
    backImage: FWINGBACK,
  },
  {
    wing: "g",
    totalUnits: 140,
    apartMentTypes: [
      {
        type: APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_1,
        face: "Back View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_2,
        face: "Front View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_3,
        face: "Back View",
      },
      {
        type: APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_2,
        face: "Front View",
      },
      {
        type: APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_3,
        face: "Front View",
      },
      // APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_1,
      // APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_2,
      // APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_3,
      // APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_2,
      // APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_3,
    ],
    polygondata: Sattvaluminawingdata,
    polygonsubdata: Sattvaluminawingsubdatafloors,
    floorData: [
      {
        floor: 0,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      {
        floor: 1,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      {
        floor: 2,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      ...Array.from({ length: 8 }, (_, i) => ({
        floor: i + 3,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        floor: i + 11,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 5 },
          { type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1, units: 5 },
        ],
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        floor: i + 21,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1, units: 10 },
        ],
      })),
    ],
    frontImage: GWINGFRONT,
    backImage: GWINGBACK,
  },
  {
    wing: "h",
    totalUnits: 140,
    apartMentTypes: [
      {
        type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_2,
        face: "Front View",
      },
      {
        type: APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_1,
        face: "Front View",
      },
      {
        type: APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_4,
        face: "Back View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_1,
        face: "Front View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_1,
        face: "Front View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_3,
        face: "Back View",
      },
      {
        type: APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_2,
        face: "Front View",
      },
      APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_2,
      APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_1,
      APARTMENTTYPESENUM.TWO_BHK_2T_TYPE_4,
      // APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_2,
      APARTMENTTYPESENUM.THREE_BHK_2T_TYPE_1,
      APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_1,
      APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_3,
      APARTMENTTYPESENUM.THREE_BHK_3T_TYPE_2,
    ],
    polygondata: Sattvaluminawingdata,
    polygonsubdata: Sattvaluminawingsubdatafloors,
    floorData: [
      {
        floor: 0,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      {
        floor: 1,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      {
        floor: 2,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      },
      ...Array.from({ length: 8 }, (_, i) => ({
        floor: i + 3,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 10 },
        ],
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        floor: i + 11,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.STUDIO_APARTMENT, units: 5 },
          { type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1, units: 5 },
        ],
      })),
      ...Array.from({ length: 10 }, (_, i) => ({
        floor: i + 21,
        apartmentDistribution: [
          { type: APARTMENTTYPESENUM.ONE_BHK_1T_TYPE_1, units: 10 },
        ],
      })),
    ],
    frontImage: HWINGFRONT,
    backImage: HWINGBACK,
  },
];
