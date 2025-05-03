const CardDetailsUi = () => {
  return (
    <div className="flex flex-col justify-center items-center'">
      <div className="col-span-2">
        {/* Card Visual */}
        <div className="mb-8">
          <div className="bg-black text-white rounded-lg p-6 w-96 h-56 relative shadow-lg">
            <div className="absolute bottom-4 left-6 text-xl font-mono">
              {/* •••• {cardData.cardNumber.slice(-4)} */}****
            </div>
            <div className="absolute bottom-4 right-6">
              <div className="text-3xl font-bold">VISA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsUi;
