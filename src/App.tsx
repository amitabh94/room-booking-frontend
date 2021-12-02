import React, { useEffect, useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { Input } from "@chakra-ui/input";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { createBooking } from "./api/CreateBoking";
import { cancelBooking } from "./api/CancelBooking";
import { getRoomSlots } from "./api/GetRoomSlots";
import { RoomStatus } from "./common/Entities";

function App() {
  const {
    isOpen: isBookingOpen,
    onOpen: onBookingOpen,
    onClose: onBookingClose,
  } = useDisclosure();

  const {
    isOpen: isCancelBookingOpen,
    onOpen: onCancelBookingOpen,
    onClose: onCancelBookingClose,
  } = useDisclosure();



  const [allRoomStatus, setallRoomStatus] = useState([]);
  useEffect(() => {
    async function getRoomsStatus() {
      setallRoomStatus(await getRoomSlots());
    }
    getRoomsStatus();
  }, []);

  function ModalFormContent() {
    const {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
    } = useForm();
    const [registerErrorMessage, setRegisterErrorMessage] = useState("");
    const toast = useToast();
    async function onSubmit(values: any) {
      const response = await createBooking(
        values.TimeSlot,
        values.RoomName,
        values.EmailId
      );
      console.log(response);
      if(response.data){
              if (response.data.booking_id) {
        setRegisterErrorMessage(response.data.booking_id);
        toast({
          title: `Please copy and save this booking id for future modifications ${response.data.booking_id}`,
          status: "success",
          duration: 10000,
          isClosable: true,
        });
      } else if (response.data.message) {
        setRegisterErrorMessage(response.data.message);
        toast({
          title: response.data.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }} else {
        setRegisterErrorMessage("Booking Unsuccessful! Please try again.");
        toast({
          title: "Booking Unsuccessful! Please try again.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {registerErrorMessage && (
          <p className="error"> {registerErrorMessage} </p>
        )}
        <FormControl isInvalid={errors.TimeSlot}>
          <FormLabel htmlFor="timeslot">Time Slot</FormLabel>
          <Input
            id="TimeSlot"
            placeholder="Choose Time Slot"
            {...register("TimeSlot", {
              required: "This is required",
            })}
          />
          {errors.TimeSlot && errors.TimeSlot.message}
        </FormControl>
        <FormControl isInvalid={errors.RoomName}>
          <FormLabel htmlFor="roomname">Room Name</FormLabel>
          <Input
            id="RoomName"
            placeholder="Choose Room"
            {...register("RoomName", {
              required: "This is required",
            })}
          />
          {errors.RoomName && errors.RoomName.message}
        </FormControl>
        <FormControl isInvalid={errors.emailId}>
          <FormLabel htmlFor="emailId">Email Id</FormLabel>
          <Input
            id="EmailId"
            placeholder="Add Email Address"
            {...register("EmailId", {
              required: "This is required",
              pattern: {
                value: /\S+@\S+\S+/,
                message: "Invalid Email Format",
              },
            })}
          />
          {errors.EmailId && errors.EmailId.message}
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    );
  }

  function BookingModal() {
    return (
      <div>
        <Modal
          isOpen={isBookingOpen}
          onClose={onBookingClose}
          blockScrollOnMount={false}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Booking</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{ModalFormContent()}</ModalBody>
          </ModalContent>
        </Modal>
      </div>
    );
  }

  function CancelModalFormContent() {
    const {
      handleSubmit,
      register,
      formState: { errors, isSubmitting },
    } = useForm();
    const [cancelErrorMessage, setCancelErrorMessage] = useState("");
    const toast = useToast();
    async function onSubmit(values: any) {
      const response: any = await cancelBooking(
        values.BookingId,
        values.EmailId
      );
      if(response.data){
      if (response.data.status) {
        setCancelErrorMessage(response.data.status);
        toast({
          title: `Booking has been successfully cancelled.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else if (response.data.message) {
        setCancelErrorMessage(response.data.message);
        toast({
          title: response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }} else {
        setCancelErrorMessage("Cancellation unsuccessful.Please try again!");
        toast({
          title: "Cancellation unsuccessful.Please try again!",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        {cancelErrorMessage && (
          <p className="error"> {cancelErrorMessage} </p>
        )}
        <FormControl isInvalid={errors.BookingId}>
          <FormLabel htmlFor="bookingid">Booking ID</FormLabel>
          <Input
            id="BookingId"
            placeholder="Enter booking id"
            {...register("BookingId", {
              required: "This is required",
            })}
          />
          {errors.BookingId && errors.BookingId.message}
        </FormControl>
        <FormControl isInvalid={errors.emailId}>
          <FormLabel htmlFor="emailId">Email Id</FormLabel>
          <Input
            id="EmailId"
            placeholder="Add Email Address"
            {...register("EmailId", {
              required: "This is required",
              pattern: {
                value: /\S+@\S+\S+/,
                message: "Invalid Email Format",
              },
            })}
          />
          {errors.EmailId && errors.EmailId.message}
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    );
  }

  function CancelBookingModal() {
    return (
      <div>
        <Modal
          isOpen={isCancelBookingOpen}
          onClose={onCancelBookingClose}
          blockScrollOnMount={false}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Cancel Booking</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{CancelModalFormContent()}</ModalBody>
          </ModalContent>
        </Modal>
      </div>
    );
  }

  function RoomAvailability(allRoomStatus: RoomStatus[]) {
    console.log(allRoomStatus);

    if (allRoomStatus) {
      return (
        <div>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Room</Th>
                <Th>Time Slot</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            {allRoomStatus.map((slot) => (
              <Tbody>
                <Tr>
                  <Td>{slot.room_name}</Td>
                  <Td>{slot.time_slot}</Td>
                  {getStatus(slot.status)}
                </Tr>
              </Tbody>
            ))}
          </Table>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Room Data not available..</h4>
        </div>
      );
    }
  }

  return (
    <div className="Room Booking System">


          <h1>Room Availability</h1>
          <Box overflowY="scroll" maxHeight="500px">
            {RoomAvailability(allRoomStatus)}
          </Box>
          <Flex justifyContent="center" alignItems="center">
          <VStack>
          <Box alignItems="center">
            {BookingModal()}
            <Button colorScheme="teal" size="md" onClick={onBookingOpen}>
              New Booking
            </Button>
          </Box>
          <br />
          <Box alignItems="center">
            {CancelBookingModal()}
            <Button colorScheme="teal" size="md" onClick={onCancelBookingOpen}>
              Cancel Booking
            </Button>
          </Box>
        </VStack>
      </Flex>
    </div>
  );
}

function getStatus(status: number): React.ReactNode {
  let color:string;
  if(status===0){
    color = 'green.300'
  }else{
    color= 'red.300'
  }
  return(
    <Td bgcolor={color}>{status===0?'Available':'Occupied'}</Td>
  )
}
export default App;


