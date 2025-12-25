import type { Metadata } from "next";
import ParamitaClient from "./ParamitaClient";

export const metadata: Metadata = { title: "Paramita" };

export default function ParamitaPage() {
  return <ParamitaClient />;
}
