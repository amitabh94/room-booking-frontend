import axios from "axios";

export async function fetchTimeSlots(){
try{
    const response = await axios.get(
      `http://localhost:8001/timeslots/`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    return response.data;
}
catch(e){
return [];
}
}
