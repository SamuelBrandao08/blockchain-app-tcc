const useUpdateTr = (contract, context) => {
  const updateTr = (
    currentTx,
    sender,
    receiver,
    unit,
    date,
    unitType,
    status
  ) => {
    contract.methods
      .updateTr(currentTx, sender, receiver, unit, date, unitType, status)
      .send({ from: context.account });
  };
  return updateTr;
};
export default useUpdateTr;
