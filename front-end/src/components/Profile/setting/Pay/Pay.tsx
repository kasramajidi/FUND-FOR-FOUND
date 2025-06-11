export default function Pay() {
  return (
    <div className="flex flex-col max-w-2xl mx-auto items-start gap-8 mt-28 max-lg:gap-6 max-lg:mt-16 w-full px-4 md:px-6 lg:px-0">
      <div className="flex items-center gap-3 max-lg:gap-2">
        <div className="w-3 h-3 bg-[rgba(100,79,193,1)] max-lg:w-2 max-lg:h-2"></div>
        <span className="font-bold text-2xl max-lg:text-lg">Pay out</span>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-12 text-lg sm:text-xl font-medium">
        <span>Your Wallet</span>
        <span>Balance : 200 USDT</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <button className="flex-1 px-6 cursor-pointer py-3 bg-[rgba(100,79,193,1)] hover:bg-[rgba(100,79,193,0.8)] text-white rounded-lg text-base sm:text-lg font-medium">
          Connect to your wallet
        </button>
        <button className="flex-1 px-6 cursor-pointer py-3 bg-[rgba(100,79,193,1)] hover:bg-[rgba(100,79,193,0.8)] text-white rounded-lg text-base sm:text-lg font-medium">
          Connect to your bank
        </button>
      </div>
    </div>
  );
}
