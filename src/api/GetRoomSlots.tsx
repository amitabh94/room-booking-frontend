import axios from "axios";

export async function getRoomSlots(){

    const response = await axios.get(
      `http://localhost:8001/rooms/status`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    return response.data
}
