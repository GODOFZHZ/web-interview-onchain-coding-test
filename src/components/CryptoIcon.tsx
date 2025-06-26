import React, { useState, useEffect, useMemo } from "react";

interface CoinData {
  colorful_image_url: string;
  gray_image_url: string;
  symbol: string;
}

interface CoinImageProps {
  coinData: CoinData;
}

enum ImageStatus {
  Loading,
  Success,
  Fallback
}

const CoinImage: React.FC<CoinImageProps> = ({ coinData }) => {
  // 统一管理图片状态
  const [imageStatus, setImageStatus] = useState<ImageStatus>(ImageStatus.Loading);
  const [currentImage, setCurrentImage] = useState<string>(coinData.colorful_image_url);
  // 重置状态当coinData变更
  useEffect(() => {
    setCurrentImage(coinData.colorful_image_url);
    setImageStatus(ImageStatus.Loading);
  }, [coinData]);
  const isColorImage = useMemo(()=>{
    return currentImage === coinData.colorful_image_url
  }, [currentImage, coinData])
  // 加载失败回调函数
  const handleImageError = () => {
    // 当前是彩色图, 尝试灰度图
    if (currentImage === coinData.colorful_image_url) {
      setCurrentImage(coinData.gray_image_url);
    } 
    // 已经是灰度图, 渲染代币symbol文本
    else {
      setImageStatus(ImageStatus.Fallback);
    }
  };
  // 加载成功回调函数
  const handleImageLoad = () => {
    setImageStatus(ImageStatus.Success);
  };

  // 状态机渲染
  switch (imageStatus) {
    case ImageStatus.Fallback:
      return (
        <div 
          className="symbol-pic w-[30px] h-[30px] flex items-center justify-center mr-2 bg-gray-500 rounded-full text-xs text-white basis-10"
          aria-label={`${coinData.symbol} symbol`}
        >
          {coinData.symbol.substring(0, 4)}
        </div>
      );
    
    default:
      return (
        <div className="symbol-pic w-[30px] h-[30px] flex items-center justify-center mr-2  basis-10">
          <img
            className={`w-full h-full object-contain  w-[30px] h-[30px] rounded-full ${isColorImage ? '' : 'bg-gray-500'}  ${imageStatus === ImageStatus.Success ? 'opacity-100' : 'opacity-0'}`}
            src={currentImage}
            alt={`${coinData.symbol} logo`}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        </div>
      );
  }
};

export default CoinImage;