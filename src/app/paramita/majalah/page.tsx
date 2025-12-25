import type { Metadata } from "next";
import ParamitaListingClient from "../ParamitaListingClient";
import { getParamitaArtikelList, getParamitaMajalahList } from "@/lib/paramitaContent";

export const metadata: Metadata = {
  title: "Majalah",
};

export default async function ParamitaMajalahPage() {
  const [artikel, majalah] = await Promise.all([
    getParamitaArtikelList(),
    getParamitaMajalahList(),
  ]);
  return <ParamitaListingClient active="majalah" artikel={artikel} majalah={majalah} />;
}
