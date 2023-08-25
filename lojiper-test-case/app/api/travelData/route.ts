import { NextRequest, NextResponse } from "next/server";
import { allTravelData } from "./allTravelData";

export async function GET(request: NextRequest) {
  // Do whatever you want
  return NextResponse.json(allTravelData, { status: 200 });
}
