type Props = {
  bookings: any;
};
const BookingTable = ({ bookings }: Props) => {
  console.log(bookings);
  return (
    <div className="">
      <div className="border min-h-[600px]"></div>
    </div>
  );
};

export default BookingTable;
