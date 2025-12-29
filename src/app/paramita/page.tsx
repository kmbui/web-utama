import type { Metadata } from "next";
import ParamitaClient from "./ParamitaClient";
import { getParamitaMajalahList } from "@/lib/paramitaContent";

export const metadata: Metadata = { title: "Paramita" };

export default async function ParamitaPage() {
  const majalah = await getParamitaMajalahList();
  return <ParamitaClient majalah={majalah} />;
}
