import React, { useState } from "react";
import { Button } from "flowbite-react";
import { HiPlus, HiTrash } from "react-icons/hi";

export function CreateRequestMainComponent() {
  const [urlInputs, setUrlInputs] = useState<string[]>([""]);
  const [errors, setErrors] = useState<string[]>([]);

  const validateUrl = (url: string) => {
    const googleDriveRegex = /^(https?:\/\/)?(drive\.google\.com|docs\.google\.com)\/.+/;
    return googleDriveRegex.test(url);
  };

  const handleAddUrl = () => {
    setUrlInputs([...urlInputs, ""]);
    setErrors([...errors, ""]);
  };

  const handleInputChange = (index: number, value: string) => {
    const updatedInputs = [...urlInputs];
    updatedInputs[index] = value;
    setUrlInputs(updatedInputs);

    const updatedErrors = [...errors];
    updatedErrors[index] = validateUrl(value) ? "" : "Enter a valid URL";
    
    // Check for duplicates
    if (validateUrl(value) && urlInputs.includes(value)) {
      console.log("This URL already exists:", value);
    } else if (validateUrl(value)) {
      console.log("Valid URL added:", value);
    }

    setErrors(updatedErrors);
  };

  const handleClearInput = (index: number) => {
    const updatedInputs = [...urlInputs];
    updatedInputs[index] = "";
    setUrlInputs(updatedInputs);

    const updatedErrors = [...errors];
    updatedErrors[index] = "";
    setErrors(updatedErrors);
  };

  const handleCreateRequest = () => {
    const updatedErrors = urlInputs.map((url) =>
      validateUrl(url) ? "" : "Enter a valid URL"
    );

    setErrors(updatedErrors);

    if (updatedErrors.some((error) => error)) {
      console.log("Validation failed:", updatedErrors);
      return;
    }

    console.log("Request created with URLs:", urlInputs);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between p-2 border-b rounded-t">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white pl-10">
          Create New Request
        </h3>
        <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
          <HiTrash className="w-5 h-5" />
        </button>
      </div>

      <div className="p-6 space-y-6 mx-auto">
        <div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">
            Add videos or folders
          </h4>
          <p className="text-sm text-gray-900 dark:text-gray-400">
            These videos would be cut, labeled, and made available in your Recharm video library.
          </p>
        </div>

        {urlInputs.map((url, index) => (
          <div className="mb-4 flex items-center relative" key={index}>
            <div className="flex-grow relative">
              <label
                htmlFor={`video-url-${index}`}
                className={`block text-sm font-medium ${errors[index] ? "text-red-500" : ""}`}
              >
                Video/Folder URL {index + 1}
              </label>
              <div className="relative">
                <input
                  type="text"
                  id={`video-url-${index}`}
                  className={`mt-1 p-2 block w-full border ${
                    errors[index] ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm sm:text-sm pr-10`}
                  placeholder={`Enter video URL ${index + 1}`}
                  value={url}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  style={{
                    outline: errors[index] ? '2px solid red' : 'none',
                    outlineOffset: '2px'
                  }}
                />
                {url && (
                  <button
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-red-600"
                    onClick={() => handleClearInput(index)}
                    style={{ zIndex: 10 }}
                  >
                    <HiTrash className="h-5 w-5" />
                  </button>
                )}
              </div>
              {errors[index] && (
                <p className="text-red-500 text-xs mt-1">
                  {errors[index]}
                </p>
              )}
            </div>
          </div>
        ))}

        <div className="mb-6">
          <Button
            color="light"
            className="text-sm font-medium hover:text-purple-800 bg-white hover:bg-gray-50 border border-gray-300"
            onClick={handleAddUrl}
          >
            <span className="flex items-center">
              <span className="bg-purple-800 rounded-full p-0.5 mr-2">
                <HiPlus className="h-3 w-3 text-white" />
              </span>
              Add URL
            </span>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b mt-[100px] w-full">
        <Button
          color="primary"
          className="text-sm font-medium bg-purple-700 hover:bg-purple-800"
          onClick={handleCreateRequest}
        >
          Create Request
        </Button>
      </div>
    </div>
  );
}
