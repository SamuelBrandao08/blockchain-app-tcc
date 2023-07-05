const useEvent = (contract) => {
  const eventsListen = (userId, setResponse) => {
    contract.events
      .NewUnit(
        {
          filter: { user: userId }, // Using an array means OR: e.g. 20 or 23
        },
        function (error, event) {
          console.log(event);
        }
      )
      .on("data", function (event) {
        console.log(event.returnValues.unit);
        setResponse((state) => [...state, event.returnValues.unit]);
      })
      .on("error", function (error, receipt) {
        // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        console.log(error);
      });
  };
  return eventsListen;
};
export default useEvent;
