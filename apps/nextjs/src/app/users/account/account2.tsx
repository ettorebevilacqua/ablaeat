
"use client";
import { useState } from 'react';

import { CldUploadButton, CldImage } from "next-cloudinary";
export function Photos({info, onError, onSuccess}) {

  return (
    <div>    
    upload
      <CldUploadButton
        options={{ multiple: false }}
        public_id={info?.public_id || ''}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
        onSuccess={onSuccess}
        onQueuesEnd={(result, { widget }) => {
            widget.close();
        }}
         onError={onError}

      >
        <span>
          Upload
        </span>
      </CldUploadButton>
    </div>
  );
}

export default function Account({user}:any) {
    const [info, setInfo] = useState();
    const [error, setError] = useState();

    const handleError = (error, _widget) =>{
            setInfo(null);
            setError(error);
    }

    const handleSuccess=(result, widget)=>{
        setInfo(result?.info);
        setError(null);
        widget.close({ quiet: true, });
    } 
    
    return (
        <div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
                <div>
                   
                </div>
                <div>info.public_id {info?.public_id}</div>
                {info && info.resource_type === 'image' && (
           <div>

           <span className="block text-sm font-medium text-gray-700 undefined"> avatar </span> 
           <CldImage
              width={info.width}
              height={info.height}
              src={info.public_id}
              alt="Uploaded image"
            />
            </div>
          )}
                <Photos onError={handleError} onSuccess={handleSuccess} />
				{user JSON.stringyfy(user)}
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
                <div className="text-sm text-gray-600 underline hover:text-red-900">photo</div>
                <Photos  className="block text-sm font-medium text-red-700 undefined" onError={handleError} onSuccess={handleSuccess} >
                    photo
                </Photos>
                    <form>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="name"
                                    className="px-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="email"
                                    name="email"
                                    className="px-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password"
                                    className="px-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Confirm Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password_confirmation"
                                    className="px-2 block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end mt-4">
                            <a
                                className="text-sm text-gray-600 underline hover:text-gray-900"
                                href="#"
                            >
                                Already registered?
                            </a>
                            <button
                                    onClick={()=>setError('max email send')}
                                type="submit"
                                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                            >

                                Register
                            </button>
                        </div>
                        <div className="text-sm text-gray-600 underline hover:text-red-900">{error}</div>
                        <div className="text-sm text-gray-600 underline hover:text-red-900">{user JSON.stringyfy(user)}</div>
                 
                    </form>
                </div>
            </div>
        </div>
    );
}
