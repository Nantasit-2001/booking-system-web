"use client";
import React, { useEffect, useState, useRef } from "react";
import Dropdown, { DropdownRef } from "@/components/Dropdown";
import { RoomDetailAdmin } from "@/types/types"; // Assuming this is still needed elsewhere or for type consistency
import { fetchBooking } from "@/services/booking"; // Ensure this path is correct
import BookingDetailPopup from "../popup/BookingDetailPopup";
import { updateReservationStatus,updatePaymentAmount,deleteOrCancelBookingById } from "@/services/booking";
import PaymentPopup from "../popup/GetCashPopup";
import { BookingAdmin } from "@/types/types";
import { LoadingComponent } from "../loading";
import { PopupAlert } from "../popup/PopupAlert";
// Adjusted the BookingAdmin interface to match the screenshot's data structure

const BookingTable: React.FC = () => {
  // Changed 'booking' state to 'reservation'
  const [reservation, setReservation] = useState<BookingAdmin[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingAdmin[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("All Statuses");
  const [roomTypeFilter, setRoomTypeFilter] = useState<string>("All Rooms");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingAdmin | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [isAlert,setIsAlert] = useState<boolean>(false)
  const [idDelete,setIdDelete] = useState<string>("")
  const [selectedReservation, setSelectedReservation] = useState<BookingAdmin | null>(null);
  const statusDropdownRef = useRef<DropdownRef>(null);
  const roomTypeDropdownRef = useRef<DropdownRef>(null);
  const [loading,setLoading] = useState<boolean>(true)
const handleCheckIn = async (id: string) => {
  try {
    const res = await updateReservationStatus(id,'checked-in'); // สมมุติ return { status: 'checked-in' }

    if (res?.status) {
      setReservation((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status_reservation: res.status } // อัปเดตเฉพาะ item ที่ id ตรงกัน
            : item
        )
      );
    } else {
      console.warn("Unable to update status");
    }
  } catch (err) {
    console.error("An error occurred during check-in.:", err);
  }
};

const handleCheckOut = async (id: string) => {
  try {
    const res = await updateReservationStatus(id, "checked-out"); // เปลี่ยนสถานะเป็น checked-out

    if (res?.status) {
      setReservation((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status_reservation: res.status }
            : item
        )
      );
    } else {
      console.warn("Unable to update status");
    }
  } catch (err) {
    console.error("An error occurred during check-out.:", err);
  }
};

const handleClickMoney = (item: BookingAdmin) => {
  setSelectedBooking(item);
  setShowPopup(true);
};

const handlePaymentSubmit = async (amountPaidNow: number) => {
  if (!selectedBooking) return;

  try {
    const res = await updatePaymentAmount(selectedBooking.id, amountPaidNow);

    setReservation((prev) =>
      prev.map((b) =>
        b.id === selectedBooking.id
          ? {
              ...b,
              paid_amount: res.paid_amount,
              status_reservation: res.status_reservation,
            }
          : b
      )
    );
  } catch (err) {
    console.error('An error occurred while updating the payment: ', err);
  }
};


const handleViewDetail = (reservation: BookingAdmin) => {
  setSelectedReservation(reservation);
  setShowDetail(true);
};

const handleDeleteBooking = async (id: string) => {
  try {
    const result = await deleteOrCancelBookingById(id);

    setReservation((prev) => {
      if (result.action === 'deleted') {
        // ลบออกจาก state
        return prev.filter((item) => item.id !== id);
      } else if (result.action === 'canceled') {
        // เปลี่ยน status_reservation เป็น 'canceled'
        return prev.map((item) =>
          item.id === id ? { ...item, status_reservation: 'canceled' } : item
        );
      }
      return prev;
    });
  } catch (error: any) {
    console.error("Delete booking error:", error);
  }finally{
    setIsAlert(false);
    setIdDelete("");
  }
};


  useEffect(() => {
  const fetchReservations = async () => {
    try {
      const raw = await fetchBooking();
      setReservation(raw);
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };
  fetchReservations();
}, []);

  useEffect(() => {
    let currentFiltered = reservation; // Use 'reservation' as the base data

    // Filter by Status
    if (statusFilter !== "All Statuses" && statusFilter !== "") {
      currentFiltered = currentFiltered.filter(
        (item) => item?.status_reservation === statusFilter
      );
    }
    // Filter by Room Type
    if (roomTypeFilter !== "All Rooms" && roomTypeFilter !== "") {
      currentFiltered = currentFiltered.filter(
        (item) => item.rooms?.room_name === roomTypeFilter
      );
    }

    // Filter by Date Range (Check-in dates)
    // Ensure dates are compared as Date objects for accurate filtering
    if (fromDate) {
      const from = new Date(fromDate);
      currentFiltered = currentFiltered.filter((item) => {
        const checkIn = new Date(item.check_in);
        // Compare dates by day, month, and year for accurate range
        return checkIn >= from;
      });
    }
    if (toDate) {
      const to = new Date(toDate);
      // To ensure the 'To' date includes the entire day, set it to the end of the day
      to.setHours(23, 59, 59, 999);
      currentFiltered = currentFiltered.filter((item) => {
        const checkIn = new Date(item.check_out);
        return checkIn <= to;
      });
    }

    // Search by User or Room
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      currentFiltered = currentFiltered.filter(
        (item) =>
          item.users?.name.toLowerCase().includes(lowerCaseQuery) ||
          item.users?.email.toLowerCase().includes(lowerCaseQuery) ||
          item.rooms?.room_name.toLowerCase().includes(lowerCaseQuery)
      );
    }

    setFilteredBookings(currentFiltered);
  }, [statusFilter, roomTypeFilter, fromDate, toDate, searchQuery, reservation]); // Added 'reservation' to dependencies to re-filter if base data changes

  const getStatusClasses = (status: BookingAdmin["status_reservation"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "checked-in":
        return "bg-blue-100 text-blue-800";
      case "canceled":
        return "bg-red-100 text-red-800"
      case "Not yet paid":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get unique room types and statuses for dropdown options from the fetched data
  const roomTypes = [
    "All Rooms",
    ...Array.from(new Set(reservation.map((item) => item.rooms?.room_name))),
  ];
  const statuses = [
    "All Statuses",
    ...Array.from(new Set(reservation.map((item) => item?.status_reservation))),
  ];

  // Function to format date for display (dd/mm/yyyy)
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Add 7 hours for Bangkok timezone if the date strings are UTC
    // This assumes the mock data dates are in local time or already adjusted
    // If your backend always provides UTC, you might need to adjust for local time offset
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options); // Format for dd/mm/yyyy
  };

  if(loading){return <LoadingComponent text='Loading'/>}
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm ">

      <PopupAlert
        isOpen={isAlert}
        title={"Are you sure?"}
        message={"Are you sure you want to delete this reservation?"}
        onClose={() => setIsAlert(false)}
        onConfirm={()=>handleDeleteBooking(idDelete)}
        showCancelButton={true}
      />  

      <PaymentPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        total={selectedBooking?.total_price ?? 0}
        paid={selectedBooking?.paid_amount ?? 0}
        onSubmit={handlePaymentSubmit}
      />
      {selectedReservation && (
      <BookingDetailPopup
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        reservation={selectedReservation}
      />)}
      <div className=" flex flex-col items-center xl:flex-row mb-8 mt-2 ">
        <h2 className="text-xl text-center font-semibold text-gray-800 w-[250px]  pb-6 xl:pb-1 xl:ml-2">Booking Management</h2>

      <div className="flex flex-col gap-2 xl:gap-0 xl:flex-row items-center pl-4">
        <div className="flex justify-between items-center gap-6">
          <div className="flex items-center justify-start gap-2">
            <span className="text-gray-600 text-sm font-medium ">Status:</span>
            <Dropdown
              ref={statusDropdownRef}
              label="Status"
              options={statuses}
              selectedValue={statusFilter}
              onSelect={setStatusFilter}
            />
          </div>

          <div className="flex items-center gap-2 justify-start ">
            <span className="text-gray-600 text-sm font-medium min-w-[75px]">
              Room Type:
            </span>
            <Dropdown
              ref={roomTypeDropdownRef}
              label="Room Type"
              options={roomTypes}
              selectedValue={roomTypeFilter}
              onSelect={setRoomTypeFilter}
            />
          </div>
        </div>
         <div className="flex justify-between items-center gap-6 ml-6">
          <div className="flex items-center justify-start gap-2">
            <span className="text-gray-600 text-sm font-medium">From:</span>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm font-medium ">To:</span>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="relative flex-grow max-w-[200px] ">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search user or room..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                BOOKING ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                USER
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ROOM
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                CHECK IN
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                CHECK OUT
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                TOTAL
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                PAID AMOUNT
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                REMAINING
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                STATUS
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.map((item,index) => (
              <tr key={item.id||index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.users?.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.users?.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="text-sm font-medium text-gray-900">
                    {item.rooms?.room_name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {item.rooms?.room_type}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDateForDisplay(item.check_in)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDateForDisplay(item.check_out)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ฿{item.total_price.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`${
                      item.paid_amount < item.total_price
                        ? "text-red-600"
                        : "text-green-600"
                    } font-semibold`}
                  >
                    ฿{item.paid_amount?item.paid_amount.toLocaleString():0}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`${
                      (item.total_price-item.paid_amount) > 0 ? "text-red-600" : "text-gray-600"
                    } font-semibold`}
                  >
                    ฿{(item.total_price-item.paid_amount).toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
                      item?.status_reservation
                    )}`}
                  >
                    {item?.status_reservation}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center justify-end  space-x-2">

              {item?.status_reservation === "pending" && (item.total_price-item.paid_amount===0) && (
                <button
                  onClick={() => handleCheckIn(item.id)} // ใช้ booking_id ที่เป็น string
                  className="cursor-pointer text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-100"
                  title="Check In"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                  <path 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                  </svg>
                </button>
              )}


             {item?.status_reservation === "checked-in" && (
              <button
                onClick={() => handleCheckOut(item.id)}
                className="cursor-pointer text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100"
                title="Check Out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 12h-9m0 0l3-3m-3 3l3 3"
                  />
                </svg>
              </button>
            )}
            {item?.status_reservation !== "canceled" && (item.total_price - item.paid_amount !== 0) && (
                <button
                  onClick={() => handleClickMoney(item)}
                  className="cursor-pointer text-green-400 hover:text-green-900 p-1 rounded-full hover:bg-green-100"
                  title="Payment"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 40"
                    className="w-6 h-6"
                    fill="none"
                  >
                  <rect x="1" y="1" width="58" height="34" rx="4" fill="#4ade80" stroke="#166534" strokeWidth="2"/>
                  <circle cx="32" cy="20" r="8" fill="#bbf7d0" stroke="#166534" strokeWidth="2"/>
                    <text
                      x="32"
                      y="23"
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="bold"
                      fill="#166534"
                    >
                      ฿
                    </text>
                    <line x1="8" y1="5" x2="8" y2="32" stroke="#166534" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="52" y1="5" x2="52" y2="32" stroke="#166534" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
            )}

                <button
                  onClick={() => handleViewDetail(item)}
                  className="cursor-pointer text-purple-500 hover:text-purple-900 p-1 rounded-full hover:bg-purple-100"
                  title="Details"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5.25 12 5.25s8.268 2.693 9.542 6.75c-1.274 4.057-5.065 6.75-9.542 6.75s-8.268-2.693-9.542-6.75z"
                  />
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>

              {item?.status_reservation !== "checked-out" && item?.status_reservation !== "checked-in" && item?.status_reservation !=="canceled" && (
                  <button
                    onClick={() => {setIsAlert(true); setIdDelete(item.id);}}
                    className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100 cursor-pointer"
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingTable;