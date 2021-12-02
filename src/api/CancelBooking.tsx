import axios from "axios";

export async function cancelBooking(bookingId:number, emailId: string) {
  try {
    console.log(bookingId,emailId);
    const response = await axios.post(
      `http://localhost:8001/booking/cancel`,{

      booking_id: bookingId,
      email_id: emailId

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
