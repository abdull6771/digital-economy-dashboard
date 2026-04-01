import { useState, useMemo, useEffect, useRef } from "react";
import {
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  Cell,
  ReferenceLine,
} from "recharts";
import * as d3 from "d3";

const G_DATA = [
  {
    code: "USA",
    name: "United States",
    gdei: 86.22,
    p1: 71.96,
    p2: 84.13,
    p3: 56.85,
    p4: 88.01,
    p5: 99.85,
    p6: 89.35,
    p7: 100.0,
    p8: 100.0,
    p9: 100.0,
    rank: 1,
    region: "North America",
  },
  {
    code: "JPN",
    name: "Japan",
    gdei: 82.04,
    p1: 58.0,
    p2: 78.82,
    p3: 93.01,
    p4: 89.72,
    p5: 97.53,
    p6: 82.7,
    p7: 57.32,
    p8: 100.0,
    p9: 100.0,
    rank: 2,
    region: "East Asia & Pacific",
  },
  {
    code: "DEU",
    name: "Germany",
    gdei: 80.46,
    p1: 44.0,
    p2: 86.7,
    p3: 74.09,
    p4: 89.16,
    p5: 97.83,
    p6: 97.39,
    p7: 95.85,
    p8: 19.36,
    p9: 100.0,
    rank: 3,
    region: "Europe & Central Asia",
  },
  {
    code: "SGP",
    name: "Singapore",
    gdei: 78.5,
    p1: 43.36,
    p2: 83.84,
    p3: 82.57,
    p4: 94.82,
    p5: 99.85,
    p6: 95.26,
    p7: 71.72,
    p8: 5.21,
    p9: 100.0,
    rank: 4,
    region: "East Asia & Pacific",
  },
  {
    code: "CHN",
    name: "China",
    gdei: 77.49,
    p1: 43.14,
    p2: 78.34,
    p3: 78.13,
    p4: 82.33,
    p5: 91.59,
    p6: 70.59,
    p7: 78.92,
    p8: 100.0,
    p9: 100.0,
    rank: 5,
    region: "East Asia & Pacific",
  },
  {
    code: "KOR",
    name: "Korea, Rep.",
    gdei: 76.06,
    p1: 36.1,
    p2: 86.21,
    p3: 66.14,
    p4: 100.0,
    p5: 100.0,
    p6: 83.66,
    p7: 27.36,
    p8: 100.0,
    p9: 100.0,
    rank: 6,
    region: "East Asia & Pacific",
  },
  {
    code: "NLD",
    name: "Netherlands",
    gdei: 75.59,
    p1: 32.73,
    p2: 87.89,
    p3: 59.09,
    p4: 89.32,
    p5: 99.21,
    p6: 95.74,
    p7: 84.81,
    p8: 4.3,
    p9: 100.0,
    rank: 7,
    region: "Europe & Central Asia",
  },
  {
    code: "FRA",
    name: "France",
    gdei: 75.52,
    p1: 47.8,
    p2: 76.64,
    p3: 62.16,
    p4: 90.43,
    p5: 98.97,
    p6: 93.3,
    p7: 73.87,
    p8: 9.27,
    p9: 100.0,
    rank: 8,
    region: "Europe & Central Asia",
  },
  {
    code: "IRL",
    name: "Ireland",
    gdei: 74.11,
    p1: 27.52,
    p2: 83.91,
    p3: 69.15,
    p4: 76.96,
    p5: 90.79,
    p6: 97.86,
    p7: 100.0,
    p8: 1.37,
    p9: 100.0,
    rank: 9,
    region: "Europe & Central Asia",
  },
  {
    code: "LUX",
    name: "Luxembourg",
    gdei: 71.82,
    p1: 42.99,
    p2: 90.66,
    p3: 63.19,
    p4: 80.73,
    p5: 98.7,
    p6: 90.51,
    p7: 44.12,
    p8: 0.27,
    p9: 100.0,
    rank: 10,
    region: "Europe & Central Asia",
  },
  {
    code: "IND",
    name: "India",
    gdei: 71.06,
    p1: 57.4,
    p2: 58.91,
    p3: 49.16,
    p4: 80.61,
    p5: 98.48,
    p6: 86.44,
    p7: 73.97,
    p8: 14.37,
    p9: 100.0,
    rank: 11,
    region: "South Asia",
  },
  {
    code: "SAU",
    name: "Saudi Arabia",
    gdei: 71.03,
    p1: 32.28,
    p2: 89.38,
    p3: 74.68,
    p4: 99.68,
    p5: 100.0,
    p6: 94.87,
    p7: 8.61,
    p8: 0.36,
    p9: 100.0,
    rank: 12,
    region: "Middle East & North Africa",
  },
  {
    code: "SWE",
    name: "Sweden",
    gdei: 70.27,
    p1: 30.8,
    p2: 85.76,
    p3: 69.59,
    p4: 86.7,
    p5: 99.31,
    p6: 90.03,
    p7: 32.32,
    p8: 13.17,
    p9: 100.0,
    rank: 13,
    region: "Europe & Central Asia",
  },
  {
    code: "CHE",
    name: "Switzerland",
    gdei: 69.74,
    p1: 32.02,
    p2: 86.92,
    p3: 57.91,
    p4: 84.18,
    p5: 91.08,
    p6: 91.55,
    p7: 50.13,
    p8: 4.16,
    p9: 100.0,
    rank: 14,
    region: "Europe & Central Asia",
  },
  {
    code: "DNK",
    name: "Denmark",
    gdei: 69.68,
    p1: 29.89,
    p2: 87.99,
    p3: 64.47,
    p4: 96.59,
    p5: 100.0,
    p6: 94.17,
    p7: 15.74,
    p8: 1.42,
    p9: 100.0,
    rank: 15,
    region: "Europe & Central Asia",
  },
  {
    code: "ARE",
    name: "United Arab Emirates",
    gdei: 69.66,
    p1: 31.76,
    p2: 82.9,
    p3: 72.29,
    p4: 96.7,
    p5: 100.0,
    p6: 88.19,
    p7: 18.98,
    p8: 0.13,
    p9: 100.0,
    rank: 16,
    region: "Middle East & North Africa",
  },
  {
    code: "ESP",
    name: "Spain",
    gdei: 69.0,
    p1: 33.2,
    p2: 82.74,
    p3: 58.84,
    p4: 92.3,
    p5: 99.74,
    p6: 94.2,
    p7: 24.44,
    p8: 0.82,
    p9: 100.0,
    rank: 17,
    region: "Europe & Central Asia",
  },
  {
    code: "FIN",
    name: "Finland",
    gdei: 68.99,
    p1: 29.84,
    p2: 80.98,
    p3: 74.36,
    p4: 90.95,
    p5: 100.0,
    p6: 100.0,
    p7: 9.85,
    p8: 6.14,
    p9: 100.0,
    rank: 18,
    region: "Europe & Central Asia",
  },
  {
    code: "CAN",
    name: "Canada",
    gdei: 68.47,
    p1: 34.93,
    p2: 80.08,
    p3: 63.37,
    p4: 82.81,
    p5: 93.01,
    p6: 93.34,
    p7: 35.01,
    p8: 6.42,
    p9: 100.0,
    rank: 19,
    region: "North America",
  },
  {
    code: "GBR",
    name: "United Kingdom",
    gdei: 68.42,
    p1: 38.71,
    p2: 82.71,
    p3: 59.76,
    p4: 93.7,
    p5: 100.0,
    p6: 97.97,
    p7: 100.0,
    p8: 7.68,
    p9: 0.0,
    rank: 20,
    region: "Europe & Central Asia",
  },
  {
    code: "EST",
    name: "Estonia",
    gdei: 67.73,
    p1: 28.3,
    p2: 81.99,
    p3: 75.33,
    p4: 100.0,
    p5: 94.98,
    p6: 89.34,
    p7: 2.16,
    p8: 0.07,
    p9: 100.0,
    rank: 21,
    region: "Europe & Central Asia",
  },
  {
    code: "NOR",
    name: "Norway",
    gdei: 67.41,
    p1: 30.77,
    p2: 87.28,
    p3: 60.61,
    p4: 89.2,
    p5: 96.98,
    p6: 95.05,
    p7: 10.34,
    p8: 0.53,
    p9: 100.0,
    rank: 22,
    region: "Europe & Central Asia",
  },
  {
    code: "BRA",
    name: "Brazil",
    gdei: 67.4,
    p1: 54.72,
    p2: 67.78,
    p3: 49.81,
    p4: 91.68,
    p5: 96.51,
    p6: 90.29,
    p7: 15.87,
    p8: 0.55,
    p9: 100.0,
    rank: 23,
    region: "Latin America & Caribbean",
  },
  {
    code: "AUS",
    name: "Australia",
    gdei: 67.21,
    p1: 30.84,
    p2: 84.03,
    p3: 62.0,
    p4: 91.41,
    p5: 96.18,
    p6: 92.72,
    p7: 10.88,
    p8: 1.84,
    p9: 100.0,
    rank: 24,
    region: "East Asia & Pacific",
  },
  {
    code: "ISL",
    name: "Iceland",
    gdei: 67.01,
    p1: 42.2,
    p2: 86.31,
    p3: 55.6,
    p4: 93.54,
    p5: 98.81,
    p6: 82.04,
    p7: 0.58,
    p8: 0.02,
    p9: 100.0,
    rank: 25,
    region: "Europe & Central Asia",
  },
  {
    code: "OMN",
    name: "Oman",
    gdei: 66.64,
    p1: 32.1,
    p2: 93.54,
    p3: 73.23,
    p4: 84.24,
    p5: 96.94,
    p6: 80.4,
    p7: 1.04,
    p8: 0.03,
    p9: 100.0,
    rank: 26,
    region: "Middle East & North Africa",
  },
  {
    code: "ITA",
    name: "Italy",
    gdei: 66.47,
    p1: 34.38,
    p2: 76.4,
    p3: 50.4,
    p4: 80.15,
    p5: 100.0,
    p6: 94.65,
    p7: 32.27,
    p8: 1.91,
    p9: 100.0,
    rank: 27,
    region: "Europe & Central Asia",
  },
  {
    code: "AUT",
    name: "Austria",
    gdei: 66.17,
    p1: 29.57,
    p2: 79.03,
    p3: 66.95,
    p4: 89.26,
    p5: 88.83,
    p6: 93.12,
    p7: 15.5,
    p8: 0.96,
    p9: 100.0,
    rank: 28,
    region: "Europe & Central Asia",
  },
  {
    code: "BEL",
    name: "Belgium",
    gdei: 66.09,
    p1: 30.73,
    p2: 81.38,
    p3: 49.86,
    p4: 77.72,
    p5: 96.78,
    p6: 90.38,
    p7: 38.62,
    p8: 1.01,
    p9: 100.0,
    rank: 29,
    region: "Europe & Central Asia",
  },
  {
    code: "MLT",
    name: "Malta",
    gdei: 65.58,
    p1: 40.8,
    p2: 82.62,
    p3: 51.89,
    p4: 84.57,
    p5: 93.3,
    p6: 93.31,
    p7: 5.28,
    p8: 0.08,
    p9: 100.0,
    rank: 30,
    region: "Middle East & North Africa",
  },
  {
    code: "LTU",
    name: "Lithuania",
    gdei: 65.1,
    p1: 30.41,
    p2: 78.11,
    p3: 59.92,
    p4: 92.26,
    p5: 92.48,
    p6: 94.94,
    p7: 2.37,
    p8: 0.18,
    p9: 100.0,
    rank: 31,
    region: "Europe & Central Asia",
  },
  {
    code: "PRT",
    name: "Portugal",
    gdei: 64.38,
    p1: 30.44,
    p2: 76.62,
    p3: 56.06,
    p4: 82.46,
    p5: 99.85,
    p6: 98.36,
    p7: 5.11,
    p8: 0.19,
    p9: 100.0,
    rank: 32,
    region: "Europe & Central Asia",
  },
  {
    code: "SVN",
    name: "Slovenia",
    gdei: 64.07,
    p1: 29.2,
    p2: 80.98,
    p3: 62.7,
    p4: 86.67,
    p5: 96.43,
    p6: 84.65,
    p7: 1.65,
    p8: 0.05,
    p9: 100.0,
    rank: 33,
    region: "Europe & Central Asia",
  },
  {
    code: "GRC",
    name: "Greece",
    gdei: 63.53,
    p1: 30.55,
    p2: 74.97,
    p3: 60.4,
    p4: 85.27,
    p5: 97.16,
    p6: 88.85,
    p7: 2.64,
    p8: 0.07,
    p9: 100.0,
    rank: 34,
    region: "Europe & Central Asia",
  },
  {
    code: "TUR",
    name: "Turkiye",
    gdei: 63.39,
    p1: 21.38,
    p2: 74.35,
    p3: 51.96,
    p4: 90.97,
    p5: 100.0,
    p6: 93.63,
    p7: 7.4,
    p8: 1.67,
    p9: 100.0,
    rank: 35,
    region: "Europe & Central Asia",
  },
  {
    code: "BHR",
    name: "Bahrain",
    gdei: 63.37,
    p1: 30.7,
    p2: 85.64,
    p3: 54.91,
    p4: 89.9,
    p5: 97.88,
    p6: 68.64,
    p7: 2.95,
    p8: 0.0,
    p9: 100.0,
    rank: 36,
    region: "Middle East & North Africa",
  },
  {
    code: "POL",
    name: "Poland",
    gdei: 63.14,
    p1: 31.38,
    p2: 79.2,
    p3: 52.52,
    p4: 78.32,
    p5: 93.47,
    p6: 84.47,
    p7: 17.45,
    p8: 0.3,
    p9: 100.0,
    rank: 37,
    region: "Europe & Central Asia",
  },
  {
    code: "NZL",
    name: "New Zealand",
    gdei: 62.99,
    p1: 22.32,
    p2: 81.28,
    p3: 65.77,
    p4: 90.98,
    p5: 82.28,
    p6: 87.11,
    p7: 2.69,
    p8: 0.45,
    p9: 100.0,
    rank: 38,
    region: "East Asia & Pacific",
  },
  {
    code: "THA",
    name: "Thailand",
    gdei: 62.97,
    p1: 31.99,
    p2: 68.13,
    p3: 59.83,
    p4: 83.11,
    p5: 99.21,
    p6: 85.46,
    p7: 10.34,
    p8: 0.04,
    p9: 100.0,
    rank: 39,
    region: "East Asia & Pacific",
  },
  {
    code: "HRV",
    name: "Croatia",
    gdei: 62.56,
    p1: 29.09,
    p2: 76.13,
    p3: 63.03,
    p4: 84.61,
    p5: 88.04,
    p6: 88.15,
    p7: 1.59,
    p8: 0.02,
    p9: 100.0,
    rank: 40,
    region: "Europe & Central Asia",
  },
  {
    code: "HKG",
    name: "Hong Kong SAR, China",
    gdei: 62.46,
    p1: 51.21,
    p2: 81.87,
    p3: 69.33,
    p4: 69.32,
    p5: 0,
    p6: 75.06,
    p7: 13.65,
    p8: 1.02,
    p9: 100.0,
    rank: 41,
    region: "East Asia & Pacific",
  },
  {
    code: "HUN",
    name: "Hungary",
    gdei: 62.44,
    p1: 27.39,
    p2: 80.02,
    p3: 63.39,
    p4: 76.73,
    p5: 88.48,
    p6: 90.78,
    p7: 5.52,
    p8: 0.09,
    p9: 100.0,
    rank: 42,
    region: "Europe & Central Asia",
  },
  {
    code: "SRB",
    name: "Serbia",
    gdei: 62.24,
    p1: 15.35,
    p2: 75.99,
    p3: 73.57,
    p4: 88.38,
    p5: 96.78,
    p6: 79.91,
    p7: 2.5,
    p8: 0.03,
    p9: 100.0,
    rank: 43,
    region: "Europe & Central Asia",
  },
  {
    code: "CZE",
    name: "Czechia",
    gdei: 62.01,
    p1: 30.1,
    p2: 78.05,
    p3: 60.41,
    p4: 77.03,
    p5: 87.69,
    p6: 86.72,
    p7: 7.49,
    p8: 0.1,
    p9: 100.0,
    rank: 44,
    region: "Europe & Central Asia",
  },
  {
    code: "CYP",
    name: "Cyprus",
    gdei: 61.72,
    p1: 32.35,
    p2: 79.87,
    p3: 42.56,
    p4: 80.38,
    p5: 97.99,
    p6: 82.34,
    p7: 5.28,
    p8: 0.21,
    p9: 100.0,
    rank: 45,
    region: "Europe & Central Asia",
  },
  {
    code: "LIE",
    name: "Liechtenstein",
    gdei: 61.5,
    p1: 27.96,
    p2: 97.88,
    p3: 51.01,
    p4: 60.78,
    p5: 51.22,
    p6: 71.27,
    p7: 0,
    p8: 0.06,
    p9: 100.0,
    rank: 46,
    region: "Europe & Central Asia",
  },
  {
    code: "ISR",
    name: "Israel",
    gdei: 61.31,
    p1: 21.23,
    p2: 79.36,
    p3: 66.54,
    p4: 82.06,
    p5: 93.63,
    p6: 61.15,
    p7: 15.69,
    p8: 4.14,
    p9: 100.0,
    rank: 47,
    region: "Europe & Central Asia",
  },
  {
    code: "QAT",
    name: "Qatar",
    gdei: 61.01,
    p1: 29.06,
    p2: 83.27,
    p3: 47.72,
    p4: 82.46,
    p5: 100.0,
    p6: 67.15,
    p7: 3.01,
    p8: 0.03,
    p9: 100.0,
    rank: 48,
    region: "Middle East & North Africa",
  },
  {
    code: "LVA",
    name: "Latvia",
    gdei: 60.62,
    p1: 24.09,
    p2: 79.52,
    p3: 57.27,
    p4: 86.18,
    p5: 82.33,
    p6: 80.69,
    p7: 1.21,
    p8: 0.02,
    p9: 100.0,
    rank: 49,
    region: "Europe & Central Asia",
  },
  {
    code: "SVK",
    name: "Slovak Republic",
    gdei: 60.05,
    p1: 26.93,
    p2: 78.4,
    p3: 53.94,
    p4: 71.16,
    p5: 94.31,
    p6: 85.26,
    p7: 2.23,
    p8: 0.03,
    p9: 100.0,
    rank: 50,
    region: "Europe & Central Asia",
  },
  {
    code: "BRN",
    name: "Brunei Darussalam",
    gdei: 59.88,
    p1: 33.39,
    p2: 87.41,
    p3: 84.74,
    p4: 64.87,
    p5: 69.77,
    p6: 65.59,
    p7: 0.15,
    p8: 0.0,
    p9: 100.0,
    rank: 51,
    region: "East Asia & Pacific",
  },
  {
    code: "IDN",
    name: "Indonesia",
    gdei: 59.65,
    p1: 22.3,
    p2: 74.14,
    p3: 56.93,
    p4: 80.92,
    p5: 100.0,
    p6: 63.42,
    p7: 10.12,
    p8: 0.01,
    p9: 100.0,
    rank: 52,
    region: "East Asia & Pacific",
  },
  {
    code: "URY",
    name: "Uruguay",
    gdei: 59.57,
    p1: 19.62,
    p2: 78.66,
    p3: 49.98,
    p4: 89.53,
    p5: 94.51,
    p6: 68.9,
    p7: 0.61,
    p8: 0.01,
    p9: 100.0,
    rank: 53,
    region: "Latin America & Caribbean",
  },
  {
    code: "CHL",
    name: "Chile",
    gdei: 59.14,
    p1: 28.58,
    p2: 78.6,
    p3: 52.27,
    p4: 83.82,
    p5: 69.42,
    p6: 80.13,
    p7: 3.05,
    p8: 0.07,
    p9: 100.0,
    rank: 54,
    region: "Latin America & Caribbean",
  },
  {
    code: "MUS",
    name: "Mauritius",
    gdei: 59.04,
    p1: 23.98,
    p2: 68.91,
    p3: 71.27,
    p4: 72.62,
    p5: 100.0,
    p6: 70.42,
    p7: 0.41,
    p8: 0.02,
    p9: 100.0,
    rank: 55,
    region: "Sub-Saharan Africa",
  },
  {
    code: "UKR",
    name: "Ukraine",
    gdei: 58.82,
    p1: 20.53,
    p2: 72.9,
    p3: 64.34,
    p4: 89.19,
    p5: 83.65,
    p6: 63.9,
    p7: 2.35,
    p8: 0.03,
    p9: 100.0,
    rank: 56,
    region: "Europe & Central Asia",
  },
  {
    code: "AND",
    name: "Andorra",
    gdei: 58.18,
    p1: 39.23,
    p2: 94.97,
    p3: 55.15,
    p4: 42.88,
    p5: 76.04,
    p6: 26.78,
    p7: 0,
    p8: 0.0,
    p9: 100.0,
    rank: 57,
    region: "Europe & Central Asia",
  },
  {
    code: "KAZ",
    name: "Kazakhstan",
    gdei: 57.96,
    p1: 20.94,
    p2: 80.69,
    p3: 54.87,
    p4: 90.08,
    p5: 93.99,
    p6: 41.67,
    p7: 1.55,
    p8: 0.0,
    p9: 100.0,
    rank: 58,
    region: "Europe & Central Asia",
  },
  {
    code: "AZE",
    name: "Azerbaijan",
    gdei: 57.92,
    p1: 18.04,
    p2: 89.5,
    p3: 55.28,
    p4: 75.07,
    p5: 93.86,
    p6: 55.09,
    p7: 1.05,
    p8: 0.0,
    p9: 100.0,
    rank: 59,
    region: "Europe & Central Asia",
  },
  {
    code: "MYS",
    name: "Malaysia",
    gdei: 57.71,
    p1: 28.92,
    p2: 97.1,
    p3: 72.55,
    p4: 77.51,
    p5: 98.81,
    p6: 91.5,
    p7: 8.78,
    p8: 0.31,
    p9: 0.0,
    rank: 60,
    region: "East Asia & Pacific",
  },
  {
    code: "PER",
    name: "Peru",
    gdei: 57.3,
    p1: 18.74,
    p2: 61.14,
    p3: 60.67,
    p4: 84.77,
    p5: 83.35,
    p6: 80.21,
    p7: 1.83,
    p8: 0.0,
    p9: 100.0,
    rank: 61,
    region: "Latin America & Caribbean",
  },
  {
    code: "KWT",
    name: "Kuwait",
    gdei: 57.27,
    p1: 29.73,
    p2: 85.22,
    p3: 68.1,
    p4: 66.86,
    p5: 59.93,
    p6: 69.38,
    p7: 2.56,
    p8: 0.0,
    p9: 100.0,
    rank: 62,
    region: "Middle East & North Africa",
  },
  {
    code: "MCO",
    name: "Monaco",
    gdei: 57.02,
    p1: 48.17,
    p2: 97.89,
    p3: 24.46,
    p4: 44.63,
    p5: 74.93,
    p6: 27.75,
    p7: 0,
    p8: 0.02,
    p9: 100.0,
    rank: 63,
    region: "Europe & Central Asia",
  },
  {
    code: "JOR",
    name: "Jordan",
    gdei: 56.99,
    p1: 20.26,
    p2: 68.14,
    p3: 56.57,
    p4: 74.97,
    p5: 98.58,
    p6: 69.51,
    p7: 0.23,
    p8: 0.0,
    p9: 100.0,
    rank: 64,
    region: "Middle East & North Africa",
  },
  {
    code: "ARG",
    name: "Argentina",
    gdei: 56.02,
    p1: 27.34,
    p2: 76.8,
    p3: 47.41,
    p4: 80.78,
    p5: 50.53,
    p6: 81.28,
    p7: 3.63,
    p8: 0.03,
    p9: 100.0,
    rank: 65,
    region: "Latin America & Caribbean",
  },
  {
    code: "MNE",
    name: "Montenegro",
    gdei: 55.96,
    p1: 32.89,
    p2: 75.96,
    p3: 49.4,
    p4: 57.52,
    p5: 74.42,
    p6: 86.02,
    p7: 0.18,
    p8: 0.0,
    p9: 100.0,
    rank: 66,
    region: "Europe & Central Asia",
  },
  {
    code: "UZB",
    name: "Uzbekistan",
    gdei: 55.54,
    p1: 20.88,
    p2: 73.84,
    p3: 66.01,
    p4: 79.15,
    p5: 89.05,
    p6: 39.25,
    p7: 0.32,
    p8: 0.0,
    p9: 100.0,
    rank: 67,
    region: "Europe & Central Asia",
  },
  {
    code: "MKD",
    name: "North Macedonia",
    gdei: 55.29,
    p1: 28.35,
    p2: 77.97,
    p3: 57.71,
    p4: 62.55,
    p5: 65.24,
    p6: 76.22,
    p7: 0.41,
    p8: 0.0,
    p9: 100.0,
    rank: 68,
    region: "Europe & Central Asia",
  },
  {
    code: "VNM",
    name: "Viet Nam",
    gdei: 55.27,
    p1: 25.81,
    p2: 67.18,
    p3: 46.23,
    p4: 70.96,
    p5: 99.74,
    p6: 59.08,
    p7: 1.71,
    p8: 0.04,
    p9: 100.0,
    rank: 69,
    region: "East Asia & Pacific",
  },
  {
    code: "ARM",
    name: "Armenia",
    gdei: 54.64,
    p1: 17.34,
    p2: 71.76,
    p3: 62.96,
    p4: 78.49,
    p5: 53.13,
    p6: 78.55,
    p7: 0.34,
    p8: 0.0,
    p9: 100.0,
    rank: 70,
    region: "Europe & Central Asia",
  },
  {
    code: "MAR",
    name: "Morocco",
    gdei: 54.61,
    p1: 15.38,
    p2: 75.1,
    p3: 52.41,
    p4: 59.37,
    p5: 97.47,
    p6: 69.52,
    p7: 1.92,
    p8: 0.04,
    p9: 100.0,
    rank: 71,
    region: "Middle East & North Africa",
  },
  {
    code: "GEO",
    name: "Georgia",
    gdei: 54.55,
    p1: 15.09,
    p2: 72.66,
    p3: 55.64,
    p4: 63.41,
    p5: 91.99,
    p6: 70.76,
    p7: 0.41,
    p8: 0.01,
    p9: 100.0,
    rank: 72,
    region: "Europe & Central Asia",
  },
  {
    code: "COL",
    name: "Colombia",
    gdei: 54.4,
    p1: 18.06,
    p2: 62.7,
    p3: 52.77,
    p4: 79.73,
    p5: 64.63,
    p6: 83.71,
    p7: 2.08,
    p8: 0.13,
    p9: 100.0,
    rank: 73,
    region: "Latin America & Caribbean",
  },
  {
    code: "MDA",
    name: "Moldova",
    gdei: 54.22,
    p1: 15.41,
    p2: 69.03,
    p3: 60.11,
    p4: 76.21,
    p5: 64.67,
    p6: 76.22,
    p7: 0.23,
    p8: 0.0,
    p9: 100.0,
    rank: 74,
    region: "Europe & Central Asia",
  },
  {
    code: "IRN",
    name: "Iran, Islamic Rep.",
    gdei: 53.91,
    p1: 18.28,
    p2: 90.69,
    p3: 60.53,
    p4: 55.63,
    p5: 64.7,
    p6: 66.21,
    p7: 0.69,
    p8: 0.06,
    p9: 100.0,
    rank: 75,
    region: "Middle East & North Africa",
  },
  {
    code: "MNG",
    name: "Mongolia",
    gdei: 52.16,
    p1: 16.94,
    p2: 69.69,
    p3: 45.71,
    p4: 86.93,
    p5: 55.56,
    p6: 59.64,
    p7: 0.33,
    p8: 0.0,
    p9: 100.0,
    rank: 76,
    region: "East Asia & Pacific",
  },
  {
    code: "PRY",
    name: "Paraguay",
    gdei: 51.18,
    p1: 14.82,
    p2: 60.48,
    p3: 68.23,
    p4: 70.37,
    p5: 74.42,
    p6: 50.64,
    p7: 0.05,
    p8: 0.0,
    p9: 100.0,
    rank: 77,
    region: "Latin America & Caribbean",
  },
  {
    code: "RUS",
    name: "Russian Federation",
    gdei: 51.07,
    p1: 27.98,
    p2: 76.91,
    p3: 64.17,
    p4: 85.19,
    p5: 91.98,
    p6: 63.12,
    p7: 5.8,
    p8: 1.02,
    p9: 0.0,
    rank: 78,
    region: "Europe & Central Asia",
  },
  {
    code: "PAN",
    name: "Panama",
    gdei: 49.89,
    p1: 12.99,
    p2: 63.66,
    p3: 39.87,
    p4: 72.84,
    p5: 65.65,
    p6: 68.28,
    p7: 0.86,
    p8: 0.03,
    p9: 100.0,
    rank: 79,
    region: "Latin America & Caribbean",
  },
  {
    code: "ROU",
    name: "Romania",
    gdei: 49.47,
    p1: 22.62,
    p2: 80.77,
    p3: 61.61,
    p4: 64.54,
    p5: 91.53,
    p6: 82.8,
    p7: 6.84,
    p8: 0.1,
    p9: 0.0,
    rank: 80,
    region: "Europe & Central Asia",
  },
  {
    code: "BHS",
    name: "Bahamas, The",
    gdei: 49.37,
    p1: 18.13,
    p2: 80.25,
    p3: 71.69,
    p4: 55.28,
    p5: 32.34,
    p6: 58.9,
    p7: 0.27,
    p8: 0.02,
    p9: 100.0,
    rank: 81,
    region: "Latin America & Caribbean",
  },
  {
    code: "MEX",
    name: "Mexico",
    gdei: 49.16,
    p1: 29.91,
    p2: 65.87,
    p3: 53.12,
    p4: 77.74,
    p5: 85.35,
    p6: 83.58,
    p7: 9.27,
    p8: 0.09,
    p9: 0.0,
    rank: 82,
    region: "Latin America & Caribbean",
  },
  {
    code: "TTO",
    name: "Trinidad and Tobago",
    gdei: 49.1,
    p1: 14.1,
    p2: 71.37,
    p3: 51.31,
    p4: 57.9,
    p5: 54.68,
    p6: 69.6,
    p7: 0.36,
    p8: 0.0,
    p9: 100.0,
    rank: 83,
    region: "Latin America & Caribbean",
  },
  {
    code: "PHL",
    name: "Philippines",
    gdei: 49.06,
    p1: 36.85,
    p2: 55.37,
    p3: 57.87,
    p4: 76.06,
    p5: 93.37,
    p6: 79.76,
    p7: 7.15,
    p8: 0.03,
    p9: 0.0,
    rank: 84,
    region: "East Asia & Pacific",
  },
  {
    code: "BTN",
    name: "Bhutan",
    gdei: 48.67,
    p1: 22.62,
    p2: 67.85,
    p3: 48.45,
    p4: 58.62,
    p5: 59.62,
    p6: 55.01,
    p7: 0.01,
    p8: 0.0,
    p9: 100.0,
    rank: 85,
    region: "South Asia",
  },
  {
    code: "TWN",
    name: "Taiwan, China",
    gdei: 48.45,
    p1: 53.67,
    p2: 74.88,
    p3: 0,
    p4: 73.86,
    p5: 0,
    p6: 0,
    p7: 11.32,
    p8: 0,
    p9: 0.0,
    rank: 86,
    region: "East Asia & Pacific",
  },
  {
    code: "BOL",
    name: "Bolivia",
    gdei: 47.89,
    p1: 12.89,
    p2: 69.92,
    p3: 65.57,
    p4: 56.91,
    p5: 41.83,
    p6: 61.69,
    p7: 0.19,
    p8: 0.0,
    p9: 100.0,
    rank: 87,
    region: "Latin America & Caribbean",
  },
  {
    code: "CPV",
    name: "Cabo Verde",
    gdei: 47.82,
    p1: 12.8,
    p2: 73.65,
    p3: 33.86,
    p4: 69.51,
    p5: 50.65,
    p6: 59.74,
    p7: 0.03,
    p8: 0.0,
    p9: 100.0,
    rank: 88,
    region: "Sub-Saharan Africa",
  },
  {
    code: "BGR",
    name: "Bulgaria",
    gdei: 47.19,
    p1: 29.33,
    p2: 75.03,
    p3: 50.26,
    p4: 75.12,
    p5: 74.11,
    p6: 76.09,
    p7: 2.16,
    p8: 0.02,
    p9: 0.0,
    rank: 89,
    region: "Europe & Central Asia",
  },
  {
    code: "KGZ",
    name: "Kyrgyz Republic",
    gdei: 47.11,
    p1: 14.66,
    p2: 62.49,
    p3: 46.63,
    p4: 61.85,
    p5: 64.81,
    p6: 51.11,
    p7: 0.06,
    p8: 0.0,
    p9: 100.0,
    rank: 90,
    region: "Europe & Central Asia",
  },
  {
    code: "ALB",
    name: "Albania",
    gdei: 46.89,
    p1: 18.01,
    p2: 65.18,
    p3: 60.25,
    p4: 78.7,
    p5: 86.29,
    p6: 79.23,
    p7: 0.31,
    p8: 0.0,
    p9: 0.0,
    rank: 91,
    region: "Europe & Central Asia",
  },
  {
    code: "EGY",
    name: "Egypt, Arab Rep.",
    gdei: 46.81,
    p1: 18.47,
    p2: 69.77,
    p3: 46.81,
    p4: 69.16,
    p5: 100.0,
    p6: 82.84,
    p7: 2.32,
    p8: 0.02,
    p9: 0.0,
    rank: 92,
    region: "Middle East & North Africa",
  },
  {
    code: "ZAF",
    name: "South Africa",
    gdei: 45.88,
    p1: 23.03,
    p2: 62.11,
    p3: 50.06,
    p4: 76.71,
    p5: 86.1,
    p6: 76.23,
    p7: 3.5,
    p8: 0.19,
    p9: 0.0,
    rank: 93,
    region: "Sub-Saharan Africa",
  },
  {
    code: "ECU",
    name: "Ecuador",
    gdei: 45.19,
    p1: 16.44,
    p2: 64.13,
    p3: 46.41,
    p4: 84.64,
    p5: 86.86,
    p6: 70.33,
    p7: 0.45,
    p8: 0.0,
    p9: 0.0,
    rank: 94,
    region: "Latin America & Caribbean",
  },
  {
    code: "MDV",
    name: "Maldives",
    gdei: 44.77,
    p1: 24.3,
    p2: 87.56,
    p3: 28.51,
    p4: 53.61,
    p5: 12.3,
    p6: 36.1,
    p7: 0.17,
    p8: 0,
    p9: 100.0,
    rank: 95,
    region: "South Asia",
  },
  {
    code: "DOM",
    name: "Dominican Republic",
    gdei: 44.55,
    p1: 23.38,
    p2: 64.41,
    p3: 42.96,
    p4: 72.81,
    p5: 75.3,
    p6: 85.81,
    p7: 0.55,
    p8: 0.0,
    p9: 0.0,
    rank: 96,
    region: "Latin America & Caribbean",
  },
  {
    code: "UGA",
    name: "Uganda",
    gdei: 44.01,
    p1: 13.98,
    p2: 31.88,
    p3: 25.35,
    p4: 60.71,
    p5: 82.57,
    p6: 72.05,
    p7: 0.31,
    p8: 0.0,
    p9: 100.0,
    rank: 97,
    region: "Sub-Saharan Africa",
  },
  {
    code: "MAC",
    name: "Macao SAR, China",
    gdei: 43.86,
    p1: 33.37,
    p2: 80.44,
    p3: 34.61,
    p4: 29.55,
    p5: 0,
    p6: 0,
    p7: 1.24,
    p8: 0.01,
    p9: 100.0,
    rank: 98,
    region: "East Asia & Pacific",
  },
  {
    code: "BEN",
    name: "Benin",
    gdei: 43.76,
    p1: 12.92,
    p2: 35.54,
    p3: 34.29,
    p4: 51.19,
    p5: 91.34,
    p6: 62.48,
    p7: 0.05,
    p8: 0.0,
    p9: 100.0,
    rank: 99,
    region: "Sub-Saharan Africa",
  },
  {
    code: "CRI",
    name: "Costa Rica",
    gdei: 43.73,
    p1: 14.63,
    p2: 68.85,
    p3: 50.44,
    p4: 66.25,
    p5: 74.63,
    p6: 85.35,
    p7: 2.31,
    p8: 0.01,
    p9: 0.0,
    rank: 100,
    region: "Latin America & Caribbean",
  },
  {
    code: "TUN",
    name: "Tunisia",
    gdei: 43.11,
    p1: 14.51,
    p2: 60.1,
    p3: 82.78,
    p4: 64.01,
    p5: 81.58,
    p6: 58.47,
    p7: 0.35,
    p8: 0.01,
    p9: 0.0,
    rank: 101,
    region: "Middle East & North Africa",
  },
  {
    code: "SLV",
    name: "El Salvador",
    gdei: 42.34,
    p1: 12.36,
    p2: 48.11,
    p3: 50.89,
    p4: 59.99,
    p5: 35.82,
    p6: 55.68,
    p7: 0.35,
    p8: 0.0,
    p9: 100.0,
    rank: 102,
    region: "Latin America & Caribbean",
  },
  {
    code: "PAK",
    name: "Pakistan",
    gdei: 42.29,
    p1: 27.28,
    p2: 63.32,
    p3: 24.22,
    p4: 54.38,
    p5: 96.63,
    p6: 83.4,
    p7: 1.21,
    p8: 0.01,
    p9: 0.0,
    rank: 103,
    region: "South Asia",
  },
  {
    code: "GHA",
    name: "Ghana",
    gdei: 41.96,
    p1: 14.46,
    p2: 67.46,
    p3: 40.47,
    p4: 55.89,
    p5: 99.26,
    p6: 70.41,
    p7: 2.71,
    p8: 0.0,
    p9: 0.0,
    rank: 104,
    region: "Sub-Saharan Africa",
  },
  {
    code: "KEN",
    name: "Kenya",
    gdei: 41.86,
    p1: 16.96,
    p2: 41.86,
    p3: 42.4,
    p4: 70.4,
    p5: 98.54,
    p6: 83.01,
    p7: 0.78,
    p8: 0.0,
    p9: 0.0,
    rank: 105,
    region: "Sub-Saharan Africa",
  },
  {
    code: "LKA",
    name: "Sri Lanka",
    gdei: 41.22,
    p1: 14.61,
    p2: 60.9,
    p3: 57.37,
    p4: 63.5,
    p5: 86.7,
    p6: 59.11,
    p7: 0.5,
    p8: 0.01,
    p9: 0.0,
    rank: 106,
    region: "South Asia",
  },
  {
    code: "JAM",
    name: "Jamaica",
    gdei: 41.12,
    p1: 16.89,
    p2: 72.26,
    p3: 67.82,
    p4: 56.26,
    p5: 57.11,
    p6: 67.89,
    p7: 0.28,
    p8: 0.0,
    p9: 0.0,
    rank: 107,
    region: "Latin America & Caribbean",
  },
  {
    code: "RWA",
    name: "Rwanda",
    gdei: 40.74,
    p1: 15.24,
    p2: 37.5,
    p3: 56.98,
    p4: 67.23,
    p5: 98.05,
    p6: 72.43,
    p7: 0.03,
    p8: 0.0,
    p9: 0.0,
    rank: 108,
    region: "Sub-Saharan Africa",
  },
  {
    code: "BGD",
    name: "Bangladesh",
    gdei: 39.53,
    p1: 19.08,
    p2: 50.08,
    p3: 30.55,
    p4: 73.41,
    p5: 96.72,
    p6: 53.37,
    p7: 0.78,
    p8: 0.0,
    p9: 0.0,
    rank: 109,
    region: "South Asia",
  },
  {
    code: "ZMB",
    name: "Zambia",
    gdei: 38.87,
    p1: 13.89,
    p2: 41.68,
    p3: 57.6,
    p4: 48.85,
    p5: 92.5,
    p6: 62.36,
    p7: 0.13,
    p8: 0,
    p9: 0.0,
    rank: 110,
    region: "Sub-Saharan Africa",
  },
  {
    code: "BLR",
    name: "Belarus",
    gdei: 38.48,
    p1: 15.8,
    p2: 78.04,
    p3: 66.72,
    p4: 54.8,
    p5: 60.98,
    p6: 33.23,
    p7: 0.95,
    p8: 0.01,
    p9: 0.0,
    rank: 111,
    region: "Europe & Central Asia",
  },
  {
    code: "SYC",
    name: "Seychelles",
    gdei: 37.14,
    p1: 25.97,
    p2: 79.63,
    p3: 55.98,
    p4: 49.44,
    p5: 49.49,
    p6: 33.18,
    p7: 0.21,
    p8: 0.01,
    p9: 0.0,
    rank: 112,
    region: "Sub-Saharan Africa",
  },
  {
    code: "DZA",
    name: "Algeria",
    gdei: 37.01,
    p1: 22.69,
    p2: 69.68,
    p3: 52.36,
    p4: 43.14,
    p5: 65.45,
    p6: 48.2,
    p7: 0.87,
    p8: 0.0,
    p9: 0.0,
    rank: 113,
    region: "Middle East & North Africa",
  },
  {
    code: "NGA",
    name: "Nigeria",
    gdei: 36.68,
    p1: 14.31,
    p2: 49.92,
    p3: 33.24,
    p4: 45.97,
    p5: 82.06,
    p6: 84.95,
    p7: 1.29,
    p8: 0.01,
    p9: 0.0,
    rank: 114,
    region: "Sub-Saharan Africa",
  },
  {
    code: "FJI",
    name: "Fiji",
    gdei: 36.35,
    p1: 14.36,
    p2: 65.19,
    p3: 41.52,
    p4: 56.49,
    p5: 52.69,
    p6: 47.05,
    p7: 0.04,
    p8: 0,
    p9: 0.0,
    rank: 115,
    region: "East Asia & Pacific",
  },
  {
    code: "SMR",
    name: "San Marino",
    gdei: 35.91,
    p1: 26.66,
    p2: 95.26,
    p3: 38.07,
    p4: 37.05,
    p5: 24.52,
    p6: 22.17,
    p7: 0,
    p8: 0.0,
    p9: 0.0,
    rank: 116,
    region: "Europe & Central Asia",
  },
  {
    code: "BWA",
    name: "Botswana",
    gdei: 35.78,
    p1: 23.96,
    p2: 54.87,
    p3: 35.13,
    p4: 41.32,
    p5: 78.37,
    p6: 63.91,
    p7: 0.2,
    p8: 0.0,
    p9: 0.0,
    rank: 117,
    region: "Sub-Saharan Africa",
  },
  {
    code: "TZA",
    name: "Tanzania",
    gdei: 35.24,
    p1: 15.79,
    p2: 36.32,
    p3: 30.8,
    p4: 55.47,
    p5: 99.26,
    p6: 60.79,
    p7: 0.2,
    p8: 0.0,
    p9: 0.0,
    rank: 118,
    region: "Sub-Saharan Africa",
  },
  {
    code: "CIV",
    name: "Cote d'Ivoire",
    gdei: 34.5,
    p1: 13.64,
    p2: 49.18,
    p3: 40.74,
    p4: 47.07,
    p5: 78.58,
    p6: 60.53,
    p7: 0.31,
    p8: 0.0,
    p9: 0.0,
    rank: 119,
    region: "Sub-Saharan Africa",
  },
  {
    code: "BIH",
    name: "Bosnia and Herzegovina",
    gdei: 34.12,
    p1: 14.37,
    p2: 73.19,
    p3: 51.43,
    p4: 42.13,
    p5: 32.03,
    p6: 63.08,
    p7: 0.14,
    p8: 0.01,
    p9: 0.0,
    rank: 120,
    region: "Europe & Central Asia",
  },
  {
    code: "KHM",
    name: "Cambodia",
    gdei: 34.1,
    p1: 13.8,
    p2: 58.25,
    p3: 54.4,
    p4: 49.67,
    p5: 35.48,
    p6: 68.41,
    p7: 0.18,
    p8: 0.0,
    p9: 0.0,
    rank: 121,
    region: "East Asia & Pacific",
  },
  {
    code: "BRB",
    name: "Barbados",
    gdei: 33.58,
    p1: 20.29,
    p2: 71.46,
    p3: 38.72,
    p4: 47.06,
    p5: 35.27,
    p6: 53.34,
    p7: 0.06,
    p8: 0.48,
    p9: 0.0,
    rank: 122,
    region: "Latin America & Caribbean",
  },
  {
    code: "SWZ",
    name: "Eswatini",
    gdei: 33.43,
    p1: 18.48,
    p2: 56.05,
    p3: 17.61,
    p4: 44.02,
    p5: 79.02,
    p6: 59.82,
    p7: 0.03,
    p8: 0.0,
    p9: 0.0,
    rank: 123,
    region: "Sub-Saharan Africa",
  },
  {
    code: "KNA",
    name: "St. Kitts and Nevis",
    gdei: 32.14,
    p1: 17.65,
    p2: 73.04,
    p3: 69.56,
    p4: 33.69,
    p5: 30.07,
    p6: 35.16,
    p7: 0.04,
    p8: 0.0,
    p9: 0.0,
    rank: 124,
    region: "Latin America & Caribbean",
  },
  {
    code: "NPL",
    name: "Nepal",
    gdei: 32.0,
    p1: 16.37,
    p2: 53.74,
    p3: 45.17,
    p4: 44.4,
    p5: 69.17,
    p6: 33.74,
    p7: 0.18,
    p8: 0.0,
    p9: 0.0,
    rank: 125,
    region: "South Asia",
  },
  {
    code: "TGO",
    name: "Togo",
    gdei: 31.96,
    p1: 17.21,
    p2: 34.25,
    p3: 40.31,
    p4: 39.36,
    p5: 89.92,
    p6: 53.05,
    p7: 0.06,
    p8: 0.0,
    p9: 0.0,
    rank: 126,
    region: "Sub-Saharan Africa",
  },
  {
    code: "LBN",
    name: "Lebanon",
    gdei: 31.66,
    p1: 15.11,
    p2: 83.55,
    p3: 59.62,
    p4: 40.04,
    p5: 30.69,
    p6: 17.48,
    p7: 0.77,
    p8: 0.0,
    p9: 0.0,
    rank: 127,
    region: "Middle East & North Africa",
  },
  {
    code: "VUT",
    name: "Vanuatu",
    gdei: 31.65,
    p1: 13.09,
    p2: 44.62,
    p3: 46.85,
    p4: 40.21,
    p5: 68.53,
    p6: 54.18,
    p7: 0.01,
    p8: 0.01,
    p9: 0.0,
    rank: 128,
    region: "East Asia & Pacific",
  },
  {
    code: "GTM",
    name: "Guatemala",
    gdei: 31.36,
    p1: 21.33,
    p2: 48.39,
    p3: 24.51,
    p4: 58.96,
    p5: 38.05,
    p6: 57.35,
    p7: 0.68,
    p8: 0.0,
    p9: 0.0,
    rank: 129,
    region: "Latin America & Caribbean",
  },
  {
    code: "NAM",
    name: "Namibia",
    gdei: 31.24,
    p1: 14.85,
    p2: 57.74,
    p3: 34.02,
    p4: 46.46,
    p5: 34.83,
    p6: 48.99,
    p7: 0.38,
    p8: 0,
    p9: 0.0,
    rank: 130,
    region: "Sub-Saharan Africa",
  },
  {
    code: "GRD",
    name: "Grenada",
    gdei: 31.2,
    p1: 16.47,
    p2: 74.34,
    p3: 44.61,
    p4: 42.47,
    p5: 23.09,
    p6: 44.4,
    p7: 0.03,
    p8: 0.0,
    p9: 0.0,
    rank: 131,
    region: "Latin America & Caribbean",
  },
  {
    code: "VEN",
    name: "Venezuela, RB",
    gdei: 31.16,
    p1: 13.26,
    p2: 62.15,
    p3: 56.19,
    p4: 33.67,
    p5: 39.14,
    p6: 51.1,
    p7: 1.59,
    p8: 0.0,
    p9: 0.0,
    rank: 132,
    region: "Latin America & Caribbean",
  },
  {
    code: "LCA",
    name: "St. Lucia",
    gdei: 31.07,
    p1: 16.03,
    p2: 64.15,
    p3: 55.3,
    p4: 39.92,
    p5: 24.5,
    p6: 50.67,
    p7: 0.05,
    p8: 0.0,
    p9: 0.0,
    rank: 133,
    region: "Latin America & Caribbean",
  },
  {
    code: "SEN",
    name: "Senegal",
    gdei: 30.71,
    p1: 16.24,
    p2: 49.03,
    p3: 22.77,
    p4: 38.78,
    p5: 66.6,
    p6: 61.45,
    p7: 0.21,
    p8: 0.0,
    p9: 0.0,
    rank: 134,
    region: "Sub-Saharan Africa",
  },
  {
    code: "SYR",
    name: "Syrian Arab Republic",
    gdei: 30.64,
    p1: 18.08,
    p2: 59.48,
    p3: 45.99,
    p4: 24.99,
    p5: 50.39,
    p6: 25.54,
    p7: 0,
    p8: 0.0,
    p9: 0.0,
    rank: 135,
    region: "Middle East & North Africa",
  },
  {
    code: "MWI",
    name: "Malawi",
    gdei: 30.42,
    p1: 12.76,
    p2: 32.2,
    p3: 39.53,
    p4: 30.53,
    p5: 79.99,
    p6: 71.36,
    p7: 0.1,
    p8: 0.0,
    p9: 0.0,
    rank: 136,
    region: "Sub-Saharan Africa",
  },
  {
    code: "CMR",
    name: "Cameroon",
    gdei: 30.22,
    p1: 11.11,
    p2: 42.85,
    p3: 53.67,
    p4: 34.58,
    p5: 64.88,
    p6: 50.5,
    p7: 0.38,
    p8: 0.0,
    p9: 0.0,
    rank: 137,
    region: "Sub-Saharan Africa",
  },
  {
    code: "GAB",
    name: "Gabon",
    gdei: 30.18,
    p1: 14.1,
    p2: 70.47,
    p3: 52.05,
    p4: 28.13,
    p5: 38.99,
    p6: 41.69,
    p7: 0.07,
    p8: 0.0,
    p9: 0.0,
    rank: 138,
    region: "Sub-Saharan Africa",
  },
  {
    code: "DMA",
    name: "Dominica",
    gdei: 30.16,
    p1: 16.6,
    p2: 68.85,
    p3: 52.16,
    p4: 35.21,
    p5: 20.7,
    p6: 47.71,
    p7: 0.02,
    p8: 0.0,
    p9: 0.0,
    rank: 139,
    region: "Latin America & Caribbean",
  },
  {
    code: "IRQ",
    name: "Iraq",
    gdei: 30.12,
    p1: 18.8,
    p2: 73.42,
    p3: 40.4,
    p4: 21.16,
    p5: 51.62,
    p6: 37.84,
    p7: 1.28,
    p8: 0.01,
    p9: 0.0,
    rank: 140,
    region: "Middle East & North Africa",
  },
  {
    code: "GMB",
    name: "Gambia, The",
    gdei: 29.99,
    p1: 10.26,
    p2: 45.68,
    p3: 71.98,
    p4: 9.86,
    p5: 60.74,
    p6: 53.52,
    p7: 0.0,
    p8: 0,
    p9: 0.0,
    rank: 141,
    region: "Sub-Saharan Africa",
  },
  {
    code: "MMR",
    name: "Myanmar",
    gdei: 29.95,
    p1: 14.23,
    p2: 45.56,
    p3: 46.42,
    p4: 28.38,
    p5: 72.92,
    p6: 47.52,
    p7: 0.37,
    p8: 0.0,
    p9: 0.0,
    rank: 142,
    region: "East Asia & Pacific",
  },
  {
    code: "SUR",
    name: "Suriname",
    gdei: 29.89,
    p1: 14.47,
    p2: 67.95,
    p3: 49.56,
    p4: 37.04,
    p5: 33.45,
    p6: 36.56,
    p7: 0.09,
    p8: 0.0,
    p9: 0.0,
    rank: 143,
    region: "Latin America & Caribbean",
  },
  {
    code: "GUY",
    name: "Guyana",
    gdei: 29.56,
    p1: 10.22,
    p2: 61.75,
    p3: 38.69,
    p4: 33.57,
    p5: 46.3,
    p6: 52.18,
    p7: 0.11,
    p8: 0.0,
    p9: 0.0,
    rank: 144,
    region: "Latin America & Caribbean",
  },
  {
    code: "LAO",
    name: "Lao PDR",
    gdei: 29.14,
    p1: 13.95,
    p2: 65.8,
    p3: 49.47,
    p4: 33.14,
    p5: 32.04,
    p6: 40.51,
    p7: 0.02,
    p8: 0.0,
    p9: 0.0,
    rank: 145,
    region: "East Asia & Pacific",
  },
  {
    code: "LBY",
    name: "Libya",
    gdei: 29.04,
    p1: 19.51,
    p2: 75.2,
    p3: 54.25,
    p4: 17.52,
    p5: 67.3,
    p6: 0.0,
    p7: 0.52,
    p8: 0.0,
    p9: 0.0,
    rank: 146,
    region: "Middle East & North Africa",
  },
  {
    code: "ZWE",
    name: "Zimbabwe",
    gdei: 28.76,
    p1: 9.77,
    p2: 39.19,
    p3: 58.32,
    p4: 38.41,
    p5: 38.67,
    p6: 59.47,
    p7: 0.07,
    p8: 0.0,
    p9: 0.0,
    rank: 147,
    region: "Sub-Saharan Africa",
  },
  {
    code: "BLZ",
    name: "Belize",
    gdei: 28.63,
    p1: 14.62,
    p2: 63.31,
    p3: 44.67,
    p4: 34.93,
    p5: 30.87,
    p6: 41.44,
    p7: 0.05,
    p8: 0.0,
    p9: 0.0,
    rank: 148,
    region: "Latin America & Caribbean",
  },
  {
    code: "TON",
    name: "Tonga",
    gdei: 28.62,
    p1: 19.39,
    p2: 54.48,
    p3: 73.06,
    p4: 32.7,
    p5: 31.85,
    p6: 21.45,
    p7: 0.01,
    p8: 0.0,
    p9: 0.0,
    rank: 149,
    region: "East Asia & Pacific",
  },
  {
    code: "KIR",
    name: "Kiribati",
    gdei: 28.6,
    p1: 12.43,
    p2: 78.34,
    p3: 19.38,
    p4: 26.33,
    p5: 54.73,
    p6: 36.28,
    p7: 0.0,
    p8: 0.0,
    p9: 0.0,
    rank: 150,
    region: "East Asia & Pacific",
  },
  {
    code: "BFA",
    name: "Burkina Faso",
    gdei: 27.96,
    p1: 10.63,
    p2: 27.08,
    p3: 21.8,
    p4: 36.05,
    p5: 69.53,
    p6: 63.49,
    p7: 0.14,
    p8: 0,
    p9: 0.0,
    rank: 151,
    region: "Sub-Saharan Africa",
  },
  {
    code: "PSE",
    name: "West Bank and Gaza",
    gdei: 27.8,
    p1: 0.47,
    p2: 69.96,
    p3: 41.38,
    p4: 35.23,
    p5: 36.16,
    p6: 28.0,
    p7: 0.07,
    p8: 0,
    p9: 0.0,
    rank: 152,
    region: "Middle East & North Africa",
  },
  {
    code: "ATG",
    name: "Antigua and Barbuda",
    gdei: 27.49,
    p1: 16.66,
    p2: 69.12,
    p3: 36.99,
    p4: 42.5,
    p5: 16.34,
    p6: 28.79,
    p7: 0.08,
    p8: 0.48,
    p9: 0.0,
    rank: 153,
    region: "Latin America & Caribbean",
  },
  {
    code: "WSM",
    name: "Samoa",
    gdei: 27.27,
    p1: 19.91,
    p2: 49.4,
    p3: 25.31,
    p4: 31.62,
    p5: 41.67,
    p6: 54.31,
    p7: 0.02,
    p8: 0.01,
    p9: 0.0,
    rank: 154,
    region: "East Asia & Pacific",
  },
  {
    code: "VCT",
    name: "St. Vincent and the Grenadines",
    gdei: 27.12,
    p1: 15.02,
    p2: 62.51,
    p3: 22.18,
    p4: 38.9,
    p5: 24.81,
    p6: 49.51,
    p7: 0.01,
    p8: 0.0,
    p9: 0.0,
    rank: 155,
    region: "Latin America & Caribbean",
  },
  {
    code: "ETH",
    name: "Ethiopia",
    gdei: 26.96,
    p1: 7.62,
    p2: 40.27,
    p3: 22.43,
    p4: 34.83,
    p5: 76.07,
    p6: 46.72,
    p7: 0.3,
    p8: 0.01,
    p9: 0.0,
    rank: 156,
    region: "Sub-Saharan Africa",
  },
  {
    code: "HND",
    name: "Honduras",
    gdei: 26.95,
    p1: 13.34,
    p2: 47.36,
    p3: 35.03,
    p4: 39.09,
    p5: 26.82,
    p6: 57.69,
    p7: 0.3,
    p8: 0.0,
    p9: 0.0,
    rank: 157,
    region: "Latin America & Caribbean",
  },
  {
    code: "AGO",
    name: "Angola",
    gdei: 26.64,
    p1: 13.5,
    p2: 46.76,
    p3: 33.07,
    p4: 36.16,
    p5: 38.38,
    p6: 49.72,
    p7: 0.57,
    p8: 0.0,
    p9: 0.0,
    rank: 158,
    region: "Sub-Saharan Africa",
  },
  {
    code: "TJK",
    name: "Tajikistan",
    gdei: 26.11,
    p1: 22.2,
    p2: 56.13,
    p3: 46.62,
    p4: 38.74,
    p5: 23.78,
    p6: 15.05,
    p7: 0.02,
    p8: 0.0,
    p9: 0.0,
    rank: 159,
    region: "Europe & Central Asia",
  },
  {
    code: "MRT",
    name: "Mauritania",
    gdei: 25.78,
    p1: 15.14,
    p2: 52.12,
    p3: 44.86,
    p4: 15.27,
    p5: 38.24,
    p6: 50.83,
    p7: 0.09,
    p8: 0.0,
    p9: 0.0,
    rank: 160,
    region: "Sub-Saharan Africa",
  },
  {
    code: "LSO",
    name: "Lesotho",
    gdei: 25.74,
    p1: 21.67,
    p2: 48.43,
    p3: 36.44,
    p4: 29.76,
    p5: 28.65,
    p6: 42.55,
    p7: 0.01,
    p8: 0.0,
    p9: 0.0,
    rank: 161,
    region: "Sub-Saharan Africa",
  },
  {
    code: "GIN",
    name: "Guinea",
    gdei: 25.28,
    p1: 11.81,
    p2: 48.12,
    p3: 16.72,
    p4: 27.31,
    p5: 55.62,
    p6: 49.52,
    p7: 0.09,
    p8: 0.0,
    p9: 0.0,
    rank: 162,
    region: "Sub-Saharan Africa",
  },
  {
    code: "NIC",
    name: "Nicaragua",
    gdei: 25.22,
    p1: 13.91,
    p2: 49.4,
    p3: 37.79,
    p4: 38.0,
    p5: 18.73,
    p6: 43.65,
    p7: 0.11,
    p8: 0.0,
    p9: 0.0,
    rank: 163,
    region: "Latin America & Caribbean",
  },
  {
    code: "PLW",
    name: "Palau",
    gdei: 25.18,
    p1: 0.01,
    p2: 73.26,
    p3: 73.46,
    p4: 26.18,
    p5: 0,
    p6: 3.96,
    p7: 0.0,
    p8: 0.0,
    p9: 0.0,
    rank: 164,
    region: "East Asia & Pacific",
  },
  {
    code: "TKM",
    name: "Turkmenistan",
    gdei: 24.79,
    p1: 16.79,
    p2: 57.43,
    p3: 52.88,
    p4: 20.83,
    p5: 23.93,
    p6: 3.7,
    p7: 0,
    p8: 0.0,
    p9: 0.0,
    rank: 165,
    region: "Europe & Central Asia",
  },
  {
    code: "PNG",
    name: "Papua New Guinea",
    gdei: 24.58,
    p1: 11.1,
    p2: 31.21,
    p3: 30.15,
    p4: 30.04,
    p5: 61.76,
    p6: 45.0,
    p7: 0.35,
    p8: 0.0,
    p9: 0.0,
    rank: 166,
    region: "East Asia & Pacific",
  },
  {
    code: "CUB",
    name: "Cuba",
    gdei: 23.56,
    p1: 9.21,
    p2: 35.07,
    p3: 35.79,
    p4: 29.08,
    p5: 72.34,
    p6: 17.26,
    p7: 0.16,
    p8: 0.0,
    p9: 0.0,
    rank: 167,
    region: "Latin America & Caribbean",
  },
  {
    code: "DJI",
    name: "Djibouti",
    gdei: 23.52,
    p1: 12.09,
    p2: 66.62,
    p3: 54.29,
    p4: 17.39,
    p5: 29.86,
    p6: 6.91,
    p7: 0.03,
    p8: 0.0,
    p9: 0.0,
    rank: 168,
    region: "Middle East & North Africa",
  },
  {
    code: "SLE",
    name: "Sierra Leone",
    gdei: 23.15,
    p1: 13.91,
    p2: 38.98,
    p3: 9.17,
    p4: 26.18,
    p5: 55.78,
    p6: 47.94,
    p7: 0.0,
    p8: 0.0,
    p9: 0.0,
    rank: 169,
    region: "Sub-Saharan Africa",
  },
  {
    code: "COD",
    name: "Congo, Dem. Rep.",
    gdei: 23.07,
    p1: 9.95,
    p2: 26.63,
    p3: 38.27,
    p4: 17.64,
    p5: 55.88,
    p6: 54.9,
    p7: 0.33,
    p8: 0.0,
    p9: 0.0,
    rank: 170,
    region: "Sub-Saharan Africa",
  },
  {
    code: "MDG",
    name: "Madagascar",
    gdei: 22.39,
    p1: 6.75,
    p2: 25.37,
    p3: 44.43,
    p4: 27.4,
    p5: 30.17,
    p6: 48.68,
    p7: 0.14,
    p8: 0,
    p9: 0.0,
    rank: 171,
    region: "Sub-Saharan Africa",
  },
  {
    code: "FSM",
    name: "Micronesia, Fed. Sts.",
    gdei: 21.87,
    p1: 14.18,
    p2: 42.56,
    p3: 51.59,
    p4: 16.13,
    p5: 6.08,
    p6: 40.82,
    p7: 0.0,
    p8: 0,
    p9: 0.0,
    rank: 172,
    region: "East Asia & Pacific",
  },
  {
    code: "MOZ",
    name: "Mozambique",
    gdei: 21.86,
    p1: 13.49,
    p2: 21.09,
    p3: 20.53,
    p4: 27.01,
    p5: 65.14,
    p6: 40.3,
    p7: 0.24,
    p8: 0.0,
    p9: 0.0,
    rank: 173,
    region: "Sub-Saharan Africa",
  },
  {
    code: "STP",
    name: "Sao Tome and Principe",
    gdei: 21.63,
    p1: 19.22,
    p2: 49.96,
    p3: 17.99,
    p4: 21.48,
    p5: 18.47,
    p6: 43.89,
    p7: 0.0,
    p8: 0.0,
    p9: 0.0,
    rank: 174,
    region: "Sub-Saharan Africa",
  },
  {
    code: "SDN",
    name: "Sudan",
    gdei: 21.31,
    p1: 10.85,
    p2: 32.71,
    p3: 27.59,
    p4: 11.95,
    p5: 47.01,
    p6: 55.18,
    p7: 0.05,
    p8: 0.0,
    p9: 0.0,
    rank: 175,
    region: "Sub-Saharan Africa",
  },
  {
    code: "LBR",
    name: "Liberia",
    gdei: 21.17,
    p1: 13.62,
    p2: 18.65,
    p3: 68.31,
    p4: 15.47,
    p5: 19.32,
    p6: 52.41,
    p7: 0.05,
    p8: 0.0,
    p9: 0.0,
    rank: 176,
    region: "Sub-Saharan Africa",
  },
  {
    code: "COG",
    name: "Congo, Rep.",
    gdei: 21.12,
    p1: 11.55,
    p2: 43.13,
    p3: 29.44,
    p4: 18.04,
    p5: 26.12,
    p6: 46.34,
    p7: 0.25,
    p8: 0.0,
    p9: 0.0,
    rank: 177,
    region: "Sub-Saharan Africa",
  },
  {
    code: "PRK",
    name: "Korea, Dem. People's Rep.",
    gdei: 20.5,
    p1: 1.04,
    p2: 66.67,
    p3: 53.04,
    p4: 3.06,
    p5: 4.81,
    p6: 0,
    p7: 0,
    p8: 0.0,
    p9: 0.0,
    rank: 178,
    region: "Other",
  },
  {
    code: "TCD",
    name: "Chad",
    gdei: 20.48,
    p1: 8.56,
    p2: 36.77,
    p3: 18.65,
    p4: 11.49,
    p5: 47.44,
    p6: 42.98,
    p7: 0.26,
    p8: 0,
    p9: 0.0,
    rank: 179,
    region: "Sub-Saharan Africa",
  },
  {
    code: "COM",
    name: "Comoros",
    gdei: 20.45,
    p1: 19.02,
    p2: 36.38,
    p3: 10.08,
    p4: 10.97,
    p5: 38.05,
    p6: 46.61,
    p7: 0.01,
    p8: 0,
    p9: 0.0,
    rank: 180,
    region: "Sub-Saharan Africa",
  },
  {
    code: "NRU",
    name: "Nauru",
    gdei: 20.33,
    p1: 15.79,
    p2: 63.65,
    p3: 14.45,
    p4: 17.82,
    p5: 19.72,
    p6: 13.04,
    p7: 0.0,
    p8: 0,
    p9: 0.0,
    rank: 181,
    region: "East Asia & Pacific",
  },
  {
    code: "GNQ",
    name: "Equatorial Guinea",
    gdei: 20.3,
    p1: 10.83,
    p2: 53.88,
    p3: 31.6,
    p4: 9.76,
    p5: 23.34,
    p6: 26.1,
    p7: 0.1,
    p8: 0,
    p9: 0.0,
    rank: 182,
    region: "Sub-Saharan Africa",
  },
  {
    code: "TLS",
    name: "Timor-Leste",
    gdei: 20.25,
    p1: 7.53,
    p2: 31.63,
    p3: 43.86,
    p4: 29.43,
    p5: 14.55,
    p6: 31.06,
    p7: 0.01,
    p8: 0,
    p9: 0.0,
    rank: 183,
    region: "East Asia & Pacific",
  },
  {
    code: "MHL",
    name: "Marshall Islands",
    gdei: 20.13,
    p1: 0.06,
    p2: 75.32,
    p3: 26.82,
    p4: 23.54,
    p5: 11.95,
    p6: 14.15,
    p7: 0.0,
    p8: 0.0,
    p9: 0.0,
    rank: 184,
    region: "East Asia & Pacific",
  },
  {
    code: "MLI",
    name: "Mali",
    gdei: 19.2,
    p1: 13.18,
    p2: 35.38,
    p3: 0.0,
    p4: 27.26,
    p5: 27.87,
    p6: 50.24,
    p7: 0.11,
    p8: 0.0,
    p9: 0.0,
    rank: 185,
    region: "Sub-Saharan Africa",
  },
  {
    code: "SOM",
    name: "Somalia",
    gdei: 18.31,
    p1: 10.44,
    p2: 39.92,
    p3: 0.0,
    p4: 15.13,
    p5: 35.45,
    p6: 31.06,
    p7: 0,
    p8: 0.01,
    p9: 0.0,
    rank: 186,
    region: "Sub-Saharan Africa",
  },
  {
    code: "NER",
    name: "Niger",
    gdei: 18.07,
    p1: 9.27,
    p2: 26.3,
    p3: 17.58,
    p4: 14.35,
    p5: 40.76,
    p6: 47.42,
    p7: 0.06,
    p8: 0.0,
    p9: 0.0,
    rank: 187,
    region: "Sub-Saharan Africa",
  },
  {
    code: "SLB",
    name: "Solomon Islands",
    gdei: 17.47,
    p1: 5.86,
    p2: 29.12,
    p3: 11.19,
    p4: 31.12,
    p5: 15.38,
    p6: 40.21,
    p7: 0.02,
    p8: 0,
    p9: 0.0,
    rank: 188,
    region: "East Asia & Pacific",
  },
  {
    code: "TUV",
    name: "Tuvalu",
    gdei: 16.08,
    p1: 6.24,
    p2: 57.31,
    p3: 16.09,
    p4: 15.45,
    p5: 18.2,
    p6: 0.0,
    p7: 0.0,
    p8: 0,
    p9: 0.0,
    rank: 189,
    region: "East Asia & Pacific",
  },
  {
    code: "AFG",
    name: "Afghanistan",
    gdei: 15.56,
    p1: 9.31,
    p2: 28.19,
    p3: 23.49,
    p4: 14.62,
    p5: 16.38,
    p6: 37.5,
    p7: 0.08,
    p8: 0.0,
    p9: 0.0,
    rank: 190,
    region: "South Asia",
  },
  {
    code: "GNB",
    name: "Guinea-Bissau",
    gdei: 15.33,
    p1: 7.15,
    p2: 40.64,
    p3: 19.05,
    p4: 12.44,
    p5: 5.15,
    p6: 31.06,
    p7: 0.01,
    p8: 0,
    p9: 0.0,
    rank: 191,
    region: "Sub-Saharan Africa",
  },
  {
    code: "HTI",
    name: "Haiti",
    gdei: 15.15,
    p1: 6.36,
    p2: 32.49,
    p3: 16.68,
    p4: 8.86,
    p5: 22.17,
    p6: 41.03,
    p7: 0.03,
    p8: 0.0,
    p9: 0.0,
    rank: 192,
    region: "Latin America & Caribbean",
  },
  {
    code: "BDI",
    name: "Burundi",
    gdei: 14.93,
    p1: 4.76,
    p2: 5.41,
    p3: 39.38,
    p4: 24.79,
    p5: 14.77,
    p6: 35.19,
    p7: 0.02,
    p8: 0,
    p9: 0.0,
    rank: 193,
    region: "Sub-Saharan Africa",
  },
  {
    code: "ERI",
    name: "Eritrea",
    gdei: 11.53,
    p1: 0.18,
    p2: 47.39,
    p3: 31.66,
    p4: 0.0,
    p5: 0.0,
    p6: 0.77,
    p7: 0,
    p8: 0.0,
    p9: 0.0,
    rank: 194,
    region: "Sub-Saharan Africa",
  },
  {
    code: "YEM",
    name: "Yemen, Rep.",
    gdei: 11.07,
    p1: 11.3,
    p2: 36.29,
    p3: 14.07,
    p4: 10.82,
    p5: 4.99,
    p6: 3.88,
    p7: 0.15,
    p8: 0.0,
    p9: 0.0,
    rank: 195,
    region: "Middle East & North Africa",
  },
  {
    code: "SSD",
    name: "South Sudan",
    gdei: 11.06,
    p1: 2.56,
    p2: 22.15,
    p3: 0.0,
    p4: 4.45,
    p5: 32.84,
    p6: 28.32,
    p7: 0.13,
    p8: 0,
    p9: 0.0,
    rank: 196,
    region: "Sub-Saharan Africa",
  },
  {
    code: "CAF",
    name: "Central African Republic",
    gdei: 4.74,
    p1: 0.04,
    p2: 1.2,
    p3: 2.35,
    p4: 4.58,
    p5: 2.74,
    p6: 33.57,
    p7: 0.02,
    p8: 0.0,
    p9: 0.0,
    rank: 197,
    region: "Sub-Saharan Africa",
  },
];
const OIC_DATA = [
  {
    rank: 1,
    name: "Malaysia",
    idei: 82.65,
    p1: 74.58,
    p2: 89.44,
    p3: 83.49,
    p4: 80.1,
    p5: 90.22,
    i1_1: 90.12,
    i1_2: 54.74,
    i1_3: 0,
    i1_4: 78.89,
    i2_1: 98.35,
    i2_2: 80.53,
    i3_1: 100.0,
    i3_2: 66.98,
    i4_1: 0,
    i4_2: 58.79,
    i4_3: 70.7,
    i4_4: 95.15,
    i4_5: 95.77,
    i5_1: 85.01,
    i5_2: 95.42,
    region: "Southeast Asia",
  },
  {
    rank: 2,
    name: "Turkiye",
    idei: 79.25,
    p1: 49.44,
    p2: 93.55,
    p3: 94.43,
    p4: 78.91,
    p5: 94.84,
    i1_1: 74.85,
    i1_2: 47.36,
    i1_3: 7.45,
    i1_4: 68.08,
    i2_1: 100.0,
    i2_2: 87.09,
    i3_1: 100.0,
    i3_2: 88.85,
    i4_1: 87.13,
    i4_2: 0,
    i4_3: 90.07,
    i4_4: 100.0,
    i4_5: 38.45,
    i5_1: 94.77,
    i5_2: 94.9,
    region: "Europe",
  },
  {
    rank: 3,
    name: "Indonesia",
    idei: 69.06,
    p1: 53.33,
    p2: 89.71,
    p3: 100.0,
    p4: 47.87,
    p5: 76.5,
    i1_1: 54.14,
    i1_2: 46.21,
    i1_3: 0,
    i1_4: 59.64,
    i2_1: 100.0,
    i2_2: 79.42,
    i3_1: 100.0,
    i3_2: 100.0,
    i4_1: 92.33,
    i4_2: 47.23,
    i4_3: 72.43,
    i4_4: 1.63,
    i4_5: 25.74,
    i5_1: 83.65,
    i5_2: 69.34,
    region: "Southeast Asia",
  },
  {
    rank: 4,
    name: "Saudi Arabia",
    idei: 68.87,
    p1: 46.35,
    p2: 94.7,
    p3: 52.36,
    p4: 61.55,
    p5: 99.17,
    i1_1: 36.35,
    i1_2: 47.63,
    i1_3: 21.73,
    i1_4: 79.68,
    i2_1: 100.0,
    i2_2: 89.4,
    i3_1: 46.12,
    i3_2: 58.6,
    i4_1: 0,
    i4_2: 48.2,
    i4_3: 99.9,
    i4_4: 93.81,
    i4_5: 4.27,
    i5_1: 99.83,
    i5_2: 98.51,
    region: "GCC",
  },
  {
    rank: 5,
    name: "United Arab Emirates",
    idei: 65.84,
    p1: 49.96,
    p2: 93.87,
    p3: 49.57,
    p4: 49.47,
    p5: 97.35,
    i1_1: 67.8,
    i1_2: 0,
    i1_3: 0.17,
    i1_4: 81.91,
    i2_1: 100.0,
    i2_2: 87.74,
    i3_1: 33.98,
    i3_2: 65.15,
    i4_1: 48.13,
    i4_2: 29.43,
    i4_3: 94.75,
    i4_4: 36.98,
    i4_5: 38.04,
    i5_1: 99.95,
    i5_2: 94.74,
    region: "GCC",
  },
  {
    rank: 6,
    name: "Bahrain",
    idei: 53.77,
    p1: 42.49,
    p2: 87.74,
    p3: 25.48,
    p4: 35.91,
    p5: 85.95,
    i1_1: 38.18,
    i1_2: 56.44,
    i1_3: 9.86,
    i1_4: 65.46,
    i2_1: 97.48,
    i2_2: 77.99,
    i3_1: 16.99,
    i3_2: 33.96,
    i4_1: 0,
    i4_2: 48.02,
    i4_3: 91.23,
    i4_4: 1.67,
    i4_5: 2.7,
    i5_1: 99.14,
    i5_2: 72.75,
    region: "GCC",
  },
  {
    rank: 7,
    name: "Qatar",
    idei: 53.16,
    p1: 39.89,
    p2: 91.29,
    p3: 12.68,
    p4: 46.45,
    p5: 79.88,
    i1_1: 47.82,
    i1_2: 0,
    i1_3: 9.08,
    i1_4: 62.76,
    i2_1: 100.0,
    i2_2: 82.58,
    i3_1: 12.14,
    i3_2: 13.21,
    i4_1: 0,
    i4_2: 74.49,
    i4_3: 100.0,
    i4_4: 8.56,
    i4_5: 2.73,
    i5_1: 86.5,
    i5_2: 73.25,
    region: "GCC",
  },
  {
    rank: 8,
    name: "Egypt",
    idei: 51.86,
    p1: 38.83,
    p2: 88.34,
    p3: 17.42,
    p4: 42.52,
    p5: 78.27,
    i1_1: 40.52,
    i1_2: 43.68,
    i1_3: 6.01,
    i1_4: 65.11,
    i2_1: 100.0,
    i2_2: 76.68,
    i3_1: 12.14,
    i3_2: 22.7,
    i4_1: 59.1,
    i4_2: 37.76,
    i4_3: 74.25,
    i4_4: 4.61,
    i4_5: 36.9,
    i5_1: 66.7,
    i5_2: 89.84,
    region: "North Africa",
  },
  {
    rank: 10,
    name: "Nigeria",
    idei: 50.62,
    p1: 35.59,
    p2: 72.55,
    p3: 59.4,
    p4: 34.06,
    p5: 67.09,
    i1_1: 12.75,
    i1_2: 49.62,
    i1_3: 0,
    i1_4: 44.4,
    i2_1: 79.05,
    i2_2: 66.05,
    i3_1: 41.26,
    i3_2: 77.53,
    i4_1: 47.06,
    i4_2: 42.38,
    i4_3: 45.28,
    i4_4: 1.53,
    i4_5: 0,
    i5_1: 41.81,
    i5_2: 92.37,
    region: "Africa",
  },
  {
    rank: 9,
    name: "Oman",
    idei: 50.99,
    p1: 41.64,
    p2: 88.61,
    p3: 9.71,
    p4: 32.39,
    p5: 88.69,
    i1_1: 9.13,
    i1_2: 0,
    i1_3: 54.09,
    i1_4: 61.7,
    i2_1: 96.77,
    i2_2: 80.44,
    i3_1: 9.71,
    i3_2: 0,
    i4_1: 0,
    i4_2: 34.72,
    i4_3: 76.9,
    i4_4: 8.64,
    i4_5: 9.28,
    i5_1: 91.36,
    i5_2: 86.01,
    region: "GCC",
  },
  {
    rank: 11,
    name: "Azerbaijan",
    idei: 50.41,
    p1: 40.05,
    p2: 84.66,
    p3: 14.56,
    p4: 47.64,
    p5: 68.01,
    i1_1: 2.43,
    i1_2: 52.24,
    i1_3: 0,
    i1_4: 65.49,
    i2_1: 94.12,
    i2_2: 75.19,
    i3_1: 14.56,
    i3_2: 0,
    i4_1: 0,
    i4_2: 46.31,
    i4_3: 82.08,
    i4_4: 0.09,
    i4_5: 62.08,
    i5_1: 78.71,
    i5_2: 57.3,
    region: "Central Asia",
  },
  {
    rank: 12,
    name: "Pakistan",
    idei: 50.08,
    p1: 34.73,
    p2: 76.36,
    p3: 42.66,
    p4: 39.35,
    p5: 68.55,
    i1_1: 18.55,
    i1_2: 40.44,
    i1_3: 0,
    i1_4: 45.19,
    i2_1: 92.62,
    i2_2: 60.1,
    i3_1: 43.69,
    i3_2: 41.62,
    i4_1: 68.92,
    i4_2: 26.86,
    i4_3: 60.36,
    i4_4: 1.24,
    i4_5: 0,
    i5_1: 45.2,
    i5_2: 91.89,
    region: "South Asia",
  },
  {
    rank: 13,
    name: "Bangladesh",
    idei: 49.89,
    p1: 24.84,
    p2: 89.38,
    p3: 71.54,
    p4: 28.85,
    p5: 61.64,
    i1_1: 10.56,
    i1_2: 40.81,
    i1_3: 0.0,
    i1_4: 47.98,
    i2_1: 97.29,
    i2_2: 81.47,
    i3_1: 82.52,
    i3_2: 60.55,
    i4_1: 50.42,
    i4_2: 33.92,
    i4_3: 46.8,
    i4_4: 1.55,
    i4_5: 11.56,
    i5_1: 64.96,
    i5_2: 58.32,
    region: "South Asia",
  },
  {
    rank: 14,
    name: "Albania",
    idei: 49.54,
    p1: 26.82,
    p2: 80.83,
    p3: 29.66,
    p4: 36.77,
    p5: 85.35,
    i1_1: 4.74,
    i1_2: 50.62,
    i1_3: 0.0,
    i1_4: 51.9,
    i2_1: 82.99,
    i2_2: 78.66,
    i3_1: 12.14,
    i3_2: 47.17,
    i4_1: 2.48,
    i4_2: 35.34,
    i4_3: 74.55,
    i4_4: 1.1,
    i4_5: 70.39,
    i5_1: 84.19,
    i5_2: 86.51,
    region: "Europe",
  },
  {
    rank: 15,
    name: "Kazakhstan",
    idei: 48.99,
    p1: 34.9,
    p2: 87.33,
    p3: 18.37,
    p4: 41.18,
    p5: 70.56,
    i1_1: 14.81,
    i1_2: 52.62,
    i1_3: 8.33,
    i1_4: 63.83,
    i2_1: 92.52,
    i2_2: 82.14,
    i3_1: 12.14,
    i3_2: 24.59,
    i4_1: 0,
    i4_2: 62.09,
    i4_3: 99.06,
    i4_4: 0.45,
    i4_5: 3.1,
    i5_1: 96.54,
    i5_2: 44.58,
    region: "Central Asia",
  },
  {
    rank: 16,
    name: "Iran",
    idei: 48.23,
    p1: 33.84,
    p2: 66.57,
    p3: 23.24,
    p4: 51.12,
    p5: 67.57,
    i1_1: 7.61,
    i1_2: 0,
    i1_3: 0,
    i1_4: 60.06,
    i2_1: 61.39,
    i2_2: 71.75,
    i3_1: 4.85,
    i3_2: 41.62,
    i4_1: 49.6,
    i4_2: 49.19,
    i4_3: 92.88,
    i4_4: 16.7,
    i4_5: 47.24,
    i5_1: 64.94,
    i5_2: 70.19,
    region: "Other",
  },
  {
    rank: 17,
    name: "Uzbekistan",
    idei: 47.7,
    p1: 32.18,
    p2: 84.23,
    p3: 32.81,
    p4: 38.05,
    p5: 62.95,
    i1_1: 4.08,
    i1_2: 49.35,
    i1_3: 8.39,
    i1_4: 66.9,
    i2_1: 89.84,
    i2_2: 78.62,
    i3_1: 14.56,
    i3_2: 51.06,
    i4_1: 0,
    i4_2: 46.75,
    i4_3: 72.49,
    i4_4: 0.0,
    i4_5: 32.94,
    i5_1: 83.85,
    i5_2: 42.05,
    region: "Central Asia",
  },
  {
    rank: 18,
    name: "Tunisia",
    idei: 47.42,
    p1: 44.41,
    p2: 75.52,
    p3: 17.28,
    p4: 36.12,
    p5: 66.82,
    i1_1: 65.15,
    i1_2: 47.86,
    i1_3: 4.73,
    i1_4: 59.9,
    i2_1: 78.03,
    i2_2: 73.0,
    i3_1: 2.43,
    i3_2: 32.13,
    i4_1: 10.72,
    i4_2: 36.49,
    i4_3: 79.6,
    i4_4: 4.43,
    i4_5: 49.38,
    i5_1: 69.69,
    i5_2: 63.94,
    region: "North Africa",
  },
  {
    rank: 19,
    name: "Kuwait",
    idei: 47.27,
    p1: 38.78,
    p2: 59.84,
    p3: 15.64,
    p4: 45.18,
    p5: 74.78,
    i1_1: 35.2,
    i1_2: 47.14,
    i1_3: 9.34,
    i1_4: 63.45,
    i2_1: 55.88,
    i2_2: 63.79,
    i3_1: 4.85,
    i3_2: 26.42,
    i4_1: 0,
    i4_2: 41.78,
    i4_3: 93.13,
    i4_4: 0.62,
    i4_5: 0,
    i5_1: 80.8,
    i5_2: 68.76,
    region: "GCC",
  },
  {
    rank: 20,
    name: "Morocco",
    idei: 45.04,
    p1: 35.04,
    p2: 81.33,
    p3: 3.64,
    p4: 37.55,
    p5: 70.74,
    i1_1: 30.57,
    i1_2: 41.2,
    i1_3: 3.29,
    i1_4: 65.1,
    i2_1: 97.49,
    i2_2: 65.16,
    i3_1: 7.28,
    i3_2: 0.0,
    i4_1: 0,
    i4_2: 38.24,
    i4_3: 66.32,
    i4_4: 12.9,
    i4_5: 32.75,
    i5_1: 68.25,
    i5_2: 73.22,
    region: "North Africa",
  },
  {
    rank: 21,
    name: "Brunei Darussalam",
    idei: 44.93,
    p1: 40.3,
    p2: 64.89,
    p3: 7.28,
    p4: 36.8,
    p5: 74.16,
    i1_1: 9.14,
    i1_2: 53.76,
    i1_3: 40.14,
    i1_4: 58.14,
    i2_1: 65.57,
    i2_2: 64.2,
    i3_1: 7.28,
    i3_2: 0,
    i4_1: 0.37,
    i4_2: 0,
    i4_3: 100.0,
    i4_4: 0.0,
    i4_5: 46.84,
    i5_1: 77.7,
    i5_2: 70.61,
    region: "Southeast Asia",
  },
  {
    rank: 22,
    name: "Jordan",
    idei: 43.78,
    p1: 26.35,
    p2: 90.46,
    p3: 5.53,
    p4: 33.19,
    p5: 72.46,
    i1_1: 2.29,
    i1_2: 52.34,
    i1_3: 6.58,
    i1_4: 44.19,
    i2_1: 99.13,
    i2_2: 81.79,
    i3_1: 7.28,
    i3_2: 3.77,
    i4_1: 5.35,
    i4_2: 40.69,
    i4_3: 69.23,
    i4_4: 0.34,
    i4_5: 50.32,
    i5_1: 68.82,
    i5_2: 76.09,
    region: "Middle East",
  },
  {
    rank: 23,
    name: "Uganda",
    idei: 41.1,
    p1: 32.47,
    p2: 80.25,
    p3: 23.86,
    p4: 23.35,
    p5: 57.63,
    i1_1: 2.89,
    i1_2: 52.89,
    i1_3: 0,
    i1_4: 41.62,
    i2_1: 80.68,
    i2_2: 79.81,
    i3_1: 2.43,
    i3_2: 45.28,
    i4_1: 11.13,
    i4_2: 51.33,
    i4_3: 49.7,
    i4_4: 0.0,
    i4_5: 4.6,
    i5_1: 37.89,
    i5_2: 77.37,
    region: "Africa",
  },
  {
    rank: 24,
    name: "Kyrgyzstan",
    idei: 39.53,
    p1: 27.11,
    p2: 62.4,
    p3: 13.24,
    p4: 33.31,
    p5: 65.39,
    i1_1: 0.76,
    i1_2: 50.14,
    i1_3: 3.66,
    i1_4: 53.88,
    i2_1: 58.04,
    i2_2: 66.76,
    i3_1: 0.0,
    i3_2: 26.47,
    i4_1: 7.04,
    i4_2: 56.36,
    i4_3: 78.35,
    i4_4: 0.63,
    i4_5: 24.16,
    i5_1: 74.78,
    i5_2: 56.0,
    region: "Other",
  },
  {
    rank: 25,
    name: "Maldives",
    idei: 37.75,
    p1: 51.39,
    p2: 30.4,
    p3: 0.95,
    p4: 39.01,
    p5: 52.24,
    i1_1: 1.29,
    i1_2: 0,
    i1_3: 100.0,
    i1_4: 52.87,
    i2_1: 9.55,
    i2_2: 51.25,
    i3_1: 0.0,
    i3_2: 1.89,
    i4_1: 0.0,
    i4_2: 40.02,
    i4_3: 96.69,
    i4_4: 0,
    i4_5: 19.31,
    i5_1: 67.16,
    i5_2: 37.32,
    region: "South Asia",
  },
  {
    rank: 26,
    name: "Benin",
    idei: 36.75,
    p1: 23.96,
    p2: 82.54,
    p3: 1.89,
    p4: 29.57,
    p5: 53.5,
    i1_1: 0.38,
    i1_2: 49.08,
    i1_3: 5.1,
    i1_4: 41.26,
    i2_1: 91.6,
    i2_2: 73.48,
    i3_1: 0.0,
    i3_2: 3.77,
    i4_1: 7.27,
    i4_2: 38.92,
    i4_3: 51.29,
    i4_4: 2.08,
    i4_5: 48.28,
    i5_1: 38.55,
    i5_2: 68.45,
    region: "Africa",
  },
  {
    rank: 27,
    name: "Gabon",
    idei: 36.16,
    p1: 33.46,
    p2: 30.07,
    p3: 7.28,
    p4: 50.31,
    p5: 48.08,
    i1_1: 0.5,
    i1_2: 50.48,
    i1_3: 0,
    i1_4: 49.39,
    i2_1: 33.78,
    i2_2: 26.36,
    i3_1: 7.28,
    i3_2: 0,
    i4_1: 0,
    i4_2: 46.78,
    i4_3: 53.83,
    i4_4: 0,
    i4_5: 0,
    i5_1: 53.93,
    i5_2: 42.23,
    region: "Africa",
  },
  {
    rank: 28,
    name: "Cote d'Ivoire",
    idei: 36.05,
    p1: 23.86,
    p2: 64.18,
    p3: 6.74,
    p4: 31.91,
    p5: 57.35,
    i1_1: 2.7,
    i1_2: 45.36,
    i1_3: 1.16,
    i1_4: 46.22,
    i2_1: 73.93,
    i2_2: 54.42,
    i3_1: 9.71,
    i3_2: 3.77,
    i4_1: 38.49,
    i4_2: 0,
    i4_3: 57.25,
    i4_4: 0.0,
    i4_5: 0,
    i5_1: 51.81,
    i5_2: 62.88,
    region: "Africa",
  },
  {
    rank: 29,
    name: "Senegal",
    idei: 34.03,
    p1: 26.71,
    p2: 55.48,
    p3: 1.89,
    p4: 30.92,
    p5: 55.1,
    i1_1: 2.46,
    i1_2: 47.59,
    i1_3: 1.75,
    i1_4: 55.03,
    i2_1: 66.2,
    i2_2: 44.75,
    i3_1: 0.0,
    i3_2: 3.77,
    i4_1: 9.8,
    i4_2: 58.94,
    i4_3: 53.62,
    i4_4: 1.32,
    i4_5: 0,
    i5_1: 45.67,
    i5_2: 64.53,
    region: "Africa",
  },
  {
    rank: 30,
    name: "Lebanon",
    idei: 33.52,
    p1: 34.97,
    p2: 36.58,
    p3: 24.15,
    p4: 35.48,
    p5: 34.0,
    i1_1: 10.93,
    i1_2: 45.49,
    i1_3: 0,
    i1_4: 48.49,
    i2_1: 25.66,
    i2_2: 47.5,
    i3_1: 4.85,
    i3_2: 43.45,
    i4_1: 3.53,
    i4_2: 36.71,
    i4_3: 48.78,
    i4_4: 1.13,
    i4_5: 87.24,
    i5_1: 50.27,
    i5_2: 17.73,
    region: "Middle East",
  },
  {
    rank: 31,
    name: "Cameroon",
    idei: 32.65,
    p1: 22.84,
    p2: 55.1,
    p3: 25.26,
    p4: 24.8,
    p5: 43.41,
    i1_1: 5.03,
    i1_2: 50.7,
    i1_3: 1.55,
    i1_4: 34.08,
    i2_1: 63.03,
    i2_2: 47.17,
    i3_1: 14.56,
    i3_2: 35.96,
    i4_1: 0,
    i4_2: 45.6,
    i4_3: 44.72,
    i4_4: 6.2,
    i4_5: 2.67,
    i5_1: 35.55,
    i5_2: 51.26,
    region: "Africa",
  },
  {
    rank: 32,
    name: "Burkina Faso",
    idei: 32.45,
    p1: 21.28,
    p2: 65.42,
    p3: 14.72,
    p4: 26.95,
    p5: 41.87,
    i1_1: 1.34,
    i1_2: 44.37,
    i1_3: 8.42,
    i1_4: 31.0,
    i2_1: 68.09,
    i2_2: 62.75,
    i3_1: 4.85,
    i3_2: 24.59,
    i4_1: 4.29,
    i4_2: 41.33,
    i4_3: 29.54,
    i4_4: 0,
    i4_5: 32.62,
    i5_1: 16.11,
    i5_2: 67.63,
    region: "Africa",
  },
  {
    rank: 33,
    name: "Togo",
    idei: 32.25,
    p1: 22.6,
    p2: 71.83,
    p3: 1.89,
    p4: 26.73,
    p5: 44.3,
    i1_1: 0.85,
    i1_2: 52.19,
    i1_3: 2.16,
    i1_4: 35.19,
    i2_1: 84.99,
    i2_2: 58.66,
    i3_1: 0.0,
    i3_2: 3.77,
    i4_1: 7.46,
    i4_2: 46.27,
    i4_3: 53.19,
    i4_4: 0.0,
    i4_5: 0,
    i5_1: 30.73,
    i5_2: 57.87,
    region: "Africa",
  },
  {
    rank: 34,
    name: "Gambia",
    idei: 31.02,
    p1: 21.17,
    p2: 45.44,
    p3: 0.0,
    p4: 48.81,
    p5: 33.56,
    i1_1: 0.0,
    i1_2: 47.77,
    i1_3: 0.8,
    i1_4: 36.11,
    i2_1: 54.69,
    i2_2: 36.19,
    i3_1: 0.0,
    i3_2: 0,
    i4_1: 1.55,
    i4_2: 34.47,
    i4_3: 59.21,
    i4_4: 0,
    i4_5: 100.0,
    i5_1: 12.78,
    i5_2: 54.34,
    region: "Africa",
  },
  {
    rank: 35,
    name: "Iraq",
    idei: 29.4,
    p1: 19.79,
    p2: 35.99,
    p3: 21.57,
    p4: 31.08,
    p5: 40.25,
    i1_1: 11.33,
    i1_2: 42.47,
    i1_3: 5.57,
    i1_4: 0,
    i2_1: 44.98,
    i2_2: 26.99,
    i3_1: 7.28,
    i3_2: 35.85,
    i4_1: 11.05,
    i4_2: 40.04,
    i4_3: 62.75,
    i4_4: 1.0,
    i4_5: 40.54,
    i5_1: 38.65,
    i5_2: 41.85,
    region: "Middle East",
  },
  {
    rank: 38,
    name: "Guinea",
    idei: 26.69,
    p1: 29.31,
    p2: 39.22,
    p3: 0.0,
    p4: 21.81,
    p5: 40.14,
    i1_1: 0.65,
    i1_2: 50.89,
    i1_3: 0,
    i1_4: 36.39,
    i2_1: 53.17,
    i2_2: 25.27,
    i3_1: 0.0,
    i3_2: 0,
    i4_1: 0,
    i4_2: 33.87,
    i4_3: 9.74,
    i4_4: 0,
    i4_5: 0,
    i5_1: 30.89,
    i5_2: 49.38,
    region: "Africa",
  },
  {
    rank: 36,
    name: "Suriname",
    idei: 27.39,
    p1: 28.71,
    p2: 29.26,
    p3: 1.22,
    p4: 22.59,
    p5: 49.97,
    i1_1: 0.71,
    i1_2: 48.03,
    i1_3: 9.48,
    i1_4: 56.63,
    i2_1: 29.45,
    i2_2: 29.07,
    i3_1: 2.43,
    i3_2: 0.0,
    i4_1: 2.78,
    i4_2: 0,
    i4_3: 64.98,
    i4_4: 0.0,
    i4_5: 0,
    i5_1: 61.9,
    i5_2: 38.03,
    region: "Americas",
  },
  {
    rank: 37,
    name: "Djibouti",
    idei: 26.9,
    p1: 28.71,
    p2: 31.06,
    p3: 16.85,
    p4: 41.32,
    p5: 11.03,
    i1_1: 0.35,
    i1_2: 51.88,
    i1_3: 0,
    i1_4: 33.91,
    i2_1: 23.66,
    i2_2: 38.46,
    i3_1: 7.28,
    i3_2: 26.42,
    i4_1: 0,
    i4_2: 7.91,
    i4_3: 62.53,
    i4_4: 0.0,
    i4_5: 94.84,
    i5_1: 16.7,
    i5_2: 5.36,
    region: "Africa",
  },
  {
    rank: 39,
    name: "Mozambique",
    idei: 25.39,
    p1: 19.19,
    p2: 55.74,
    p3: 17.66,
    p4: 14.19,
    p5: 30.15,
    i1_1: 1.76,
    i1_2: 48.16,
    i1_3: 0.1,
    i1_4: 26.75,
    i2_1: 62.14,
    i2_2: 49.34,
    i3_1: 14.56,
    i3_2: 20.75,
    i4_1: 6.0,
    i4_2: 38.05,
    i4_3: 13.91,
    i4_4: 0.0,
    i4_5: 12.97,
    i5_1: 19.47,
    i5_2: 40.82,
    region: "Africa",
  },
  {
    rank: 40,
    name: "Afghanistan",
    idei: 24.13,
    p1: 26.96,
    p2: 28.76,
    p3: 30.19,
    p4: 16.23,
    p5: 22.47,
    i1_1: 1.4,
    i1_2: 49.48,
    i1_3: 0,
    i1_4: 30.0,
    i2_1: 10.8,
    i2_2: 46.72,
    i3_1: 0,
    i3_2: 30.19,
    i4_1: 1.89,
    i4_2: 13.66,
    i4_3: 19.8,
    i4_4: 4.47,
    i4_5: 41.35,
    i5_1: 6.21,
    i5_2: 38.73,
    region: "Central Asia",
  },
  {
    rank: 41,
    name: "Sierra Leone",
    idei: 23.94,
    p1: 20.46,
    p2: 46.92,
    p3: 2.43,
    p4: 17.72,
    p5: 34.94,
    i1_1: 0.0,
    i1_2: 49.89,
    i1_3: 0.36,
    i1_4: 31.59,
    i2_1: 53.7,
    i2_2: 40.14,
    i3_1: 2.43,
    i3_2: 0,
    i4_1: 3.85,
    i4_2: 40.5,
    i4_3: 37.4,
    i4_4: 0.0,
    i4_5: 6.85,
    i5_1: 18.55,
    i5_2: 51.33,
    region: "Africa",
  },
  {
    rank: 45,
    name: "Somalia",
    idei: 22.92,
    p1: 49.02,
    p2: 33.86,
    p3: 3.1,
    p4: 5.09,
    p5: 19.25,
    i1_1: 0,
    i1_2: 50.81,
    i1_3: 69.24,
    i1_4: 27.0,
    i2_1: 31.18,
    i2_2: 36.53,
    i3_1: 2.43,
    i3_2: 3.77,
    i4_1: 5.96,
    i4_2: 0,
    i4_3: 0.0,
    i4_4: 9.32,
    i4_5: 0,
    i5_1: 5.57,
    i5_2: 32.93,
    region: "Africa",
  },
  {
    rank: 43,
    name: "Chad",
    idei: 23.55,
    p1: 22.85,
    p2: 37.95,
    p3: 11.32,
    p4: 22.66,
    p5: 23.92,
    i1_1: 2.01,
    i1_2: 41.73,
    i1_3: 0,
    i1_4: 24.8,
    i2_1: 46.01,
    i2_2: 29.89,
    i3_1: 0.0,
    i3_2: 22.64,
    i4_1: 0.17,
    i4_2: 27.16,
    i4_3: 26.03,
    i4_4: 0,
    i4_5: 37.28,
    i5_1: 4.64,
    i5_2: 43.19,
    region: "Africa",
  },
  {
    rank: 42,
    name: "Mali",
    idei: 23.92,
    p1: 20.95,
    p2: 35.36,
    p3: 1.22,
    p4: 24.12,
    p5: 35.81,
    i1_1: 1.18,
    i1_2: 43.55,
    i1_3: 0.79,
    i1_4: 38.29,
    i2_1: 21.53,
    i2_2: 49.18,
    i3_1: 2.43,
    i3_2: 0.0,
    i4_1: 4.21,
    i4_2: 39.9,
    i4_3: 52.36,
    i4_4: 0.0,
    i4_5: 0,
    i5_1: 18.58,
    i5_2: 53.03,
    region: "Africa",
  },
  {
    rank: 44,
    name: "Sudan",
    idei: 23.13,
    p1: 25.76,
    p2: 34.04,
    p3: 5.26,
    p4: 14.42,
    p5: 35.96,
    i1_1: 0.28,
    i1_2: 49.74,
    i1_3: 0,
    i1_4: 27.27,
    i2_1: 37.54,
    i2_2: 30.54,
    i3_1: 4.85,
    i3_2: 5.66,
    i4_1: 7.96,
    i4_2: 16.89,
    i4_3: 46.02,
    i4_4: 0.41,
    i4_5: 0.84,
    i5_1: 14.58,
    i5_2: 57.33,
    region: "North Africa",
  },
  {
    rank: 46,
    name: "Yemen",
    idei: 11.88,
    p1: 22.37,
    p2: 18.85,
    p3: 0.0,
    p4: 8.27,
    p5: 6.97,
    i1_1: 1.3,
    i1_2: 36.73,
    i1_3: 0,
    i1_4: 29.09,
    i2_1: 1.41,
    i2_2: 36.29,
    i3_1: 0.0,
    i3_2: 0,
    i4_1: 0,
    i4_2: 15.83,
    i4_3: 7.86,
    i4_4: 1.11,
    i4_5: 0,
    i5_1: 9.07,
    i5_2: 4.87,
    region: "Middle East",
  },
];
const EXT = {
  TWN: {
    fa: 95.6,
    fm: 95.6,
    sc: 48.3,
    sd: 23.1,
    si: 25.5,
    ph: 18.5,
    pl: 10.5,
    pm: 10.2,
    gc: 0.7,
    gd: 0.7,
    ge: 0.8,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    io: 98.8,
    ia: 0.0,
  },
  BDI: {
    fa: 7.1,
    es: 0.6,
    et: 1.2,
    ph: 54.0,
    pl: 27.6,
    pm: 19.3,
    gc: 0.4,
    gd: 0.4,
    ge: 0.2,
    gp: 0.6,
    g1: 4.5,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 6.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 9.9,
    ct: 0.0,
    co: 0.0,
    cc: 1.0,
    cp: 5.8,
    cn: 0.0,
    ch: 0.0,
    cr: 0.1,
    ia: 0.0,
  },
  RWA: {
    fa: 50.0,
    es: 4.3,
    em: 0.5,
    et: 2.1,
    ph: 3.7,
    pl: 2.8,
    pm: 2.1,
    gc: 0.6,
    gd: 0.3,
    ge: 0.8,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 19.0,
    co: 19.3,
    cc: 19.8,
    cp: 20.0,
    cn: 0.9,
    ch: 1.0,
    cr: 1.0,
    io: 83.7,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
    wa: 1.0,
  },
  KOR: {
    fa: 96.9,
    fm: 96.0,
    es: 38.5,
    em: 612.2,
    et: 111.7,
    sc: 15.9,
    sd: 33.5,
    si: 7.8,
    ss: 35.2,
    ph: 0.7,
    pl: 0.6,
    pm: 0.6,
    gc: 1.0,
    gd: 1.0,
    ge: 1.0,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 20.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 96.5,
    ie: 68.5,
    iu: 90.0,
    ia: 1.0,
    wt: 68855,
    wc: 25292,
    wd: 13958,
    we: 5115,
    wa: 13987,
    bc: 76.6,
    bi: 74.2,
    bw: 21.6,
    br: 8.0,
    bp: 18.6,
  },
  MUS: {
    fa: 89.6,
    fm: 93.5,
    es: 2.1,
    em: 1.1,
    et: 3.0,
    ph: 0.9,
    pl: 0.6,
    pm: 0.3,
    gc: 0.9,
    gd: 0.8,
    ge: 0.9,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 20.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 99.7,
    ia: 1.0,
    wt: 16.0,
    wc: 6.0,
    wd: 8.0,
    we: 1.0,
    wa: 1.0,
    bc: 99.2,
    bi: 99.1,
    bw: 63.3,
    br: 57.0,
    bp: 56.9,
  },
  BOL: {
    fa: 56.9,
    fm: 87.4,
    fi: 63.8,
    es: 1.8,
    em: 0.2,
    et: 11.2,
    ph: 7.4,
    pl: 4.5,
    pm: 3.1,
    gc: 0.7,
    gd: 0.3,
    ge: 0.3,
    gp: 0.8,
    g1: 4.5,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 3.0,
    g7: 0.0,
    g8: 1.0,
    cl: 13.7,
    ct: 6.2,
    co: 4.7,
    cc: 8.4,
    cp: 10.2,
    cn: 0.7,
    ch: 0.0,
    cr: 0.5,
    io: 98.8,
    ie: 4.7,
    ia: 1.0,
    wt: 1.0,
    wc: 1.0,
    we: 1.0,
    bc: 49.5,
    bi: 45.9,
    bw: 9.8,
    br: 15.7,
    bp: 74.1,
  },
  MEX: {
    fa: 53.0,
    fm: 83.3,
    fi: 64.6,
    es: 11.2,
    em: 254.2,
    et: 274.8,
    sc: 9.0,
    sd: 4.1,
    si: 18.2,
    ph: 1.4,
    pl: 0.9,
    pm: 0.4,
    gc: 0.8,
    gd: 0.8,
    ge: 0.8,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 18.4,
    ct: 19.6,
    co: 17.3,
    cc: 17.0,
    cp: 13.4,
    cn: 0.9,
    ch: 1.0,
    cr: 0.8,
    io: 93.8,
    ib: 93.9,
    ia: 0.0,
    wt: 64.0,
    wc: 28.0,
    wd: 10.0,
    we: 5.0,
    wa: 10.0,
    bc: 23.3,
    bi: 20.7,
  },
  DZA: {
    fa: 35.3,
    fm: 98.3,
    ph: 1.6,
    pl: 1.6,
    pm: 1.1,
    gc: 0.5,
    gd: 0.3,
    ge: 0.5,
    gp: 0.7,
    g1: 4.5,
    g2: 9.0,
    g3: 0.0,
    g4: 4.5,
    g5: 3.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 19.2,
    ct: 8.6,
    co: 11.0,
    cc: 14.1,
    cp: 13.2,
    cn: 0.0,
    ch: 0.0,
    cr: 0.9,
    io: 99.5,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
    wd: 1.0,
    we: 1.0,
    wa: 4.0,
  },
  TGO: {
    fa: 57.4,
    fm: 82.5,
    fi: 22.4,
    es: 5.2,
    em: 2.0,
    et: 5.2,
    ph: 17.0,
    pl: 9.5,
    pm: 7.8,
    gc: 0.4,
    gd: 0.2,
    ge: 0.7,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 15.3,
    co: 19.1,
    cc: 17.3,
    cp: 18.3,
    cn: 1.0,
    ch: 0.0,
    cr: 1.0,
    io: 58.7,
    ia: 0.0,
    wt: 1.0,
  },
  PRK: {
    ph: 0.0,
    pl: 0.0,
    pm: 0.0,
    gc: 0.0,
    gd: 0.0,
    ge: 0.1,
    gp: 0.0,
    g1: 0.0,
    g2: 0.0,
    g3: 0.0,
    g4: 0.0,
    g5: 0.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 0.0,
    ct: 0.0,
    co: 2.0,
    cc: 1.9,
    cp: 2.3,
    cn: 0.0,
    ch: 0.0,
    cr: 0.0,
    ia: 0.0,
    wt: 2.0,
    wc: 1.0,
    wd: 1.0,
    we: 2.0,
    wa: 1.0,
  },
  LAO: {
    fa: 37.6,
    fm: 84.4,
    fi: 59.3,
    es: 0.8,
    em: 2.0,
    et: 2.5,
    ph: 2.8,
    pl: 2.3,
    pm: 2.1,
    gc: 0.4,
    gd: 0.4,
    ge: 0.4,
    gp: 0.5,
    g1: 0.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 10.4,
    ct: 6.2,
    co: 5.5,
    cc: 2.0,
    cp: 9.6,
    cn: 0.7,
    ch: 0.0,
    cr: 0.5,
    io: 48.6,
    ib: 65.0,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
    we: 1.0,
    wa: 1.0,
  },
  LBN: {
    fa: 23.0,
    fm: 94.0,
    fi: 89.0,
    es: 0.3,
    em: 1.1,
    et: 9.2,
    ph: 4.7,
    pl: 2.7,
    pm: 1.3,
    gc: 0.5,
    gd: 0.0,
    ge: 0.3,
    gp: 0.6,
    g1: 4.5,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 9.0,
    g6: 6.0,
    g7: 0.0,
    g8: 1.0,
    cl: 12.1,
    ct: 1.4,
    co: 10.5,
    cc: 5.0,
    cp: 3.4,
    cn: 0.2,
    ch: 0.0,
    cr: 0.6,
    io: 99.1,
    ia: 0.0,
    wt: 4.0,
    wc: 2.0,
    wd: 1.0,
    we: 2.0,
    wa: 1.0,
  },
  BRA: {
    fa: 86.4,
    fm: 92.0,
    fi: 81.5,
    es: 75.6,
    em: 184.0,
    et: 487.0,
    sc: 16.3,
    sd: 19.0,
    si: 14.1,
    ss: 19.8,
    ph: 0.7,
    pl: 0.7,
    pm: 0.7,
    gc: 1.0,
    gd: 1.0,
    ge: 1.0,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 17.3,
    cc: 19.2,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 96.5,
    ie: 50.7,
    iu: 81.9,
    ia: 1.0,
    wt: 381.0,
    wc: 144.0,
    wd: 39.0,
    we: 33.0,
    wa: 48.0,
  },
  MOZ: {
    fa: 54.4,
    fm: 62.2,
    fi: 17.2,
    et: 10.5,
    ph: 8.5,
    pl: 5.8,
    pm: 3.2,
    gc: 0.4,
    gd: 0.3,
    ge: 0.2,
    gp: 0.5,
    g1: 4.5,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 13.9,
    ct: 11.8,
    co: 15.8,
    cc: 7.9,
    cp: 16.6,
    cn: 0.9,
    ch: 1.0,
    cr: 0.7,
    io: 56.6,
    ib: 31.3,
    ia: 0.0,
    wt: 1.0,
  },
  ZWE: {
    fa: 49.5,
    fm: 81.6,
    fi: 10.4,
    es: 4.1,
    em: 1.0,
    et: 5.3,
    ph: 18.1,
    pl: 6.3,
    pm: 0.0,
    gc: 0.5,
    gd: 0.2,
    ge: 0.7,
    gp: 0.5,
    g1: 4.5,
    g2: 9.0,
    g3: 0.0,
    g4: 4.5,
    g5: 0.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 16.3,
    ct: 1.4,
    co: 7.4,
    cc: 6.8,
    cp: 8.0,
    cn: 0.2,
    ch: 0.0,
    cr: 0.7,
    io: 87.0,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
    wd: 1.0,
  },
  GNQ: {
    ph: 0.0,
    pl: 0.0,
    pm: 0.0,
    gc: 0.1,
    gd: 0.1,
    ge: 0.1,
    gp: 0.1,
    g1: 9.0,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 0.0,
    g6: 6.0,
    g7: 0.0,
    g8: 1.0,
    cl: 6.6,
    ct: 1.4,
    co: 6.4,
    cc: 2.1,
    cp: 8.9,
    cn: 0.2,
    ch: 0.0,
    cr: 0.5,
    ia: 0.0,
  },
  IRN: {
    fa: 91.1,
    fm: 87.0,
    es: 7.5,
    em: 34.1,
    et: 109.8,
    ph: 0.2,
    pl: 0.2,
    pm: 0.1,
    gc: 0.8,
    gd: 0.5,
    ge: 0.7,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 3.0,
    g7: 0.0,
    g8: 1.0,
    cl: 17.8,
    ct: 14.5,
    co: 16.7,
    cc: 10.3,
    cp: 6.2,
    cn: 0.9,
    ch: 1.0,
    cr: 0.8,
    io: 90.2,
    ia: 1.0,
    wt: 43.0,
    wc: 22.0,
    wd: 6.0,
    we: 4.0,
    wa: 2.0,
  },
  CYP: {
    fa: 96.1,
    fm: 98.5,
    es: 2.6,
    em: 0.2,
    et: 4.3,
    ph: 0.4,
    pl: 0.4,
    pm: 0.3,
    gc: 0.7,
    gd: 0.5,
    ge: 0.8,
    gp: 0.9,
    g1: 9.0,
    g2: 4.5,
    g3: 0.0,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 19.4,
    co: 20.0,
    cc: 18.6,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 95.4,
    ib: 100.0,
    ie: 19.0,
    iu: 26.7,
    ia: 1.0,
    wt: 143.0,
    wc: 58.0,
    wd: 59.0,
    we: 5.0,
    wa: 4.0,
    bc: 97.6,
    bi: 96.5,
    bw: 74.7,
    br: 13.4,
    bp: 42.9,
  },
  GIN: {
    fa: 36.0,
    fm: 82.2,
    fi: 9.9,
    ph: 10.6,
    pl: 4.0,
    pm: 3.5,
    gc: 0.2,
    gd: 0.1,
    ge: 0.1,
    gp: 0.1,
    g1: 0.0,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 0.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 16.3,
    ct: 4.0,
    co: 14.4,
    cc: 9.9,
    cp: 12.0,
    cn: 0.2,
    ch: 0.0,
    cr: 0.7,
    io: 38.4,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
  },
  NOR: {
    fa: 98.6,
    fm: 99.8,
    es: 8.7,
    em: 8.1,
    et: 14.5,
    ph: 0.5,
    pl: 0.5,
    pm: 0.2,
    gc: 0.8,
    gd: 0.7,
    ge: 0.9,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 19.3,
    cc: 17.7,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 100.0,
    ib: 100.0,
    ie: 97.4,
    iu: 96.6,
    ia: 1.0,
    wt: 364.0,
    wc: 177.0,
    wd: 69.0,
    we: 35.0,
    wa: 52.0,
  },
  MYS: {
    fa: 88.7,
    fm: 94.7,
    fi: 79.2,
    sc: 4.4,
    sd: 15.6,
    si: 15.0,
    ss: 21.0,
    ph: 0.5,
    pl: 0.6,
    pm: 0.5,
    gc: 0.8,
    gd: 0.7,
    ge: 0.8,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 0.0,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 18.8,
    cc: 20.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 97.6,
    ib: 97.7,
    ia: 0.0,
    wt: 216.0,
    wc: 104.0,
    wd: 32.0,
    we: 20.0,
    wa: 19.0,
    bc: 93.8,
    bi: 90.6,
    bw: 63.3,
  },
  SVK: {
    fa: 92.2,
    fm: 96.8,
    es: 8.9,
    em: 27.8,
    et: 18.6,
    sc: 12.1,
    sd: 24.4,
    si: 11.8,
    ss: 29.9,
    ph: 1.1,
    pl: 0.8,
    pm: 0.5,
    gc: 0.7,
    gd: 0.3,
    ge: 0.8,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 18.5,
    cp: 16.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 99.6,
    ib: 100.0,
    ia: 1.0,
    wt: 21.0,
    wc: 9.0,
    wd: 4.0,
    we: 4.0,
    wa: 4.0,
    bc: 97.6,
    bi: 97.1,
    bw: 78.3,
    br: 15.3,
    bp: 24.8,
  },
  GTM: {
    fa: 38.3,
    fm: 81.0,
    fi: 39.6,
    es: 1.7,
    em: 19.6,
    et: 24.1,
    ph: 2.9,
    pl: 2.9,
    pm: 3.0,
    gc: 0.6,
    gd: 0.4,
    ge: 0.6,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 7.0,
    ct: 3.8,
    co: 12.6,
    cc: 8.7,
    cp: 8.0,
    cn: 0.4,
    ch: 0.0,
    cr: 0.2,
    io: 93.3,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
    wd: 1.0,
    we: 1.0,
    wa: 1.0,
  },
  VNM: {
    fa: 70.5,
    fm: 97.8,
    fi: 83.9,
    es: 16.7,
    em: 914.0,
    et: 124.1,
    sc: 47.3,
    ph: 1.0,
    pl: 1.1,
    pm: 0.9,
    gc: 0.8,
    gd: 0.4,
    ge: 0.8,
    gp: 0.8,
    g1: 4.5,
    g2: 9.0,
    g3: 0.0,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 19.7,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 99.4,
    ib: 99.0,
    ie: 69.5,
    iu: 28.5,
    ia: 1.0,
    wt: 28.0,
    wc: 14.0,
    wd: 10.0,
    we: 1.0,
    wa: 1.0,
  },
  THA: {
    fa: 91.8,
    fm: 92.1,
    fi: 79.8,
    es: 6.5,
    em: 440.2,
    et: 49.9,
    ph: 1.1,
    pl: 1.1,
    pm: 0.3,
    gc: 0.9,
    gd: 0.9,
    ge: 0.8,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 3.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 19.2,
    cc: 20.0,
    cp: 20.0,
    cn: 1.0,
    ch: 0.5,
    cr: 1.0,
    io: 100.0,
    ib: 99.8,
    ie: 30.1,
    iu: 76.5,
    ia: 1.0,
    wt: 27.0,
    wc: 14.0,
    wd: 4.0,
    we: 5.0,
    wa: 4.0,
    bc: 41.2,
    bi: 69.5,
    bw: 11.0,
    br: 22.2,
    bp: 18.6,
  },
  SVN: {
    fa: 98.8,
    fm: 94.7,
    es: 2.6,
    em: 7.9,
    et: 5.0,
    sc: 10.9,
    sd: 21.4,
    si: 10.5,
    ss: 27.4,
    ph: 0.4,
    pl: 0.2,
    pm: 0.2,
    gc: 0.8,
    gd: 0.9,
    ge: 0.7,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 3.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 19.2,
    co: 18.2,
    cc: 19.1,
    cp: 20.0,
    cn: 0.9,
    ch: 1.0,
    cr: 1.0,
    io: 94.7,
    ib: 100.0,
    ie: 30.1,
    iu: 52.4,
    ia: 1.0,
    wt: 32.0,
    wc: 13.0,
    wd: 3.0,
    we: 6.0,
    wa: 8.0,
    bc: 99.3,
    bi: 99.2,
    bw: 82.6,
    br: 20.3,
    bp: 28.9,
  },
  CUB: {
    ph: 57.6,
    pl: 29.9,
    pm: 38.1,
    gc: 0.3,
    gd: 0.3,
    ge: 0.4,
    gp: 0.4,
    g1: 0.0,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 9.0,
    g6: 6.0,
    g7: 0.0,
    g8: 1.0,
    cl: 20.0,
    ct: 14.7,
    co: 14.3,
    cc: 17.0,
    cp: 6.9,
    cn: 0.5,
    ch: 1.0,
    cr: 1.0,
    ia: 0.0,
    wt: 3.0,
    wc: 2.0,
    we: 1.0,
    wa: 1.0,
  },
  MHL: {
    es: 0.1,
    em: 0.0,
    et: 0.1,
    ph: 3.6,
    pl: 3.6,
    pm: 4.1,
    gc: 0.1,
    gd: 0.1,
    ge: 0.0,
    gp: 0.0,
    g1: 0.0,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 0.0,
    g6: 0.0,
    g7: 0.0,
    g8: 0.0,
    cl: 6.8,
    ct: 0.0,
    co: 1.9,
    cc: 0.1,
    cp: 5.5,
    cn: 0.0,
    ch: 0.0,
    cr: 0.1,
    ia: 0.0,
    wt: 2.0,
    wc: 1.0,
    wd: 1.0,
    we: 1.0,
  },
  NER: {
    fa: 14.8,
    fm: 53.7,
    fi: 3.7,
    es: 0.7,
    et: 2.5,
    ph: 17.8,
    pl: 9.4,
    pm: 5.0,
    gc: 0.3,
    gd: 0.2,
    ge: 0.1,
    gp: 0.1,
    g1: 0.0,
    g2: 0.0,
    g3: 4.5,
    g4: 4.5,
    g5: 0.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 16.8,
    ct: 1.4,
    co: 10.7,
    cc: 4.0,
    cp: 9.0,
    cn: 0.2,
    ch: 0.0,
    cr: 0.8,
    io: 43.6,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
    wd: 1.0,
    wa: 1.0,
  },
  LBY: {
    fa: 33.1,
    fm: 100.0,
    ph: 0.8,
    pl: 0.6,
    pm: 0.2,
    gc: 0.2,
    gd: 0.1,
    ge: 0.2,
    gp: 0.1,
    g1: 4.5,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 6.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 16.8,
    ct: 11.2,
    co: 14.0,
    cc: 15.8,
    cp: 10.4,
    cn: 0.8,
    ch: 0.0,
    cr: 0.7,
    io: 96.2,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
    wd: 1.0,
  },
  AGO: {
    fa: 29.3,
    es: 3.4,
    em: 0.3,
    et: 19.7,
    ph: 2.6,
    pl: 1.5,
    pm: 0.9,
    gc: 0.4,
    gd: 0.2,
    ge: 0.6,
    gp: 0.6,
    g1: 4.5,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 13.7,
    ct: 1.8,
    co: 5.8,
    cc: 3.1,
    cp: 15.3,
    cn: 0.0,
    ch: 0.0,
    cr: 0.7,
    ia: 0.0,
    wt: 1.0,
    wa: 1.0,
  },
  URY: {
    fa: 73.8,
    fm: 94.6,
    es: 0.9,
    em: 0.6,
    et: 10.5,
    sc: 6.8,
    sd: 17.5,
    si: 9.4,
    ss: 26.6,
    ph: 1.2,
    pl: 0.8,
    pm: 0.8,
    gc: 0.9,
    gd: 0.8,
    ge: 0.8,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 19.1,
    ct: 20.0,
    co: 19.5,
    cc: 19.4,
    cp: 16.6,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 100.0,
    ia: 1.0,
    wt: 8.0,
    wc: 4.0,
    wd: 1.0,
    we: 2.0,
    wa: 1.0,
  },
  GRD: {
    et: 0.2,
    ph: 5.0,
    pl: 5.0,
    pm: 5.4,
    gc: 0.4,
    gd: 0.0,
    ge: 0.2,
    gp: 0.4,
    g1: 4.5,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 3.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 13.8,
    ct: 4.6,
    co: 0.0,
    cc: 2.4,
    cp: 4.0,
    cn: 0.5,
    ch: 0.0,
    cr: 0.6,
    ia: 0.0,
    wt: 1.0,
    wd: 1.0,
    we: 1.0,
  },
  MNG: {
    fa: 98.3,
    fm: 98.1,
    fi: 74.0,
    es: 1.6,
    em: 0.5,
    et: 9.3,
    ph: 1.2,
    pl: 1.0,
    pm: 0.4,
    gc: 0.9,
    gd: 0.9,
    ge: 0.9,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 19.2,
    ct: 6.6,
    co: 13.6,
    cc: 10.4,
    cp: 6.5,
    cn: 0.6,
    ch: 0.0,
    cr: 0.9,
    io: 96.5,
    ie: 71.1,
    iu: 81.2,
    ia: 1.0,
    wt: 2.0,
    wc: 1.0,
    bc: 71.6,
    bi: 75.2,
    br: 13.4,
  },
  UZB: {
    fa: 59.7,
    fm: 82.3,
    fi: 60.4,
    ph: 0.9,
    pl: 0.9,
    pm: 1.1,
    gc: 0.8,
    gd: 0.5,
    ge: 1.0,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 19.6,
    ct: 16.2,
    co: 15.8,
    cc: 17.6,
    cp: 20.0,
    cn: 0.9,
    ch: 1.0,
    cr: 1.0,
    io: 92.9,
    ie: 26.4,
    iu: 36.5,
    ia: 1.0,
    wt: 1.0,
    wc: 1.0,
    wd: 1.0,
    we: 1.0,
  },
  HUN: {
    fa: 87.0,
    fm: 97.1,
    es: 14.8,
    em: 86.7,
    et: 22.8,
    ph: 1.2,
    pl: 0.7,
    pm: 0.4,
    gc: 0.8,
    gd: 0.8,
    ge: 0.8,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 19.4,
    co: 19.0,
    cc: 12.6,
    cp: 17.7,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 100.0,
    ib: 100.0,
    ie: 23.5,
    iu: 33.0,
    ia: 1.0,
    wt: 60.0,
    wc: 28.0,
    wd: 12.0,
    we: 5.0,
    wa: 11.0,
    bc: 93.9,
    bi: 92.3,
    bw: 67.8,
    br: 15.1,
    bp: 36.7,
  },
  FJI: {
    et: 1.5,
    ph: 8.5,
    pl: 6.2,
    pm: 3.3,
    gc: 0.7,
    gd: 0.4,
    ge: 0.6,
    gp: 0.7,
    g1: 9.0,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 9.0,
    g6: 0.0,
    g7: 0.0,
    g8: 0.0,
    cl: 13.4,
    ct: 1.4,
    co: 15.7,
    cc: 8.8,
    cp: 14.5,
    cn: 0.2,
    ch: 1.0,
    cr: 0.4,
    ia: 0.0,
  },
  MKD: {
    fa: 84.2,
    fm: 90.5,
    es: 1.0,
    em: 4.1,
    et: 5.0,
    ph: 2.1,
    pl: 1.4,
    pm: 0.6,
    gc: 0.6,
    gd: 0.5,
    ge: 0.4,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 3.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 19.2,
    ct: 8.9,
    co: 19.5,
    cc: 9.0,
    cp: 9.3,
    cn: 0.8,
    ch: 1.0,
    cr: 0.9,
    io: 91.2,
    ie: 5.5,
    ia: 1.0,
    wt: 1.0,
    wc: 1.0,
    we: 1.0,
    wa: 2.0,
    bc: 97.3,
    bi: 96.9,
    bw: 54.5,
    br: 4.1,
    bp: 5.6,
  },
  SRB: {
    fa: 83.2,
    fm: 93.4,
    es: 5.4,
    em: 6.0,
    et: 23.8,
    ph: 1.5,
    pl: 0.4,
    pm: 0.4,
    gc: 0.8,
    gd: 1.0,
    ge: 0.9,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 18.4,
    co: 19.2,
    cc: 19.2,
    cp: 20.0,
    cn: 0.8,
    ch: 1.0,
    cr: 1.0,
    io: 90.7,
    ie: 20.9,
    iu: 66.6,
    ia: 1.0,
    wt: 22.0,
    wc: 10.0,
    wd: 2.0,
    we: 3.0,
    wa: 2.0,
    bc: 100.0,
    bi: 100.0,
    bw: 84.4,
    br: 27.9,
    bp: 41.4,
  },
  SLV: {
    fa: 43.4,
    fm: 87.4,
    fi: 58.5,
    es: 2.1,
    em: 2.5,
    et: 21.2,
    ph: 2.8,
    pl: 2.8,
    pm: 2.5,
    gc: 0.7,
    gd: 0.8,
    ge: 0.6,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 3.0,
    g7: 3.0,
    g8: 1.0,
    cl: 13.0,
    ct: 0.0,
    co: 15.2,
    cc: 1.0,
    cp: 8.1,
    cn: 0.0,
    ch: 0.0,
    cr: 0.5,
    io: 98.8,
    ie: 8.0,
    iu: 69.6,
    ia: 1.0,
    wt: 3.0,
    we: 1.0,
  },
  CAN: {
    fa: 98.4,
    fm: 89.4,
    sc: 12.8,
    sd: 9.1,
    si: 11.0,
    ss: 33.7,
    ph: 0.5,
    pl: 0.5,
    pm: 0.3,
    gc: 0.8,
    gd: 0.8,
    ge: 0.7,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 0.0,
    cl: 18.9,
    ct: 15.3,
    co: 20.0,
    cc: 19.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 0.9,
    io: 90.9,
    ib: 100.0,
    ie: 55.6,
    iu: 78.5,
    ia: 1.0,
    wt: 4422,
    wc: 2113,
    wd: 875.0,
    we: 252.0,
    wa: 362.0,
  },
  PAK: {
    fa: 27.3,
    fm: 62.9,
    fi: 30.3,
    es: 21.3,
    em: 18.2,
    et: 119.4,
    ph: 2.1,
    pl: 1.4,
    pm: 0.8,
    gc: 0.4,
    gd: 0.4,
    ge: 0.5,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 0.0,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 3.0,
    g8: 1.0,
    cl: 20.0,
    ct: 18.2,
    co: 20.0,
    cc: 20.0,
    cp: 18.5,
    cn: 0.8,
    ch: 0.0,
    cr: 1.0,
    io: 88.6,
    ia: 0.0,
    wt: 7.0,
    wc: 2.0,
    wd: 2.0,
    we: 1.0,
    wa: 1.0,
  },
  TKM: {
    fa: 40.6,
    ph: 7.3,
    pl: 2.0,
    pm: 0.3,
    gc: 0.2,
    gd: 0.0,
    ge: 0.1,
    gp: 0.2,
    g1: 4.5,
    g2: 0.0,
    g3: 0.0,
    g4: 0.0,
    g5: 3.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 10.1,
    ct: 0.0,
    co: 10.7,
    cc: 1.9,
    cp: 3.2,
    cn: 0.0,
    ch: 0.0,
    cr: 0.4,
    io: 93.3,
    ia: 0.0,
    wt: 2.0,
    wc: 1.0,
  },
  SYR: {
    fa: 23.2,
    ph: 5.7,
    pl: 4.4,
    pm: 1.8,
    gc: 0.2,
    gd: 0.1,
    ge: 0.5,
    gp: 0.3,
    g1: 9.0,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 9.0,
    g6: 3.0,
    g7: 0.0,
    g8: 1.0,
    cl: 15.6,
    ct: 8.7,
    co: 12.4,
    cc: 9.3,
    cp: 5.5,
    cn: 0.6,
    ch: 0.0,
    cr: 0.6,
    ia: 0.0,
    wt: 4.0,
    wc: 1.0,
    we: 1.0,
    wa: 1.0,
  },
  DEU: {
    fa: 98.3,
    fm: 92.0,
    es: 142.5,
    em: 412.1,
    et: 215.9,
    ph: 0.2,
    pl: 0.2,
    pm: 0.2,
    gc: 0.7,
    gd: 0.6,
    ge: 0.8,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 17.9,
    co: 20.0,
    cc: 19.9,
    cp: 20.0,
    cn: 0.9,
    ch: 1.0,
    cr: 1.0,
    io: 97.3,
    ib: 100.0,
    ie: 27.9,
    iu: 70.8,
    ia: 1.0,
    wt: 13332,
    wc: 6504,
    wd: 2582,
    we: 1063,
    wa: 2193,
    bc: 98.5,
    bi: 97.9,
    bw: 88.9,
    br: 28.5,
    bp: 54.1,
  },
  TUR: {
    fa: 81.5,
    fm: 97.4,
    fi: 81.9,
    es: 21.4,
    em: 88.2,
    et: 60.5,
    sc: 10.0,
    sd: 16.4,
    si: 14.3,
    ss: 23.4,
    ph: 0.6,
    pl: 0.6,
    pm: 0.7,
    gc: 0.8,
    gd: 0.8,
    ge: 0.8,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 20.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 100.0,
    ie: 80.8,
    iu: 62.2,
    ia: 1.0,
    wt: 1151,
    wc: 429.0,
    wd: 234.0,
    we: 106.0,
    wa: 91.0,
    bc: 95.9,
    bi: 95.3,
    bw: 49.4,
    br: 10.7,
    bp: 15.0,
  },
  GEO: {
    fa: 78.8,
    fm: 95.0,
    es: 0.7,
    em: 0.3,
    et: 6.9,
    sc: 5.8,
    sd: 18.1,
    si: 20.9,
    ph: 1.1,
    pl: 0.5,
    pm: 0.5,
    gc: 0.6,
    gd: 0.5,
    ge: 0.6,
    gp: 0.7,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 3.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 19.2,
    co: 16.4,
    cc: 16.5,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 88.9,
    ia: 1.0,
    wt: 8.0,
    wc: 2.0,
    wd: 2.0,
    we: 1.0,
    wa: 1.0,
  },
  KNA: {
    ph: 2.0,
    pl: 2.0,
    pm: 1.3,
    gc: 0.2,
    gd: 0.0,
    ge: 0.2,
    gp: 0.5,
    g1: 4.5,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 6.0,
    g6: 6.0,
    g7: 0.0,
    g8: 1.0,
    cl: 13.3,
    ct: 1.8,
    co: 2.7,
    cc: 7.3,
    cp: 6.5,
    cn: 0.0,
    ch: 0.0,
    cr: 0.6,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
    wd: 1.0,
    we: 1.0,
    wa: 1.0,
  },
  CZE: {
    fa: 92.3,
    fm: 96.8,
    es: 11.0,
    em: 57.0,
    et: 21.3,
    sc: 21.2,
    sd: 16.7,
    si: 6.0,
    ph: 0.8,
    pl: 0.8,
    pm: 0.5,
    gc: 0.8,
    gd: 0.6,
    ge: 0.8,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 15.3,
    co: 20.0,
    cc: 18.4,
    cp: 14.3,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 97.7,
    ib: 100.0,
    ie: 47.9,
    iu: 83.8,
    ia: 1.0,
    wt: 73.0,
    wc: 28.0,
    wd: 24.0,
    we: 9.0,
    wa: 6.0,
    bc: 98.3,
    bi: 97.7,
    bw: 82.2,
    br: 26.6,
    bp: 62.4,
  },
  TZA: {
    fa: 59.8,
    fm: 77.8,
    fi: 5.2,
    es: 4.1,
    em: 20.3,
    et: 25.3,
    ph: 6.5,
    pl: 4.8,
    pm: 1.0,
    gc: 0.9,
    gd: 0.8,
    ge: 0.9,
    gp: 0.9,
    g1: 4.5,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 3.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 19.7,
    co: 20.0,
    cc: 19.6,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 47.1,
    ib: 67.7,
    ia: 0.0,
    wt: 1.0,
    wd: 1.0,
  },
  SYC: {
    et: 0.1,
    ph: 1.4,
    pl: 1.4,
    pm: 0.8,
    gc: 0.5,
    gd: 0.2,
    ge: 0.4,
    gp: 0.6,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 3.0,
    g7: 3.0,
    g8: 1.0,
    cl: 16.8,
    ct: 3.2,
    co: 10.2,
    cc: 6.0,
    cp: 14.3,
    cn: 0.2,
    ch: 0.0,
    cr: 0.8,
    ia: 0.0,
    wt: 9.0,
    wc: 4.0,
    wd: 4.0,
    we: 1.0,
    wa: 11.0,
  },
  CMR: {
    fa: 60.9,
    fm: 77.8,
    fi: 21.6,
    ph: 13.5,
    pl: 6.4,
    pm: 2.4,
    gc: 0.4,
    gd: 0.3,
    ge: 0.3,
    gp: 0.5,
    g1: 0.0,
    g2: 4.5,
    g3: 0.0,
    g4: 4.5,
    g5: 3.0,
    g6: 3.0,
    g7: 0.0,
    g8: 1.0,
    cl: 17.9,
    ct: 6.2,
    co: 12.9,
    cc: 14.2,
    cp: 14.3,
    cn: 0.7,
    ch: 0.0,
    cr: 0.8,
    io: 72.6,
    ia: 0.0,
    wt: 1.0,
    wd: 1.0,
    we: 5.0,
    wa: 3.0,
  },
  SDN: {
    fa: 15.3,
    es: 2.8,
    et: 15.6,
    ph: 11.3,
    pl: 6.0,
    pm: 0.2,
    gc: 0.2,
    gd: 0.2,
    ge: 0.3,
    gp: 0.2,
    g1: 4.5,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 6.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 15.6,
    ct: 14.5,
    co: 6.4,
    cc: 4.4,
    cp: 7.3,
    cn: 1.0,
    ch: 0.0,
    cr: 0.6,
    ia: 0.0,
    wt: 3.0,
    wc: 2.0,
    wd: 1.0,
    we: 1.0,
  },
  KWT: {
    fa: 74.5,
    fm: 94.7,
    ph: 0.6,
    pl: 0.6,
    pm: 0.4,
    gc: 0.6,
    gd: 0.4,
    ge: 0.7,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 0.0,
    g4: 4.5,
    g5: 3.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 16.9,
    ct: 5.8,
    co: 11.9,
    cc: 12.3,
    cp: 13.8,
    cn: 0.7,
    ch: 0.5,
    cr: 0.7,
    io: 97.7,
    ie: 89.4,
    iu: 74.4,
    ia: 1.0,
    wt: 2.0,
    wc: 1.0,
    wd: 2.0,
    we: 1.0,
    wa: 1.0,
  },
  SAU: {
    fa: 78.8,
    fm: 97.9,
    sc: 4.7,
    sd: 12.3,
    si: 7.9,
    ss: 15.4,
    ph: 0.7,
    pl: 0.4,
    pm: 0.3,
    gc: 1.0,
    gd: 1.0,
    ge: 1.0,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 20.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 100.0,
    ib: 99.9,
    ie: 94.7,
    iu: 89.0,
    ia: 1.0,
    wt: 251.0,
    wc: 139.0,
    wd: 35.0,
    we: 30.0,
    wa: 10.0,
    bc: 49.6,
    bi: 53.1,
    bw: 14.3,
    br: 11.1,
    bp: 9.6,
  },
  CHL: {
    fa: 85.1,
    fm: 95.6,
    es: 2.2,
    et: 69.2,
    sc: 19.8,
    sd: 14.7,
    si: 23.4,
    ph: 0.5,
    pl: 0.6,
    pm: 0.5,
    gc: 0.8,
    gd: 0.7,
    ge: 0.7,
    gp: 0.8,
    g1: 9.0,
    g2: 0.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 0.0,
    g8: 1.0,
    cl: 14.7,
    ct: 13.8,
    co: 13.4,
    cc: 11.5,
    cp: 16.8,
    cn: 1.0,
    ch: 0.0,
    cr: 0.7,
    io: 99.7,
    ib: 99.9,
    ie: 85.2,
    iu: 69.2,
    ia: 1.0,
    wt: 49.0,
    wc: 32.0,
    wd: 6.0,
    we: 4.0,
    wa: 1.0,
    bc: 89.8,
    bi: 91.4,
    bw: 45.8,
    br: 9.5,
    bp: 7.6,
  },
  WSM: {
    et: 0.3,
    ph: 4.7,
    pl: 4.7,
    pm: 9.0,
    gc: 0.4,
    gd: 0.2,
    ge: 0.2,
    gp: 0.4,
    g1: 0.0,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 3.0,
    g6: 6.0,
    g7: 0.0,
    g8: 0.0,
    cl: 11.0,
    ct: 4.6,
    co: 11.4,
    cc: 7.0,
    cp: 9.3,
    cn: 0.5,
    ch: 0.0,
    cr: 0.3,
    ia: 0.0,
    wt: 5.0,
    wc: 3.0,
    wd: 6.0,
    we: 1.0,
    wa: 1.0,
  },
  KIR: {
    es: 0.0,
    et: 0.1,
    ph: 9.9,
    pl: 8.0,
    pm: 3.2,
    gc: 0.2,
    gd: 0.0,
    ge: 0.3,
    gp: 0.0,
    g1: 0.0,
    g2: 0.0,
    g3: 0.0,
    g4: 0.0,
    g5: 9.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 16.8,
    ct: 10.5,
    co: 14.3,
    cc: 2.4,
    cp: 11.6,
    cn: 0.6,
    ch: 0.0,
    cr: 0.8,
    ia: 0.0,
    wt: 1.0,
    wc: 2.0,
    wd: 1.0,
  },
  AUS: {
    fa: 98.0,
    fm: 95.5,
    es: 4.6,
    em: 42.1,
    et: 81.6,
    ph: 0.5,
    pl: 0.5,
    pm: 0.5,
    gc: 0.8,
    gd: 0.8,
    ge: 0.8,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 0.0,
    cl: 20.0,
    ct: 17.9,
    co: 20.0,
    cc: 19.4,
    cp: 18.9,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    ib: 100.0,
    ie: 67.6,
    iu: 70.6,
    ia: 1.0,
    wt: 1270,
    wc: 549.0,
    wd: 187.0,
    we: 62.0,
    wa: 172.0,
    bi: 97.3,
    bw: 54.5,
    br: 49.5,
    bp: 68.1,
  },
  GUY: {
    es: 0.2,
    em: 0.1,
    et: 0.8,
    ph: 1.7,
    pl: 1.2,
    pm: 0.9,
    gc: 0.4,
    gd: 0.0,
    ge: 0.2,
    gp: 0.6,
    g1: 0.0,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 0.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 16.5,
    ct: 8.0,
    co: 5.9,
    cc: 8.5,
    cp: 8.5,
    cn: 0.7,
    ch: 0.0,
    cr: 0.8,
    ia: 0.0,
    wt: 1.0,
    wa: 1.0,
  },
  TON: {
    es: 0.1,
    et: 0.3,
    ph: 2.9,
    pl: 2.9,
    pm: 1.1,
    gc: 0.3,
    gd: 0.2,
    ge: 0.2,
    gp: 0.5,
    g1: 0.0,
    g2: 9.0,
    g3: 0.0,
    g4: 4.5,
    g5: 9.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 7.0,
    ct: 6.2,
    co: 6.6,
    cc: 2.9,
    cp: 11.1,
    cn: 0.7,
    ch: 0.0,
    cr: 0.1,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
    wa: 1.0,
  },
  DOM: {
    fa: 64.8,
    fm: 89.2,
    fi: 74.2,
    es: 5.3,
    em: 1.5,
    et: 22.0,
    sc: 16.8,
    sd: 21.7,
    si: 19.3,
    ss: 6.0,
    ph: 2.6,
    pl: 1.3,
    pm: 1.0,
    gc: 0.8,
    gd: 0.9,
    ge: 0.8,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 0.0,
    g8: 1.0,
    cl: 18.5,
    ct: 15.7,
    co: 18.4,
    cc: 10.8,
    cp: 12.4,
    cn: 1.0,
    ch: 1.0,
    cr: 0.9,
    io: 86.3,
    ia: 0.0,
    wt: 2.0,
    wc: 1.0,
    wd: 1.0,
    we: 2.0,
    wa: 3.0,
    bi: 98.5,
    bw: 38.7,
    br: 25.8,
    bp: 49.7,
  },
  ERI: {
    ph: 0.0,
    pl: 0.0,
    pm: 14.9,
    gc: 0.1,
    gd: 0.1,
    ge: 0.0,
    gp: 0.0,
    g1: 0.0,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 0.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 1.8,
    ct: 0.0,
    co: 0.0,
    cc: 0.0,
    cp: 0.5,
    cn: 0.0,
    ch: 0.0,
    cr: 0.0,
    ia: 0.0,
    wt: 1.0,
    we: 1.0,
  },
  LUX: {
    fa: 98.8,
    es: 0.8,
    em: 0.8,
    et: 4.9,
    sc: 10.6,
    sd: 25.3,
    si: 21.9,
    ss: 32.6,
    ph: 0.1,
    pl: 0.1,
    pm: 0.1,
    gc: 0.8,
    gd: 0.9,
    ge: 0.8,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 19.0,
    co: 20.0,
    cc: 19.7,
    cp: 20.0,
    cn: 0.9,
    ch: 1.0,
    cr: 1.0,
    ib: 100.0,
    ia: 1.0,
    wt: 188.0,
    wc: 84.0,
    wd: 39.0,
    we: 22.0,
    wa: 23.0,
    bc: 100.0,
    bi: 99.8,
    bw: 81.3,
    br: 14.8,
    bp: 42.2,
  },
  BGD: {
    fa: 43.3,
    fm: 82.4,
    fi: 33.5,
    es: 17.6,
    em: 4.6,
    et: 132.7,
    ph: 1.3,
    pl: 1.2,
    pm: 0.6,
    gc: 0.9,
    gd: 0.8,
    ge: 0.9,
    gp: 0.7,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 17.4,
    ct: 20.0,
    co: 20.0,
    cc: 19.5,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 0.8,
    io: 85.7,
    ib: 41.8,
    ia: 0.0,
    wt: 3.0,
    wc: 2.0,
    we: 2.0,
  },
  BWA: {
    fa: 61.4,
    fm: 88.3,
    fi: 24.9,
    es: 3.6,
    em: 3.7,
    et: 3.0,
    ph: 2.8,
    pl: 1.8,
    pm: 1.0,
    gc: 0.6,
    gd: 0.1,
    ge: 0.3,
    gp: 0.5,
    g1: 4.5,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 3.0,
    g8: 1.0,
    cl: 19.5,
    ct: 16.5,
    co: 15.1,
    cc: 13.5,
    cp: 14.1,
    cn: 1.0,
    ch: 0.5,
    cr: 0.9,
    io: 92.9,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
    we: 1.0,
  },
  HKG: {
    fa: 97.3,
    fm: 98.4,
    sd: 16.4,
    ss: 4.7,
    ph: 0.1,
    pl: 0.1,
    pm: 0.0,
    gc: 0.7,
    gd: 0.4,
    ge: 0.7,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 0.0,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    io: 100.0,
    ie: 36.8,
    iu: 89.2,
    ia: 1.0,
    wt: 705.0,
    wc: 188.0,
    wd: 336.0,
    we: 43.0,
    wa: 106.0,
  },
  IND: {
    fa: 89.0,
    fm: 66.5,
    fi: 39.3,
    es: 835.4,
    em: 512.3,
    et: 521.3,
    ph: 1.3,
    pl: 1.0,
    pm: 0.9,
    gc: 0.9,
    gd: 0.9,
    ge: 0.9,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 0.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 18.5,
    cc: 20.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 99.0,
    ia: 1.0,
    wt: 9892,
    wc: 4515,
    wd: 2098,
    we: 598.0,
    wa: 368.0,
    bc: 76.4,
    bi: 74.9,
    bw: 39.8,
    br: 47.9,
    bp: 49.1,
  },
  TUN: {
    fa: 37.8,
    fm: 95.8,
    fi: 61.9,
    es: 0.8,
    em: 22.4,
    et: 15.2,
    ph: 1.5,
    pl: 0.6,
    pm: 0.3,
    gc: 0.6,
    gd: 0.6,
    ge: 0.8,
    gp: 0.8,
    g1: 4.5,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 19.2,
    ct: 17.8,
    co: 14.2,
    cc: 14.9,
    cp: 15.8,
    cn: 0.9,
    ch: 1.0,
    cr: 0.9,
    io: 100.0,
    ib: 99.8,
    ia: 0.0,
    wt: 11.0,
    wc: 3.0,
    wd: 4.0,
    we: 2.0,
    wa: 1.0,
    bc: 91.0,
    bi: 90.5,
    bw: 61.3,
    br: 46.4,
    bp: 52.3,
  },
  ETH: {
    fa: 48.8,
    fm: 58.0,
    fi: 5.8,
    es: 29.6,
    em: 6.1,
    et: 21.5,
    ph: 4.8,
    pl: 1.7,
    pm: 0.6,
    gc: 0.5,
    gd: 0.4,
    ge: 0.6,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 3.0,
    g7: 0.0,
    g8: 1.0,
    cl: 18.8,
    ct: 14.4,
    co: 12.1,
    cc: 15.5,
    cp: 15.7,
    cn: 0.9,
    ch: 0.0,
    cr: 0.9,
    io: 85.6,
    ia: 0.0,
    wt: 11.0,
    wc: 7.0,
    wd: 2.0,
    we: 1.0,
  },
  JAM: {
    fa: 73.3,
    sc: 20.7,
    sd: 9.0,
    si: 44.3,
    ph: 5.7,
    pl: 5.8,
    pm: 1.0,
    gc: 0.5,
    gd: 0.5,
    ge: 0.4,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 0.0,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 0.0,
    cl: 16.4,
    ct: 6.6,
    co: 15.8,
    cc: 8.1,
    cp: 11.1,
    cn: 0.8,
    ch: 0.0,
    cr: 0.7,
    io: 82.3,
    ib: 99.1,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
    wd: 1.0,
    we: 1.0,
    wa: 1.0,
  },
  BGR: {
    fa: 84.7,
    fm: 92.4,
    es: 12.8,
    em: 14.1,
    et: 16.3,
    sc: 18.9,
    sd: 19.1,
    si: 15.2,
    ss: 34.7,
    ph: 0.6,
    pl: 0.9,
    pm: 0.7,
    gc: 0.7,
    gd: 0.5,
    ge: 0.7,
    gp: 0.8,
    g1: 4.5,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 14.5,
    co: 17.2,
    cc: 11.7,
    cp: 11.1,
    cn: 0.9,
    ch: 1.0,
    cr: 1.0,
    io: 100.0,
    ib: 100.0,
    ia: 0.0,
    wt: 16.0,
    wc: 4.0,
    wd: 3.0,
    we: 4.0,
    wa: 1.0,
    bc: 93.7,
    bi: 91.3,
    bw: 50.7,
    br: 8.6,
    bp: 10.7,
  },
  MDG: {
    fa: 24.4,
    fm: 45.8,
    fi: 1.9,
    es: 6.9,
    et: 12.1,
    ph: 18.8,
    pl: 7.8,
    pm: 5.2,
    gc: 0.5,
    gd: 0.2,
    ge: 0.2,
    gp: 0.3,
    g1: 4.5,
    g2: 0.0,
    g3: 4.5,
    g4: 4.5,
    g5: 3.0,
    g6: 6.0,
    g7: 3.0,
    g8: 1.0,
    cl: 13.6,
    ct: 2.9,
    co: 4.0,
    cc: 5.4,
    cp: 5.8,
    cn: 0.2,
    ch: 1.0,
    cr: 0.5,
    io: 87.3,
    ia: 0.0,
  },
  GRC: {
    fa: 88.5,
    fm: 95.2,
    es: 5.0,
    em: 5.5,
    et: 33.2,
    sc: 8.2,
    sd: 17.3,
    si: 9.1,
    ph: 0.8,
    pl: 0.7,
    pm: 0.7,
    gc: 0.9,
    gd: 0.8,
    ge: 0.9,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 19.2,
    cc: 18.0,
    cp: 20.0,
    cn: 1.0,
    ch: 0.5,
    cr: 1.0,
    io: 97.0,
    ib: 100.0,
    ie: 12.0,
    iu: 29.0,
    ia: 1.0,
    wt: 46.0,
    wc: 16.0,
    wd: 5.0,
    we: 13.0,
    wa: 3.0,
    bc: 88.8,
    bi: 87.7,
    bw: 65.9,
    br: 12.2,
    bp: 14.5,
  },
  PNG: {
    et: 5.2,
    ph: 11.6,
    pl: 11.6,
    pm: 13.0,
    gc: 0.6,
    gd: 0.2,
    ge: 0.5,
    gp: 0.6,
    g1: 4.5,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 9.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 15.0,
    ct: 9.3,
    co: 14.7,
    cc: 13.3,
    cp: 10.5,
    cn: 0.5,
    ch: 0.0,
    cr: 0.7,
    ia: 0.0,
    wt: 1.0,
  },
  TCD: {
    fa: 20.9,
    fm: 53.4,
    fi: 2.3,
    et: 1.1,
    ph: 21.6,
    pl: 9.8,
    pm: 9.5,
    gc: 0.3,
    gd: 0.1,
    ge: 0.3,
    gp: 0.0,
    g1: 0.0,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 0.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 12.9,
    ct: 3.2,
    co: 11.3,
    cc: 7.0,
    cp: 14.3,
    cn: 0.2,
    ch: 0.0,
    cr: 0.8,
    io: 24.9,
    ia: 0.0,
  },
  PRY: {
    fa: 60.9,
    fm: 93.5,
    fi: 73.3,
    ph: 1.5,
    pl: 1.7,
    pm: 2.7,
    gc: 0.7,
    gd: 0.6,
    ge: 0.7,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 17.8,
    ct: 8.5,
    co: 17.7,
    cc: 14.2,
    cp: 16.8,
    cn: 0.8,
    ch: 0.5,
    cr: 0.8,
    io: 99.5,
    ie: 21.3,
    iu: 68.6,
    ia: 1.0,
    wt: 1.0,
    wc: 2.0,
    wd: 1.0,
    we: 1.0,
    wa: 1.0,
    bc: 94.7,
    bi: 93.3,
    bw: 53.9,
    br: 59.6,
    bp: 55.6,
  },
  IRQ: {
    fa: 30.2,
    fm: 91.5,
    fi: 65.5,
    es: 3.4,
    et: 11.7,
    ph: 2.3,
    pl: 2.3,
    pm: 1.1,
    gc: 0.2,
    gd: 0.2,
    ge: 0.1,
    gp: 0.3,
    g1: 4.5,
    g2: 9.0,
    g3: 4.5,
    g4: 0.0,
    g5: 0.0,
    g6: 3.0,
    g7: 0.0,
    g8: 1.0,
    cl: 11.2,
    ct: 9.6,
    co: 15.8,
    cc: 8.4,
    cp: 8.1,
    cn: 0.5,
    ch: 0.0,
    cr: 0.4,
    io: 95.9,
    ia: 0.0,
    wt: 5.0,
    wc: 4.0,
    wd: 1.0,
    we: 1.0,
  },
  ARM: {
    fa: 71.4,
    fm: 95.4,
    es: 1.4,
    et: 5.3,
    ph: 0.8,
    pl: 0.8,
    pm: 0.7,
    gc: 0.7,
    gd: 0.7,
    ge: 0.6,
    gp: 0.8,
    g1: 4.5,
    g2: 9.0,
    g3: 4.5,
    g4: 0.0,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 17.2,
    ct: 8.7,
    co: 2.8,
    cc: 10.5,
    cp: 14.7,
    cn: 0.7,
    ch: 1.0,
    cr: 0.7,
    io: 67.0,
    ia: 1.0,
    wt: 2.0,
    wc: 1.0,
    wd: 1.0,
    we: 1.0,
    wa: 1.0,
  },
  FIN: {
    fa: 99.8,
    fm: 99.2,
    es: 10.3,
    em: 25.8,
    et: 14.0,
    sc: 22.0,
    sd: 20.5,
    si: 13.6,
    ph: 0.6,
    pl: 0.4,
    pm: 0.1,
    gc: 0.7,
    gd: 0.8,
    ge: 0.7,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 20.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 100.0,
    ie: 86.2,
    iu: 94.2,
    ia: 1.0,
    wt: 4231,
    wc: 701.0,
    wd: 2551,
    we: 532.0,
    wa: 369.0,
    bc: 100.0,
    bi: 100.0,
    bw: 95.3,
    br: 21.8,
    bp: 50.5,
  },
  KAZ: {
    fa: 87.0,
    fm: 92.2,
    ph: 1.2,
    pl: 1.2,
    pm: 0.4,
    gc: 0.7,
    gd: 0.8,
    ge: 0.8,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 19.4,
    co: 18.3,
    cc: 16.4,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 96.9,
    ia: 1.0,
    wt: 1.0,
    wc: 4.0,
    wd: 1.0,
    we: 1.0,
    wa: 1.0,
    bc: 61.4,
    bi: 55.3,
    bw: 20.2,
    br: 7.0,
    bp: 9.2,
  },
  ECU: {
    fa: 64.5,
    fm: 88.2,
    fi: 70.0,
    es: 1.3,
    em: 0.9,
    et: 40.0,
    ph: 2.2,
    pl: 2.6,
    pm: 2.1,
    gc: 0.9,
    gd: 0.9,
    ge: 0.7,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 19.2,
    ct: 17.9,
    co: 18.6,
    cc: 13.7,
    cp: 17.7,
    cn: 1.0,
    ch: 0.0,
    cr: 0.9,
    io: 98.6,
    ib: 77.3,
    ia: 0.0,
    wt: 4.0,
    wc: 1.0,
    wd: 2.0,
    we: 2.0,
    wa: 1.0,
    bc: 97.6,
    bi: 99.4,
    bw: 67.5,
    br: 38.7,
    bp: 47.1,
  },
  MAR: {
    fa: 44.4,
    fm: 90.2,
    fi: 49.4,
    ph: 2.1,
    pl: 0.8,
    pm: 0.7,
    gc: 0.6,
    gd: 0.6,
    ge: 0.6,
    gp: 0.7,
    g1: 4.5,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 3.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 18.1,
    co: 20.0,
    cc: 19.4,
    cp: 20.0,
    cn: 0.9,
    ch: 1.0,
    cr: 1.0,
    io: 92.1,
    ie: 18.6,
    iu: 13.5,
    ia: 1.0,
    wt: 27.0,
    wc: 8.0,
    wd: 6.0,
    we: 4.0,
    wa: 3.0,
  },
  IRL: {
    fa: 98.3,
    fm: 92.7,
    es: 7.2,
    em: 23.6,
    et: 22.4,
    ph: 0.3,
    pl: 0.3,
    pm: 0.3,
    gc: 0.5,
    gd: 0.3,
    ge: 0.7,
    gp: 0.7,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 0.0,
    cl: 20.0,
    ct: 13.5,
    co: 19.7,
    cc: 17.7,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 83.3,
    ib: 100.0,
    ie: 49.3,
    iu: 70.0,
    ia: 1.0,
    wt: 947.0,
    wc: 574.0,
    wd: 102.0,
    we: 52.0,
    wa: 83.0,
    bc: 98.9,
    bi: 98.9,
    bw: 76.1,
    br: 30.2,
    bp: 45.8,
  },
  SGP: {
    fa: 98.0,
    fm: 97.2,
    es: 6.0,
    em: 9.9,
    et: 3.0,
    sc: 5.3,
    sd: 12.4,
    si: 3.6,
    ss: 12.3,
    ph: 0.2,
    pl: 0.2,
    pm: 0.2,
    gc: 0.8,
    gd: 0.8,
    ge: 0.7,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 19.9,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 96.9,
    ib: 99.9,
    ie: 98.2,
    iu: 91.1,
    ia: 1.0,
    wt: 3591,
    wc: 1403,
    wd: 1269,
    we: 230.0,
    wa: 428.0,
    bc: 89.6,
    bi: 87.6,
    bw: 44.7,
    br: 48.3,
    bp: 48.7,
  },
  MMR: {
    fa: 47.8,
    es: 6.1,
    em: 4.6,
    et: 6.9,
    ph: 8.4,
    pl: 2.7,
    pm: 1.2,
    gc: 0.2,
    gd: 0.0,
    ge: 0.2,
    gp: 0.5,
    g1: 4.5,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 3.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 15.3,
    ct: 10.9,
    co: 13.1,
    cc: 14.3,
    cp: 20.0,
    cn: 0.9,
    ch: 0.0,
    cr: 0.6,
    io: 87.8,
    ia: 0.0,
    wt: 1.0,
    bi: 0.2,
    bw: 0.0,
  },
  BIH: {
    fa: 77.5,
    fm: 90.3,
    es: 7.7,
    em: 1.5,
    et: 13.0,
    sc: 13.4,
    si: 9.0,
    ss: 9.5,
    ph: 1.9,
    pl: 1.4,
    pm: 1.4,
    gc: 0.5,
    gd: 0.2,
    ge: 0.2,
    gp: 0.3,
    g1: 4.5,
    g2: 0.0,
    g3: 4.5,
    g4: 0.0,
    g5: 3.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 12.1,
    ct: 2.7,
    co: 6.0,
    cc: 4.2,
    cp: 8.6,
    cn: 0.0,
    ch: 1.0,
    cr: 0.6,
    io: 91.3,
    ia: 0.0,
    wt: 7.0,
    wc: 6.0,
    wd: 1.0,
    we: 2.0,
    wa: 1.0,
    bc: 99.6,
    bi: 99.6,
    bw: 62.7,
    br: 19.1,
    bp: 6.7,
  },
  HRV: {
    fa: 92.6,
    fm: 96.8,
    es: 2.4,
    em: 7.7,
    et: 12.5,
    sc: 21.0,
    sd: 41.8,
    si: 8.3,
    ph: 0.4,
    pl: 0.4,
    pm: 0.6,
    gc: 0.8,
    gd: 0.7,
    ge: 0.7,
    gp: 0.9,
    g1: 4.5,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 3.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 17.9,
    co: 19.3,
    cc: 16.7,
    cp: 14.3,
    cn: 0.9,
    ch: 1.0,
    cr: 1.0,
    io: 98.2,
    ib: 100.0,
    ia: 1.0,
    wt: 16.0,
    wc: 7.0,
    wd: 2.0,
    we: 2.0,
    wa: 5.0,
    bc: 91.5,
    bi: 91.3,
    bw: 68.8,
    br: 18.6,
    bp: 23.4,
  },
  SUR: {
    es: 1.7,
    et: 2.3,
    ph: 4.2,
    pl: 4.2,
    pm: 2.5,
    gc: 0.3,
    gd: 0.0,
    ge: 0.1,
    gp: 0.2,
    g1: 0.0,
    g2: 0.0,
    g3: 0.0,
    g4: 0.0,
    g5: 0.0,
    g6: 3.0,
    g7: 0.0,
    g8: 1.0,
    cl: 15.2,
    ct: 6.2,
    co: 3.4,
    cc: 2.0,
    cp: 8.0,
    cn: 0.7,
    ch: 1.0,
    cr: 0.6,
    ia: 0.0,
    wt: 1.0,
    wd: 1.0,
  },
  FRA: {
    fa: 99.2,
    fm: 91.0,
    es: 76.5,
    em: 169.6,
    et: 97.2,
    sc: 12.8,
    sd: 19.7,
    si: 14.5,
    ss: 21.8,
    ph: 0.3,
    pl: 0.3,
    pm: 0.3,
    gc: 0.9,
    gd: 0.9,
    ge: 0.9,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 19.0,
    co: 20.0,
    cc: 20.0,
    cp: 20.0,
    cn: 0.9,
    ch: 1.0,
    cr: 1.0,
    io: 95.1,
    ib: 100.0,
    ie: 57.5,
    iu: 91.1,
    ia: 1.0,
    wt: 6382,
    wc: 2904,
    wd: 1308,
    we: 654.0,
    wa: 1097,
  },
  GAB: {
    fa: 68.2,
    fm: 87.2,
    fi: 47.4,
    ph: 2.6,
    pl: 2.1,
    pm: 2.1,
    gc: 0.3,
    gd: 0.1,
    ge: 0.1,
    gp: 0.0,
    g1: 0.0,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 0.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 0.0,
    co: 5.5,
    cc: 4.9,
    cp: 9.4,
    cn: 0.0,
    ch: 0.0,
    cr: 1.0,
    io: 76.7,
    ia: 0.0,
    wt: 2.0,
    wc: 2.0,
    wd: 2.0,
    wa: 1.0,
  },
  MDA: {
    fa: 55.5,
    fm: 91.6,
    ph: 0.6,
    pl: 0.6,
    pm: 0.6,
    gc: 0.7,
    gd: 0.8,
    ge: 0.8,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 3.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 18.3,
    ct: 6.7,
    co: 15.5,
    cc: 8.2,
    cp: 16.6,
    cn: 0.6,
    ch: 1.0,
    cr: 1.0,
    io: 94.0,
    ia: 1.0,
    wt: 3.0,
    wc: 1.0,
    wd: 5.0,
    we: 3.0,
    wa: 2.0,
    bc: 100.0,
    bi: 97.6,
    bw: 26.4,
  },
  MCO: {
    ph: 0.2,
    pl: 0.2,
    pm: 0.1,
    gc: 0.3,
    gd: 0.0,
    ge: 0.4,
    gp: 0.4,
    g1: 4.5,
    g2: 0.0,
    g3: 0.0,
    g4: 0.0,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 18.6,
    ct: 13.7,
    co: 15.2,
    cc: 13.7,
    cp: 14.3,
    cn: 0.8,
    ch: 1.0,
    cr: 0.9,
    ia: 1.0,
    wt: 16.0,
    wc: 6.0,
    wd: 2.0,
    we: 1.0,
    wa: 2.0,
  },
  EST: {
    fa: 98.9,
    fm: 99.2,
    es: 2.6,
    em: 5.7,
    et: 5.1,
    sc: 7.0,
    sd: 0.0,
    si: 7.3,
    ph: 0.4,
    pl: 0.2,
    pm: 0.1,
    gc: 0.9,
    gd: 1.0,
    ge: 0.9,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 15.3,
    co: 20.0,
    cc: 19.7,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 99.4,
    ib: 100.0,
    ia: 1.0,
    wt: 51.0,
    wc: 26.0,
    wd: 7.0,
    we: 1.0,
    wa: 2.0,
    bc: 96.3,
    bi: 95.6,
    bw: 77.9,
    br: 18.3,
    bp: 24.6,
  },
  ARG: {
    fa: 81.7,
    fm: 90.5,
    fi: 78.0,
    es: 18.9,
    em: 14.9,
    et: 107.3,
    ph: 0.8,
    pl: 0.8,
    pm: 1.3,
    gc: 0.8,
    gd: 0.7,
    ge: 0.7,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 17.0,
    ct: 12.2,
    co: 12.1,
    cc: 1.9,
    cp: 8.4,
    cn: 0.6,
    ch: 1.0,
    cr: 0.8,
    io: 99.7,
    ie: 22.8,
    iu: 52.3,
    ia: 1.0,
    wt: 23.0,
    wc: 11.0,
    wd: 3.0,
    we: 2.0,
    wa: 3.0,
  },
  SEN: {
    fa: 76.5,
    fm: 87.3,
    fi: 45.0,
    es: 6.8,
    em: 1.7,
    et: 8.0,
    ph: 5.3,
    pl: 2.6,
    pm: 2.6,
    gc: 0.3,
    gd: 0.3,
    ge: 0.2,
    gp: 0.5,
    g1: 9.0,
    g2: 0.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 15.6,
    ct: 14.4,
    co: 9.1,
    cc: 9.5,
    cp: 18.8,
    cn: 0.5,
    ch: 1.0,
    cr: 0.7,
    io: 74.1,
    ib: 81.4,
    ia: 0.0,
    wt: 3.0,
    wc: 1.0,
    wd: 1.0,
    wa: 1.0,
  },
  NLD: {
    fa: 99.2,
    fm: 95.2,
    es: 27.7,
    em: 35.2,
    et: 36.5,
    ph: 0.5,
    pl: 0.3,
    pm: 0.3,
    gc: 0.8,
    gd: 0.6,
    ge: 0.8,
    gp: 0.8,
    g1: 9.0,
    g2: 0.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 19.2,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 90.9,
    ib: 100.0,
    ie: 93.7,
    iu: 83.9,
    ia: 1.0,
    wt: 2965,
    wc: 1524,
    wd: 586.0,
    we: 282.0,
    wa: 443.0,
    bc: 100.0,
    bi: 100.0,
    bw: 88.7,
    br: 25.3,
    bp: 52.2,
  },
  COL: {
    fa: 57.1,
    fm: 88.1,
    fi: 66.8,
    es: 19.2,
    em: 8.4,
    et: 136.3,
    ph: 1.2,
    pl: 1.2,
    pm: 0.7,
    gc: 0.9,
    gd: 0.9,
    ge: 0.7,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 13.4,
    ct: 16.2,
    co: 10.9,
    cc: 15.0,
    cp: 10.2,
    cn: 0.9,
    ch: 1.0,
    cr: 0.7,
    io: 97.5,
    ie: 8.1,
    iu: 23.2,
    ia: 1.0,
    wt: 90.0,
    wc: 50.0,
    wd: 8.0,
    we: 9.0,
    wa: 9.0,
    bc: 99.7,
    bi: 99.6,
    bw: 63.9,
    br: 76.2,
    bp: 81.6,
  },
  HND: {
    fa: 42.4,
    fm: 80.7,
    fi: 55.1,
    et: 7.0,
    ph: 10.2,
    pl: 10.2,
    pm: 10.5,
    gc: 0.5,
    gd: 0.2,
    ge: 0.3,
    gp: 0.5,
    g1: 9.0,
    g2: 4.5,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 0.0,
    g8: 1.0,
    cl: 17.4,
    ct: 0.0,
    co: 3.2,
    cc: 1.4,
    cp: 6.1,
    cn: 0.0,
    ch: 0.0,
    cr: 0.8,
    io: 95.9,
    ia: 0.0,
    wt: 2.0,
    wc: 2.0,
    we: 1.0,
    wa: 1.0,
  },
  SLE: {
    fa: 38.6,
    fm: 59.1,
    fi: 22.8,
    es: 2.0,
    et: 4.4,
    ph: 21.6,
    pl: 9.1,
    pm: 14.9,
    gc: 0.4,
    gd: 0.2,
    ge: 0.4,
    gp: 0.3,
    g1: 0.0,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 3.0,
    g6: 3.0,
    g7: 0.0,
    g8: 1.0,
    cl: 17.3,
    ct: 1.4,
    co: 18.8,
    cc: 7.1,
    cp: 12.0,
    cn: 0.2,
    ch: 1.0,
    cr: 0.7,
    io: 41.7,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
    we: 1.0,
    wa: 1.0,
  },
  TUV: {
    es: 0.0,
    et: 0.0,
    ph: 4.3,
    pl: 3.5,
    pm: 1.3,
    gc: 0.1,
    gd: 0.1,
    ge: 0.0,
    gp: 0.2,
    g1: 4.5,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 0.0,
    g6: 0.0,
    g7: 0.0,
    g8: 0.0,
    cl: 7.3,
    ct: 0.0,
    co: 3.6,
    cc: 2.4,
    cp: 7.2,
    cn: 0.0,
    ch: 0.0,
    cr: 0.1,
    ia: 0.0,
  },
  LBR: {
    fa: 52.2,
    fm: 70.0,
    fi: 13.5,
    es: 1.6,
    et: 1.2,
    ph: 15.8,
    pl: 7.9,
    pm: 16.3,
    gc: 0.3,
    gd: 0.2,
    ge: 0.1,
    gp: 0.1,
    g1: 0.0,
    g2: 0.0,
    g3: 4.5,
    g4: 4.5,
    g5: 3.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 8.2,
    ct: 0.0,
    co: 2.8,
    cc: 1.6,
    cp: 8.9,
    cn: 0.0,
    ch: 1.0,
    cr: 0.3,
    io: 22.8,
    ia: 0.0,
    wt: 3.0,
    wc: 1.0,
    wd: 1.0,
    we: 1.0,
  },
  PLW: {
    es: 0.0,
    et: 0.1,
    ph: 2.1,
    pl: 2.1,
    pm: 1.0,
    gc: 0.3,
    gd: 0.1,
    ge: 0.2,
    gp: 0.2,
    g1: 0.0,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 0.0,
    g6: 0.0,
    g7: 0.0,
    g8: 0.0,
    ia: 0.0,
    wt: 2.0,
    wd: 1.0,
  },
  KGZ: {
    fa: 72.3,
    fm: 96.0,
    fi: 84.0,
    es: 4.5,
    em: 0.2,
    et: 14.3,
    ph: 1.5,
    pl: 1.3,
    pm: 1.0,
    gc: 0.5,
    gd: 0.7,
    ge: 0.5,
    gp: 0.7,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 0.0,
    g8: 1.0,
    cl: 16.7,
    ct: 14.9,
    co: 16.3,
    cc: 5.5,
    cp: 12.2,
    cn: 0.8,
    ch: 0.0,
    cr: 0.7,
    io: 97.0,
    ib: 99.5,
    ie: 29.9,
    iu: 41.7,
    ia: 1.0,
    wt: 1.0,
    wc: 1.0,
    wd: 2.0,
    we: 1.0,
    wa: 1.0,
  },
  JOR: {
    fa: 46.5,
    fm: 88.4,
    fi: 77.4,
    es: 0.3,
    em: 3.1,
    et: 12.3,
    sc: 9.3,
    sd: 34.0,
    si: 22.6,
    ss: 24.1,
    ph: 4.2,
    pl: 3.1,
    pm: 1.1,
    gc: 0.8,
    gd: 0.8,
    ge: 0.8,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 3.0,
    g7: 3.0,
    g8: 1.0,
    cl: 20.0,
    ct: 19.4,
    co: 19.2,
    cc: 20.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 86.1,
    ib: 99.7,
    ie: 19.3,
    iu: 53.4,
    ia: 1.0,
    wt: 3.0,
    wc: 2.0,
    wd: 1.0,
    we: 1.0,
    wa: 1.0,
  },
  SWE: {
    fa: 98.6,
    fm: 99.1,
    es: 12.7,
    em: 28.5,
    et: 24.1,
    sc: 8.7,
    sd: 22.6,
    si: 7.1,
    ss: 25.7,
    ph: 0.4,
    pl: 0.3,
    pm: 0.2,
    gc: 0.8,
    gd: 0.5,
    ge: 0.8,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 19.3,
    cc: 20.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 100.0,
    ib: 100.0,
    ie: 97.5,
    iu: 98.0,
    ia: 1.0,
    wt: 9068,
    wc: 1421,
    wd: 5855,
    we: 1146,
    wa: 480.0,
    bc: 100.0,
    bi: 98.8,
    bw: 89.7,
    br: 28.2,
    bp: 36.9,
  },
  GHA: {
    fa: 81.2,
    fm: 87.7,
    fi: 39.2,
    es: 4.4,
    em: 19.0,
    et: 14.4,
    ph: 3.8,
    pl: 0.7,
    pm: 0.2,
    gc: 0.7,
    gd: 0.3,
    ge: 0.5,
    gp: 0.7,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 19.3,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 71.5,
    ib: 74.5,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
    wd: 1.0,
  },
  BLZ: {
    fa: 68.0,
    fm: 86.4,
    fi: 80.1,
    ph: 2.7,
    pl: 2.0,
    pm: 2.1,
    gc: 0.4,
    gd: 0.0,
    ge: 0.3,
    gp: 0.6,
    g1: 4.5,
    g2: 4.5,
    g3: 0.0,
    g4: 0.0,
    g5: 6.0,
    g6: 3.0,
    g7: 0.0,
    g8: 0.0,
    cl: 14.1,
    ct: 0.0,
    co: 12.4,
    cc: 0.0,
    cp: 5.8,
    cn: 0.0,
    ch: 0.0,
    cr: 0.6,
    ia: 0.0,
    wt: 1.0,
    wc: 2.0,
    wd: 1.0,
    we: 1.0,
    wa: 1.0,
  },
  MNE: {
    fa: 75.4,
    fm: 93.7,
    ph: 1.0,
    pl: 1.0,
    pm: 1.1,
    gc: 0.7,
    gd: 0.4,
    ge: 0.5,
    gp: 0.7,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 18.9,
    ct: 15.3,
    co: 17.6,
    cc: 5.3,
    cp: 17.7,
    cn: 1.0,
    ch: 1.0,
    cr: 0.9,
    io: 88.7,
    ie: 50.2,
    iu: 9.2,
    ia: 1.0,
    wt: 1.0,
    wc: 1.0,
    wd: 1.0,
  },
  HTI: {
    fa: 32.6,
    ph: 2.0,
    pl: 2.6,
    pm: 8.3,
    gc: 0.3,
    gd: 0.2,
    ge: 0.1,
    gp: 0.2,
    g1: 0.0,
    g2: 0.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 6.5,
    ct: 0.0,
    co: 6.4,
    cc: 1.8,
    cp: 9.6,
    cn: 0.0,
    ch: 0.0,
    cr: 0.3,
    io: 69.2,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
    wd: 1.0,
  },
  PSE: {
    fa: 39.6,
    fm: 94.9,
    fi: 88.3,
    es: 0.3,
    em: 0.3,
    et: 3.4,
    sc: 20.6,
    sd: 18.1,
    si: 17.9,
    ss: 9.0,
    ph: 10.6,
    pl: 1.7,
    pm: 2.8,
    gc: 0.6,
    gd: 0.3,
    ge: 0.1,
    gp: 0.6,
    g1: 4.5,
    g2: 9.0,
    g3: 0.0,
    g4: 4.5,
    g5: 0.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 14.2,
    ct: 9.6,
    co: 2.4,
    cc: 9.0,
    cp: 2.5,
    cn: 0.5,
    ch: 1.0,
    cr: 0.5,
    io: 96.1,
    ia: 0.0,
    bc: 41.4,
    bi: 61.1,
    bw: 50.7,
    br: 32.2,
    bp: 30.2,
  },
  AFG: {
    fa: 9.7,
    et: 3.3,
    ph: 23.1,
    pl: 11.5,
    pm: 7.2,
    gc: 0.4,
    gd: 0.1,
    ge: 0.3,
    gp: 0.6,
    g1: 0.0,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 9.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 5.8,
    ct: 3.3,
    co: 7.0,
    cc: 2.3,
    cp: 0.0,
    cn: 0.4,
    ch: 0.0,
    cr: 0.1,
    io: 84.6,
    ib: 47.8,
    ia: 0.0,
    wt: 4.0,
    wc: 2.0,
    wd: 1.0,
    we: 1.0,
    wa: 4.0,
  },
  LTU: {
    fa: 99.0,
    fm: 98.7,
    es: 11.2,
    em: 7.0,
    et: 5.6,
    sc: 16.1,
    sd: 18.8,
    si: 7.4,
    ph: 0.3,
    pl: 0.3,
    pm: 0.2,
    gc: 0.8,
    gd: 0.9,
    ge: 0.9,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 17.8,
    ct: 19.2,
    co: 17.1,
    cc: 18.6,
    cp: 20.0,
    cn: 0.9,
    ch: 1.0,
    cr: 0.8,
    io: 84.1,
    ib: 100.0,
    ia: 1.0,
    wt: 122.0,
    wc: 46.0,
    wd: 70.0,
    we: 3.0,
    wa: 3.0,
    bc: 100.0,
    bi: 100.0,
    bw: 77.0,
    br: 19.6,
    bp: 26.0,
  },
  BRB: {
    em: 0.1,
    et: 0.8,
    ph: 2.6,
    pl: 2.6,
    pm: 2.9,
    gc: 0.4,
    gd: 0.0,
    ge: 0.3,
    gp: 0.7,
    g1: 4.5,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 6.0,
    g6: 6.0,
    g7: 3.0,
    g8: 1.0,
    cl: 14.9,
    ct: 3.0,
    co: 4.2,
    cc: 6.5,
    cp: 8.0,
    cn: 0.3,
    ch: 0.0,
    cr: 0.7,
    ia: 0.0,
    wt: 332.0,
    wc: 158.0,
    wd: 27.0,
    we: 73.0,
    wa: 67.0,
  },
  POL: {
    fa: 86.1,
    fm: 94.7,
    es: 18.6,
    em: 79.0,
    et: 75.7,
    sc: 22.8,
    sd: 14.4,
    si: 10.0,
    ph: 0.4,
    pl: 0.4,
    pm: 0.5,
    gc: 0.8,
    gd: 0.3,
    ge: 0.7,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 18.4,
    co: 16.7,
    cc: 18.4,
    cp: 20.0,
    cn: 0.8,
    ch: 1.0,
    cr: 1.0,
    io: 91.4,
    ie: 48.8,
    iu: 85.4,
    ia: 1.0,
    wt: 207.0,
    wc: 87.0,
    wd: 40.0,
    we: 19.0,
    wa: 31.0,
    bc: 94.7,
    bi: 93.7,
    bw: 67.0,
    br: 12.4,
    bp: 34.8,
  },
  SWZ: {
    fa: 65.1,
    fm: 86.2,
    fi: 32.3,
    et: 1.3,
    ph: 4.6,
    pl: 0.8,
    pm: 1.4,
    gc: 0.5,
    gd: 0.3,
    ge: 0.4,
    gp: 0.3,
    g1: 0.0,
    g2: 9.0,
    g3: 0.0,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 3.0,
    g8: 1.0,
    cl: 18.2,
    ct: 15.0,
    co: 18.4,
    cc: 10.2,
    cp: 17.7,
    cn: 0.9,
    ch: 0.0,
    cr: 0.8,
    io: 78.6,
    ia: 0.0,
    wt: 3.0,
    wc: 1.0,
    wd: 1.0,
    we: 1.0,
    wa: 1.0,
  },
  FSM: {
    et: 0.2,
    ph: 11.3,
    pl: 8.9,
    pm: 3.6,
    gc: 0.3,
    gd: 0.1,
    ge: 0.1,
    gp: 0.0,
    g1: 0.0,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 6.0,
    g6: 0.0,
    g7: 0.0,
    g8: 0.0,
    cl: 2.8,
    ct: 0.0,
    co: 1.9,
    cc: 0.1,
    cp: 4.0,
    cn: 0.0,
    ch: 0.0,
    cr: 0.0,
    ia: 0.0,
  },
  SOM: {
    fa: 38.7,
    es: 4.2,
    em: 1.7,
    et: 4.9,
    ph: 4.0,
    pl: 4.0,
    pm: 2.4,
    gc: 0.3,
    gd: 0.2,
    ge: 0.3,
    gp: 0.2,
    g1: 4.5,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 0.0,
    g7: 0.0,
    g8: 0.0,
    cl: 6.5,
    ct: 4.8,
    co: 10.6,
    cc: 4.3,
    cp: 11.2,
    cn: 0.6,
    ch: 0.0,
    cr: 0.5,
    ia: 0.0,
    wt: 6.0,
    wd: 6.0,
  },
  ITA: {
    fa: 86.0,
    fm: 99.0,
    es: 58.2,
    em: 137.2,
    et: 114.3,
    sc: 4.2,
    sd: 17.7,
    si: 14.7,
    ss: 24.2,
    ph: 0.5,
    pl: 0.5,
    pm: 0.5,
    gc: 0.9,
    gd: 0.5,
    ge: 0.9,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 20.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 100.0,
    ib: 100.0,
    ie: 85.4,
    iu: 76.3,
    ia: 1.0,
    wt: 1319,
    wc: 573.0,
    wd: 189.0,
    we: 161.0,
    wa: 145.0,
    bc: 99.2,
    bi: 98.2,
    bw: 71.3,
    br: 11.0,
    bp: 40.9,
  },
  VEN: {
    fa: 87.3,
    fm: 95.3,
    fi: 67.0,
    ph: 0.2,
    pl: 3.5,
    pm: 3.8,
    gc: 0.4,
    gd: 0.1,
    ge: 0.2,
    gp: 0.4,
    g1: 0.0,
    g2: 9.0,
    g3: 0.0,
    g4: 4.5,
    g5: 6.0,
    g6: 3.0,
    g7: 0.0,
    g8: 1.0,
    cl: 15.0,
    ct: 4.6,
    co: 12.2,
    cc: 4.8,
    cp: 3.9,
    cn: 0.5,
    ch: 0.0,
    cr: 0.5,
    io: 100.0,
    ia: 0.0,
    wt: 2.0,
    wc: 1.0,
    wd: 1.0,
    we: 1.0,
    wa: 1.0,
  },
  MDV: {
    fa: 79.5,
    es: 0.0,
    et: 0.3,
    ph: 2.3,
    pl: 1.4,
    pm: 0.6,
    gc: 0.6,
    gd: 0.0,
    ge: 0.3,
    gp: 0.7,
    g1: 9.0,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 9.0,
    g6: 3.0,
    g7: 0.0,
    g8: 1.0,
    cl: 4.5,
    ct: 0.0,
    co: 4.9,
    cc: 3.2,
    cp: 2.3,
    cn: 0.0,
    ch: 0.0,
    cr: 0.3,
    ia: 1.0,
  },
  KHM: {
    fa: 39.0,
    fm: 81.3,
    fi: 72.5,
    es: 6.4,
    em: 1.5,
    et: 9.1,
    ph: 1.9,
    pl: 1.9,
    pm: 4.0,
    gc: 0.7,
    gd: 0.3,
    ge: 0.6,
    gp: 0.7,
    g1: 9.0,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 9.0,
    g6: 3.0,
    g7: 3.0,
    g8: 1.0,
    cl: 11.8,
    ct: 4.6,
    co: 8.3,
    cc: 6.2,
    cp: 6.2,
    cn: 0.5,
    ch: 0.0,
    cr: 0.4,
    io: 82.6,
    ia: 0.0,
    wt: 2.0,
    wd: 1.0,
  },
  MRT: {
    fa: 27.3,
    fm: 85.3,
    fi: 39.2,
    es: 0.4,
    em: 0.6,
    et: 2.1,
    ph: 3.7,
    pl: 1.5,
    pm: 0.9,
    gc: 0.4,
    gd: 0.0,
    ge: 0.3,
    gp: 0.0,
    g1: 0.0,
    g2: 0.0,
    g3: 0.0,
    g4: 0.0,
    g5: 9.0,
    g6: 6.0,
    g7: 3.0,
    g8: 1.0,
    cl: 17.4,
    ct: 1.4,
    co: 10.6,
    cc: 1.1,
    cp: 8.9,
    cn: 0.2,
    ch: 0.0,
    cr: 0.8,
    io: 96.6,
    ia: 0.0,
    wt: 1.0,
    wd: 1.0,
  },
  LIE: {
    ph: 0.1,
    pl: 0.1,
    pm: 0.1,
    gc: 0.2,
    gd: 0.1,
    ge: 0.5,
    gp: 0.4,
    g1: 9.0,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 18.7,
    ct: 7.2,
    co: 3.6,
    cc: 9.0,
    cp: 13.4,
    cn: 0.5,
    ch: 0.0,
    cr: 0.9,
    ib: 100.0,
    ia: 1.0,
    wt: 41.0,
    wc: 23.0,
    wd: 9.0,
    we: 3.0,
    wa: 1.0,
  },
  BLR: {
    fa: 81.2,
    es: 4.5,
    em: 34.1,
    et: 23.4,
    sc: 3.4,
    sd: 27.9,
    si: 13.0,
    ss: 14.1,
    ph: 0.8,
    pl: 0.8,
    pm: 0.7,
    gc: 0.5,
    gd: 0.2,
    ge: 0.3,
    gp: 0.6,
    g1: 9.0,
    g2: 9.0,
    g3: 0.0,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 18.6,
    ct: 2.8,
    co: 12.0,
    cc: 9.1,
    cp: 19.1,
    cn: 0.3,
    ch: 0.5,
    cr: 0.9,
    io: 95.1,
    ib: 100.0,
    ia: 0.0,
    wt: 10.0,
    wc: 4.0,
    wd: 1.0,
    we: 3.0,
    wa: 1.0,
    bc: 99.9,
    bi: 98.8,
    bw: 71.6,
    br: 43.5,
    bp: 59.2,
  },
  MLT: {
    fa: 96.6,
    fm: 97.0,
    es: 1.3,
    em: 3.6,
    et: 2.5,
    sc: 2.7,
    sd: 0.0,
    si: 6.8,
    ss: 24.2,
    ph: 0.4,
    pl: 0.4,
    pm: 0.2,
    gc: 0.7,
    gd: 0.7,
    ge: 0.8,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 18.7,
    cc: 17.0,
    cp: 17.7,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 98.6,
    ib: 100.0,
    ia: 1.0,
    wt: 57.0,
    wc: 44.0,
    wd: 3.0,
    we: 2.0,
    wa: 1.0,
    bc: 97.0,
    bi: 96.3,
    bw: 81.5,
    br: 17.9,
    bp: 25.8,
  },
  OMN: {
    fa: 69.5,
    fm: 98.2,
    sd: 14.4,
    si: 16.4,
    ss: 62.6,
    ph: 0.8,
    pl: 0.6,
    pm: 0.3,
    gc: 0.9,
    gd: 0.7,
    ge: 0.9,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 19.6,
    ct: 18.4,
    co: 20.0,
    cc: 19.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 96.5,
    ia: 1.0,
    wt: 19.0,
    wc: 7.0,
    wd: 5.0,
    we: 1.0,
    wa: 2.0,
  },
  STP: {
    ph: 6.5,
    pl: 2.9,
    pm: 3.0,
    gc: 0.3,
    gd: 0.1,
    ge: 0.2,
    gp: 0.3,
    g1: 0.0,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 9.8,
    ct: 1.4,
    co: 3.2,
    cc: 1.0,
    cp: 5.1,
    cn: 0.2,
    ch: 0.0,
    cr: 0.4,
    ia: 0.0,
    wt: 1.0,
  },
  BRN: {
    es: 0.2,
    et: 1.7,
    sc: 14.6,
    sd: 16.9,
    si: 11.7,
    ss: 11.8,
    ph: 0.5,
    pl: 0.2,
    pm: 0.2,
    gc: 0.6,
    gd: 0.6,
    ge: 0.6,
    gp: 0.8,
    g1: 4.5,
    g2: 9.0,
    g3: 0.0,
    g4: 4.5,
    g5: 9.0,
    g6: 3.0,
    g7: 0.0,
    g8: 1.0,
    cl: 17.2,
    ct: 14.9,
    co: 11.3,
    cc: 10.8,
    cp: 16.2,
    cn: 0.9,
    ch: 1.0,
    cr: 0.7,
    ia: 1.0,
    wt: 1.0,
    wc: 1.0,
    wd: 1.0,
    wa: 1.0,
    bc: 47.0,
    bi: 39.7,
    bw: 12.3,
    br: 13.9,
    bp: 18.7,
  },
  USA: {
    fa: 97.0,
    fm: 98.0,
    es: 209.6,
    em: 671.3,
    et: 1045,
    ph: 0.7,
    pl: 0.7,
    pm: 0.6,
    gc: 0.8,
    gd: 0.6,
    ge: 0.8,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 0.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 19.9,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 80.0,
    ib: 100.0,
    ie: 41.7,
    iu: 76.5,
    ia: 1.0,
    wt: 148239,
    wc: 69781,
    wd: 40935,
    we: 10563,
    wa: 14233,
  },
  NAM: {
    fa: 72.9,
    fm: 80.1,
    fi: 32.0,
    es: 0.9,
    em: 0.7,
    et: 2.0,
    ph: 2.8,
    pl: 1.1,
    pm: 0.9,
    gc: 0.5,
    gd: 0.2,
    ge: 0.4,
    gp: 0.6,
    g1: 4.5,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 3.0,
    g6: 3.0,
    g7: 0.0,
    g8: 1.0,
    cl: 5.7,
    ct: 3.5,
    co: 16.4,
    cc: 4.6,
    cp: 6.8,
    cn: 0.4,
    ch: 0.0,
    cr: 0.2,
    io: 93.0,
    ia: 0.0,
  },
  GMB: {
    fa: 38.2,
    fm: 79.8,
    fi: 46.2,
    es: 0.9,
    et: 2.0,
    ph: 16.1,
    pl: 6.4,
    pm: 5.2,
    gc: 0.3,
    gd: 0.2,
    ge: 0.3,
    gp: 0.1,
    g1: 0.0,
    g2: 0.0,
    g3: 0.0,
    g4: 0.0,
    g5: 9.0,
    g6: 6.0,
    g7: 0.0,
    g8: 1.0,
    cl: 14.8,
    ct: 10.3,
    co: 15.8,
    cc: 8.7,
    cp: 12.2,
    cn: 0.8,
    ch: 0.0,
    cr: 0.7,
    io: 69.8,
    ia: 0.0,
  },
  GNB: {
    es: 0.8,
    et: 0.9,
    ph: 15.3,
    pl: 6.1,
    pm: 14.1,
    gc: 0.3,
    gd: 0.1,
    ge: 0.1,
    gp: 0.4,
    g1: 0.0,
    g2: 9.0,
    g3: 0.0,
    g4: 4.5,
    g5: 6.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 0.0,
    ct: 0.0,
    co: 0.0,
    cc: 0.0,
    cp: 6.4,
    cn: 0.0,
    ch: 0.0,
    cr: 0.0,
    ia: 0.0,
  },
  ARE: {
    fa: 85.7,
    es: 12.4,
    em: 15.3,
    et: 42.3,
    ph: 0.8,
    pl: 0.4,
    pm: 0.1,
    gc: 0.9,
    gd: 1.0,
    ge: 1.0,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 3.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 20.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 92.0,
    ib: 100.0,
    ia: 1.0,
    wt: 89.0,
    wc: 42.0,
    wd: 18.0,
    we: 8.0,
    wa: 1.0,
    bc: 97.7,
    bi: 94.7,
    bw: 73.1,
    br: 22.4,
    bp: 23.7,
  },
  DNK: {
    fa: 98.7,
    fm: 99.3,
    es: 8.7,
    em: 18.6,
    et: 13.3,
    sc: 15.4,
    sd: 10.1,
    si: 5.8,
    ph: 0.4,
    pl: 0.2,
    pm: 0.2,
    gc: 0.8,
    gd: 0.9,
    ge: 0.8,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 20.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 99.7,
    ie: 98.0,
    iu: 96.4,
    ia: 1.0,
    wt: 981.0,
    wc: 263.0,
    wd: 84.0,
    we: 57.0,
    wa: 523.0,
    bc: 100.0,
    bi: 99.9,
    bw: 93.3,
    br: 29.0,
    bp: 71.9,
  },
  MAC: {
    ph: 0.2,
    pl: 0.2,
    pm: 0.1,
    gc: 0.3,
    gd: 0.1,
    ge: 0.2,
    gp: 0.7,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 0.0,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    ia: 1.0,
    wt: 8.0,
    wc: 1.0,
    wd: 4.0,
    we: 1.0,
    wa: 2.0,
  },
  UKR: {
    fa: 87.6,
    fm: 97.0,
    es: 13.7,
    em: 47.8,
    et: 41.9,
    ph: 1.4,
    pl: 1.4,
    pm: 1.1,
    gc: 0.7,
    gd: 0.7,
    ge: 0.8,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 19.4,
    ct: 17.4,
    co: 16.0,
    cc: 14.6,
    cp: 16.6,
    cn: 0.8,
    ch: 0.0,
    cr: 0.9,
    io: 100.0,
    ie: 49.4,
    iu: 72.6,
    ia: 1.0,
    wt: 25.0,
    wc: 8.0,
    wd: 7.0,
    we: 3.0,
    wa: 4.0,
  },
  MLI: {
    fa: 54.8,
    fm: 84.2,
    fi: 22.9,
    es: 2.4,
    em: 2.6,
    et: 4.4,
    ph: 16.9,
    pl: 9.4,
    pm: 11.6,
    gc: 0.5,
    gd: 0.0,
    ge: 0.5,
    gp: 0.6,
    g1: 4.5,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 12.4,
    ct: 4.6,
    co: 2.9,
    cc: 0.8,
    cp: 8.9,
    cn: 0.5,
    ch: 0.0,
    cr: 0.4,
    io: 67.5,
    ia: 0.0,
    wt: 1.0,
    wa: 1.0,
  },
  VCT: {
    ph: 4.7,
    pl: 4.7,
    pm: 3.9,
    gc: 0.4,
    gd: 0.0,
    ge: 0.4,
    gp: 0.5,
    g1: 4.5,
    g2: 4.5,
    g3: 0.0,
    g4: 0.0,
    g5: 3.0,
    g6: 6.0,
    g7: 0.0,
    g8: 1.0,
    cl: 11.6,
    ct: 0.0,
    co: 4.7,
    cc: 3.8,
    cp: 6.5,
    cn: 0.0,
    ch: 0.0,
    cr: 0.3,
    ia: 0.0,
    wt: 2.0,
    wc: 2.0,
    wd: 1.0,
    wa: 2.0,
  },
  ALB: {
    fa: 46.1,
    fm: 93.2,
    es: 0.5,
    em: 0.1,
    et: 8.2,
    ph: 1.9,
    pl: 1.3,
    pm: 1.3,
    gc: 0.7,
    gd: 0.7,
    ge: 0.7,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 18.4,
    co: 19.5,
    cc: 12.1,
    cp: 16.6,
    cn: 0.8,
    ch: 1.0,
    cr: 1.0,
    io: 93.5,
    ia: 0.0,
    wt: 2.0,
    wa: 1.0,
  },
  PER: {
    fa: 59.3,
    fm: 85.7,
    fi: 62.8,
    es: 2.5,
    em: 2.6,
    et: 40.9,
    ph: 1.1,
    pl: 1.1,
    pm: 0.8,
    gc: 0.8,
    gd: 0.8,
    ge: 0.9,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 13.5,
    co: 18.3,
    cc: 15.0,
    cp: 16.8,
    cn: 0.8,
    ch: 1.0,
    cr: 1.0,
    io: 100.0,
    ie: 14.3,
    iu: 27.7,
    ia: 1.0,
    wt: 3.0,
    wc: 3.0,
    wd: 3.0,
    we: 1.0,
    wa: 1.0,
    bc: 93.7,
    bi: 92.1,
    bw: 29.2,
    br: 8.8,
    bp: 20.8,
  },
  BEL: {
    fa: 98.2,
    fm: 94.2,
    es: 7.2,
    em: 14.2,
    et: 22.3,
    sc: 14.4,
    sd: 12.9,
    si: 15.8,
    ss: 20.6,
    ph: 0.4,
    pl: 0.4,
    pm: 0.3,
    gc: 0.8,
    gd: 0.7,
    ge: 0.8,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 18.1,
    co: 19.5,
    cc: 19.2,
    cp: 20.0,
    cn: 0.9,
    ch: 1.0,
    cr: 1.0,
    io: 97.7,
    ib: 100.0,
    ie: 75.7,
    iu: 93.0,
    ia: 1.0,
    wt: 698.0,
    wc: 319.0,
    wd: 89.0,
    we: 82.0,
    wa: 156.0,
    bc: 100.0,
    bi: 99.1,
    bw: 81.0,
    br: 25.6,
    bp: 39.9,
  },
  CIV: {
    fa: 57.6,
    fm: 89.2,
    fi: 24.6,
    es: 16.0,
    et: 52.6,
    ph: 3.8,
    pl: 1.5,
    pm: 1.5,
    gc: 0.4,
    gd: 0.4,
    ge: 0.5,
    gp: 0.6,
    g1: 4.5,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 19.4,
    ct: 15.3,
    co: 17.9,
    cc: 11.3,
    cp: 15.1,
    cn: 1.0,
    ch: 1.0,
    cr: 0.9,
    io: 69.4,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
    wd: 1.0,
  },
  YEM: {
    fa: 11.9,
    ph: 17.3,
    pl: 9.6,
    pm: 3.2,
    gc: 0.3,
    gd: 0.1,
    ge: 0.2,
    gp: 0.2,
    g1: 0.0,
    g2: 0.0,
    g3: 0.0,
    g4: 0.0,
    g5: 0.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 5.3,
    ct: 1.9,
    co: 0.0,
    cc: 0.0,
    cp: 0.0,
    cn: 0.2,
    ch: 0.0,
    cr: 0.2,
    io: 34.9,
    ib: 29.4,
    ia: 0.0,
    wt: 4.0,
    wc: 4.0,
    wd: 1.0,
  },
  AUT: {
    fa: 99.5,
    fm: 92.8,
    es: 9.9,
    em: 39.6,
    et: 14.0,
    sc: 4.5,
    sd: 23.0,
    si: 12.6,
    ss: 25.7,
    ph: 0.2,
    pl: 0.2,
    pm: 0.1,
    gc: 0.9,
    gd: 0.8,
    ge: 0.9,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 18.4,
    ct: 18.2,
    co: 17.6,
    cc: 18.3,
    cp: 16.6,
    cn: 0.9,
    ch: 1.0,
    cr: 0.8,
    io: 57.7,
    ib: 100.0,
    ie: 44.7,
    iu: 85.1,
    ia: 1.0,
    wt: 665.0,
    wc: 276.0,
    wd: 63.0,
    we: 68.0,
    wa: 207.0,
    bc: 99.6,
    bi: 99.0,
    bw: 88.1,
    br: 19.4,
    bp: 66.0,
  },
  KEN: {
    fa: 90.1,
    fm: 92.7,
    fi: 37.1,
    es: 18.4,
    em: 7.4,
    et: 28.9,
    ph: 4.1,
    pl: 1.3,
    pm: 1.3,
    gc: 0.8,
    gd: 0.7,
    ge: 0.6,
    gp: 0.9,
    g1: 4.5,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 19.5,
    ct: 19.1,
    co: 20.0,
    cc: 20.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 0.9,
    io: 86.8,
    ib: 76.0,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
    wd: 1.0,
    we: 1.0,
    wa: 1.0,
    bc: 92.2,
    bi: 90.2,
    bw: 84.5,
    br: 26.4,
    bp: 32.9,
  },
  ROU: {
    fa: 71.3,
    fm: 95.2,
    es: 30.4,
    em: 51.3,
    et: 55.4,
    sc: 22.7,
    sd: 27.8,
    si: 17.7,
    ph: 0.4,
    pl: 0.4,
    pm: 0.4,
    gc: 0.6,
    gd: 0.3,
    ge: 0.6,
    gp: 0.7,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 14.9,
    co: 17.3,
    cc: 19.4,
    cp: 20.0,
    cn: 0.9,
    ch: 1.0,
    cr: 1.0,
    io: 99.2,
    ib: 100.0,
    ia: 0.0,
    wt: 72.0,
    wc: 36.0,
    wd: 11.0,
    we: 1.0,
    wa: 8.0,
    bc: 85.9,
    bi: 83.8,
    bw: 42.4,
    br: 7.4,
    bp: 13.8,
  },
  COG: {
    fa: 55.6,
    fm: 73.2,
    fi: 8.1,
    es: 16.0,
    em: 3.9,
    et: 7.8,
    ph: 7.7,
    pl: 6.0,
    pm: 3.9,
    gc: 0.3,
    gd: 0.0,
    ge: 0.2,
    gp: 0.1,
    g1: 0.0,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 9.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 14.1,
    ct: 0.0,
    co: 3.9,
    cc: 0.7,
    cp: 8.9,
    cn: 0.0,
    ch: 0.0,
    cr: 0.7,
    io: 54.0,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
  },
  JPN: {
    fa: 98.5,
    fm: 93.8,
    es: 2067,
    em: 841.3,
    et: 208.7,
    sd: 16.7,
    ph: 0.7,
    pl: 0.6,
    pm: 0.4,
    gc: 0.6,
    gd: 0.7,
    ge: 0.8,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 19.6,
    co: 20.0,
    cc: 19.1,
    cp: 18.9,
    cn: 0.9,
    ch: 1.0,
    cr: 1.0,
    io: 95.0,
    ib: 100.0,
    ie: 79.2,
    iu: 35.4,
    ia: 1.0,
    wt: 72425,
    wc: 26528,
    wd: 12065,
    we: 7157,
    wa: 15528,
    bi: 99.5,
    bw: 89.6,
    br: 20.2,
    bp: 32.7,
  },
  BHR: {
    fa: 82.3,
    fm: 97.7,
    sc: 4.1,
    sd: 16.0,
    si: 8.6,
    ss: 18.0,
    ph: 1.1,
    pl: 1.1,
    pm: 1.1,
    gc: 0.7,
    gd: 0.9,
    ge: 0.9,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 20.0,
    cp: 17.9,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 98.9,
    ie: 58.6,
    iu: 84.7,
    ia: 1.0,
    wt: 2.0,
    wc: 2.0,
    wd: 1.0,
    we: 2.0,
  },
  LVA: {
    fa: 95.0,
    fm: 97.9,
    es: 8.5,
    em: 3.5,
    et: 4.1,
    sc: 18.7,
    sd: 27.3,
    si: 15.9,
    ph: 0.9,
    pl: 0.6,
    pm: 0.5,
    gc: 0.7,
    gd: 0.9,
    ge: 0.8,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 14.9,
    co: 19.3,
    cc: 14.1,
    cp: 14.3,
    cn: 0.9,
    ch: 1.0,
    cr: 1.0,
    io: 97.3,
    ib: 100.0,
    ie: 56.4,
    iu: 81.0,
    ia: 1.0,
    wt: 18.0,
    wc: 9.0,
    wd: 1.0,
    we: 2.0,
    wa: 5.0,
    bc: 98.7,
    bi: 96.8,
    bw: 63.5,
    br: 10.2,
    bp: 41.1,
  },
  LSO: {
    fa: 61.6,
    fm: 79.0,
    fi: 13.0,
    et: 1.4,
    ph: 13.0,
    pl: 8.9,
    pm: 5.2,
    gc: 0.5,
    gd: 0.3,
    ge: 0.3,
    gp: 0.4,
    g1: 4.5,
    g2: 0.0,
    g3: 4.5,
    g4: 0.0,
    g5: 9.0,
    g6: 6.0,
    g7: 3.0,
    g8: 1.0,
    cl: 7.5,
    ct: 2.8,
    co: 3.9,
    cc: 5.3,
    cp: 11.2,
    cn: 0.2,
    ch: 0.0,
    cr: 0.3,
    io: 83.6,
    ib: 80.1,
    ia: 0.0,
    wt: 1.0,
  },
  ESP: {
    fa: 98.4,
    fm: 97.5,
    es: 23.7,
    em: 53.0,
    et: 130.1,
    sc: 4.8,
    sd: 21.6,
    si: 9.2,
    ss: 17.2,
    ph: 0.4,
    pl: 0.4,
    pm: 0.6,
    gc: 0.9,
    gd: 0.8,
    ge: 0.9,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 19.7,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 98.0,
    ia: 1.0,
    wt: 567.0,
    wc: 255.0,
    wd: 82.0,
    we: 72.0,
    wa: 80.0,
    bc: 98.8,
    bi: 97.9,
    bw: 75.0,
    br: 20.6,
    bp: 31.6,
  },
  QAT: {
    fa: 65.9,
    ph: 0.3,
    pl: 0.2,
    pm: 0.2,
    gc: 0.8,
    gd: 0.9,
    ge: 0.8,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 20.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    ib: 100.0,
    ia: 1.0,
    wt: 25.0,
    wc: 13.0,
    wd: 6.0,
    we: 3.0,
    wa: 1.0,
    bc: 89.9,
    bi: 97.0,
    bw: 41.5,
    br: 32.1,
    bp: 31.7,
  },
  ZAF: {
    fa: 81.1,
    fm: 87.0,
    fi: 41.6,
    ph: 3.7,
    pl: 1.1,
    pm: 0.7,
    gc: 0.6,
    gd: 0.5,
    ge: 0.6,
    gp: 0.7,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 18.6,
    co: 14.8,
    cc: 12.8,
    cp: 20.0,
    cn: 0.9,
    ch: 0.5,
    cr: 1.0,
    io: 89.1,
    ia: 0.0,
    wt: 132.0,
    wc: 62.0,
    wd: 8.0,
    we: 14.0,
    wa: 12.0,
    bc: 98.1,
    bi: 98.0,
    bw: 59.3,
    br: 31.2,
    bp: 30.4,
  },
  COM: {
    fa: 45.5,
    fm: 71.9,
    fi: 15.5,
    et: 1.1,
    ph: 7.4,
    pl: 5.9,
    pm: 6.6,
    gc: 0.4,
    gd: 0.2,
    ge: 0.3,
    gp: 0.1,
    g1: 4.5,
    g2: 4.5,
    g3: 0.0,
    g4: 0.0,
    g5: 0.0,
    g6: 3.0,
    g7: 0.0,
    g8: 1.0,
    cl: 18.0,
    ct: 7.9,
    co: 7.3,
    cc: 4.5,
    cp: 1.5,
    cn: 0.2,
    ch: 0.0,
    cr: 0.8,
    io: 67.5,
    ib: 95.1,
    ia: 0.0,
  },
  SMR: {
    ph: 0.5,
    pl: 0.5,
    pm: 0.2,
    gc: 0.2,
    gd: 0.0,
    ge: 0.2,
    gp: 0.5,
    g1: 4.5,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 0.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 16.1,
    ct: 0.0,
    co: 2.0,
    cc: 0.0,
    cp: 7.8,
    cn: 0.0,
    ch: 0.0,
    cr: 0.6,
    ib: 100.0,
    ia: 0.0,
    wt: 1.0,
    wc: 1.0,
    wd: 4.0,
    we: 1.0,
    wa: 2.0,
  },
  NRU: {
    ph: 3.6,
    pl: 3.6,
    pm: 0.9,
    gc: 0.2,
    gd: 0.0,
    ge: 0.1,
    gp: 0.0,
    g1: 0.0,
    g2: 0.0,
    g3: 0.0,
    g4: 0.0,
    g5: 0.0,
    g6: 0.0,
    g7: 0.0,
    g8: 0.0,
    cl: 10.5,
    ct: 0.0,
    co: 1.0,
    cc: 2.9,
    cp: 7.2,
    cn: 0.0,
    ch: 0.0,
    cr: 0.2,
    ib: 99.1,
    ia: 0.0,
  },
  CAF: {
    fa: 13.8,
    ph: 56.4,
    pl: 18.1,
    pm: 11.8,
    gc: 0.2,
    gd: 0.1,
    ge: 0.1,
    gp: 0.2,
    g1: 0.0,
    g2: 9.0,
    g3: 0.0,
    g4: 4.5,
    g5: 0.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 4.8,
    ct: 0.0,
    co: 0.0,
    cc: 0.0,
    cp: 0.0,
    cn: 0.0,
    ch: 0.0,
    cr: 0.2,
    ia: 0.0,
    wt: 1.0,
    we: 1.0,
  },
  MWI: {
    fa: 50.4,
    fm: 59.0,
    fi: 7.9,
    es: 3.5,
    et: 2.7,
    sc: 12.0,
    sd: 1.2,
    si: 3.4,
    ss: 0.5,
    ph: 11.5,
    pl: 7.7,
    pm: 3.5,
    gc: 0.3,
    gd: 0.0,
    ge: 0.4,
    gp: 0.4,
    g1: 0.0,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 6.0,
    g6: 3.0,
    g7: 0.0,
    g8: 1.0,
    cl: 18.2,
    ct: 16.1,
    co: 17.4,
    cc: 12.3,
    cp: 16.6,
    cn: 1.0,
    ch: 1.0,
    cr: 0.8,
    io: 88.8,
    ia: 0.0,
    wt: 1.0,
    bc: 74.8,
    bi: 69.8,
    bw: 28.9,
    bp: 47.9,
  },
  NIC: {
    fa: 23.5,
    fm: 85.3,
    fi: 52.0,
    ph: 3.9,
    pl: 3.9,
    pm: 4.4,
    gc: 0.5,
    gd: 0.0,
    ge: 0.2,
    gp: 0.6,
    g1: 0.0,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 0.0,
    g6: 6.0,
    g7: 3.0,
    g8: 1.0,
    cl: 12.3,
    ct: 0.0,
    co: 6.0,
    cc: 0.0,
    cp: 2.3,
    cn: 0.0,
    ch: 0.0,
    cr: 0.6,
    io: 86.1,
    ia: 0.0,
    wt: 1.0,
    we: 1.0,
  },
  IDN: {
    fa: 56.3,
    fm: 80.3,
    fi: 60.0,
    es: 118.7,
    em: 144.1,
    et: 738.0,
    sc: 49.1,
    sd: 6.0,
    si: 19.2,
    ph: 1.2,
    pl: 1.3,
    pm: 1.3,
    gc: 0.8,
    gd: 0.8,
    ge: 0.8,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 20.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 95.7,
    ib: 85.1,
    ie: 16.7,
    iu: 38.1,
    ia: 1.0,
    wt: 7.0,
    wc: 5.0,
    wd: 1.0,
    we: 1.0,
    wa: 1.0,
    bc: 64.8,
    bi: 100.0,
    bw: 2.0,
    br: 100.0,
    bp: 100.0,
  },
  PRT: {
    fa: 91.4,
    fm: 94.7,
    es: 3.4,
    em: 17.2,
    et: 32.1,
    sc: 19.5,
    sd: 11.6,
    si: 9.7,
    ph: 0.4,
    pl: 0.4,
    pm: 0.4,
    gc: 0.9,
    gd: 0.7,
    ge: 0.9,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 19.9,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 94.9,
    ie: 41.7,
    iu: 70.1,
    ia: 1.0,
    wt: 135.0,
    wc: 83.0,
    wd: 18.0,
    we: 9.0,
    wa: 8.0,
    bc: 99.0,
    bi: 98.1,
    bw: 64.2,
    br: 18.8,
    bp: 27.3,
  },
  PAN: {
    fa: 64.1,
    fm: 83.6,
    fi: 61.5,
    es: 0.6,
    em: 0.7,
    et: 6.6,
    ph: 1.4,
    pl: 1.4,
    pm: 0.6,
    gc: 0.8,
    gd: 0.8,
    ge: 0.9,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 14.0,
    ct: 14.5,
    co: 13.2,
    cc: 7.1,
    cp: 17.7,
    cn: 0.9,
    ch: 0.5,
    cr: 0.7,
    io: 98.4,
    ie: 25.3,
    iu: 40.6,
    ia: 1.0,
    wt: 22.0,
    wc: 8.0,
    wd: 5.0,
    we: 1.0,
    wa: 1.0,
  },
  ISR: {
    fa: 89.3,
    fm: 96.0,
    es: 5.7,
    em: 82.0,
    et: 21.9,
    ph: 0.3,
    pl: 0.3,
    pm: 0.2,
    gc: 0.6,
    gd: 0.6,
    ge: 0.8,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 19.3,
    ct: 17.9,
    co: 18.3,
    cc: 18.3,
    cp: 20.0,
    cn: 0.8,
    ch: 1.0,
    cr: 1.0,
    io: 95.4,
    ib: 100.0,
    ia: 1.0,
    wt: 2853,
    wc: 1621,
    wd: 566.0,
    we: 205.0,
    wa: 272.0,
  },
  LCA: {
    em: 0.2,
    et: 0.2,
    ph: 4.5,
    pl: 4.5,
    pm: 3.2,
    gc: 0.5,
    gd: 0.3,
    ge: 0.5,
    gp: 0.7,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 3.0,
    g6: 3.0,
    g7: 3.0,
    g8: 1.0,
    cl: 12.1,
    ct: 0.0,
    co: 1.0,
    cc: 5.1,
    cp: 8.0,
    cn: 0.0,
    ch: 0.0,
    cr: 0.6,
    ia: 0.0,
    wt: 1.0,
  },
  TTO: {
    fa: 74.6,
    fm: 91.8,
    ph: 2.7,
    pl: 1.6,
    pm: 1.3,
    gc: 0.5,
    gd: 0.4,
    ge: 0.6,
    gp: 0.6,
    g1: 9.0,
    g2: 9.0,
    g3: 0.0,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 8.9,
    ct: 7.0,
    co: 16.2,
    cc: 13.0,
    cp: 11.1,
    cn: 0.8,
    ch: 1.0,
    cr: 0.2,
    io: 85.9,
    ib: 96.1,
    ia: 1.0,
    wt: 1.0,
    wc: 1.0,
    we: 1.0,
  },
  ATG: {
    ph: 2.3,
    pl: 2.3,
    pm: 1.5,
    gc: 0.5,
    gd: 0.1,
    ge: 0.3,
    gp: 0.6,
    g1: 9.0,
    g2: 4.5,
    g3: 0.0,
    g4: 0.0,
    g5: 3.0,
    g6: 6.0,
    g7: 6.0,
    g8: 0.0,
    cl: 11.8,
    ct: 0.0,
    co: 0.0,
    cc: 2.4,
    cp: 4.0,
    cn: 0.0,
    ch: 0.0,
    cr: 0.4,
    ia: 0.0,
    wt: 332.0,
    wc: 54.0,
    wd: 197.0,
    we: 3.0,
    wa: 1.0,
  },
  PHL: {
    fa: 50.2,
    fm: 78.0,
    fi: 58.5,
    es: 90.8,
    em: 361.4,
    et: 205.1,
    sc: 5.8,
    sd: 18.4,
    si: 17.5,
    ss: 6.3,
    ph: 2.4,
    pl: 1.6,
    pm: 1.8,
    gc: 0.7,
    gd: 0.6,
    ge: 0.8,
    gp: 0.8,
    g1: 4.5,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 19.1,
    co: 19.5,
    cc: 17.2,
    cp: 17.7,
    cn: 0.9,
    ch: 1.0,
    cr: 1.0,
    io: 70.3,
    ib: 94.0,
    ia: 0.0,
    wt: 19.0,
    wc: 10.0,
    wd: 2.0,
    we: 3.0,
    wa: 1.0,
    bc: 85.6,
    bi: 80.6,
    bw: 24.3,
    br: 4.7,
    bp: 21.4,
  },
  UGA: {
    fa: 72.8,
    fm: 78.6,
    fi: 18.9,
    es: 3.7,
    em: 16.9,
    et: 11.5,
    ph: 8.0,
    pl: 3.9,
    pm: 3.4,
    gc: 0.9,
    gd: 0.9,
    ge: 0.8,
    gp: 0.9,
    g1: 4.5,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 16.4,
    ct: 18.2,
    co: 17.6,
    cc: 13.8,
    cp: 17.1,
    cn: 0.8,
    ch: 1.0,
    cr: 0.7,
    io: 42.6,
    ie: 3.4,
    ia: 1.0,
    wt: 1.0,
    wc: 1.0,
    wd: 1.0,
  },
  COD: {
    fa: 39.2,
    fm: 54.4,
    fi: 16.5,
    es: 100.5,
    em: 57.5,
    et: 46.0,
    ph: 31.3,
    pl: 16.9,
    pm: 15.0,
    gc: 0.3,
    gd: 0.3,
    ge: 0.3,
    gp: 0.2,
    g1: 0.0,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 9.0,
    g6: 3.0,
    g7: 3.0,
    g8: 0.0,
    cl: 17.3,
    ct: 5.5,
    co: 14.5,
    cc: 9.1,
    cp: 10.4,
    cn: 0.2,
    ch: 0.0,
    cr: 0.7,
    io: 69.5,
    ia: 0.0,
    wt: 2.0,
    wc: 1.0,
    wd: 1.0,
    we: 1.0,
  },
  TLS: {
    es: 0.0,
    em: 0.1,
    et: 0.0,
    ph: 3.9,
    pl: 3.1,
    pm: 3.4,
    gc: 0.4,
    gd: 0.2,
    ge: 0.3,
    gp: 0.5,
    g1: 0.0,
    g2: 0.0,
    g3: 4.5,
    g4: 0.0,
    g5: 3.0,
    g6: 3.0,
    g7: 0.0,
    g8: 1.0,
    cl: 6.2,
    ct: 0.0,
    co: 2.9,
    cc: 1.0,
    cp: 6.7,
    cn: 0.0,
    ch: 0.0,
    cr: 0.1,
    ia: 0.0,
  },
  VUT: {
    es: 0.2,
    em: 0.0,
    et: 0.2,
    ph: 7.5,
    pl: 6.2,
    pm: 5.9,
    gc: 0.4,
    gd: 0.2,
    ge: 0.3,
    gp: 0.5,
    g1: 4.5,
    g2: 0.0,
    g3: 4.5,
    g4: 0.0,
    g5: 3.0,
    g6: 3.0,
    g7: 3.0,
    g8: 1.0,
    cl: 15.6,
    ct: 14.5,
    co: 17.4,
    cc: 5.6,
    cp: 16.2,
    cn: 0.9,
    ch: 0.0,
    cr: 0.6,
    ib: 76.7,
    ia: 0.0,
    wt: 5.0,
    wc: 2.0,
    wd: 1.0,
  },
  GBR: {
    fa: 99.3,
    fm: 91.8,
    es: 36.5,
    em: 183.0,
    et: 161.1,
    ph: 0.3,
    pl: 0.3,
    pm: 0.3,
    gc: 0.7,
    gd: 0.9,
    ge: 0.8,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 0.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 20.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 94.4,
    ib: 100.0,
    ia: 0.0,
    wt: 5286,
    wc: 2990,
    wd: 815.0,
    we: 384.0,
    wa: 696.0,
  },
  NZL: {
    fa: 97.9,
    fm: 94.4,
    ph: 0.7,
    pl: 0.3,
    pm: 0.2,
    gc: 0.8,
    gd: 0.9,
    ge: 0.7,
    gp: 0.9,
    g1: 4.5,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 0.0,
    cl: 19.5,
    ct: 15.3,
    co: 17.4,
    cc: 16.1,
    cp: 14.3,
    cn: 1.0,
    ch: 1.0,
    cr: 0.9,
    io: 91.3,
    ib: 100.0,
    ie: 54.0,
    iu: 85.0,
    ia: 1.0,
    wt: 311.0,
    wc: 214.0,
    wd: 27.0,
    we: 16.0,
    wa: 24.0,
  },
  BEN: {
    fa: 51.8,
    fm: 77.0,
    fi: 16.1,
    es: 4.3,
    et: 6.0,
    ph: 12.4,
    pl: 5.4,
    pm: 3.9,
    gc: 0.7,
    gd: 0.6,
    ge: 0.7,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 19.3,
    co: 20.0,
    cc: 18.0,
    cp: 14.3,
    cn: 0.9,
    ch: 1.0,
    cr: 1.0,
    io: 56.3,
    ie: 15.0,
    iu: 25.5,
    ia: 1.0,
    wt: 1.0,
    wc: 1.0,
    we: 3.0,
  },
  RUS: {
    fa: 79.3,
    fm: 94.3,
    sc: 9.2,
    sd: 19.6,
    si: 23.4,
    ss: 10.8,
    ph: 0.7,
    pl: 0.4,
    pm: 0.3,
    gc: 0.9,
    gd: 0.8,
    ge: 0.9,
    gp: 1.0,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 16.6,
    co: 20.0,
    cc: 18.8,
    cp: 16.8,
    cn: 0.6,
    ch: 1.0,
    cr: 1.0,
    io: 98.4,
    ia: 0.0,
    wt: 706.0,
    wc: 376.0,
    wd: 93.0,
    we: 94.0,
    wa: 58.0,
    bc: 90.6,
    bi: 87.8,
    bw: 48.5,
    br: 25.9,
    bp: 40.6,
  },
  CHE: {
    fa: 98.4,
    fm: 91.5,
    es: 9.1,
    em: 92.8,
    et: 19.3,
    sc: 4.8,
    sd: 23.8,
    si: 7.6,
    ss: 18.9,
    ph: 0.5,
    pl: 0.4,
    pm: 0.3,
    gc: 0.7,
    gd: 0.7,
    ge: 0.8,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 19.6,
    co: 17.5,
    cc: 18.3,
    cp: 15.8,
    cn: 0.9,
    ch: 1.0,
    cr: 1.0,
    io: 91.0,
    ib: 100.0,
    ie: 53.3,
    iu: 64.8,
    ia: 1.0,
    wt: 2863,
    wc: 1356,
    wd: 584.0,
    we: 192.0,
    wa: 414.0,
    bc: 100.0,
    bi: 100.0,
    bw: 100.0,
    br: 18.0,
    bp: 58.6,
  },
  BHS: {
    et: 2.8,
    ph: 1.3,
    pl: 1.1,
    pm: 0.8,
    gc: 0.6,
    gd: 0.2,
    ge: 0.3,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 3.0,
    g6: 6.0,
    g7: 6.0,
    g8: 0.0,
    cl: 11.3,
    ct: 3.2,
    co: 5.5,
    cc: 6.1,
    cp: 8.0,
    cn: 0.4,
    ch: 0.0,
    cr: 0.5,
    ia: 1.0,
    wt: 16.0,
    wc: 9.0,
    wd: 1.0,
    we: 1.0,
    wa: 1.0,
  },
  EGY: {
    fa: 43.1,
    fm: 84.6,
    fi: 44.6,
    es: 27.0,
    em: 22.1,
    et: 129.2,
    ph: 1.9,
    pl: 0.7,
    pm: 0.2,
    gc: 0.8,
    gd: 0.6,
    ge: 0.8,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 3.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 20.0,
    cc: 20.0,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 98.2,
    ia: 0.0,
    wt: 13.0,
    wc: 5.0,
    wd: 2.0,
    we: 2.0,
    wa: 2.0,
    bc: 80.1,
    bi: 60.5,
    bw: 38.0,
    br: 5.0,
    bp: 4.1,
  },
  ISL: {
    fa: 99.8,
    fm: 99.1,
    es: 0.5,
    em: 0.6,
    et: 1.0,
    ph: 0.2,
    pl: 0.2,
    pm: 0.2,
    gc: 0.8,
    gd: 0.9,
    ge: 0.8,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 20.0,
    co: 19.4,
    cc: 19.5,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 100.0,
    ib: 100.0,
    ie: 97.8,
    iu: 97.6,
    ia: 1.0,
    wt: 12.0,
    wc: 5.0,
    wd: 1.0,
    we: 3.0,
    wa: 1.0,
    bc: 100.0,
    bi: 100.0,
    bw: 81.7,
    br: 33.9,
    bp: 71.8,
  },
  ZMB: {
    fa: 72.7,
    fm: 78.8,
    fi: 19.0,
    es: 4.2,
    em: 2.5,
    et: 4.4,
    ph: 4.8,
    pl: 3.0,
    pm: 1.5,
    gc: 0.7,
    gd: 0.3,
    ge: 0.6,
    gp: 0.7,
    g1: 9.0,
    g2: 9.0,
    g3: 0.0,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 3.0,
    g8: 1.0,
    cl: 20.0,
    ct: 17.6,
    co: 20.0,
    cc: 15.0,
    cp: 20.0,
    cn: 0.9,
    ch: 1.0,
    cr: 1.0,
    io: 80.7,
    ia: 0.0,
  },
  AZE: {
    fa: 56.3,
    fm: 90.4,
    sc: 36.6,
    sd: 36.5,
    si: 37.5,
    ph: 1.5,
    pl: 1.2,
    pm: 0.5,
    gc: 0.7,
    gd: 0.8,
    ge: 0.6,
    gp: 0.9,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 3.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 18.0,
    co: 18.1,
    cc: 17.9,
    cp: 20.0,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 100.0,
    ib: 100.0,
    ie: 10.7,
    iu: 76.5,
    ia: 1.0,
    wt: 2.0,
    wc: 1.0,
    wd: 1.0,
    we: 1.0,
    wa: 1.0,
    bc: 37.7,
    bi: 33.1,
    bw: 6.7,
    br: 1.8,
    bp: 2.2,
  },
  BFA: {
    fa: 51.4,
    fm: 87.8,
    fi: 13.9,
    es: 1.6,
    em: 6.7,
    et: 2.3,
    ph: 16.2,
    pl: 0.2,
    pm: 0.2,
    gc: 0.6,
    gd: 0.8,
    ge: 0.7,
    gp: 0.5,
    g1: 4.5,
    g2: 4.5,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 14.2,
    ct: 12.7,
    co: 15.2,
    cc: 11.8,
    cp: 16.6,
    cn: 0.7,
    ch: 0.5,
    cr: 0.5,
    io: 88.8,
    ia: 0.0,
  },
  AND: {
    ph: 0.5,
    pl: 0.2,
    pm: 0.3,
    gc: 0.2,
    gd: 0.0,
    ge: 0.2,
    gp: 0.6,
    g1: 9.0,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 18.0,
    ct: 15.3,
    co: 13.9,
    cc: 11.6,
    cp: 17.7,
    cn: 1.0,
    ch: 1.0,
    cr: 0.8,
    ib: 100.0,
    ia: 1.0,
    wt: 3.0,
    wc: 1.0,
    wd: 1.0,
    we: 1.0,
    wa: 1.0,
    bc: 92.0,
    bi: 90.5,
    bw: 49.6,
    br: 12.5,
    bp: 12.8,
  },
  LKA: {
    fa: 81.7,
    fm: 76.6,
    fi: 31.8,
    es: 11.7,
    em: 3.1,
    et: 15.7,
    ph: 0.6,
    pl: 0.4,
    pm: 0.2,
    gc: 0.8,
    gd: 0.6,
    ge: 0.7,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 3.0,
    g8: 1.0,
    cl: 19.2,
    ct: 20.0,
    co: 16.4,
    cc: 17.1,
    cp: 14.3,
    cn: 1.0,
    ch: 1.0,
    cr: 0.9,
    io: 87.4,
    ia: 0.0,
    wt: 6.0,
    wc: 1.0,
    wd: 3.0,
    we: 2.0,
    wa: 2.0,
  },
  SSD: {
    fa: 5.8,
    ph: 30.2,
    pl: 8.2,
    pm: 4.2,
    gc: 0.1,
    gd: 0.1,
    ge: 0.1,
    gp: 0.2,
    g1: 9.0,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 0.0,
    g6: 0.0,
    g7: 0.0,
    g8: 1.0,
    cl: 12.5,
    ct: 4.6,
    co: 7.2,
    cc: 1.3,
    cp: 8.9,
    cn: 0.5,
    ch: 0.0,
    cr: 0.4,
    io: 13.2,
    ia: 0.0,
  },
  NPL: {
    fa: 60.0,
    fm: 78.4,
    fi: 39.1,
    es: 4.9,
    et: 25.1,
    ph: 3.1,
    pl: 1.6,
    pm: 1.2,
    gc: 0.6,
    gd: 0.2,
    ge: 0.4,
    gp: 0.5,
    g1: 4.5,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 19.2,
    ct: 11.1,
    co: 16.9,
    cc: 13.1,
    cp: 9.4,
    cn: 0.7,
    ch: 1.0,
    cr: 0.9,
    io: 87.0,
    ib: 73.2,
    ia: 0.0,
    wt: 2.0,
    wc: 1.0,
    wd: 1.0,
    we: 1.0,
    wa: 1.0,
  },
  CPV: {
    et: 0.8,
    ph: 1.6,
    pl: 1.6,
    pm: 3.6,
    gc: 0.9,
    gd: 0.8,
    ge: 0.8,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 17.4,
    ct: 7.9,
    co: 12.1,
    cc: 2.2,
    cp: 12.0,
    cn: 0.2,
    ch: 0.0,
    cr: 0.8,
    ia: 1.0,
    wt: 1.0,
    wc: 1.0,
  },
  DMA: {
    ph: 4.7,
    pl: 4.7,
    pm: 2.8,
    gc: 0.4,
    gd: 0.0,
    ge: 0.3,
    gp: 0.5,
    g1: 4.5,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 3.0,
    g6: 3.0,
    g7: 0.0,
    g8: 0.0,
    cl: 6.7,
    ct: 0.0,
    co: 0.0,
    cc: 8.2,
    cp: 8.0,
    cn: 0.0,
    ch: 0.0,
    cr: 0.2,
    ia: 0.0,
    wt: 2.0,
    wc: 1.0,
    wd: 1.0,
  },
  CHN: {
    fa: 89.4,
    fm: 96.7,
    ph: 0.6,
    pl: 0.3,
    pm: 0.2,
    gc: 0.6,
    gd: 0.6,
    ge: 0.6,
    gp: 0.8,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 20.0,
    ct: 17.1,
    co: 18.3,
    cc: 18.6,
    cp: 17.7,
    cn: 1.0,
    ch: 1.0,
    cr: 1.0,
    io: 98.5,
    ie: 42.5,
    iu: 81.7,
    ia: 1.0,
    wt: 465393,
    wc: 258240,
    wd: 88481,
    we: 24836,
    wa: 44805,
    bc: 99.9,
    bi: 100.0,
    bw: 41.2,
    br: 9.2,
    bp: 4.9,
  },
  NGA: {
    fa: 63.3,
    fm: 83.8,
    fi: 23.7,
    es: 13.7,
    em: 28.5,
    et: 62.2,
    ph: 3.4,
    pl: 2.7,
    pm: 1.0,
    gc: 0.6,
    gd: 0.2,
    ge: 0.5,
    gp: 0.7,
    g1: 9.0,
    g2: 9.0,
    g3: 4.5,
    g4: 4.5,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 19.5,
    ct: 18.9,
    co: 16.6,
    cc: 13.1,
    cp: 14.3,
    cn: 0.9,
    ch: 1.0,
    cr: 0.9,
    io: 66.0,
    ib: 39.7,
    ia: 0.0,
    wt: 6.0,
    wc: 2.0,
    wd: 1.0,
    we: 1.0,
    wa: 1.0,
  },
  BTN: {
    fa: 33.7,
    es: 0.3,
    et: 1.3,
    ph: 2.3,
    pl: 0.9,
    pm: 0.5,
    gc: 0.8,
    gd: 0.3,
    ge: 0.5,
    gp: 0.7,
    g1: 9.0,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 3.0,
    g6: 6.0,
    g7: 3.0,
    g8: 1.0,
    cl: 14.2,
    ct: 16.4,
    co: 13.1,
    cc: 9.9,
    cp: 7.2,
    cn: 1.0,
    ch: 0.0,
    cr: 0.5,
    ia: 1.0,
    wt: 1.0,
    wc: 1.0,
    wd: 1.0,
  },
  CRI: {
    fa: 71.3,
    fm: 91.9,
    fi: 79.7,
    es: 1.1,
    em: 7.3,
    et: 10.0,
    ph: 0.8,
    pl: 0.8,
    pm: 0.5,
    gc: 0.7,
    gd: 0.3,
    ge: 0.5,
    gp: 0.6,
    g1: 9.0,
    g2: 4.5,
    g3: 4.5,
    g4: 4.5,
    g5: 9.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 18.7,
    ct: 9.3,
    co: 18.1,
    cc: 12.2,
    cp: 16.8,
    cn: 0.5,
    ch: 0.5,
    cr: 0.9,
    io: 97.1,
    ia: 0.0,
    wt: 5.0,
    wc: 2.0,
    wd: 1.0,
    we: 1.0,
    wa: 1.0,
  },
  SLB: {
    et: 1.2,
    ph: 16.4,
    pl: 11.6,
    pm: 5.8,
    gc: 0.4,
    gd: 0.0,
    ge: 0.1,
    gp: 0.6,
    g1: 4.5,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 6.0,
    g6: 0.0,
    g7: 0.0,
    g8: 0.0,
    cl: 5.8,
    ct: 1.4,
    co: 3.9,
    cc: 0.8,
    cp: 5.8,
    cn: 0.2,
    ch: 0.0,
    cr: 0.1,
    ia: 0.0,
  },
  DJI: {
    fa: 12.3,
    ph: 9.6,
    pl: 7.7,
    pm: 1.9,
    gc: 0.3,
    gd: 0.1,
    ge: 0.3,
    gp: 0.3,
    g1: 4.5,
    g2: 0.0,
    g3: 0.0,
    g4: 4.5,
    g5: 3.0,
    g6: 3.0,
    g7: 3.0,
    g8: 1.0,
    cl: 11.8,
    ct: 3.5,
    co: 5.6,
    cc: 1.7,
    cp: 8.9,
    cn: 0.4,
    ch: 0.0,
    cr: 0.6,
    ia: 0.0,
    wt: 1.0,
    wa: 1.0,
  },
  TJK: {
    fa: 54.5,
    fm: 77.5,
    fi: 43.2,
    et: 8.2,
    ph: 5.0,
    pl: 1.9,
    pm: 2.2,
    gc: 0.3,
    gd: 0.0,
    ge: 0.3,
    gp: 0.6,
    g1: 0.0,
    g2: 9.0,
    g3: 0.0,
    g4: 0.0,
    g5: 6.0,
    g6: 6.0,
    g7: 6.0,
    g8: 1.0,
    cl: 13.3,
    ct: 0.0,
    co: 3.6,
    cc: 0.4,
    cp: 8.1,
    cn: 0.0,
    ch: 0.0,
    cr: 0.4,
    io: 86.4,
    ia: 0.0,
    wt: 2.0,
    wd: 1.0,
    we: 1.0,
  },
};
const KL = {
  fa: "Account Ownership %",
  fm: "Mobile Phone Ownership %",
  fi: "Daily Internet Use %",
  es: "ICT Services Employment (K)",
  em: "ICT Manufacturing (K)",
  et: "Telecom Employment (K)",
  sc: "Skills: Communication %",
  sd: "Skills: Content Creation %",
  si: "Skills: Info Literacy %",
  ss: "Skills: Safety %",
  ph: "High-Use Voice+Data ($)",
  pl: "Low-Use Voice+Data ($)",
  pm: "Mobile Basket ($)",
  cm: "Comp: Mobile BB",
  cf: "Comp: Fiber",
  ci: "Comp: Internet",
  gc: "Core Govt Systems",
  gd: "Digital Citizen Engagement",
  ge: "GovTech Enablers",
  gp: "Public Service Delivery",
  g1: "Online Service Portal",
  g2: "e-Payment Services",
  g3: "Open Govt Portal",
  g4: "Open Data Portal",
  g5: "Digital Transform. Strategy",
  g6: "Data Protection Law",
  g7: "Data Protection Authority",
  g8: "National ID System",
  cl: "Cyber: Legal",
  ct: "Cyber: Technical",
  co: "Cyber: Organizational",
  cc: "Cyber: Capacity Dev",
  cp: "Cyber: Cooperation",
  cn: "National CERT/CSIRT",
  ch: "Child Online Protection",
  cr: "Cybercrime Regulation",
  io: "ID Ownership %",
  ib: "Birth Registration %",
  ie: "Online Digital ID %",
  iu: "Digital ID Used %",
  ia: "Digital ID Auth",
  wt: "Total ICT Patents",
  wc: "Computer Tech Patents",
  wd: "Digital Comm Patents",
  we: "Telecom Patents",
  wa: "Audio-Visual Patents",
  bc: "Biz Computer Use %",
  bi: "Biz Internet Use %",
  bw: "Biz Web Presence %",
  br: "E-Commerce Recv %",
  bp: "E-Commerce Place %",
};

// ═══ CONSTANTS ═══════════════════════════════════════════════════════
const GP = [
  {
    key: "p1",
    name: "Digital Infrastructure",
    short: "Infra",
    w: 15,
    c: "#1E88E5",
  },
  {
    key: "p2",
    name: "Access & Affordability",
    short: "Access",
    w: 15,
    c: "#00ACC1",
  },
  {
    key: "p3",
    name: "Skills & Human Capital",
    short: "Skills",
    w: 10,
    c: "#00897B",
  },
  {
    key: "p4",
    name: "E-Government & GovTech",
    short: "E-Gov",
    w: 15,
    c: "#43A047",
  },
  { key: "p5", name: "Cybersecurity", short: "Cyber", w: 10, c: "#7CB342" },
  {
    key: "p6",
    name: "ICT Regulation",
    short: "Regulation",
    w: 10,
    c: "#C0CA33",
  },
  { key: "p7", name: "Digital Trade", short: "Trade", w: 10, c: "#FFB300" },
  { key: "p8", name: "Innovation", short: "Innovation", w: 5, c: "#FB8C00" },
  { key: "p9", name: "Digital ID", short: "Digital ID", w: 10, c: "#F4511E" },
];
const OP = [
  {
    key: "p1",
    name: "Connectivity",
    short: "Connectivity",
    w: 25,
    c: "#1E88E5",
  },
  {
    key: "p2",
    name: "Cybersecurity",
    short: "Cybersecurity",
    w: 15,
    c: "#00897B",
  },
  {
    key: "p3",
    name: "Data Infrastructure",
    short: "Data Infra",
    w: 15,
    c: "#00ACC1",
  },
  {
    key: "p4",
    name: "Digital Industry & Jobs",
    short: "Industry",
    w: 25,
    c: "#FB8C00",
  },
  {
    key: "p5",
    name: "Digital Services",
    short: "Dig Services",
    w: 20,
    c: "#43A047",
  },
];
const OI = [
  { cd: "1.1", k: "i1_1", p: "p1", n: "Digital Economy & Tech", s: "UNCTAD" },
  { cd: "1.2", k: "i1_2", p: "p1", n: "Enterprise Surveys", s: "World Bank" },
  { cd: "1.3", k: "i1_3", p: "p1", n: "Digital Inclusion (GDIP)", s: "GDIP" },
  { cd: "1.4", k: "i1_4", p: "p1", n: "ICT Indicators", s: "ITU" },
  { cd: "2.1", k: "i2_1", p: "p2", n: "Cybersecurity Index", s: "ITU GCI" },
  { cd: "2.2", k: "i2_2", p: "p2", n: "GovTech Maturity", s: "World Bank" },
  { cd: "3.1", k: "i3_1", p: "p3", n: "Interconnection DB", s: "PeeringDB" },
  { cd: "3.2", k: "i3_2", p: "p3", n: "IXP Directory", s: "PCH" },
  { cd: "4.1", k: "i4_1", p: "p4", n: "Employment (ILO)", s: "ILO" },
  { cd: "4.2", k: "i4_2", p: "p4", n: "Findex", s: "World Bank" },
  { cd: "4.3", k: "i4_3", p: "p4", n: "ID4D", s: "World Bank" },
  { cd: "4.4", k: "i4_4", p: "p4", n: "WIPO Patents", s: "WIPO" },
  { cd: "4.5", k: "i4_5", p: "p4", n: "UNESCO Education", s: "UNESCO" },
  { cd: "5.1", k: "i5_1", p: "p5", n: "E-Government", s: "UN DESA" },
  { cd: "5.2", k: "i5_2", p: "p5", n: "ICT Regulatory", s: "ITU" },
];
const GR = [
  "All",
  "North America",
  "Europe & Central Asia",
  "East Asia & Pacific",
  "Middle East & North Africa",
  "Latin America & Caribbean",
  "South Asia",
  "Sub-Saharan Africa",
];
const OR = [
  "All",
  "GCC",
  "Southeast Asia",
  "North Africa",
  "Middle East",
  "Central Asia",
  "South Asia",
  "Africa",
  "Europe",
  "Americas",
];
const gCl = (v) =>
  v >= 60
    ? { l: "Leaders", c: "#1E88E5", b: "#E3F2FD" }
    : v >= 40
      ? { l: "Adopters", c: "#43A047", b: "#E8F5E9" }
      : { l: "Emerging", c: "#F4511E", b: "#FFF3E0" };
const oCl = (v) =>
  v >= 65
    ? { l: "Tier 1", c: "#1E88E5", b: "#E3F2FD" }
    : v >= 50
      ? { l: "Tier 2", c: "#43A047", b: "#E8F5E9" }
      : v >= 35
        ? { l: "Tier 3", c: "#FFB300", b: "#FFF8E1" }
        : { l: "Tier 4", c: "#F4511E", b: "#FFF3E0" };
const GA = G_DATA.reduce((s, c) => s + c.gdei, 0) / G_DATA.length;
const OA =
  OIC_DATA.reduce((s, c) => s + (c.idei || 0), 0) /
  OIC_DATA.filter((c) => c.idei).length;
const getE = (code, key) => {
  const d = EXT[code];
  return d ? d[key] : null;
};
const eTop = (key, n = 15, desc = true) => {
  const items = G_DATA.filter((c) => getE(c.code, key) != null).map((c) => ({
    ...c,
    v: getE(c.code, key),
  }));
  items.sort((a, b) => (desc ? b.v - a.v : a.v - b.v));
  return items.slice(0, n);
};
const eAvg = (key) => {
  const v = G_DATA.map((c) => getE(c.code, key)).filter((v) => v != null);
  return v.length ? v.reduce((s, x) => s + x, 0) / v.length : 0;
};
const eCov = (key) => G_DATA.filter((c) => getE(c.code, key) != null).length;

// ═══ ANIMATED COUNTER ═════════════════════════════════════════════
function AnimNum({ value, decimals = 1, duration = 1200 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    let start = null;
    const target = parseFloat(value) || 0;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setDisplay(p * target);
      if (p < 1) ref.current = requestAnimationFrame(step);
    };
    ref.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(ref.current);
  }, [value]);
  return <span>{display.toFixed(decimals)}</span>;
}

// ═══ DONUT CHART ══════════════════════════════════════════════════
function Donut({ value, size = 80, stroke = 8, color = "#1E88E5", label }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <div style={{ textAlign: "center", display: "inline-block" }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--border)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="14"
          fontWeight="900"
          fill="var(--text)"
        >
          {value.toFixed(0)}
        </text>
      </svg>
      {label && (
        <div
          style={{ fontSize: "10px", color: "var(--muted)", marginTop: "4px" }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

// ═══ TOOLTIP ══════════════════════════════════════════════════════
const TT = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "12px",
        fontSize: "12px",
        fontFamily: "var(--font)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{ fontWeight: 700, marginBottom: "6px", color: "var(--accent)" }}
      >
        {label}
      </div>
      {payload.map((p, i) => (
        <div
          key={i}
          style={{ color: p.color || "var(--text)", marginBottom: "2px" }}
        >
          <span style={{ fontWeight: 500 }}>{p.name}:</span>{" "}
          <strong>
            {typeof p.value === "number" ? p.value.toFixed(1) : p.value}
          </strong>
        </div>
      ))}
    </div>
  );
};

// ═══ SHARED COMPONENTS ═══════════════════════════════════════════
const Card = ({ children, style, ...p }) => (
  <div
    style={{
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: "14px",
      padding: "24px",
      boxShadow: "0 2px 12px var(--shadow)",
      transition: "all 0.3s",
      ...style,
    }}
    {...p}
  >
    {children}
  </div>
);
const Title = ({ children }) => (
  <div
    style={{
      fontSize: "15px",
      fontFamily: "var(--font)",
      color: "var(--accent)",
      letterSpacing: "0.03em",
      marginBottom: "16px",
      fontWeight: 700,
    }}
  >
    {children}
  </div>
);
const Badge = ({ c, bg, children }) => (
  <span
    style={{
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: "6px",
      fontSize: "11px",
      fontWeight: 600,
      color: c,
      background: bg,
    }}
  >
    {children}
  </span>
);
const Sel = ({ value, onChange, children, style }) => (
  <select
    value={value}
    onChange={onChange}
    style={{
      background: "var(--card)",
      border: "1px solid var(--border)",
      color: "var(--text)",
      borderRadius: "8px",
      padding: "10px 14px",
      fontSize: "13px",
      fontFamily: "var(--font)",
      cursor: "pointer",
      outline: "none",
      ...style,
    }}
  >
    {children}
  </select>
);

const StatCards = ({ items }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${Math.min(items.length, 4)},1fr)`,
      gap: "16px",
      margin: "0 0 20px",
    }}
  >
    {items.map((item, i) => (
      <Card
        key={i}
        style={{
          background: `linear-gradient(135deg,${item.c}12,${item.c}05)`,
          borderColor: `${item.c}30`,
        }}
      >
        <div
          style={{
            fontSize: "28px",
            fontWeight: 900,
            color: item.c,
            fontFamily: "var(--font)",
          }}
        >
          <AnimNum value={item.val} decimals={item.val >= 100 ? 0 : 1} />
        </div>
        <div
          style={{ fontSize: "12px", color: "var(--muted)", marginTop: "4px" }}
        >
          {item.label}
        </div>
        <div style={{ fontSize: "11px", color: item.c, fontWeight: 600 }}>
          {item.sub}
        </div>
      </Card>
    ))}
  </div>
);

const RankTable = ({ data, sk, clf, title, max = 10 }) => (
  <Card>
    <Title>{title}</Title>
    <table
      style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}
    >
      <thead>
        <tr style={{ borderBottom: "2px solid var(--border)" }}>
          {["#", "Country", "Score", "Tier"].map((h) => (
            <th
              key={h}
              style={{
                padding: "8px 6px",
                textAlign: "left",
                fontWeight: 600,
                color: "var(--muted)",
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(0, max).map((c) => {
          const cl = clf(c[sk]);
          return (
            <tr
              key={c.name}
              style={{
                borderBottom: "1px solid var(--border)",
                transition: "background 0.2s",
              }}
            >
              <td style={{ padding: "8px 6px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg,${cl.c},${cl.c}CC)`,
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 700,
                  }}
                >
                  {c.rank}
                </span>
              </td>
              <td style={{ padding: "8px 6px", fontWeight: 600 }}>{c.name}</td>
              <td style={{ padding: "8px 6px", fontWeight: 700, color: cl.c }}>
                {c[sk]?.toFixed(1)}
              </td>
              <td style={{ padding: "8px 6px" }}>
                <Badge c={cl.c} bg={cl.b}>
                  {cl.l}
                </Badge>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </Card>
);

// ═══ CSV EXPORT ═══════════════════════════════════════════════════
function exportCSV(data, filename, keys) {
  const header = keys.map((k) => k.label || k.key).join(",");
  const rows = data.map((d) =>
    keys
      .map((k) => {
        const v = d[k.key];
        return v == null ? "" : typeof v === "string" ? `"${v}"` : v;
      })
      .join(","),
  );
  const blob = new Blob([header + "\n" + rows.join("\n")], {
    type: "text/csv",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

// ═══ SEARCH ══════════════════════════════════════════════════════
function SearchBar({ data, scoreKey, onSelect, placeholder }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const filtered =
    q.length > 1
      ? data
          .filter((c) => c.name.toLowerCase().includes(q.toLowerCase()))
          .slice(0, 8)
      : [];
  return (
    <div style={{ position: "relative", flex: 1, maxWidth: "360px" }}>
      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder || "Search countries..."}
        style={{
          width: "100%",
          padding: "10px 14px 10px 36px",
          border: "1px solid var(--border)",
          borderRadius: "10px",
          fontSize: "13px",
          fontFamily: "var(--font)",
          background: "var(--card)",
          color: "var(--text)",
          outline: "none",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "14px",
          opacity: 0.4,
        }}
      >
        🔍
      </span>
      {open && filtered.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            marginTop: "4px",
            boxShadow: "0 8px 24px var(--shadow)",
            zIndex: 100,
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {filtered.map((c) => (
            <div
              key={c.name}
              onClick={() => {
                onSelect(c);
                setQ("");
                setOpen(false);
              }}
              style={{
                padding: "10px 14px",
                cursor: "pointer",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "var(--hover)")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              <span style={{ fontWeight: 600, fontSize: "13px" }}>
                {c.name}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--accent)",
                }}
              >
                {c[scoreKey]?.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══ WORLD MAP ═══════════════════════════════════════════════════════
function WorldMap({ data, scoreKey, colorFn, title }) {
  const [geoData, setGeoData] = useState(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then((r) => r.json())
      .then((topo) => {
        const geom = topo.objects.countries;
        const arcs = topo.arcs;
        const tf = topo.transform;
        function decArc(ai) {
          const rev = ai < 0;
          const idx = rev ? ~ai : ai;
          const a = arcs[idx];
          const co = [];
          let x = 0,
            y = 0;
          for (const [dx, dy] of a) {
            x += dx;
            y += dy;
            co.push([
              tf.scale[0] * x + tf.translate[0],
              tf.scale[1] * y + tf.translate[1],
            ]);
          }
          return rev ? co.reverse() : co;
        }
        function decRing(ring) {
          let co = [];
          for (const ai of ring) {
            const d = decArc(ai);
            if (co.length > 0) d.shift();
            co = co.concat(d);
          }
          return co;
        }
        function decGeom(g) {
          if (g.type === "Polygon")
            return { type: "Polygon", coordinates: g.arcs.map(decRing) };
          if (g.type === "MultiPolygon")
            return {
              type: "MultiPolygon",
              coordinates: g.arcs.map((p) => p.map(decRing)),
            };
          return g;
        }
        const features = geom.geometries.map((g) => ({
          type: "Feature",
          properties: { name: g.properties?.name || "" },
          geometry: decGeom(g),
        }));
        setGeoData({ type: "FeatureCollection", features });
      })
      .catch(() => {});
  }, []);

  if (!geoData)
    return (
      <Card>
        <Title>{title}</Title>
        <div
          style={{
            textAlign: "center",
            padding: "60px",
            color: "var(--muted)",
            fontSize: "13px",
          }}
        >
          Loading world map...
        </div>
      </Card>
    );

  const aliases = {
    "United States of America": "United States",
    "Republic of Korea": "Korea, Rep.",
    "Dem. Rep. Congo": "Congo, Dem. Rep.",
    "Dominican Rep.": "Dominican Republic",
    "Eq. Guinea": "Equatorial Guinea",
    "Solomon Is.": "Solomon Islands",
    "Central African Rep.": "Central African Republic",
    "S. Sudan": "South Sudan",
    "Czech Republic": "Czechia",
    eSwatini: "Eswatini",
    "N. Macedonia": "North Macedonia",
    Turkey: "Turkiye",
    "Côte d'Ivoire": "Cote d'Ivoire",
    "Bosnia and Herz.": "Bosnia and Herzegovina",
  };
  const getCD = (name) => {
    const n = aliases[name] || name;
    return data.find(
      (c) =>
        c.name === n ||
        c.name.toLowerCase() === n.toLowerCase() ||
        n.toLowerCase().includes(c.name.toLowerCase().split(",")[0]),
    );
  };
  const getCol = (name) => {
    const d = getCD(name);
    if (!d) return "var(--border)";
    return colorFn(d[scoreKey]);
  };

  const W = 900,
    H = 460;
  const proj = d3.geoNaturalEarth1().fitSize([W, H], geoData);
  const pathG = d3.geoPath().projection(proj);
  const hd = hovered ? getCD(hovered) : null;

  return (
    <Card style={{ padding: "16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "8px",
          minHeight: "36px",
        }}
      >
        <Title>{title}</Title>
        {hd && (
          <div
            style={{
              textAlign: "right",
              padding: "4px 14px",
              background: "var(--accent)10",
              borderRadius: "8px",
              border: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--accent)",
              }}
            >
              {hd.name}
            </div>
            <div style={{ fontSize: "11px", color: "var(--muted)" }}>
              Score:{" "}
              <strong style={{ color: "var(--accent)" }}>
                {hd[scoreKey]?.toFixed(1)}
              </strong>{" "}
              · Rank #{hd.rank}
            </div>
          </div>
        )}
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "10px",
          background: "var(--bg)",
          border: "1px solid var(--border)",
        }}
      >
        {geoData.features.map((f, i) => {
          const d = pathG(f);
          if (!d) return null;
          const nm = f.properties.name;
          const cd = getCD(nm);
          const fill = getCol(nm);
          const isH = hovered === nm;
          return (
            <path
              key={i}
              d={d}
              fill={fill}
              stroke={isH ? "var(--accent)" : "var(--card)"}
              strokeWidth={isH ? 1.5 : 0.4}
              style={{
                cursor: cd ? "pointer" : "default",
                transition: "fill 0.15s",
                filter: isH ? "brightness(1.15)" : "none",
              }}
              onMouseEnter={() => setHovered(nm)}
              onMouseLeave={() => setHovered(null)}
            />
          );
        })}
      </svg>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          marginTop: "10px",
          fontSize: "11px",
        }}
      >
        {(scoreKey === "gdei"
          ? [
              { l: "Leaders (60+)", c: "#1E88E5" },
              { l: "Adopters (40-60)", c: "#43A047" },
              { l: "Emerging (<40)", c: "#F4511E" },
              { l: "No Data", c: "var(--border)" },
            ]
          : [
              { l: "Tier 1 (65+)", c: "#1E88E5" },
              { l: "Tier 2 (50-65)", c: "#43A047" },
              { l: "Tier 3 (35-50)", c: "#FFB300" },
              { l: "Tier 4 (<35)", c: "#F4511E" },
              { l: "Non-OIC", c: "var(--border)" },
            ]
        ).map((item) => (
          <div
            key={item.l}
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
          >
            <div
              style={{
                width: "14px",
                height: "10px",
                borderRadius: "2px",
                background: item.c,
                border: "1px solid var(--border)",
              }}
            />
            <span style={{ color: "var(--muted)" }}>{item.l}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

const gMapColor = (v) =>
  v >= 60 ? "#1E88E5" : v >= 40 ? "#43A047" : "#F4511E";
const oMapColor = (v) =>
  v >= 65 ? "#1E88E5" : v >= 50 ? "#43A047" : v >= 35 ? "#FFB300" : "#F4511E";

// ═══════════════════════════════════════════════════════════════════
// GLOBAL TABS
// ═══════════════════════════════════════════════════════════════════
function GOverview() {
  const sorted = [...G_DATA].sort((a, b) => a.rank - b.rank);
  const std = Math.sqrt(
    G_DATA.reduce((s, c) => s + Math.pow(c.gdei - GA, 2), 0) / G_DATA.length,
  );
  const pillarAvgs = GP.map((p) => ({
    name: p.short,
    avg: Math.round(G_DATA.reduce((s, c) => s + c[p.key], 0) / G_DATA.length),
    color: p.c,
  }));
  const regionData = GR.filter((r) => r !== "All")
    .map((r) => {
      const cs = G_DATA.filter((c) => c.region === r);
      return {
        name: r,
        count: cs.length,
        avg: cs.length ? cs.reduce((s, c) => s + c.gdei, 0) / cs.length : 0,
      };
    })
    .sort((a, b) => b.avg - a.avg);
  const clusters = [
    {
      n: "Digital Leaders",
      f: (c) => c.gdei >= 60,
      c: "#1E88E5",
      b: "#E3F2FD",
    },
    {
      n: "Digital Adopters",
      f: (c) => c.gdei >= 40 && c.gdei < 60,
      c: "#43A047",
      b: "#E8F5E9",
    },
    {
      n: "Digital Emerging",
      f: (c) => c.gdei < 40,
      c: "#F4511E",
      b: "#FFF3E0",
    },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <WorldMap
        data={G_DATA}
        scoreKey="gdei"
        colorFn={gMapColor}
        title="Global Digital Economy Index — World Map"
      />
      <StatCards
        items={[
          {
            val: sorted[0].gdei,
            label: "Highest Score",
            sub: sorted[0].name,
            c: "#1E88E5",
          },
          {
            val: GA,
            label: "Global Average",
            sub: `${G_DATA.length} Countries`,
            c: "#00ACC1",
          },
          {
            val: sorted[sorted.length - 1].gdei,
            label: "Lowest Score",
            sub: sorted[sorted.length - 1].name,
            c: "#F4511E",
          },
          {
            val: std,
            label: "Std Deviation",
            sub: "Score Variability",
            c: "#7CB342",
          },
        ]}
      />
      <Card>
        <Title>Performance Clusters</Title>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "16px",
          }}
        >
          {clusters.map((cl) => {
            const cs = G_DATA.filter(cl.f);
            return (
              <div
                key={cl.n}
                style={{
                  background: cl.b,
                  borderRadius: "14px",
                  padding: "24px",
                  border: `2px solid ${cl.c}`,
                  textAlign: "center",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-2px)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
              >
                <div style={{ fontSize: "44px", fontWeight: 900, color: cl.c }}>
                  {cs.length}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    margin: "8px 0 4px",
                  }}
                >
                  {cl.n}
                </div>
                <div style={{ fontSize: "11px", color: "var(--muted)" }}>
                  Avg:{" "}
                  {(cs.reduce((s, c) => s + c.gdei, 0) / cs.length).toFixed(1)}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <RankTable
          data={sorted.slice(0, 10)}
          sk="gdei"
          clf={gCl}
          title="Top 10 Countries"
        />
        <RankTable
          data={[...sorted].reverse().slice(0, 10)}
          sk="gdei"
          clf={gCl}
          title="Bottom 10 Countries"
        />
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <Card>
          <Title>Pillar Averages</Title>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={pillarAvgs}
              margin={{ top: 10, right: 10, left: 0, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 9, fill: "var(--muted)" }}
                angle={-40}
                textAnchor="end"
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: "var(--muted)" }}
              />
              <Tooltip content={<TT />} />
              <Bar dataKey="avg" name="Avg" radius={[6, 6, 0, 0]}>
                {pillarAvgs.map((p, i) => (
                  <Cell key={i} fill={p.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <Title>Regional Averages</Title>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={regionData}
              layout="vertical"
              margin={{ top: 10, right: 20, left: 130, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: "var(--muted)" }}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 10, fill: "var(--muted)" }}
                width={130}
              />
              <Tooltip content={<TT />} />
              <Bar
                dataKey="avg"
                name="GDEI"
                radius={[0, 6, 6, 0]}
                fill="#1E88E5"
              >
                {regionData.map((_, i) => (
                  <Cell key={i} fill={GP[i % GP.length].c} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function GProfiles() {
  const [sel, setSel] = useState(G_DATA[0].code);
  const c = G_DATA.find((x) => x.code === sel) || G_DATA[0];
  const cl = gCl(c.gdei);
  const radar = GP.map((p) => ({
    subject: p.short,
    score: c[p.key],
    avg: Math.round(G_DATA.reduce((s, x) => s + x[p.key], 0) / G_DATA.length),
  }));
  const ranks = GP.map((p) => {
    const s = [...G_DATA].sort((a, b) => b[p.key] - a[p.key]);
    return {
      ...p,
      score: c[p.key],
      rank: s.findIndex((x) => x.code === c.code) + 1,
    };
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <SearchBar
          data={G_DATA}
          scoreKey="gdei"
          onSelect={(x) => setSel(x.code)}
          placeholder="Search country..."
        />
        <Sel value={sel} onChange={(e) => setSel(e.target.value)}>
          {[...G_DATA]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
        </Sel>
        <Badge c={cl.c} bg={cl.b}>
          {cl.l}
        </Badge>
      </div>
      <StatCards
        items={[
          { val: c.gdei, label: "GDEI Score", sub: "out of 100", c: "#1E88E5" },
          {
            val: c.rank,
            label: "Global Rank",
            sub: `of ${G_DATA.length}`,
            c: "#00ACC1",
          },
          {
            val: Math.max(...ranks.map((r) => r.score)),
            label: "Top Pillar",
            sub: ranks.sort((a, b) => b.score - a.score)[0].name,
            c: "#43A047",
          },
          {
            val: Math.min(...ranks.map((r) => r.score)),
            label: "Weakest Pillar",
            sub: ranks.sort((a, b) => a.score - b.score)[0].name,
            c: "#F4511E",
          },
        ]}
      />
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <Card>
          <Title>{c.name} vs Global Average</Title>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radar}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 10, fill: "var(--muted)" }}
              />
              <PolarRadiusAxis
                domain={[0, 100]}
                tick={{ fontSize: 9, fill: "var(--muted)" }}
              />
              <Radar
                name={c.name}
                dataKey="score"
                stroke="#1E88E5"
                fill="#1E88E5"
                fillOpacity={0.25}
              />
              <Radar
                name="Global Avg"
                dataKey="avg"
                stroke="#F4511E"
                fill="#F4511E"
                fillOpacity={0.08}
                strokeDasharray="5 5"
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <Title>Pillar Scores</Title>
          {ranks
            .sort((a, b) => b.score - a.score)
            .map((p) => (
              <div key={p.key} style={{ marginBottom: "14px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "12px",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{p.short}</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span style={{ fontSize: "10px", color: "var(--muted)" }}>
                      #{p.rank}
                    </span>
                    <Donut value={p.score} size={42} stroke={5} color={p.c} />
                  </div>
                </div>
                <div
                  style={{
                    height: "6px",
                    borderRadius: "3px",
                    background: "var(--border)",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: "3px",
                      background: `linear-gradient(90deg,${p.c},${p.c}AA)`,
                      width: `${p.score}%`,
                      transition: "width 1s ease",
                    }}
                  />
                </div>
              </div>
            ))}
        </Card>
      </div>
    </div>
  );
}

function GCompare() {
  const [c1, s1] = useState("USA");
  const [c2, s2] = useState("CHN");
  const [c3, s3] = useState("IND");
  const cs = [c1, c2, c3]
    .map((cd) => G_DATA.find((c) => c.code === cd))
    .filter(Boolean);
  const cols = ["#1E88E5", "#F4511E", "#43A047"];
  const radar = GP.map((p) => {
    const o = { subject: p.short };
    cs.forEach((c) => {
      o[c.name] = c[p.key];
    });
    return o;
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {[
          { v: c1, s: s1 },
          { v: c2, s: s2 },
          { v: c3, s: s3 },
        ].map((x, i) => (
          <Sel
            key={i}
            value={x.v}
            onChange={(e) => x.s(e.target.value)}
            style={{ borderColor: cols[i], minWidth: "180px" }}
          >
            {[...G_DATA]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
          </Sel>
        ))}
      </div>
      <div style={{ display: "flex", gap: "16px" }}>
        {cs.map((c, i) => (
          <Card
            key={c.code}
            style={{ flex: 1, borderTop: `4px solid ${cols[i]}` }}
          >
            <div style={{ fontSize: "18px", fontWeight: 700, color: cols[i] }}>
              {c.name}
            </div>
            <div
              style={{
                fontSize: "36px",
                fontWeight: 900,
                color: cols[i],
                margin: "8px 0",
              }}
            >
              <AnimNum value={c.gdei} />
            </div>
            <div style={{ fontSize: "12px", color: "var(--muted)" }}>
              #{c.rank} · {c.region}
            </div>
          </Card>
        ))}
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <Card>
          <Title>Radar</Title>
          <ResponsiveContainer width="100%" height={380}>
            <RadarChart data={radar}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 10, fill: "var(--muted)" }}
              />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
              {cs.map((c, i) => (
                <Radar
                  key={c.code}
                  name={c.name}
                  dataKey={c.name}
                  stroke={cols[i]}
                  fill={cols[i]}
                  fillOpacity={0.12}
                />
              ))}
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <Title>Pillar Bars</Title>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart
              data={GP.map((p) => {
                const o = { name: p.short };
                cs.forEach((c) => {
                  o[c.name] = c[p.key];
                });
                return o;
              })}
              margin={{ top: 10, right: 10, left: 0, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 9, fill: "var(--muted)" }}
                angle={-40}
                textAnchor="end"
              />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip content={<TT />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {cs.map((c, i) => (
                <Bar
                  key={c.code}
                  dataKey={c.name}
                  fill={cols[i]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function GPillar() {
  const [sp, setSp] = useState("p1");
  const p = GP.find((x) => x.key === sp);
  const sorted = [...G_DATA].sort((a, b) => b[sp] - a[sp]);
  const avg = G_DATA.reduce((s, c) => s + c[sp], 0) / G_DATA.length;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Sel value={sp} onChange={(e) => setSp(e.target.value)}>
        {GP.map((x) => (
          <option key={x.key} value={x.key}>
            {x.name} ({x.w}%)
          </option>
        ))}
      </Sel>
      <StatCards
        items={[
          { val: sorted[0][sp], label: "Best", sub: sorted[0].name, c: p.c },
          { val: avg, label: "Global Avg", sub: "All Countries", c: "#757575" },
          {
            val: sorted[sorted.length - 1][sp],
            label: "Lowest",
            sub: sorted[sorted.length - 1].name,
            c: "#F4511E",
          },
          {
            val: sorted[0][sp] - sorted[sorted.length - 1][sp],
            label: "Range",
            sub: "Max - Min",
            c: "#7CB342",
          },
        ]}
      />
      <Card>
        <Title>Top 20 — {p.name}</Title>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart
            data={sorted
              .slice(0, 20)
              .map((c) => ({
                name:
                  c.name.length > 20 ? c.name.substring(0, 20) + "…" : c.name,
                score: c[sp],
              }))}
            margin={{ top: 10, right: 10, left: 0, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 8, fill: "var(--muted)" }}
              angle={-50}
              textAnchor="end"
            />
            <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
            <Tooltip content={<TT />} />
            <ReferenceLine y={avg} stroke="#F4511E" strokeDasharray="5 5" />
            <Bar
              dataKey="score"
              name={p.short}
              fill={p.c}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

function GGeo() {
  const [sr, setSr] = useState("All");
  const filtered =
    sr === "All" ? G_DATA : G_DATA.filter((c) => c.region === sr);
  const sorted = [...filtered].sort((a, b) => b.gdei - a.gdei);
  const rs = GR.filter((r) => r !== "All")
    .map((r) => {
      const cs = G_DATA.filter((c) => c.region === r);
      const o = {
        name: r,
        n: cs.length,
        gdei: cs.reduce((s, c) => s + c.gdei, 0) / cs.length,
      };
      GP.forEach((p) => {
        o[p.key] = cs.reduce((s, c) => s + c[p.key], 0) / cs.length;
      });
      return o;
    })
    .sort((a, b) => b.gdei - a.gdei);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Sel value={sr} onChange={(e) => setSr(e.target.value)}>
        {GR.map((r) => (
          <option key={r} value={r}>
            {r === "All" ? "All Regions" : r}
          </option>
        ))}
      </Sel>
      <Card>
        <Title>Regional Heatmap</Title>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "11px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)" }}>
                <th style={{ padding: "8px", textAlign: "left" }}>Region</th>
                <th style={{ padding: "8px", textAlign: "center" }}>N</th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "center",
                    color: "var(--accent)",
                    fontWeight: 700,
                  }}
                >
                  GDEI
                </th>
                {GP.map((p) => (
                  <th
                    key={p.key}
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      color: p.c,
                      fontSize: "10px",
                    }}
                  >
                    {p.short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rs.map((r) => (
                <tr
                  key={r.name}
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td style={{ padding: "8px", fontWeight: 600 }}>{r.name}</td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      color: "var(--muted)",
                    }}
                  >
                    {r.n}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      fontWeight: 700,
                      color: "var(--accent)",
                    }}
                  >
                    {r.gdei.toFixed(1)}
                  </td>
                  {GP.map((p) => {
                    const v = r[p.key];
                    const i = Math.min(1, v / 80);
                    return (
                      <td
                        key={p.key}
                        style={{
                          padding: "8px",
                          textAlign: "center",
                          fontWeight: 600,
                          background: `${p.c}${Math.round(i * 30)
                            .toString(16)
                            .padStart(2, "0")}`,
                          color: i > 0.5 ? p.c : "var(--muted)",
                        }}
                      >
                        {v.toFixed(0)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card>
        <Title>
          {sr === "All" ? "All" : sr} — {sorted.length} countries
        </Title>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "8px",
          }}
        >
          <button
            onClick={() =>
              exportCSV(sorted, "gdei_rankings.csv", [
                { key: "rank", label: "Rank" },
                { key: "name", label: "Country" },
                { key: "gdei", label: "GDEI" },
                { key: "region", label: "Region" },
                ...GP.map((p) => ({ key: p.key, label: p.name })),
              ])
            }
            style={{
              padding: "6px 14px",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              background: "var(--card)",
              color: "var(--accent)",
              fontSize: "12px",
              cursor: "pointer",
              fontFamily: "var(--font)",
            }}
          >
            📥 Export CSV
          </button>
        </div>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "12px",
            }}
          >
            <thead
              style={{ position: "sticky", top: 0, background: "var(--card)" }}
            >
              <tr style={{ borderBottom: "2px solid var(--border)" }}>
                {["#", "Country", "GDEI", "Region"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "8px 6px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "var(--muted)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((c, i) => {
                const cl = gCl(c.gdei);
                return (
                  <tr
                    key={c.code}
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td style={{ padding: "6px" }}>{c.rank}</td>
                    <td style={{ padding: "6px", fontWeight: 600 }}>
                      {c.name}
                    </td>
                    <td
                      style={{ padding: "6px", fontWeight: 700, color: cl.c }}
                    >
                      {c.gdei.toFixed(1)}
                    </td>
                    <td
                      style={{
                        padding: "6px",
                        fontSize: "11px",
                        color: "var(--muted)",
                      }}
                    >
                      {c.region}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ═══ DEEP DIVE (reusable for all 8 extended data tabs) ═══════════
function DeepDive({ title, keys, chartKeys, desc }) {
  const [sk, setSk] = useState(chartKeys[0]);
  const top = eTop(sk, 20);
  const avg = eAvg(sk);
  const cov = eCov(sk);
  const all = keys
    .map((k) => ({ key: k, label: KL[k] || k, avg: eAvg(k), cov: eCov(k) }))
    .filter((d) => d.cov > 0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Card>
        <Title>{title}</Title>
        <p
          style={{
            fontSize: "13px",
            color: "var(--muted)",
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {desc}
        </p>
      </Card>
      <Card>
        <Title>Indicators ({all.length})</Title>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
            gap: "10px",
          }}
        >
          {all.map((d) => (
            <div
              key={d.key}
              onClick={() => setSk(d.key)}
              style={{
                padding: "12px",
                borderRadius: "10px",
                border:
                  sk === d.key
                    ? `2px solid var(--accent)`
                    : "1px solid var(--border)",
                background: sk === d.key ? "var(--accent)08" : "var(--card)",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: "10px", color: "var(--muted)" }}>
                {d.label}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 900,
                  color: "var(--accent)",
                }}
              >
                {d.avg >= 100 ? d.avg.toFixed(0) : d.avg.toFixed(1)}
              </div>
              <div style={{ fontSize: "9px", color: "var(--muted)" }}>
                {d.cov} countries
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <Title>Top 20 — {KL[sk] || sk}</Title>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "8px",
          }}
        >
          <button
            onClick={() =>
              exportCSV(eTop(sk, 999), "deep_dive.csv", [
                { key: "name", label: "Country" },
                { key: "v", label: KL[sk] },
                { key: "gdei", label: "GDEI" },
                { key: "region", label: "Region" },
              ])
            }
            style={{
              padding: "6px 14px",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              background: "var(--card)",
              color: "var(--accent)",
              fontSize: "12px",
              cursor: "pointer",
              fontFamily: "var(--font)",
            }}
          >
            📥 CSV
          </button>
        </div>
        <ResponsiveContainer width="100%" height={420}>
          <BarChart
            data={top.map((c) => ({
              name: c.name.length > 20 ? c.name.substring(0, 20) + "…" : c.name,
              val: c.v,
            }))}
            margin={{ top: 10, right: 10, left: 0, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 8, fill: "var(--muted)" }}
              angle={-50}
              textAnchor="end"
            />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip content={<TT />} />
            <ReferenceLine y={avg} stroke="#F4511E" strokeDasharray="5 5" />
            <Bar
              dataKey="val"
              name={KL[sk] || sk}
              fill="var(--accent)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
function GFinancial() {
  return (
    <DeepDive
      title="Financial Inclusion (Findex)"
      keys={["fa", "fm", "fi"]}
      chartKeys={["fa", "fm", "fi"]}
      desc="World Bank Findex: account ownership, mobile phone ownership, daily internet use."
    />
  );
}
function GBusiness() {
  return (
    <DeepDive
      title="Business Digitization (UNCTAD)"
      keys={["bc", "bi", "bw", "br", "bp"]}
      chartKeys={["bc", "bi", "bw", "br", "bp"]}
      desc="UNCTAD: business computer/internet use, web presence, e-commerce activity."
    />
  );
}
function GEmployment() {
  return (
    <DeepDive
      title="Employment & Skills (ILO+ITU)"
      keys={["es", "em", "et", "sc", "sd", "si", "ss"]}
      chartKeys={["es", "sc", "sd", "si"]}
      desc="ILO employment + ITU digital skills indicators."
    />
  );
}
function GGovTech() {
  return (
    <DeepDive
      title="GovTech Deep-Dive (GTMI)"
      keys={[
        "gc",
        "gd",
        "ge",
        "gp",
        "g1",
        "g2",
        "g3",
        "g4",
        "g5",
        "g6",
        "g7",
        "g8",
      ]}
      chartKeys={["gc", "gd", "ge", "gp"]}
      desc="World Bank GovTech Maturity: core systems, citizen engagement, delivery, enablers."
    />
  );
}
function GCyber() {
  return (
    <DeepDive
      title="Cybersecurity (GCI)"
      keys={["cl", "ct", "co", "cc", "cp", "cn", "ch", "cr"]}
      chartKeys={["cl", "ct", "co", "cc", "cp"]}
      desc="ITU GCI sub-scores: legal, technical, organizational, capacity, cooperation."
    />
  );
}
function GDigID() {
  return (
    <DeepDive
      title="Digital Identity (ID4D)"
      keys={["io", "ib", "ie", "iu", "ia"]}
      chartKeys={["io", "ib", "ie", "iu"]}
      desc="World Bank ID4D: ownership, birth registration, digital ID."
    />
  );
}
function GPricing() {
  return (
    <DeepDive
      title="Pricing & Competition (ITU)"
      keys={["ph", "pl", "pm", "cm", "cf", "ci"]}
      chartKeys={["ph", "pl", "pm", "cm"]}
      desc="ITU pricing baskets and market competition scores."
    />
  );
}
function GPatents() {
  return (
    <DeepDive
      title="Patents & Innovation (WIPO)"
      keys={["wt", "wc", "wd", "we", "wa"]}
      chartKeys={["wt", "wc", "wd", "we", "wa"]}
      desc="WIPO ICT patent publications by technology."
    />
  );
}

// ═══ CUSTOM INDEX BUILDER ════════════════════════════════════════
function GCustom() {
  const [weights, setWeights] = useState(
    GP.reduce((o, p) => ({ ...o, [p.key]: p.w }), {}),
  );
  const totalW = Object.values(weights).reduce((s, v) => s + v, 0);
  const reranked = useMemo(() => {
    return G_DATA.map((c) => {
      const score = GP.reduce(
        (s, p) => s + c[p.key] * (weights[p.key] / totalW),
        0,
      );
      return { ...c, custom: score };
    })
      .sort((a, b) => b.custom - a.custom)
      .map((c, i) => ({ ...c, cRank: i + 1 }));
  }, [weights, totalW]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Card>
        <Title>Custom Index Builder — Adjust Pillar Weights</Title>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "16px",
          }}
        >
          {GP.map((p) => (
            <div key={p.key}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  marginBottom: "4px",
                }}
              >
                <span style={{ fontWeight: 600, color: p.c }}>{p.short}</span>
                <span style={{ fontWeight: 900, color: p.c }}>
                  {weights[p.key]}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                value={weights[p.key]}
                onChange={(e) =>
                  setWeights((w) => ({ ...w, [p.key]: +e.target.value }))
                }
                style={{ width: "100%", accentColor: p.c }}
              />
            </div>
          ))}
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "8px",
            fontSize: "12px",
            color: Math.abs(totalW - 100) > 1 ? "#F4511E" : "var(--muted)",
            fontWeight: 600,
          }}
        >
          Total: {totalW}%{" "}
          {Math.abs(totalW - 100) > 1 ? "(adjust to 100%)" : "✓"}
        </div>
      </Card>
      <RankTable
        data={reranked.slice(0, 15).map((c) => ({ ...c, rank: c.cRank }))}
        sk="custom"
        clf={(v) => gCl(v)}
        title="Re-Ranked — Custom Weights"
        max={15}
      />
    </div>
  );
}

// ═══ STATISTICAL ANALYSIS ════════════════════════════════════════
function GStats() {
  const bins = Array.from({ length: 10 }, (_, i) => ({
    range: `${i * 10}-${(i + 1) * 10}`,
    count: G_DATA.filter((c) => c.gdei >= i * 10 && c.gdei < (i + 1) * 10)
      .length,
  }));
  const corrData = GP.map((p) => ({
    name: p.short,
    corr: (() => {
      const xs = G_DATA.map((c) => c[p.key]),
        ys = G_DATA.map((c) => c.gdei);
      const mx = xs.reduce((a, b) => a + b) / xs.length,
        my = ys.reduce((a, b) => a + b) / ys.length;
      const num = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0);
      const den = Math.sqrt(
        xs.reduce((s, x) => s + (x - mx) ** 2, 0) *
          ys.reduce((s, y) => s + (y - my) ** 2, 0),
      );
      return den ? num / den : 0;
    })(),
    color: p.c,
  }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <Card>
          <Title>GDEI Distribution</Title>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={bins}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="range"
                tick={{ fontSize: 10, fill: "var(--muted)" }}
              />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip content={<TT />} />
              <Bar
                dataKey="count"
                name="Countries"
                fill="#1E88E5"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <Title>Pillar-GDEI Correlation</Title>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={corrData.sort((a, b) => b.corr - a.corr)}
              margin={{ top: 10, right: 10, left: 0, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "var(--muted)" }}
                angle={-30}
                textAnchor="end"
              />
              <YAxis domain={[0, 1]} tick={{ fontSize: 10 }} />
              <Tooltip content={<TT />} />
              <Bar dataKey="corr" name="Correlation" radius={[6, 6, 0, 0]}>
                {corrData
                  .sort((a, b) => b.corr - a.corr)
                  .map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

// ═══ PEER LEARNING ═══════════════════════════════════════════════
function GPeers() {
  const [sel, setSel] = useState("USA");
  const c = G_DATA.find((x) => x.code === sel) || G_DATA[0];
  const peers = useMemo(() => {
    return G_DATA.filter((x) => x.code !== sel)
      .map((x) => {
        const dist = Math.sqrt(
          GP.reduce((s, p) => s + Math.pow(c[p.key] - x[p.key], 2), 0),
        );
        return { ...x, dist };
      })
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 10);
  }, [sel]);
  const betterPeers = peers.filter((p) => p.gdei > c.gdei).slice(0, 3);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <SearchBar
          data={G_DATA}
          scoreKey="gdei"
          onSelect={(x) => setSel(x.code)}
        />
        <Sel value={sel} onChange={(e) => setSel(e.target.value)}>
          {[...G_DATA]
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
        </Sel>
      </div>
      <Card>
        <Title>10 Most Similar Countries to {c.name}</Title>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border)" }}>
              {["Country", "GDEI", "Similarity", "Region", "Action"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: "8px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "var(--muted)",
                    }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {peers.map((p) => (
              <tr
                key={p.code}
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <td style={{ padding: "8px", fontWeight: 600 }}>{p.name}</td>
                <td
                  style={{
                    padding: "8px",
                    fontWeight: 700,
                    color: "var(--accent)",
                  }}
                >
                  {p.gdei.toFixed(1)}
                </td>
                <td style={{ padding: "8px" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "6px",
                      borderRadius: "3px",
                      background: "var(--border)",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: "3px",
                        background: "#43A047",
                        width: `${Math.max(5, 100 - p.dist)}%`,
                      }}
                    />
                  </div>
                </td>
                <td
                  style={{
                    padding: "8px",
                    fontSize: "11px",
                    color: "var(--muted)",
                  }}
                >
                  {p.region}
                </td>
                <td style={{ padding: "8px" }}>
                  {p.gdei > c.gdei && (
                    <span
                      style={{
                        fontSize: "10px",
                        color: "#43A047",
                        fontWeight: 600,
                      }}
                    >
                      📈 Learn from
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {betterPeers.length > 0 && (
        <Card>
          <Title>What {betterPeers[0].name} Does Better</Title>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {GP.filter((p) => betterPeers[0][p.key] > c[p.key] + 5).map((p) => (
              <div
                key={p.key}
                style={{
                  padding: "12px 16px",
                  background: `${p.c}12`,
                  border: `1px solid ${p.c}30`,
                  borderRadius: "10px",
                }}
              >
                <div style={{ fontSize: "12px", fontWeight: 700, color: p.c }}>
                  {p.name}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--muted)",
                    marginTop: "4px",
                  }}
                >
                  {c.name}: {c[p.key].toFixed(1)} → {betterPeers[0].name}:{" "}
                  {betterPeers[0][p.key].toFixed(1)} (+
                  {(betterPeers[0][p.key] - c[p.key]).toFixed(1)})
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

// ═══ DATA GAP TRACKER ════════════════════════════════════════════
function GDataGaps() {
  const extKeys = [
    "fa",
    "fm",
    "fi",
    "es",
    "em",
    "et",
    "sc",
    "sd",
    "si",
    "ss",
    "gc",
    "gd",
    "ge",
    "gp",
    "cl",
    "ct",
    "co",
    "cc",
    "cp",
    "io",
    "ib",
    "ie",
    "iu",
    "wt",
    "wc",
    "bc",
    "bi",
    "bw",
  ];
  const gapData = G_DATA.map((c) => {
    const total = extKeys.length;
    const filled = extKeys.filter((k) => getE(c.code, k) != null).length;
    return { ...c, filled, total, pct: Math.round((filled / total) * 100) };
  }).sort((a, b) => a.pct - b.pct);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <StatCards
        items={[
          {
            val: gapData.filter((c) => c.pct >= 80).length,
            label: "80%+ Coverage",
            sub: "Well-documented",
            c: "#43A047",
          },
          {
            val: gapData.filter((c) => c.pct >= 50 && c.pct < 80).length,
            label: "50-80% Coverage",
            sub: "Moderate gaps",
            c: "#FFB300",
          },
          {
            val: gapData.filter((c) => c.pct < 50).length,
            label: "<50% Coverage",
            sub: "Major gaps",
            c: "#F4511E",
          },
          {
            val: Math.round(
              gapData.reduce((s, c) => s + c.pct, 0) / gapData.length,
            ),
            label: "Avg Coverage %",
            sub: "Across all countries",
            c: "#1E88E5",
          },
        ]}
      />
      <Card>
        <Title>Data Completeness by Country</Title>
        <div style={{ maxHeight: "500px", overflowY: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "11px",
            }}
          >
            <thead
              style={{ position: "sticky", top: 0, background: "var(--card)" }}
            >
              <tr style={{ borderBottom: "2px solid var(--border)" }}>
                {["Country", "Coverage", "Filled", "GDEI"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "8px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "var(--muted)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gapData.map((c) => (
                <tr
                  key={c.code}
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td style={{ padding: "6px", fontWeight: 600 }}>{c.name}</td>
                  <td style={{ padding: "6px", width: "200px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          height: "8px",
                          borderRadius: "4px",
                          background: "var(--border)",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            borderRadius: "4px",
                            background:
                              c.pct >= 80
                                ? "#43A047"
                                : c.pct >= 50
                                  ? "#FFB300"
                                  : "#F4511E",
                            width: `${c.pct}%`,
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: c.pct >= 80 ? "#43A047" : "#F4511E",
                        }}
                      >
                        {c.pct}%
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "6px", color: "var(--muted)" }}>
                    {c.filled}/{c.total}
                  </td>
                  <td
                    style={{
                      padding: "6px",
                      fontWeight: 700,
                      color: "var(--accent)",
                    }}
                  >
                    {c.gdei.toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// OIC TABS
// ═══════════════════════════════════════════════════════════════════
function OOverview() {
  const sorted = [...OIC_DATA]
    .filter((c) => c.idei)
    .sort((a, b) => a.rank - b.rank);
  const std = Math.sqrt(
    sorted.reduce((s, c) => s + Math.pow(c.idei - OA, 2), 0) / sorted.length,
  );
  const pillarAvgs = OP.map((p) => ({
    name: p.short,
    avg: Math.round(
      sorted.reduce((s, c) => s + (c[p.key] || 0), 0) / sorted.length,
    ),
    color: p.c,
  }));
  const tiers = [
    { n: "Tier 1", f: (c) => c.idei >= 65, c: "#1E88E5", b: "#E3F2FD" },
    {
      n: "Tier 2",
      f: (c) => c.idei >= 50 && c.idei < 65,
      c: "#43A047",
      b: "#E8F5E9",
    },
    {
      n: "Tier 3",
      f: (c) => c.idei >= 35 && c.idei < 50,
      c: "#FFB300",
      b: "#FFF8E1",
    },
    { n: "Tier 4", f: (c) => c.idei < 35, c: "#F4511E", b: "#FFF3E0" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <WorldMap
        data={OIC_DATA}
        scoreKey="idei"
        colorFn={oMapColor}
        title="Islamic Digital Economy Index — OIC Countries Map"
      />
      <StatCards
        items={[
          {
            val: sorted[0].idei,
            label: "Highest Score",
            sub: sorted[0].name,
            c: "#1E88E5",
          },
          {
            val: OA,
            label: "OIC Average",
            sub: `${sorted.length} Countries`,
            c: "#00ACC1",
          },
          {
            val: sorted[sorted.length - 1].idei,
            label: "Lowest",
            sub: sorted[sorted.length - 1].name,
            c: "#F4511E",
          },
          {
            val: std,
            label: "Std Deviation",
            sub: "Variability",
            c: "#7CB342",
          },
        ]}
      />
      <Card>
        <Title>Performance Tiers</Title>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "12px",
          }}
        >
          {tiers.map((t) => {
            const cs = sorted.filter(t.f);
            return (
              <div
                key={t.n}
                style={{
                  background: t.b,
                  borderRadius: "14px",
                  padding: "18px",
                  border: `2px solid ${t.c}`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "36px", fontWeight: 900, color: t.c }}>
                  {cs.length}
                </div>
                <div
                  style={{ fontSize: "12px", fontWeight: 700, margin: "4px 0" }}
                >
                  {t.n}
                </div>
                <div style={{ fontSize: "10px", color: "var(--muted)" }}>
                  Avg:{" "}
                  {cs.length
                    ? (cs.reduce((s, c) => s + c.idei, 0) / cs.length).toFixed(
                        1,
                      )
                    : "—"}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <RankTable
          data={sorted.slice(0, 10)}
          sk="idei"
          clf={oCl}
          title="Top 10 OIC"
        />
        <Card>
          <Title>OIC Pillar Averages</Title>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={pillarAvgs}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: "var(--muted)" }}
              />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Tooltip content={<TT />} />
              <Bar dataKey="avg" name="OIC Avg" radius={[6, 6, 0, 0]}>
                {pillarAvgs.map((p, i) => (
                  <Cell key={i} fill={p.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function OProfiles() {
  const sorted = [...OIC_DATA]
    .filter((c) => c.idei)
    .sort((a, b) => a.rank - b.rank);
  const [sel, setSel] = useState(sorted[0]?.name || "");
  const c = OIC_DATA.find((x) => x.name === sel) || sorted[0];
  if (!c) return null;
  const cl = oCl(c.idei);
  const radar = OP.map((p) => ({
    subject: p.short,
    score: c[p.key] || 0,
    avg: Math.round(
      sorted.reduce((s, x) => s + (x[p.key] || 0), 0) / sorted.length,
    ),
  }));
  const indData = OI.map((ind) => {
    const score = c[ind.k] || 0;
    const avg = Math.round(
      sorted.reduce((s, x) => s + (x[ind.k] || 0), 0) / sorted.length,
    );
    const diff = score - avg;
    return {
      ...ind,
      score,
      avg,
      diff,
      assess: !score
        ? "DATA GAP"
        : diff > 15
          ? "STRENGTH"
          : diff > 0
            ? "ABOVE AVG"
            : "BELOW AVG",
    };
  });
  // Policy recommendations
  const strengths = indData.filter((i) => i.assess === "STRENGTH");
  const gaps = indData.filter((i) => i.assess === "DATA GAP");
  const weak = indData.filter((i) => i.assess === "BELOW AVG");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <SearchBar
          data={sorted}
          scoreKey="idei"
          onSelect={(x) => setSel(x.name)}
          placeholder="Search OIC country..."
        />
        <Sel value={sel} onChange={(e) => setSel(e.target.value)}>
          {sorted.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </Sel>
        <Badge c={cl.c} bg={cl.b}>
          {cl.l}
        </Badge>
      </div>
      <StatCards
        items={[
          {
            val: c.idei || 0,
            label: "IDEI Score",
            sub: "out of 100",
            c: "#1E88E5",
          },
          {
            val: c.rank,
            label: "OIC Rank",
            sub: `of ${sorted.length}`,
            c: "#00ACC1",
          },
          {
            val: (c.idei || 0) - OA,
            label: "vs OIC Avg",
            sub: (c.idei || 0) > OA ? "Above" : "Below",
            c: (c.idei || 0) > OA ? "#43A047" : "#F4511E",
          },
          {
            val: gaps.length,
            label: "Data Gaps",
            sub: "Indicators missing",
            c: gaps.length > 3 ? "#F4511E" : "#43A047",
          },
        ]}
      />
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <Card>
          <Title>{c.name} vs OIC Average</Title>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radar}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontSize: 11, fill: "var(--muted)" }}
              />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
              <Radar
                name={c.name}
                dataKey="score"
                stroke="#1E88E5"
                fill="#1E88E5"
                fillOpacity={0.25}
              />
              <Radar
                name="OIC Avg"
                dataKey="avg"
                stroke="#F4511E"
                fill="#F4511E"
                fillOpacity={0.08}
                strokeDasharray="5 5"
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <Title>Pillar Scores</Title>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            {OP.map((p) => (
              <Donut
                key={p.key}
                value={c[p.key] || 0}
                size={70}
                stroke={6}
                color={p.c}
                label={p.short}
              />
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <Title>Indicator Performance</Title>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "11px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)" }}>
                {[
                  "Indicator",
                  c.name.split(" ")[0],
                  "OIC Avg",
                  "Diff",
                  "Assessment",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "8px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "var(--muted)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {indData.map((i) => {
                const col =
                  i.assess === "STRENGTH"
                    ? "#43A047"
                    : i.assess === "DATA GAP"
                      ? "#9E9E9E"
                      : i.assess === "ABOVE AVG"
                        ? "#1E88E5"
                        : "#F4511E";
                return (
                  <tr
                    key={i.cd}
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td style={{ padding: "8px", fontWeight: 600 }}>
                      {i.cd} {i.n}
                    </td>
                    <td style={{ padding: "8px", fontWeight: 700, color: col }}>
                      {i.score || "N/A"}
                    </td>
                    <td style={{ padding: "8px", color: "var(--muted)" }}>
                      {i.avg}
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        fontWeight: 700,
                        color: i.diff > 0 ? "#43A047" : "#F4511E",
                      }}
                    >
                      {i.score
                        ? `${i.diff > 0 ? "+" : ""}${i.diff.toFixed(1)}`
                        : ""}
                    </td>
                    <td style={{ padding: "8px" }}>
                      <Badge c={col} bg={col + "18"}>
                        {i.assess}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      <Card style={{ borderLeft: "4px solid #1E88E5" }}>
        <Title>🎯 Policy Recommendations — {c.name}</Title>
        {strengths.length > 0 && (
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#43A047",
                marginBottom: "8px",
              }}
            >
              ✅ Strengths to Maintain ({strengths.length})
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {strengths.map((s) => (
                <Badge key={s.cd} c="#43A047" bg="#E8F5E9">
                  {s.cd} {s.n}: {s.score.toFixed(1)}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {weak.length > 0 && (
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#F4511E",
                marginBottom: "8px",
              }}
            >
              ⚠️ Areas for Improvement ({weak.length})
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {weak.map((w) => (
                <Badge key={w.cd} c="#F4511E" bg="#FFF3E0">
                  {w.cd} {w.n}: {w.score.toFixed(1)} (OIC avg: {w.avg})
                </Badge>
              ))}
            </div>
          </div>
        )}
        {gaps.length > 0 && (
          <div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#9E9E9E",
                marginBottom: "8px",
              }}
            >
              📊 Data Gaps to Close ({gaps.length})
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {gaps.map((g) => (
                <Badge key={g.cd} c="#757575" bg="#F5F5F5">
                  {g.cd} {g.n} — No data reported
                </Badge>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function OCompare() {
  const sorted = [...OIC_DATA]
    .filter((c) => c.idei)
    .sort((a, b) => a.rank - b.rank);
  const [c1, s1] = useState(sorted[0]?.name);
  const [c2, s2] = useState(sorted[1]?.name);
  const cs = [c1, c2]
    .map((n) => OIC_DATA.find((c) => c.name === n))
    .filter(Boolean);
  const cols = ["#1E88E5", "#F4511E"];
  const radar = OP.map((p) => {
    const o = { subject: p.short };
    cs.forEach((c) => {
      o[c.name] = c[p.key] || 0;
    });
    return o;
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", gap: "12px" }}>
        {[
          { v: c1, s: s1 },
          { v: c2, s: s2 },
        ].map((x, i) => (
          <Sel
            key={i}
            value={x.v}
            onChange={(e) => x.s(e.target.value)}
            style={{ borderColor: cols[i], minWidth: "200px" }}
          >
            {sorted.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </Sel>
        ))}
      </div>
      <div style={{ display: "flex", gap: "16px" }}>
        {cs.map((c, i) => (
          <Card
            key={c.name}
            style={{ flex: 1, borderTop: `4px solid ${cols[i]}` }}
          >
            <div style={{ fontSize: "18px", fontWeight: 700, color: cols[i] }}>
              {c.name}
            </div>
            <div
              style={{
                fontSize: "36px",
                fontWeight: 900,
                color: cols[i],
                margin: "8px 0",
              }}
            >
              <AnimNum value={c.idei} />
            </div>
            <div style={{ fontSize: "12px", color: "var(--muted)" }}>
              #{c.rank} · {c.region}
            </div>
          </Card>
        ))}
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
      >
        <Card>
          <Title>Radar</Title>
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radar}>
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis domain={[0, 100]} />
              {cs.map((c, i) => (
                <Radar
                  key={c.name}
                  name={c.name}
                  dataKey={c.name}
                  stroke={cols[i]}
                  fill={cols[i]}
                  fillOpacity={0.15}
                />
              ))}
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <Title>Pillar Comparison</Title>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={OP.map((p) => {
                const o = { name: p.short };
                cs.forEach((c) => {
                  o[c.name] = c[p.key] || 0;
                });
                return o;
              })}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis domain={[0, 100]} />
              <Tooltip content={<TT />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {cs.map((c, i) => (
                <Bar
                  key={c.name}
                  dataKey={c.name}
                  fill={cols[i]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function OPillar() {
  const sorted = [...OIC_DATA]
    .filter((c) => c.idei)
    .sort((a, b) => a.rank - b.rank);
  const [sp, setSp] = useState("p1");
  const p = OP.find((x) => x.key === sp);
  const ranked = [...sorted]
    .filter((c) => (c[sp] || 0) > 0)
    .sort((a, b) => (b[sp] || 0) - (a[sp] || 0));
  const avg = ranked.length
    ? ranked.reduce((s, c) => s + (c[sp] || 0), 0) / ranked.length
    : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Sel value={sp} onChange={(e) => setSp(e.target.value)}>
        {OP.map((x) => (
          <option key={x.key} value={x.key}>
            {x.name} ({x.w}%)
          </option>
        ))}
      </Sel>
      <StatCards
        items={[
          {
            val: ranked[0] ? ranked[0][sp] : 0,
            label: "Best",
            sub: ranked[0]?.name,
            c: p.c,
          },
          {
            val: avg,
            label: "OIC Avg",
            sub: `${ranked.length} scored`,
            c: "#757575",
          },
          {
            val: ranked.length ? ranked[ranked.length - 1][sp] : 0,
            label: "Lowest",
            sub: ranked[ranked.length - 1]?.name,
            c: "#F4511E",
          },
          {
            val: ranked[0] ? ranked[0][sp] - ranked[ranked.length - 1][sp] : 0,
            label: "Range",
            sub: "",
            c: "#7CB342",
          },
        ]}
      />
      <Card>
        <Title>All OIC — {p.name}</Title>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={ranked.map((c) => ({
              name: c.name.length > 16 ? c.name.substring(0, 16) + "…" : c.name,
              score: c[sp] || 0,
            }))}
            margin={{ top: 10, right: 10, left: 0, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 7, fill: "var(--muted)" }}
              angle={-55}
              textAnchor="end"
            />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<TT />} />
            <ReferenceLine y={avg} stroke="#F4511E" strokeDasharray="5 5" />
            <Bar
              dataKey="score"
              name={p.short}
              fill={p.c}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

function ORegional() {
  const sorted = [...OIC_DATA]
    .filter((c) => c.idei)
    .sort((a, b) => a.rank - b.rank);
  const [sr, setSr] = useState("All");
  const filtered =
    sr === "All" ? sorted : sorted.filter((c) => c.region === sr);
  const rs = OR.filter((r) => r !== "All")
    .map((r) => {
      const cs = OIC_DATA.filter((c) => c.region === r && c.idei);
      const o = {
        name: r,
        n: cs.length,
        idei: cs.length ? cs.reduce((s, c) => s + c.idei, 0) / cs.length : 0,
      };
      OP.forEach((p) => {
        o[p.key] = cs.length
          ? cs.reduce((s, c) => s + (c[p.key] || 0), 0) / cs.length
          : 0;
      });
      return o;
    })
    .filter((r) => r.n > 0)
    .sort((a, b) => b.idei - a.idei);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Sel value={sr} onChange={(e) => setSr(e.target.value)}>
        {OR.map((r) => (
          <option key={r} value={r}>
            {r === "All" ? "All OIC Regions" : r}
          </option>
        ))}
      </Sel>
      <Card>
        <Title>OIC Regional Heatmap</Title>
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "11px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "2px solid var(--border)" }}>
                <th style={{ padding: "8px", textAlign: "left" }}>Region</th>
                <th style={{ padding: "8px", textAlign: "center" }}>N</th>
                <th
                  style={{
                    padding: "8px",
                    textAlign: "center",
                    color: "var(--accent)",
                    fontWeight: 700,
                  }}
                >
                  IDEI
                </th>
                {OP.map((p) => (
                  <th
                    key={p.key}
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      color: p.c,
                      fontSize: "10px",
                    }}
                  >
                    {p.short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rs.map((r) => (
                <tr
                  key={r.name}
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td style={{ padding: "8px", fontWeight: 600 }}>{r.name}</td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      color: "var(--muted)",
                    }}
                  >
                    {r.n}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "center",
                      fontWeight: 700,
                      color: "var(--accent)",
                    }}
                  >
                    {r.idei.toFixed(1)}
                  </td>
                  {OP.map((p) => {
                    const v = r[p.key];
                    return (
                      <td
                        key={p.key}
                        style={{
                          padding: "8px",
                          textAlign: "center",
                          fontWeight: 600,
                          color: v > 60 ? p.c : "var(--muted)",
                        }}
                      >
                        {v.toFixed(1)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card>
        <Title>
          {sr === "All" ? "All OIC" : sr} ({filtered.length})
        </Title>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "8px",
          }}
        >
          <button
            onClick={() =>
              exportCSV(filtered, "oic_rankings.csv", [
                { key: "rank", label: "Rank" },
                { key: "name", label: "Country" },
                { key: "idei", label: "IDEI" },
                { key: "region", label: "Region" },
                ...OP.map((p) => ({ key: p.key, label: p.name })),
              ])
            }
            style={{
              padding: "6px 14px",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              background: "var(--card)",
              color: "var(--accent)",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            📥 CSV
          </button>
        </div>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "12px",
            }}
          >
            <thead
              style={{ position: "sticky", top: 0, background: "var(--card)" }}
            >
              <tr style={{ borderBottom: "2px solid var(--border)" }}>
                {[
                  "#",
                  "Country",
                  "IDEI",
                  "Region",
                  ...OP.map((p) => p.short),
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "6px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "var(--muted)",
                      fontSize: "11px",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const cl = oCl(c.idei);
                return (
                  <tr
                    key={c.name}
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td style={{ padding: "6px" }}>
                      <Badge c={cl.c} bg={cl.b}>
                        {c.rank}
                      </Badge>
                    </td>
                    <td style={{ padding: "6px", fontWeight: 600 }}>
                      {c.name}
                    </td>
                    <td
                      style={{
                        padding: "6px",
                        fontWeight: 700,
                        color: "var(--accent)",
                      }}
                    >
                      {c.idei?.toFixed(1)}
                    </td>
                    <td
                      style={{
                        padding: "6px",
                        fontSize: "10px",
                        color: "var(--muted)",
                      }}
                    >
                      {c.region}
                    </td>
                    {OP.map((p) => (
                      <td
                        key={p.key}
                        style={{
                          padding: "6px",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: (c[p.key] || 0) > 60 ? p.c : "var(--muted)",
                        }}
                      >
                        {(c[p.key] || 0).toFixed(1)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ODivide() {
  const sorted = [...OIC_DATA]
    .filter((c) => c.idei)
    .sort((a, b) => a.rank - b.rank);
  const t10 = sorted.slice(0, 10);
  const b10 = sorted.slice(-10);
  const gap = OP.map((p) => ({
    name: p.short,
    top: Math.round(t10.reduce((s, c) => s + (c[p.key] || 0), 0) / 10),
    bottom: Math.round(b10.reduce((s, c) => s + (c[p.key] || 0), 0) / 10),
  }));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <StatCards
        items={[
          {
            val: t10.reduce((s, c) => s + c.idei, 0) / 10,
            label: "Top 10 Avg",
            sub: "",
            c: "#1E88E5",
          },
          {
            val: b10.reduce((s, c) => s + c.idei, 0) / 10,
            label: "Bottom 10 Avg",
            sub: "",
            c: "#F4511E",
          },
          {
            val:
              t10.reduce((s, c) => s + c.idei, 0) / 10 -
              b10.reduce((s, c) => s + c.idei, 0) / 10,
            label: "Gap",
            sub: "",
            c: "#B71C1C",
          },
          {
            val: sorted[0].idei / sorted[sorted.length - 1].idei,
            label: "Ratio",
            sub: "Top/Bottom",
            c: "#7CB342",
          },
        ]}
      />
      <Card>
        <Title>Pillar Gap: Top 10 vs Bottom 10</Title>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={gap}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<TT />} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar
              dataKey="top"
              name="Top 10"
              fill="#1E88E5"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="bottom"
              name="Bottom 10"
              fill="#F4511E"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <Title>Scatter: Connectivity vs Digital Services</Title>
        <ResponsiveContainer width="100%" height={380}>
          <ScatterChart margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              type="number"
              dataKey="x"
              name="Connectivity"
              domain={[0, 100]}
              tick={{ fontSize: 10 }}
              label={{
                value: "Connectivity",
                position: "insideBottom",
                offset: -5,
                fontSize: 11,
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Digital Services"
              domain={[0, 100]}
              tick={{ fontSize: 10 }}
              label={{
                value: "Digital Services",
                angle: -90,
                position: "insideLeft",
                fontSize: 11,
              }}
            />
            <ZAxis type="number" dataKey="z" range={[40, 500]} />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div
                    style={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      padding: "10px",
                      fontSize: "12px",
                    }}
                  >
                    <div style={{ fontWeight: 700, color: "var(--accent)" }}>
                      {d.n}
                    </div>
                    <div>
                      P1:{d.x.toFixed(1)} P5:{d.y.toFixed(1)} IDEI:
                      {d.z.toFixed(1)}
                    </div>
                  </div>
                );
              }}
            />
            <Scatter
              data={sorted.map((c) => ({
                n: c.name,
                x: c.p1 || 0,
                y: c.p5 || 0,
                z: c.idei,
              }))}
              fill="#1E88E5"
              fillOpacity={0.6}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

function OIndicators() {
  const sorted = [...OIC_DATA]
    .filter((c) => c.idei)
    .sort((a, b) => a.rank - b.rank);
  const [si, setSi] = useState("i1_1");
  const ind = OI.find((i) => i.k === si);
  const ranked = [...sorted]
    .filter((c) => (c[si] || 0) > 0)
    .sort((a, b) => (b[si] || 0) - (a[si] || 0));
  const gaps = sorted.filter((c) => !c[si] || c[si] === 0);
  const avg = ranked.length
    ? ranked.reduce((s, c) => s + (c[si] || 0), 0) / ranked.length
    : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Sel value={si} onChange={(e) => setSi(e.target.value)}>
        {OI.map((i) => (
          <option key={i.k} value={i.k}>
            {i.cd} {i.n} ({i.s})
          </option>
        ))}
      </Sel>
      <StatCards
        items={[
          {
            val: ranked[0] ? ranked[0][si] : 0,
            label: "Best",
            sub: ranked[0]?.name,
            c: "#1E88E5",
          },
          {
            val: avg,
            label: "OIC Avg",
            sub: `${ranked.length} scored`,
            c: "#00ACC1",
          },
          {
            val: gaps.length,
            label: "Data Gaps",
            sub: "Missing data",
            c: gaps.length > 10 ? "#F4511E" : "#43A047",
          },
          { val: ind?.s || "", label: "Source", sub: "", c: "#757575" },
        ]}
      />
      <Card>
        <Title>
          {ind?.cd} {ind?.n}
        </Title>
        <ResponsiveContainer width="100%" height={450}>
          <BarChart
            data={ranked.map((c) => ({
              name: c.name.length > 16 ? c.name.substring(0, 16) + "…" : c.name,
              score: c[si] || 0,
            }))}
            margin={{ top: 10, right: 10, left: 0, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 7 }}
              angle={-55}
              textAnchor="end"
            />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<TT />} />
            <ReferenceLine y={avg} stroke="#F4511E" strokeDasharray="5 5" />
            <Bar dataKey="score" fill="#1E88E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      {gaps.length > 0 && (
        <Card>
          <Title style={{ color: "#F4511E" }}>Data Gaps ({gaps.length})</Title>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {gaps.map((c) => (
              <Badge key={c.name} c="#F4511E" bg="#FFF3E0">
                {c.name}
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function OTiers() {
  const sorted = [...OIC_DATA]
    .filter((c) => c.idei)
    .sort((a, b) => a.rank - b.rank);
  const tiers = [
    {
      n: "Tier 1 — Leaders",
      d: "Score ≥ 65",
      f: (c) => c.idei >= 65,
      c: "#1E88E5",
      b: "#E3F2FD",
    },
    {
      n: "Tier 2 — Advanced",
      d: "Score 50–65",
      f: (c) => c.idei >= 50 && c.idei < 65,
      c: "#43A047",
      b: "#E8F5E9",
    },
    {
      n: "Tier 3 — Emerging",
      d: "Score 35–50",
      f: (c) => c.idei >= 35 && c.idei < 50,
      c: "#FFB300",
      b: "#FFF8E1",
    },
    {
      n: "Tier 4 — Foundational",
      d: "Score < 35",
      f: (c) => c.idei < 35,
      c: "#F4511E",
      b: "#FFF3E0",
    },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {tiers.map((t) => {
        const cs = sorted.filter(t.f);
        if (!cs.length) return null;
        const a = cs.reduce((s, c) => s + c.idei, 0) / cs.length;
        const pa = OP.map((p) => ({
          ...p,
          avg: cs.reduce((s, c) => s + (c[p.key] || 0), 0) / cs.length,
        }));
        return (
          <Card key={t.n} style={{ borderLeft: `5px solid ${t.c}` }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "16px",
              }}
            >
              <div>
                <div style={{ fontSize: "18px", fontWeight: 900, color: t.c }}>
                  {t.n}
                </div>
                <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                  {t.d}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "28px", fontWeight: 900, color: t.c }}>
                  {cs.length}
                </div>
                <div style={{ fontSize: "11px", color: "var(--muted)" }}>
                  avg {a.toFixed(1)}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginBottom: "16px",
              }}
            >
              {cs.map((c) => (
                <Badge key={c.name} c={t.c} bg={t.b}>
                  {c.name} ({c.idei.toFixed(1)})
                </Badge>
              ))}
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {pa.map((p) => (
                <div
                  key={p.key}
                  style={{
                    flex: "1 1 100px",
                    padding: "10px",
                    background:
                      p.avg > 60
                        ? "#E3F2FD"
                        : p.avg > 40
                          ? "#E8F5E9"
                          : "#FFF3E0",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{ fontSize: "18px", fontWeight: 900, color: p.c }}
                  >
                    {p.avg.toFixed(1)}
                  </div>
                  <div style={{ fontSize: "10px", color: "var(--muted)" }}>
                    {p.short}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

// ═══ OIC vs GLOBAL BENCHMARK ═════════════════════════════════════
function OBenchmark() {
  const sorted = [...OIC_DATA]
    .filter((c) => c.idei)
    .sort((a, b) => a.rank - b.rank);
  const nameMap = {
    Turkiye: "TUR",
    Malaysia: "MYS",
    Indonesia: "IDN",
    "Saudi Arabia": "SAU",
    "United Arab Emirates": "ARE",
    Bahrain: "BHR",
    Qatar: "QAT",
    Egypt: "EGY",
    Oman: "OMN",
    Nigeria: "NGA",
    Morocco: "MAR",
    Jordan: "JOR",
    Tunisia: "TUN",
    Algeria: "DZA",
    Pakistan: "PAK",
    Bangladesh: "BGD",
    Kuwait: "KWT",
    Kazakhstan: "KAZ",
    Uzbekistan: "UZB",
    Azerbaijan: "AZE",
    Albania: "ALB",
    Senegal: "SEN",
    Uganda: "UGA",
    Cameroon: "CMR",
    Mali: "MLI",
    Niger: "NER",
    Chad: "TCD",
    Somalia: "SOM",
    Sudan: "SDN",
    Yemen: "YEM",
    Iraq: "IRQ",
    Lebanon: "LBN",
    Afghanistan: "AFG",
    Tajikistan: "TJK",
    Turkmenistan: "TKM",
  };
  const benchmark = sorted.map((c) => {
    const gc = nameMap[c.name]
      ? G_DATA.find((g) => g.code === nameMap[c.name])
      : G_DATA.find((g) =>
          g.name.toLowerCase().includes(c.name.toLowerCase().split(" ")[0]),
        );
    return {
      ...c,
      gRank: gc?.rank || "—",
      gScore: gc?.gdei || 0,
      gName: gc?.name || "",
    };
  });
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Card>
        <Title>OIC vs Global Ranking Comparison</Title>
        <div style={{ maxHeight: "600px", overflowY: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "12px",
            }}
          >
            <thead
              style={{ position: "sticky", top: 0, background: "var(--card)" }}
            >
              <tr style={{ borderBottom: "2px solid var(--border)" }}>
                {[
                  "Country",
                  "OIC Rank",
                  "IDEI",
                  "Global Rank",
                  "GDEI",
                  "Gap",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "10px 8px",
                      textAlign: "left",
                      fontWeight: 600,
                      color: "var(--muted)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {benchmark.map((c) => (
                <tr
                  key={c.name}
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td style={{ padding: "8px", fontWeight: 600 }}>{c.name}</td>
                  <td style={{ padding: "8px" }}>
                    <Badge c="#1E88E5" bg="#E3F2FD">
                      #{c.rank}
                    </Badge>
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      fontWeight: 700,
                      color: "#1E88E5",
                    }}
                  >
                    {c.idei?.toFixed(1)}
                  </td>
                  <td style={{ padding: "8px" }}>
                    {c.gRank !== "—" ? (
                      <Badge c="#43A047" bg="#E8F5E9">
                        #{c.gRank}
                      </Badge>
                    ) : (
                      <span style={{ color: "var(--muted)" }}>—</span>
                    )}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      fontWeight: 700,
                      color: "#43A047",
                    }}
                  >
                    {c.gScore ? c.gScore.toFixed(1) : "—"}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      fontWeight: 700,
                      color:
                        c.gScore && c.idei > c.gScore ? "#43A047" : "#F4511E",
                    }}
                  >
                    {c.gScore
                      ? `${c.idei > c.gScore ? "+" : ""}${(c.idei - c.gScore).toFixed(1)}`
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function OMethodology() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Card>
        <Title>IDEI Methodology</Title>
        <p style={{ fontSize: "13px", lineHeight: 1.8, color: "var(--text)" }}>
          The Islamic Digital Economy Index (IDEI) measures digital economy
          readiness across 56 OIC member countries using 1,009 sub-indicators
          from 15 international databases. Scoring: 0–100 with min-max
          normalization using P5/P95 winsorization. Aggregation: 3-tier
          hierarchical (sub-indicators → indicators → pillars → IDEI).
        </p>
      </Card>
      <Card>
        <Title>Pillar Weights</Title>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5,1fr)",
            gap: "12px",
          }}
        >
          {OP.map((p) => (
            <div
              key={p.key}
              style={{
                background: `${p.c}12`,
                border: `2px solid ${p.c}`,
                borderRadius: "14px",
                padding: "18px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "28px", fontWeight: 900, color: p.c }}>
                {p.w}%
              </div>
              <div
                style={{ fontSize: "12px", fontWeight: 700, marginTop: "6px" }}
              >
                {p.name}
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <Title>15 Indicators & Sources</Title>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "12px",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border)" }}>
              {["Code", "Indicator", "Source", "Pillar"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 8px",
                    textAlign: "left",
                    fontWeight: 600,
                    color: "var(--muted)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {OI.map((i) => {
              const p = OP.find((x) => x.key === i.p);
              return (
                <tr
                  key={i.cd}
                  style={{ borderBottom: "1px solid var(--border)" }}
                >
                  <td style={{ padding: "8px", fontWeight: 700, color: p?.c }}>
                    {i.cd}
                  </td>
                  <td style={{ padding: "8px", fontWeight: 600 }}>{i.n}</td>
                  <td style={{ padding: "8px", color: "var(--muted)" }}>
                    {i.s}
                  </td>
                  <td style={{ padding: "8px" }}>
                    <Badge c={p?.c} bg={p?.c + "18"}>
                      {p?.name}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
      <Card style={{ borderTop: "4px solid #1E88E5" }}>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 900,
              color: "var(--accent)",
              fontFamily: "var(--font)",
            }}
          >
            INCEIF University
          </div>
          <div
            style={{
              fontSize: "13px",
              color: "var(--muted)",
              marginTop: "4px",
            }}
          >
            The Global University of Islamic Finance
          </div>
          <div
            style={{
              fontSize: "12px",
              color: "var(--muted)",
              marginTop: "12px",
            }}
          >
            © 2025 Islamic Digital Economy Index | 1,009 Sub-Indicators · 15
            Databases · 56 Countries
          </div>
        </div>
      </Card>
    </div>
  );
}

// ═══ REPORT GENERATOR ═════════════════════════════════════════════
function printReport() {
  const el = document.getElementById("report-content");
  if (!el) return;
  const w = window.open("", "_blank", "width=900,height=700");
  w.document
    .write(`<!DOCTYPE html><html><head><title>Country Report</title><style>
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}body{font-family:'DM Sans',sans-serif;color:#1E293B;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}
    @page{size:A4;margin:12mm 16mm}@media print{body{-webkit-print-color-adjust:exact!important;print-color-adjust:exact!important}}
  </style></head><body>${el.innerHTML}</body></html>`);
  w.document.close();
  setTimeout(() => {
    w.print();
  }, 500);
}

function GReport() {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(null);
  const filtered =
    q.length > 0
      ? G_DATA.filter((c) =>
          c.name.toLowerCase().includes(q.toLowerCase()),
        ).slice(0, 8)
      : [];
  const c = sel || G_DATA[0];
  const cl = gCl(c.gdei);
  const avg = GA;
  const ranks = GP.map((p) => {
    const s = [...G_DATA].sort((a, b) => b[p.key] - a[p.key]);
    return {
      ...p,
      score: c[p.key],
      rank: s.findIndex((x) => x.code === c.code) + 1,
    };
  });
  const ranksS = [...ranks].sort((a, b) => b.score - a.score);
  const strengths = ranksS.filter((p) => p.score > avg + 10);
  const weak = ranksS.filter((p) => p.score < avg - 5);
  const regionCs = G_DATA.filter((x) => x.region === c.region);
  const regionAvg = regionCs.reduce((s, x) => s + x.gdei, 0) / regionCs.length;
  const peers = G_DATA.filter((x) => x.code !== c.code)
    .map((x) => ({
      ...x,
      dist: Math.sqrt(
        GP.reduce((s, p) => s + Math.pow(c[p.key] - x[p.key], 2), 0),
      ),
    }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 5);
  const extKeys = [
    "fa",
    "fm",
    "fi",
    "gc",
    "gd",
    "ge",
    "gp",
    "cl",
    "ct",
    "co",
    "cc",
    "cp",
    "io",
    "ib",
    "ie",
  ];
  const filled = extKeys.filter((k) => getE(c.code, k) != null).length;
  const dataPct = Math.round((filled / extKeys.length) * 100);

  // GovTech details
  const gt = {
    cs: getE(c.code, "gc"),
    ce: getE(c.code, "gd"),
    en: getE(c.code, "ge"),
    pd: getE(c.code, "gp"),
    dp: getE(c.code, "g6"),
    od: getE(c.code, "g4"),
  };
  // Financial
  const fi = {
    acc: getE(c.code, "fa"),
    mob: getE(c.code, "fm"),
    int: getE(c.code, "fi"),
  };
  // Cyber
  const cy = {
    le: getE(c.code, "cl"),
    te: getE(c.code, "ct"),
    or: getE(c.code, "co"),
    ca: getE(c.code, "cc"),
    co: getE(c.code, "cp"),
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Card>
        <Title>Generate Country Report (PDF)</Title>
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "relative", flex: 1, maxWidth: "400px" }}>
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
              }}
              placeholder="Type a country name..."
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                fontSize: "14px",
                fontFamily: "var(--font)",
                background: "var(--card)",
                color: "var(--text)",
              }}
            />
            {q.length > 0 && filtered.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  marginTop: "4px",
                  boxShadow: "0 8px 24px var(--shadow)",
                  zIndex: 100,
                  maxHeight: "260px",
                  overflowY: "auto",
                }}
              >
                {filtered.map((x) => (
                  <div
                    key={x.code}
                    onClick={() => {
                      setSel(x);
                      setQ(x.name);
                    }}
                    style={{
                      padding: "10px 16px",
                      cursor: "pointer",
                      borderBottom: "1px solid var(--border)",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "var(--hover)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <span style={{ fontWeight: 600 }}>{x.name}</span>
                    <span style={{ color: "var(--accent)", fontWeight: 700 }}>
                      {x.gdei.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={printReport}
            style={{
              padding: "12px 24px",
              border: "none",
              borderRadius: "10px",
              background: "#1E88E5",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font)",
            }}
          >
            📄 Download PDF
          </button>
        </div>
      </Card>

      {/* Report Preview */}
      <div id="report-content">
        <div
          style={{
            background: "#fff",
            color: "#1E293B",
            fontFamily: "'DM Sans',sans-serif",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg,#1E88E5,#0D47A1)",
              padding: "28px 32px",
              color: "#fff",
              borderRadius: "12px 12px 0 0",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    opacity: 0.7,
                  }}
                >
                  GLOBAL DIGITAL ECONOMY INDEX — COUNTRY REPORT
                </div>
                <div
                  style={{
                    fontSize: "26px",
                    fontWeight: 700,
                    fontFamily: "'DM Serif Display',serif",
                    marginTop: "4px",
                  }}
                >
                  {c.name}
                </div>
                <div
                  style={{ fontSize: "13px", opacity: 0.8, marginTop: "4px" }}
                >
                  {c.region} · {cl.l}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "48px",
                    fontWeight: 700,
                    fontFamily: "'DM Serif Display',serif",
                  }}
                >
                  {c.gdei.toFixed(1)}
                </div>
                <div style={{ fontSize: "12px", opacity: 0.7 }}>
                  Rank #{c.rank} of {G_DATA.length}
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: "28px 32px", background: "#fff" }}>
            {/* 1. Executive Summary */}
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "10px",
                  color: "#0D47A1",
                }}
              >
                1. Executive summary
              </div>
              <div
                style={{ fontSize: "13px", lineHeight: 1.8, color: "#475569" }}
              >
                {c.name} ranks{" "}
                <strong style={{ color: "#1E88E5" }}>#{c.rank} globally</strong>{" "}
                with a GDEI score of {c.gdei.toFixed(1)}, placing it in the{" "}
                <strong>{cl.l}</strong> tier. The country scores{" "}
                {(c.gdei - avg).toFixed(1) > 0 ? "+" : ""}
                {(c.gdei - avg).toFixed(1)} points{" "}
                {c.gdei > avg ? "above" : "below"} the global average (
                {avg.toFixed(1)}). Its strongest pillar is {ranksS[0].name} (
                {ranksS[0].score.toFixed(1)}, #{ranksS[0].rank}) and its weakest
                is {ranksS[ranksS.length - 1].name} (
                {ranksS[ranksS.length - 1].score.toFixed(1)}, #
                {ranksS[ranksS.length - 1].rank}).
              </div>
            </div>

            {/* 2. Pillar Performance */}
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "14px",
                  color: "#0D47A1",
                }}
              >
                2. Pillar performance
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: "10px",
                }}
              >
                {ranksS.map((p) => {
                  const isWeak = p.score < avg - 5;
                  return (
                    <div
                      key={p.key}
                      style={{
                        padding: "14px",
                        borderRadius: "10px",
                        background: isWeak ? "#FFF3E0" : "#F8FAFC",
                        border: isWeak
                          ? "1px solid #F4511E30"
                          : "1px solid #E2E8F0",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",
                          color: isWeak ? "#F4511E" : "#64748B",
                        }}
                      >
                        {p.short}
                        {isWeak ? " ⚠" : ""}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "6px",
                          marginTop: "4px",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "22px",
                            fontWeight: 700,
                            color: isWeak ? "#F4511E" : p.c,
                          }}
                        >
                          {p.score.toFixed(1)}
                        </span>
                        <span style={{ fontSize: "11px", color: "#94A3B8" }}>
                          #{p.rank}
                        </span>
                      </div>
                      <div
                        style={{
                          height: "4px",
                          borderRadius: "2px",
                          background: "#E2E8F0",
                          marginTop: "8px",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            borderRadius: "2px",
                            background: isWeak ? "#F4511E" : p.c,
                            width: `${p.score}%`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Strengths & Weaknesses */}
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "12px",
                  color: "#0D47A1",
                }}
              >
                3. Strengths & weaknesses
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    padding: "16px",
                    borderLeft: "3px solid #43A047",
                    background: "#F8FAFC",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#43A047",
                      marginBottom: "8px",
                    }}
                  >
                    Strengths ({strengths.length} pillars above avg+10)
                  </div>
                  {strengths.length > 0 ? (
                    strengths.map((p) => (
                      <div
                        key={p.key}
                        style={{
                          fontSize: "12px",
                          color: "#475569",
                          lineHeight: 2,
                        }}
                      >
                        {p.name}: {p.score.toFixed(1)} (#{p.rank})
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: "12px", color: "#94A3B8" }}>
                      No pillars significantly above average
                    </div>
                  )}
                </div>
                <div
                  style={{
                    padding: "16px",
                    borderLeft: "3px solid #F4511E",
                    background: "#F8FAFC",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#F4511E",
                      marginBottom: "8px",
                    }}
                  >
                    Weaknesses ({weak.length} pillars below avg-5)
                  </div>
                  {weak.length > 0 ? (
                    weak.map((p) => (
                      <div
                        key={p.key}
                        style={{
                          fontSize: "12px",
                          color: "#475569",
                          lineHeight: 2,
                        }}
                      >
                        {p.name}: {p.score.toFixed(1)} (#{p.rank})
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: "12px", color: "#94A3B8" }}>
                      No pillars significantly below average
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 4. Regional Benchmark */}
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "12px",
                  color: "#0D47A1",
                }}
              >
                4. Regional benchmark — {c.region}
              </div>
              {[
                { n: c.name, v: c.gdei, col: "#1E88E5" },
                {
                  n: "Regional avg (" + c.region.split(" ")[0] + ")",
                  v: regionAvg,
                  col: "#94A3B8",
                },
                { n: "Global avg", v: avg, col: "#CBD5E1" },
              ].map((row) => (
                <div
                  key={row.n}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "12px",
                      width: "180px",
                      color: row.col === "#1E88E5" ? "#1E293B" : "#64748B",
                      fontWeight: row.col === "#1E88E5" ? 600 : 400,
                    }}
                  >
                    {row.n}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      width: "40px",
                      color: row.col,
                    }}
                  >
                    {row.v.toFixed(1)}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: "6px",
                      borderRadius: "3px",
                      background: "#E2E8F0",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: "3px",
                        background: row.col,
                        width: `${row.v}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 5. Deep-Dive Highlights */}
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "12px",
                  color: "#0D47A1",
                }}
              >
                5. Deep-dive highlights
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    padding: "12px",
                    background: "#F8FAFC",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#64748B",
                      fontWeight: 600,
                      marginBottom: "6px",
                    }}
                  >
                    GovTech maturity
                  </div>
                  {[
                    { l: "Core systems", v: gt.cs },
                    { l: "Citizen engagement", v: gt.ce },
                    { l: "Enablers", v: gt.en },
                    { l: "Public delivery", v: gt.pd },
                  ].map((r) => (
                    <div
                      key={r.l}
                      style={{
                        fontSize: "11px",
                        color: "#475569",
                        lineHeight: 1.9,
                      }}
                    >
                      {r.l}:{" "}
                      <strong>{r.v != null ? r.v.toFixed(2) : "N/A"}</strong>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    padding: "12px",
                    background: "#F8FAFC",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#64748B",
                      fontWeight: 600,
                      marginBottom: "6px",
                    }}
                  >
                    Financial inclusion
                  </div>
                  {[
                    { l: "Account ownership", v: fi.acc, u: "%" },
                    { l: "Mobile ownership", v: fi.mob, u: "%" },
                    { l: "Daily internet", v: fi.int, u: "%" },
                  ].map((r) => (
                    <div
                      key={r.l}
                      style={{
                        fontSize: "11px",
                        color: "#475569",
                        lineHeight: 1.9,
                      }}
                    >
                      {r.l}:{" "}
                      <strong>
                        {r.v != null ? r.v.toFixed(1) + r.u : "N/A"}
                      </strong>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    padding: "12px",
                    background: "#F8FAFC",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#64748B",
                      fontWeight: 600,
                      marginBottom: "6px",
                    }}
                  >
                    Cybersecurity (GCI)
                  </div>
                  {[
                    { l: "Legal", v: cy.le },
                    { l: "Technical", v: cy.te },
                    { l: "Organizational", v: cy.or },
                    { l: "Capacity", v: cy.ca },
                    { l: "Cooperation", v: cy.co },
                  ].map((r) => (
                    <div
                      key={r.l}
                      style={{
                        fontSize: "11px",
                        color: "#475569",
                        lineHeight: 1.9,
                      }}
                    >
                      {r.l}:{" "}
                      <strong>
                        {r.v != null ? r.v.toFixed(1) + "/20" : "N/A"}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. Peers */}
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "10px",
                  color: "#0D47A1",
                }}
              >
                6. Peer countries (most similar profile)
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {peers.map((p) => (
                  <span
                    key={p.code}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "8px",
                      background: p.gdei > c.gdei ? "#E3F2FD" : "#F1F5F9",
                      color: p.gdei > c.gdei ? "#1E88E5" : "#64748B",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    {p.name} ({p.gdei.toFixed(1)})
                  </span>
                ))}
              </div>
            </div>

            {/* 7. Data Coverage */}
            <div style={{ marginBottom: "12px" }}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "8px",
                  color: "#0D47A1",
                }}
              >
                7. Data coverage
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "8px",
                    borderRadius: "4px",
                    background: "#E2E8F0",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: "4px",
                      background:
                        dataPct >= 80
                          ? "#43A047"
                          : dataPct >= 50
                            ? "#FFB300"
                            : "#F4511E",
                      width: `${dataPct}%`,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: dataPct >= 80 ? "#43A047" : "#F4511E",
                  }}
                >
                  {dataPct}%
                </span>
                <span style={{ fontSize: "12px", color: "#94A3B8" }}>
                  ({filled}/{extKeys.length} deep-dive indicators)
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              borderTop: "1px solid #E2E8F0",
              padding: "16px 32px",
              fontSize: "11px",
              color: "#94A3B8",
              textAlign: "center",
              background: "#F8FAFC",
              borderRadius: "0 0 12px 12px",
            }}
          >
            Generated from Global Digital Economy Index Dashboard · Data: ITU,
            World Bank, UN, UNCTAD, UNESCO, WIPO · 2025
          </div>
        </div>
      </div>
    </div>
  );
}

function OReport() {
  const sorted = [...OIC_DATA]
    .filter((c) => c.idei)
    .sort((a, b) => a.rank - b.rank);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(null);
  const filtered =
    q.length > 0
      ? sorted
          .filter((c) => c.name.toLowerCase().includes(q.toLowerCase()))
          .slice(0, 8)
      : [];
  const c = sel || sorted[0];
  if (!c) return null;
  const cl = oCl(c.idei);
  const indData = OI.map((ind) => {
    const score = c[ind.k] || 0;
    const avg = Math.round(
      sorted.reduce((s, x) => s + (x[ind.k] || 0), 0) / sorted.length,
    );
    const diff = score - avg;
    return {
      ...ind,
      score,
      avg,
      diff,
      assess: !score
        ? "DATA GAP"
        : diff > 15
          ? "STRENGTH"
          : diff > 0
            ? "ABOVE AVG"
            : "BELOW AVG",
    };
  });
  const strengths = indData.filter((i) => i.assess === "STRENGTH");
  const aboveAvg = indData.filter((i) => i.assess === "ABOVE AVG");
  const weak = indData.filter((i) => i.assess === "BELOW AVG");
  const gaps = indData.filter((i) => i.assess === "DATA GAP");
  // Find global match
  const nameMap = {
    Turkiye: "TUR",
    Malaysia: "MYS",
    Indonesia: "IDN",
    "Saudi Arabia": "SAU",
    "United Arab Emirates": "ARE",
    Bahrain: "BHR",
    Qatar: "QAT",
    Egypt: "EGY",
    Oman: "OMN",
    Nigeria: "NGA",
    Morocco: "MAR",
    Jordan: "JOR",
    Tunisia: "TUN",
    Algeria: "DZA",
    Pakistan: "PAK",
    Bangladesh: "BGD",
    Kuwait: "KWT",
    Kazakhstan: "KAZ",
    Uzbekistan: "UZB",
    Azerbaijan: "AZE",
    Albania: "ALB",
  };
  const gc = nameMap[c.name]
    ? G_DATA.find((g) => g.code === nameMap[c.name])
    : G_DATA.find((g) =>
        g.name.toLowerCase().includes(c.name.toLowerCase().split(" ")[0]),
      );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Card>
        <Title>Generate OIC Country Report (PDF)</Title>
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "relative", flex: 1, maxWidth: "400px" }}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Type an OIC country name..."
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid var(--border)",
                borderRadius: "10px",
                fontSize: "14px",
                fontFamily: "var(--font)",
                background: "var(--card)",
                color: "var(--text)",
              }}
            />
            {q.length > 0 && filtered.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  marginTop: "4px",
                  boxShadow: "0 8px 24px var(--shadow)",
                  zIndex: 100,
                }}
              >
                {filtered.map((x) => (
                  <div
                    key={x.name}
                    onClick={() => {
                      setSel(x);
                      setQ(x.name);
                    }}
                    style={{
                      padding: "10px 16px",
                      cursor: "pointer",
                      borderBottom: "1px solid var(--border)",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "var(--hover)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <span style={{ fontWeight: 600 }}>{x.name}</span>
                    <span style={{ color: "var(--accent)", fontWeight: 700 }}>
                      {x.idei?.toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={printReport}
            style={{
              padding: "12px 24px",
              border: "none",
              borderRadius: "10px",
              background: "#0D47A1",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font)",
            }}
          >
            📄 Download PDF
          </button>
        </div>
      </Card>

      <div id="report-content">
        <div
          style={{
            background: "#fff",
            color: "#1E293B",
            fontFamily: "'DM Sans',sans-serif",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg,#0D47A1,#002171)",
              padding: "28px 32px",
              color: "#fff",
              borderRadius: "12px 12px 0 0",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    opacity: 0.7,
                  }}
                >
                  ISLAMIC DIGITAL ECONOMY INDEX — COUNTRY ASSESSMENT
                </div>
                <div
                  style={{
                    fontSize: "26px",
                    fontWeight: 700,
                    fontFamily: "'DM Serif Display',serif",
                    marginTop: "4px",
                  }}
                >
                  {c.name}
                </div>
                <div
                  style={{ fontSize: "13px", opacity: 0.8, marginTop: "4px" }}
                >
                  {c.region} · {cl.l}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "48px",
                    fontWeight: 700,
                    fontFamily: "'DM Serif Display',serif",
                  }}
                >
                  {c.idei?.toFixed(2)}
                </div>
                <div style={{ fontSize: "12px", opacity: 0.7 }}>
                  #{c.rank} of {sorted.length} OIC States
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: "28px 32px", background: "#fff" }}>
            {/* 1. Executive Summary */}
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "10px",
                  color: "#0D47A1",
                }}
              >
                1. Executive summary
              </div>
              <div
                style={{ fontSize: "13px", lineHeight: 1.8, color: "#475569" }}
              >
                {c.name} ranks{" "}
                <strong style={{ color: "#1E88E5" }}>
                  #{c.rank} among {sorted.length} OIC countries
                </strong>{" "}
                with an IDEI score of {c.idei?.toFixed(2)}, placing it in {cl.l}
                . The country scores {(c.idei || 0) - OA > 0 ? "+" : ""}
                {((c.idei || 0) - OA).toFixed(1)} points{" "}
                {(c.idei || 0) > OA ? "above" : "below"} the OIC average (
                {OA.toFixed(2)}).{" "}
                {strengths.length > 0
                  ? `Key strengths include ${strengths
                      .slice(0, 3)
                      .map((s) => `${s.n} (${s.score.toFixed(1)})`)
                      .join(", ")}.`
                  : ""}{" "}
                {gaps.length > 0
                  ? `Data gaps exist in ${gaps.map((g) => g.n).join(" and ")}.`
                  : "Full indicator coverage achieved."}
              </div>
            </div>

            {/* 2. Pillar Scores vs OIC Average */}
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "14px",
                  color: "#0D47A1",
                }}
              >
                2. Pillar scores vs OIC average
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5,1fr)",
                  gap: "8px",
                }}
              >
                {OP.map((p) => {
                  const score = c[p.key] || 0;
                  const avg =
                    sorted.reduce((s, x) => s + (x[p.key] || 0), 0) /
                    sorted.length;
                  const diff = score - avg;
                  return (
                    <div
                      key={p.key}
                      style={{
                        padding: "14px 10px",
                        textAlign: "center",
                        borderRadius: "10px",
                        background: "#F8FAFC",
                        border: "1px solid #E2E8F0",
                      }}
                    >
                      <div style={{ fontSize: "10px", color: "#64748B" }}>
                        {p.short}
                      </div>
                      <div
                        style={{
                          fontSize: "22px",
                          fontWeight: 700,
                          color: p.c,
                          margin: "6px 0",
                        }}
                      >
                        {score.toFixed(1)}
                      </div>
                      <div style={{ fontSize: "10px", color: "#94A3B8" }}>
                        OIC: {avg.toFixed(1)}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: diff > 0 ? "#43A047" : "#F4511E",
                          marginTop: "4px",
                        }}
                      >
                        {diff > 0 ? "+" : ""}
                        {diff.toFixed(1)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Indicator Assessment */}
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "12px",
                  color: "#0D47A1",
                }}
              >
                3. Indicator-level assessment ({OI.length} indicators)
              </div>
              <table
                style={{
                  width: "100%",
                  fontSize: "12px",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "2px solid #E2E8F0" }}>
                    {[
                      "Indicator",
                      c.name.split(" ")[0],
                      "OIC Avg",
                      "Diff",
                      "Assessment",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "8px 4px",
                          textAlign: "left",
                          fontWeight: 600,
                          color: "#64748B",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {indData.map((i) => {
                    const col =
                      i.assess === "STRENGTH"
                        ? "#43A047"
                        : i.assess === "DATA GAP"
                          ? "#94A3B8"
                          : i.assess === "ABOVE AVG"
                            ? "#1E88E5"
                            : "#F4511E";
                    return (
                      <tr
                        key={i.cd}
                        style={{ borderBottom: "1px solid #F1F5F9" }}
                      >
                        <td style={{ padding: "7px 4px", fontWeight: 600 }}>
                          {i.cd} {i.n}
                        </td>
                        <td
                          style={{
                            padding: "7px 4px",
                            fontWeight: 700,
                            color: col,
                          }}
                        >
                          {i.score || "N/A"}
                        </td>
                        <td style={{ padding: "7px 4px", color: "#94A3B8" }}>
                          {i.avg}
                        </td>
                        <td
                          style={{
                            padding: "7px 4px",
                            fontWeight: 700,
                            color: i.diff > 0 ? "#43A047" : "#F4511E",
                          }}
                        >
                          {i.score
                            ? `${i.diff > 0 ? "+" : ""}${i.diff.toFixed(1)}`
                            : ""}
                        </td>
                        <td style={{ padding: "7px 4px" }}>
                          <span
                            style={{
                              padding: "2px 8px",
                              borderRadius: "4px",
                              fontSize: "10px",
                              fontWeight: 600,
                              color: col,
                              background: col + "18",
                            }}
                          >
                            {i.assess}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 4. Policy Recommendations */}
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "12px",
                  color: "#0D47A1",
                }}
              >
                4. Policy recommendations
              </div>
              {strengths.length > 0 && (
                <div
                  style={{
                    padding: "14px 16px",
                    borderLeft: "3px solid #43A047",
                    background: "#F8FAFC",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#43A047",
                      marginBottom: "6px",
                    }}
                  >
                    Strengths to maintain ({strengths.length} indicators)
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#475569",
                      lineHeight: 1.7,
                    }}
                  >
                    {strengths
                      .map(
                        (s) =>
                          `${s.cd} ${s.n} (${s.score.toFixed(1)}, +${s.diff.toFixed(1)} vs avg)`,
                      )
                      .join("; ")}
                    .
                  </div>
                </div>
              )}
              {aboveAvg.length > 0 && (
                <div
                  style={{
                    padding: "14px 16px",
                    borderLeft: "3px solid #1E88E5",
                    background: "#F8FAFC",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#1E88E5",
                      marginBottom: "6px",
                    }}
                  >
                    Above average ({aboveAvg.length} indicators)
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#475569",
                      lineHeight: 1.7,
                    }}
                  >
                    {aboveAvg
                      .map((s) => `${s.cd} ${s.n} (${s.score.toFixed(1)})`)
                      .join("; ")}
                    .
                  </div>
                </div>
              )}
              {weak.length > 0 && (
                <div
                  style={{
                    padding: "14px 16px",
                    borderLeft: "3px solid #F4511E",
                    background: "#F8FAFC",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#F4511E",
                      marginBottom: "6px",
                    }}
                  >
                    Areas for improvement ({weak.length} indicators)
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#475569",
                      lineHeight: 1.7,
                    }}
                  >
                    {weak
                      .map(
                        (w) =>
                          `${w.cd} ${w.n} (${w.score.toFixed(1)}, ${w.diff.toFixed(1)} vs avg)`,
                      )
                      .join("; ")}
                    .
                  </div>
                </div>
              )}
              {gaps.length > 0 && (
                <div
                  style={{
                    padding: "14px 16px",
                    borderLeft: "3px solid #94A3B8",
                    background: "#F8FAFC",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#64748B",
                      marginBottom: "6px",
                    }}
                  >
                    Data gaps to close ({gaps.length} indicators)
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#475569",
                      lineHeight: 1.7,
                    }}
                  >
                    {gaps.map((g) => `${g.cd} ${g.n} (${g.s})`).join("; ")} —
                    not performance weaknesses but reporting blind spots that
                    should be addressed.
                  </div>
                </div>
              )}
            </div>

            {/* 5. OIC vs Global Positioning */}
            <div style={{ marginBottom: "12px" }}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  marginBottom: "12px",
                  color: "#0D47A1",
                }}
              >
                5. OIC vs global positioning
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    padding: "18px",
                    textAlign: "center",
                    borderRadius: "10px",
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <div style={{ fontSize: "11px", color: "#64748B" }}>
                    OIC rank
                  </div>
                  <div
                    style={{
                      fontSize: "36px",
                      fontWeight: 700,
                      color: "#1E88E5",
                      margin: "4px 0",
                    }}
                  >
                    #{c.rank}
                  </div>
                  <div style={{ fontSize: "12px", color: "#94A3B8" }}>
                    of {sorted.length} · IDEI: {c.idei?.toFixed(2)}
                  </div>
                </div>
                <div
                  style={{
                    padding: "18px",
                    textAlign: "center",
                    borderRadius: "10px",
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                  }}
                >
                  <div style={{ fontSize: "11px", color: "#64748B" }}>
                    Global rank (GDEI)
                  </div>
                  <div
                    style={{
                      fontSize: "36px",
                      fontWeight: 700,
                      color: gc ? "#43A047" : "#94A3B8",
                      margin: "4px 0",
                    }}
                  >
                    {gc ? `#${gc.rank}` : "—"}
                  </div>
                  <div style={{ fontSize: "12px", color: "#94A3B8" }}>
                    {gc
                      ? `of ${G_DATA.length} · GDEI: ${gc.gdei.toFixed(1)}`
                      : "Not matched"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid #E2E8F0",
              padding: "16px 32px",
              fontSize: "11px",
              color: "#94A3B8",
              textAlign: "center",
              background: "#F8FAFC",
              borderRadius: "0 0 12px 12px",
            }}
          >
            Generated from Islamic Digital Economy Index (IDEI) Dashboard ·
            INCEIF University · 1,009 Sub-Indicators · 15 Databases · 2025
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══ NAVIGATION ══════════════════════════════════════════════════
const G_TABS = [
  {
    g: "📊 Overview",
    items: [
      { id: "go", l: "Global Overview", C: GOverview },
      { id: "gs", l: "Statistics", C: GStats },
      { id: "gdg", l: "Data Gaps", C: GDataGaps },
    ],
  },
  {
    g: "🔍 Analysis",
    items: [
      { id: "gp", l: "Country Profiles", C: GProfiles },
      { id: "gc", l: "Compare Countries", C: GCompare },
      { id: "gpl", l: "Pillar Analysis", C: GPillar },
      { id: "gpe", l: "Peer Learning", C: GPeers },
    ],
  },
  {
    g: "🌍 Geographic",
    items: [
      { id: "gg", l: "Geographic Analysis", C: GGeo },
      { id: "gcb", l: "Custom Builder", C: GCustom },
    ],
  },
  {
    g: "📈 Deep Dives",
    items: [
      { id: "gfi", l: "Financial Inclusion", C: GFinancial },
      { id: "gbd", l: "Business Digitization", C: GBusiness },
      { id: "gem", l: "Employment & Skills", C: GEmployment },
      { id: "ggt", l: "GovTech", C: GGovTech },
      { id: "gcy", l: "Cybersecurity", C: GCyber },
      { id: "gdi", l: "Digital Identity", C: GDigID },
      { id: "gpr", l: "Pricing & Competition", C: GPricing },
      { id: "gwi", l: "Patents", C: GPatents },
    ],
  },
  { g: "📄 Reports", items: [{ id: "grp", l: "Generate Report", C: GReport }] },
];
const O_TABS = [
  {
    g: "📊 Overview",
    items: [
      { id: "oo", l: "OIC Overview", C: OOverview },
      { id: "obe", l: "OIC vs Global", C: OBenchmark },
    ],
  },
  {
    g: "🔍 Analysis",
    items: [
      { id: "op", l: "Country Profiles", C: OProfiles },
      { id: "oc", l: "Compare Countries", C: OCompare },
      { id: "opl", l: "Pillar Analysis", C: OPillar },
    ],
  },
  {
    g: "🌍 Regional",
    items: [
      { id: "org", l: "Regional Analysis", C: ORegional },
      { id: "oti", l: "Tier Analysis", C: OTiers },
      { id: "odi", l: "Digital Divide", C: ODivide },
    ],
  },
  {
    g: "📈 Details",
    items: [
      { id: "oin", l: "Indicator Deep-Dive", C: OIndicators },
      { id: "om", l: "Methodology", C: OMethodology },
    ],
  },
  { g: "📄 Reports", items: [{ id: "orp", l: "Generate Report", C: OReport }] },
];

// ═══ APP ═════════════════════════════════════════════════════════
export default function App() {
  const [mode, setMode] = useState("global");
  const [dark, setDark] = useState(false);
  const tabs = mode === "global" ? G_TABS : O_TABS;
  const allItems = tabs.flatMap((g) => g.items);
  const [at, setAt] = useState("go");
  const curTab = allItems.find((t) => t.id === at) || allItems[0];
  const Comp = curTab.C;
  const switchMode = (m) => {
    setMode(m);
    setAt(m === "global" ? "go" : "oo");
  };

  const theme = dark
    ? {
        "--bg": "#0F172A",
        "--card": "#1E293B",
        "--text": "#E2E8F0",
        "--muted": "#94A3B8",
        "--border": "#334155",
        "--accent": "#38BDF8",
        "--hover": "#334155",
        "--shadow": "rgba(0,0,0,0.4)",
        "--font": "'DM Serif Display',Georgia,serif",
      }
    : {
        "--bg": "#F8FAFC",
        "--card": "#FFFFFF",
        "--text": "#1E293B",
        "--muted": "#64748B",
        "--border": "#E2E8F0",
        "--accent": "#1E88E5",
        "--hover": "#F1F5F9",
        "--shadow": "rgba(0,0,0,0.06)",
        "--font": "'DM Serif Display',Georgia,serif",
      };

  return (
    <div
      style={{
        ...theme,
        fontFamily: "var(--font)",
        background: "var(--bg)",
        minHeight: "100vh",
        color: "var(--text)",
        display: "flex",
      }}
    >
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&display=swap');
      *{box-sizing:border-box;transition:background-color 0.3s,color 0.3s,border-color 0.3s}
      ::-webkit-scrollbar{width:6px;height:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}::-webkit-scrollbar-thumb:hover{background:var(--accent)}
      select:hover,input:hover{border-color:var(--accent)!important}select:focus,input:focus{border-color:var(--accent)!important;box-shadow:0 0 0 3px var(--accent)20;outline:none}
      table tbody tr:hover{background:var(--hover)!important}
      input[type=range]{height:6px;-webkit-appearance:none;border-radius:3px;background:var(--border)}
      input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:16px;height:16px;border-radius:50%;background:var(--accent);cursor:pointer}
      @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    `}</style>

      {/* Sidebar */}
      <div
        style={{
          width: "240px",
          background: dark ? "#0F172A" : "#fff",
          borderRight: `1px solid ${dark ? "#1E293B" : "#E2E8F0"}`,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          position: "sticky",
          top: 0,
          overflowY: "auto",
          flexShrink: 0,
        }}
      >
        {/* Mode Toggle */}
        <div style={{ padding: "16px" }}>
          {[
            {
              id: "global",
              l: "🌐 Global Index",
              sub: `${G_DATA.length} countries`,
            },
            {
              id: "oic",
              l: "🕌 OIC / IDEI",
              sub: `${OIC_DATA.length} countries`,
            },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => switchMode(m.id)}
              style={{
                display: "block",
                width: "100%",
                padding: "12px 14px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontFamily: "var(--font)",
                fontSize: "13px",
                fontWeight: mode === m.id ? 700 : 500,
                background: mode === m.id ? "var(--accent)" : "transparent",
                color: mode === m.id ? "#fff" : "var(--muted)",
                marginBottom: "4px",
                textAlign: "left",
                transition: "all 0.2s",
              }}
            >
              {m.l}
              <div style={{ fontSize: "10px", opacity: 0.7, marginTop: "2px" }}>
                {m.sub}
              </div>
            </button>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid var(--border)",
            padding: "8px 12px",
            flex: 1,
          }}
        >
          {tabs.map((g) => (
            <div key={g.g} style={{ marginBottom: "12px" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--muted)",
                  padding: "8px 8px 4px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {g.g}
              </div>
              {g.items.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setAt(t.id)}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif",
                    fontSize: "13px",
                    fontWeight: at === t.id ? 600 : 400,
                    background: at === t.id ? `var(--accent)15` : "transparent",
                    color: at === t.id ? "var(--accent)" : "var(--text)",
                    textAlign: "left",
                    transition: "all 0.15s",
                    marginBottom: "2px",
                  }}
                >
                  {t.l}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Dark Mode + Branding */}
        <div
          style={{ padding: "12px 16px", borderTop: "1px solid var(--border)" }}
        >
          <button
            onClick={() => setDark((d) => !d)}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              cursor: "pointer",
              background: "var(--card)",
              color: "var(--text)",
              fontSize: "12px",
              fontFamily: "var(--font)",
            }}
          >
            {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
          <div
            style={{
              fontSize: "10px",
              color: "var(--muted)",
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            INCEIF University
            <br />© 2025
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* Hero */}
        <div
          style={{
            background: dark
              ? "linear-gradient(135deg,#0F172A,#1E293B)"
              : "linear-gradient(135deg,#0D47A1,#1565C0)",
            padding: "28px 40px",
            color: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}
              >
                {mode === "global"
                  ? "Global Digital Economy Index"
                  : "Islamic Digital Economy Index"}
              </h1>
              <div
                style={{ fontSize: "12px", color: "#B0D4FF", marginTop: "4px" }}
              >
                {mode === "global"
                  ? `${G_DATA.length} Countries · 15 Sources · 32+ Indicators`
                  : `${OIC_DATA.length} OIC States · 1,009 Sub-Indicators · 15 Databases`}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: "11px",
                  color: "#7DD3FC",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                {mode === "global" ? "GLOBAL" : "OIC"} AVERAGE
              </div>
              <div
                style={{
                  fontSize: "42px",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(135deg,#00E5FF,#00BCD4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <AnimNum value={mode === "global" ? GA : OA} />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            padding: "28px 32px",
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
            flex: 1,
            animation: "fadeIn 0.4s ease",
          }}
        >
          <Comp />
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "20px 40px",
            textAlign: "center",
            fontSize: "11px",
            color: "var(--muted)",
            borderTop: "1px solid var(--border)",
          }}
        >
          {mode === "global"
            ? "© 2025 Global Digital Economy Index — Data: ITU, World Bank, UN, UNCTAD, UNESCO, WIPO"
            : "© 2025 Islamic Digital Economy Index (IDEI) — INCEIF University · The Global University of Islamic Finance"}
        </div>
      </div>
    </div>
  );
}
