import { useForm } from "react-hook-form";

export default function PaymentPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    alert("Payment Successful!\nBooking Confirmed.");
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold mb-4">Mock Payment</h2>
      <input {...register("cardNumber")} placeholder="Card Number" className="border p-2 w-full" required />
      <input {...register("cardName")} placeholder="Cardholder Name" className="border p-2 w-full" required />
      <input {...register("expiry")} placeholder="MM/YY" className="border p-2 w-full" required />
      <input {...register("cvv")} placeholder="CVV" className="border p-2 w-full" required />
      <button className="bg-purple-700 text-white px-4 py-2 w-full">Pay ₹500</button>
    </form>
  );
}
