import axios from "axios";

export async function createBooking(timeSlot:number,roomName:string,emailId:string):Promise<any> {
  try {
    const response = await axios
    .post(
      `http://localhost:8001/booking/add`,
      {
        time_slot: timeSlot,
        room_name: roomName,
        email_id: emailId,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );
    return response;
  } catch (e) {
    return e;
  }
}
