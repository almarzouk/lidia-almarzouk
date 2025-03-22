import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Reservation from "../../../models/Reservation";

export async function GET() {
  await connectDB();
  const reservations = await Reservation.find();
  return NextResponse.json(reservations);
}
