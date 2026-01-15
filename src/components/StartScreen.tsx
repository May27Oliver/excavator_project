interface StartScreenProps {
  onStart: () => void;
}

function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="text-center fade-in pt-16 mb-12">
      <p className="text-lg mb-8">點擊按鈕開始測驗，測試您對怪手儀表板圖示的了解程度！</p>
      <button 
        className="bg-cta hover:brightness-110 text-white font-bold py-4 px-8 rounded-xl text-2xl transition-all duration-200 shadow-lg focus:outline-none focus:ring-4 focus:ring-cta focus:ring-opacity-50"
        onClick={onStart}
      >
        開始測驗
      </button>
    </div>
  );
}

export default StartScreen;