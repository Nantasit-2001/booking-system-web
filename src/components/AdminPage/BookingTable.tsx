// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import Dropdown, { DropdownRef } from "@/components/Dropdown";

// // Adjusted the BookingAdmin interface to match the screenshot's data structure
// export interface BookingAdmin {
//   Booking_id: string;
//   User: {
//     name: string;
//     email: string;
//     image: string; // URL to the user's profile picture
//   };
//   Room: {
//     name: string;
//     floor: number;
//   };
//   Check_in: string; // Date string, e.g., "Dec 25, 2024"
//   Check_out: string; // Date string, e.g., "Dec 28, 2024"
//   Total: number;
//   Paid_Amount: number;
//   Remaining: number;
//   status: "Confirmed" | "Pending" | "Checked-in"; // Specific status values from the screenshot
// }

// // Mock data reflecting the screenshot
// const mockBookingAdmin: BookingAdmin[] = [
//   {
//     Booking_id: "#BK001",
//     User: {
//       name: "Sarah Johnson",
//       email: "sarah@email.com",
//       image: "https://via.placeholder.com/40/FF5733/FFFFFF?text=SJ", // Placeholder image for Sarah Johnson
//     },
//     Room: {
//       name: "Ocean View Suite",
//       floor: 12,
//     },
//     Check_in: "Dec 25, 2024",
//     Check_out: "Dec 28, 2024",
//     Total: 31500,
//     Paid_Amount: 31500,
//     Remaining: 0,
//     status: "Confirmed",
//   },
//   {
//     Booking_id: "#BK002",
//     User: {
//       name: "Mike Chen",
//       email: "mike@email.com",
//       image: "https://via.placeholder.com/40/3366FF/FFFFFF?text=MC", // Placeholder image for Mike Chen
//     },
//     Room: {
//       name: "Deluxe King Room",
//       floor: 8,
//     },
//     Check_in: "Dec 30, 2024",
//     Check_out: "Jan 2, 2025",
//     Total: 19800,
//     Paid_Amount: 8500,
//     Remaining: 11300,
//     status: "Pending",
//   },
//   {
//     Booking_id: "#BK003",
//     User: {
//       name: "Emma Davis",
//       email: "emma@email.com",
//       image: "https://via.placeholder.com/40/33FF57/FFFFFF?text=ED", // Placeholder image for Emma Davis
//     },
//     Room: {
//       name: "Standard Twin Room",
//       floor: 3,
//     },
//     Check_in: "Jan 5, 2025",
//     Check_out: "Jan 7, 2025",
//     Total: 7200,
//     Paid_Amount: 7200,
//     Remaining: 0,
//     status: "Checked-in",
//   },
//   {
//     Booking_id: "#BK004",
//     User: {
//       name: "James Wilson",
//       email: "james@email.com",
//       image: "https://via.placeholder.com/40/FFFF33/000000?text=JW", // Placeholder image for James Wilson
//     },
//     Room: {
//       name: "Executive Suite",
//       floor: 15,
//     },
//     Check_in: "Jan 10, 2025",
//     Check_out: "Jan 15, 2025",
//     Total: 67500,
//     Paid_Amount: 20000,
//     Remaining: 47500,
//     status: "Pending",
//   },
//   {
//     Booking_id: "#BK005",
//     User: {
//       name: "Lisa Anderson",
//       email: "lisa@email.com",
//       image: "https://via.placeholder.com/40/FF33E0/FFFFFF?text=LA", // Placeholder image for Lisa Anderson
//     },
//     Room: {
//       name: "Deluxe Queen Room",
//       floor: 6,
//     },
//     Check_in: "Jan 18, 2025",
//     Check_out: "Jan 21, 2025",
//     Total: 16200,
//     Paid_Amount: 16200,
//     Remaining: 0,
//     status: "Confirmed",
//   },
// ];

// const BookingTable: React.FC = () => {
//   const [booking, setBooking] = useState<BookingAdmin[]>([]);
//   const [filteredBookings, setFilteredBookings] = useState<BookingAdmin[]>([]);
//   const [statusFilter, setStatusFilter] = useState<string>("All Statuses");
//   const [roomTypeFilter, setRoomTypeFilter] = useState<string>("All Rooms");
//   const [fromDate, setFromDate] = useState<string>("");
//   const [toDate, setToDate] = useState<string>("");
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   // Refs for dropdowns if you need to imperatively call clearSelection
//   const statusDropdownRef = useRef<DropdownRef>(null);
//   const roomTypeDropdownRef = useRef<DropdownRef>(null);

//   const handleEditBooking = (id: string) => {
//     console.log("Edit booking:", id);
//     // Implement logic for editing a booking (e.g., open a modal, navigate to edit page)
//   };

//   const handleDeleteBooking = (id: string) => {
//     console.log("Delete booking:", id);
//     // Implement logic for deleting a booking (e.g., show confirmation, call API)
//     setBooking((prevBookings) =>
//       prevBookings.filter((item) => item.Booking_id !== id)
//     );
//     // Filtering will happen automatically due to useEffect dependency
//   };

//   const handleViewBooking = (id: string) => {
//     console.log("View booking:", id);
//     // Implement logic for viewing booking details
//   };

//   useEffect(() => {
//     const fetchBookings = async () => {
//       // Simulate network delay
//       await new Promise((resolve) => setTimeout(resolve, 500));
//       setBooking(mockBookingAdmin);
//     };
//     fetchBookings();
//   }, []);

//   useEffect(() => {
//     let currentFiltered = booking;

//     // Filter by Status
//     if (statusFilter !== "All Statuses" && statusFilter !== "") {
//       currentFiltered = currentFiltered.filter(
//         (item) => item.status === statusFilter
//       );
//     }

//     // Filter by Room Type
//     if (roomTypeFilter !== "All Rooms" && roomTypeFilter !== "") {
//       currentFiltered = currentFiltered.filter(
//         (item) => item.Room.name === roomTypeFilter
//       );
//     }

//     // Filter by Date Range (Check-in dates)
//     // Ensure dates are compared as Date objects for accurate filtering
//     if (fromDate) {
//       const from = new Date(fromDate);
//       currentFiltered = currentFiltered.filter((item) => {
//         const checkIn = new Date(item.Check_in);
//         // Compare dates by day, month, and year for accurate range
//         return checkIn >= from;
//       });
//     }
//     if (toDate) {
//       const to = new Date(toDate);
//       // To ensure the 'To' date includes the entire day, set it to the end of the day
//       to.setHours(23, 59, 59, 999);
//       currentFiltered = currentFiltered.filter((item) => {
//         const checkIn = new Date(item.Check_in);
//         return checkIn <= to;
//       });
//     }

//     // Search by User or Room
//     if (searchQuery) {
//       const lowerCaseQuery = searchQuery.toLowerCase();
//       currentFiltered = currentFiltered.filter(
//         (item) =>
//           item.User.name.toLowerCase().includes(lowerCaseQuery) ||
//           item.User.email.toLowerCase().includes(lowerCaseQuery) ||
//           item.Room.name.toLowerCase().includes(lowerCaseQuery)
//       );
//     }

//     setFilteredBookings(currentFiltered);
//   }, [statusFilter, roomTypeFilter, fromDate, toDate, searchQuery, booking]); // Added 'booking' to dependencies to re-filter if base data changes

//   const getStatusClasses = (status: BookingAdmin["status"]) => {
//     switch (status) {
//       case "Confirmed":
//         return "bg-green-100 text-green-800";
//       case "Pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "Checked-in":
//         return "bg-blue-100 text-blue-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   // Get unique room types and statuses for dropdown options
//   const roomTypes = [
//     "All Rooms",
//     ...Array.from(new Set(mockBookingAdmin.map((item) => item.Room.name))),
//   ];
//   const statuses = [
//     "All Statuses",
//     ...Array.from(new Set(mockBookingAdmin.map((item) => item.status))),
//   ];

//   // Function to format date for display (dd/mm/yyyy)
//   const formatDateForDisplay = (dateString: string) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     // Add 7 hours for Bangkok timezone if the date strings are UTC
//     // This assumes the mock data dates are in local time or already adjusted
//     // If your backend always provides UTC, you might need to adjust for local time offset
//     const options: Intl.DateTimeFormatOptions = {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     };
//     return date.toLocaleDateString("en-GB", options); // Format for dd/mm/yyyy
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm">
//       <div className=" flex flex-row justify-between items-center mb-8">
//         <h2 className="text-xl font-semibold text-gray-800 w-[250px]">Booking Management</h2>
//         {/* Filter Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-2 xl:gap-0 items-center">
//           <div className="flex items-center space-x-2 w-[200px]">
//             <span className="text-gray-600 text-sm font-medium">Status:</span>
//             <Dropdown
//               ref={statusDropdownRef}
//               label="Status"
//               options={statuses}
//               selectedValue={statusFilter}
//               onSelect={setStatusFilter}
//             />
//           </div>

//           <div className="flex items-center space-x-2">
//             <span className="text-gray-600 text-sm font-medium w-[120px] ">
//               Room Type:
//             </span>
//             <Dropdown
//               ref={roomTypeDropdownRef}
//               label="Room Type"
//               options={roomTypes}
//               selectedValue={roomTypeFilter}
//               onSelect={setRoomTypeFilter}
//             />
//           </div>

//           <div className="flex items-center space-x-2 ml-0 lg:ml-4">
//             <span className="text-gray-600 text-sm font-medium">From:</span>
//             <input
//               type="date"
//               className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center space-x-2">
//             <span className="text-gray-600 text-sm font-medium">To:</span>
//             <input
//               type="date"
//               className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//             />
//           </div>

//           <div className="relative flex-grow max-w-xs">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <svg
//                 className="h-5 w-5 text-gray-400"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </div>
//             <input
//               type="text"
//               placeholder="Search user or room..."
//               className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>
//         {/* End Filter Section */}
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 BOOKING ID
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 USER
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 ROOM
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 CHECK IN
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 CHECK OUT
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 TOTAL
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 PAID AMOUNT
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 REMAINING
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 STATUS
//               </th>
//               <th
//                 scope="col"
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//               >
//                 ACTIONS
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredBookings.map((item) => (
//               <tr key={item.Booking_id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {item.Booking_id}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   <div className="flex items-center">
//                     <div className="ml-4">
//                       <div className="text-sm font-medium text-gray-900">
//                         {item.User.name}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {item.User.email}
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   <div className="text-sm font-medium text-gray-900">
//                     {item.Room.name}
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     Suite • Floor {item.Room.floor}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {formatDateForDisplay(item.Check_in)}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {formatDateForDisplay(item.Check_out)}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                   ฿{item.Total.toLocaleString()}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm">
//                   <span
//                     className={`${
//                       item.Paid_Amount < item.Total
//                         ? "text-red-600"
//                         : "text-green-600"
//                     } font-semibold`}
//                   >
//                     ฿{item.Paid_Amount.toLocaleString()}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm">
//                   <span
//                     className={`${
//                       item.Remaining > 0 ? "text-red-600" : "text-gray-600"
//                     } font-semibold`}
//                   >
//                     ฿{item.Remaining.toLocaleString()}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm">
//                   <span
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
//                       item.status
//                     )}`}
//                   >
//                     {item.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-2">
//                   <button
//                     onClick={() => handleViewBooking(item.Booking_id)}
//                     className="text-purple-600 hover:text-purple-900 p-1 rounded-full hover:bg-purple-100"
//                     title="View"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-5 h-5"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                     </svg>
//                   </button>
//                   <button
//                     onClick={() => handleEditBooking(item.Booking_id)}
//                     className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100"
//                     title="Edit"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-5 h-5"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M16.862 4.487a2.25 2.25 0 113.182 3.182l-9.19 9.19a2.25 2.25 0 01-1.06.586l-4.5 1.125a1.125 1.125 0 01-1.36-1.36l1.125-4.5a2.25 2.25 0 01.586-1.06l9.19-9.19zM18 6l-2-2m0 0L8.25 12l-3 3L6 18l3-3L18 6z"
//                       />
//                     </svg>
//                   </button>
//                   <button
//                     onClick={() => handleDeleteBooking(item.Booking_id)}
//                     className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100"
//                     title="Delete"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="w-5 h-5"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BookingTable;
"use client";
import React, { useEffect, useState, useRef } from "react";
import Dropdown, { DropdownRef } from "@/components/Dropdown";
import { RoomDetailAdmin } from "@/types/types"; // Assuming this is still needed elsewhere or for type consistency
import { fetchBooking } from "@/services/booking"; // Ensure this path is correct

// Adjusted the BookingAdmin interface to match the screenshot's data structure
export interface BookingAdmin {
  Booking_id: string;
  User: {
    name: string;
    email: string;
    image: string; // URL to the user's profile picture
  };
  Room: {
    name: string;
    floor: number;
  };
  Check_in: string; // Date string, e.g., "Dec 25, 2024"
  Check_out: string; // Date string, e.g., "Dec 28, 2024"
  Total: number;
  Paid_Amount: number;
  Remaining: number;
  status: "Confirmed" | "Pending" | "Not yet paid" | "Checked-in"| "Checked-in"; // Specific status values from the screenshot
}

const BookingTable: React.FC = () => {
  // Changed 'booking' state to 'reservation'
  const [reservation, setReservation] = useState<BookingAdmin[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingAdmin[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("All Statuses");
  const [roomTypeFilter, setRoomTypeFilter] = useState<string>("All Rooms");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Refs for dropdowns if you need to imperatively call clearSelection
  const statusDropdownRef = useRef<DropdownRef>(null);
  const roomTypeDropdownRef = useRef<DropdownRef>(null);

  const handleEditBooking = (id: string) => {
    console.log("Edit booking:", id);
    // Implement logic for editing a booking (e.g., open a modal, navigate to edit page)
  };

  const handleDeleteBooking = (id: string) => {
    console.log("Delete booking:", id);
    // Implement logic for deleting a booking (e.g., show confirmation, call API)
    setReservation((prevBookings) =>
      prevBookings.filter((item) => item.Booking_id !== id)
    );
    // Filtering will happen automatically due to useEffect dependency
  };

  const handleViewBooking = (id: string) => {
    console.log("View booking:", id);
    // Implement logic for viewing booking details
  };

  // Replaced mock data fetching with actual API call
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await fetchBooking();
        console.log(data)
        setReservation(data);
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
        (item) => item.status === statusFilter
      );
    }

    // Filter by Room Type
    if (roomTypeFilter !== "All Rooms" && roomTypeFilter !== "") {
      currentFiltered = currentFiltered.filter(
        (item) => item.Room.name === roomTypeFilter
      );
    }

    // Filter by Date Range (Check-in dates)
    // Ensure dates are compared as Date objects for accurate filtering
    if (fromDate) {
      const from = new Date(fromDate);
      currentFiltered = currentFiltered.filter((item) => {
        const checkIn = new Date(item.Check_in);
        // Compare dates by day, month, and year for accurate range
        return checkIn >= from;
      });
    }
    if (toDate) {
      const to = new Date(toDate);
      // To ensure the 'To' date includes the entire day, set it to the end of the day
      to.setHours(23, 59, 59, 999);
      currentFiltered = currentFiltered.filter((item) => {
        const checkIn = new Date(item.Check_in);
        return checkIn <= to;
      });
    }

    // Search by User or Room
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      currentFiltered = currentFiltered.filter(
        (item) =>
          item.User.name.toLowerCase().includes(lowerCaseQuery) ||
          item.User.email.toLowerCase().includes(lowerCaseQuery) ||
          item.Room.name.toLowerCase().includes(lowerCaseQuery)
      );
    }

    setFilteredBookings(currentFiltered);
  }, [statusFilter, roomTypeFilter, fromDate, toDate, searchQuery, reservation]); // Added 'reservation' to dependencies to re-filter if base data changes

  const getStatusClasses = (status: BookingAdmin["status"]) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Checked-in":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get unique room types and statuses for dropdown options from the fetched data
  const roomTypes = [
    "All Rooms",
    ...Array.from(new Set(reservation.map((item) => item.Room.name))),
  ];
  const statuses = [
    "All Statuses",
    ...Array.from(new Set(reservation.map((item) => item.status))),
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      {/* <div className=" flex flex-row justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-gray-800 w-[250px]">Booking Management</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-2 xl:gap-0 items-center">
          <div className="flex items-center space-x-2 w-[200px]">
            <span className="text-gray-600 text-sm font-medium">Status:</span>
            <Dropdown
              ref={statusDropdownRef}
              label="Status"
              options={statuses}
              selectedValue={statusFilter}
              onSelect={setStatusFilter}
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600 text-sm font-medium w-[120px] ">
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

          <div className="flex items-center space-x-2 ml-0 lg:ml-4">
            <span className="text-gray-600 text-sm font-medium">From:</span>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600 text-sm font-medium">To:</span>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>

          <div className="relative flex-grow max-w-xs">
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
      </div> */}

      <div className="overflow-x-auto">
        {/* <table className="min-w-full divide-y divide-gray-200">
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
            {filteredBookings.map((item) => (
              <tr key={item.Booking_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.Booking_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.User.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.User.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="text-sm font-medium text-gray-900">
                    {item.Room.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    Suite • Floor {item.Room.floor}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDateForDisplay(item.Check_in)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDateForDisplay(item.Check_out)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ฿{item.Total.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`${
                      item.Paid_Amount < item.Total
                        ? "text-red-600"
                        : "text-green-600"
                    } font-semibold`}
                  >
                    ฿{item.Paid_Amount.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`${
                      item.Remaining > 0 ? "text-red-600" : "text-gray-600"
                    } font-semibold`}
                  >
                    ฿{item.Remaining.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-2">
                  <button
                    onClick={() => handleViewBooking(item.Booking_id)}
                    className="text-purple-600 hover:text-purple-900 p-1 rounded-full hover:bg-purple-100"
                    title="View"
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
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleEditBooking(item.Booking_id)}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-100"
                    title="Edit"
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
                        d="M16.862 4.487a2.25 2.25 0 113.182 3.182l-9.19 9.19a2.25 2.25 0 01-1.06.586l-4.5 1.125a1.125 1.125 0 01-1.36-1.36l1.125-4.5a2.25 2.25 0 01.586-1.06l9.19-9.19zM18 6l-2-2m0 0L8.25 12l-3 3L6 18l3-3L18 6z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteBooking(item.Booking_id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100"
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
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
};

export default BookingTable;