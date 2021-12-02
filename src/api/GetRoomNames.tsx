import axios from "axios";

export async function fetchRoomNames(){

    const response = await axios.get(
      `http://localhost:8001/rooms/`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    return response.data
}
