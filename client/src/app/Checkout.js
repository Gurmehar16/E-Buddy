const openRazorpay = (orderId, key, amount) => {
    const options = {
      key,
      amount,
      currency: "INR",
      name: "E-Buddy ",
      description: "Course Purchase",
      order_id: orderId,
      handler: async function (response) {
        await fetch("/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  