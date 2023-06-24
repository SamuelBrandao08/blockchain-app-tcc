const useUpdateTr = ({ contract, address }) => {
  console.log("UpdateTr ", contract);
  const updateTr = (currentTx, sender, receiver, unit, date) => {
    contract.methods
      .updateTr(currentTx, sender, receiver, unit, date)
      .send({ from: address, gas: "800000" });
  };
  return updateTr;
};
export default useUpdateTr;
