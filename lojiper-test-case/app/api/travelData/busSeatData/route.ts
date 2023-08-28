import { NextRequest, NextResponse } from "next/server";
import { busSeatData } from "./busSeatData";

export async function GET(request: NextRequest) {
  // Do whatever you want
  return NextResponse.json(busSeatData, { status: 200 });
}
