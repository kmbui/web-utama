import type { Metadata } from "next";
import ParamitaListingClient from "../ParamitaListingClient";
import { getParamitaArtikelList, getParamitaMajalahList } from "@/lib/paramitaContent";

export const metadata: Metadata = {
  title: "Artikel",
};

export default async function ParamitaArtikelPage() {
  const [artikel, majalah] = await Promise.all([
    getParamitaArtikelList(),
    getParamitaMajalahList(),
  ]);
  return <ParamitaListingClient active="artikel" artikel={artikel} majalah={majalah} />;
}
