import React from "react";

const StepProgressBar = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex justify-center items-center w-full max-w-[600px] my-4 relative z-[-10]">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          key={index}
          className={`flex items-center ${index === totalSteps - 1 ? '' : 'flex-grow'} relative`}
        >
          {/* Step Circle */}
          <div
            className={`h-8 w-8 flex items-center justify-center rounded-full border-2 z-10 ${
              index < currentStep
                ? "border-green-500 bg-green-500 text-white"
                : index === currentStep
                ? "border-green-500 bg-white text-green-500"
                : "border-gray-300 bg-white text-gray-400"
            }`}
          >
            {index + 1}
          </div>

          {/* Line between steps */}
          {index < totalSteps - 1 && (
            <div className="absolute top-1/2 transform -translate-y-1/2 w-full z-[-10]">
              <div className="relative h-[6px] w-full bg-gray-300">
                {/* Thicker Line */}
                <div
                  className={`absolute top-0 left-0 h-full ${
                    index < currentStep - 1
                      ? "bg-green-500 w-full"
                      : index === currentStep - 1
                      ? "bg-green-500 w-1/2 border-r-2 border-gray-300"
                      : "bg-transparent"
                  }`}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepProgressBar;
