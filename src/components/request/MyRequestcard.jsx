import React from 'react'
import { format } from "timeago.js";


const MyRequestcard = ({request, onClick}) => {
    // alert(requests);
    const itemCount = request.items.length;

    const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    accepted: "bg-blue-100 text-blue-700",
    picked: "bg-purple-100 text-purple-700",
    completed: "bg-green-100 text-green-700",
    expired: "bg-gray-200 text-gray-700"
  };
  return (
    <div 
    onClick={onClick}
    className='bg-orange-100  rounded-2xl px-6 py-4 cursor-pointer hover:shadow-lg hover:bg-orange-200 transition'>
      <div className="hidden md:grid grid-cols-6 items-center text-sm">
        <div className="font-semibold text-gray-800">
        {request.orderId}
      </div>

      <div>
        {itemCount} items
      </div>

       <div className='truncate'>
        {request.deliveryLocation}
      </div>

       <div className="font-semibold">
        ₹{request.grandTotal}
      </div>

      <div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[request.status]}`}
          >
            {request.status}
          </span>
      </div>

       <div className="text-gray-500 text-xs">
          {format(request.createdAt)}
        </div>
      </div>


      <div className="md:hidden space-y-2">
        <div className="flex justify-between">
          <span className="font-semibold">
            {request.orderId}
          </span>

          <span
            className={`px-2 py-1 rounded-full text-xs capitalize ${statusColors[request.status]}`}
          >
            {request.status}
          </span>
        </div>
         <div className="text-sm text-gray-600">
          {itemCount} items • {request.deliveryLocation}
        </div>

        <div className="flex justify-between text-sm">

          <span className="font-semibold">
            ₹{request.grandTotal}
          </span>

          <span className="text-gray-500 text-xs">
            {format(request.createdAt)}
          </span>

        </div>

      </div>
    </div>
  );
};

export default MyRequestcard