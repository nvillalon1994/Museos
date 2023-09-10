import React from "react";
import {BsFillTriangleFill,BsFillSquareFill,BsFillCircleFill} from 'react-icons/bs'

import "./phonecase.css";
export default function PhoneCase({ children }) {
  return (
    <div className="temp-wrapper scale-75 md:scale-75   lg:scale-80 xl:scale-100 2xl:scale-125   ">
      <div className="px ">
        <div className="px__body">
          <div className="px__body__cut"></div>
          <div className="px__body__speaker"></div>
          <div className="px__body__sensor"></div>

          <div className="px__body__mute"></div>
          <div className="px__body__up"></div>
          <div className="px__body__down"></div>
          <div className="px__body__right"></div>
        </div>

        <div className="px__screen">
          <div className="px__screen__ ">
            <div className="px__screen__frame    ">
              <div className="w-full overflow-y-hidden overflow-x-hidden  h-full  ">
                
                <div class="  absolute w-full bg-colo7-phone-dark  rounded-t-3xl  ">
                  <div class="mt-2  mr-2 flex justify-between  ">
                    <div className="flex ml-2 gap-2">
                      <svg
                      class="h-4 w-4 "
                      viewbox="0 0 21 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16.5 2H17.5C18.0523 2 18.5 2.44772 18.5 3V11C18.5 11.5523 18.0523 12 17.5 12H16.5C15.9477 12 15.5 11.5523 15.5 11V3C15.5 2.44772 15.9477 2 16.5 2Z"
                        fill="white"
                      />
                      <path
                        d="M13 4H12C11.4477 4 11 4.44772 11 5V11C11 11.5523 11.4477 12 12 12H13C13.5523 12 14 11.5523 14 11V5C14 4.44772 13.5523 4 13 4Z"
                        fill="white"
                      />
                      <path
                        d="M7.5 6H8.5C9.05228 6 9.5 6.44772 9.5 7V11C9.5 11.5523 9.05228 12 8.5 12H7.5C6.94772 12 6.5 11.5523 6.5 11V7C6.5 6.44772 6.94772 6 7.5 6Z"
                        fill="white"
                      />
                      <path
                        d="M3 7.5H4C4.55228 7.5 5 7.94772 5 8.5V11C5 11.5523 4.55228 12 4 12H3C2.44772 12 2 11.5523 2 11V8.5C2 7.94772 2.44772 7.5 3 7.5Z"
                        fill="white"
                      />
                      </svg>
                      <svg
                      class="h-4 w-4 text-white"
                      viewbox="0 0 15 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.9828 4.52294C12.0717 2.89057 9.6574 2 7.13272 2C4.60056 2 2.17953 2.89589 0.266142 4.53708L0.103645 4.67646C-0.0277638 4.78918 -0.0353068 4.98954 0.0872572 5.11176L1.2142 6.23557C1.32359 6.34466 1.4985 6.3521 1.6168 6.2527L1.75641 6.13541C3.26327 4.86943 5.15517 4.18035 7.13272 4.18035C9.10354 4.18035 10.9894 4.86472 12.494 6.12283L12.6336 6.23952C12.7519 6.33847 12.9264 6.33084 13.0356 6.22195L14.1627 5.09797C14.2855 4.97558 14.2777 4.77488 14.1459 4.66228L13.9828 4.52294ZM7.13272 5.46979C8.72355 5.46979 10.251 5.99754 11.4953 6.97486L11.6711 7.11298C11.8113 7.2231 11.8236 7.43059 11.6974 7.55643L10.5667 8.68407C10.4621 8.78836 10.2966 8.80034 10.178 8.7122L10.0401 8.60976C9.19975 7.98518 8.18639 7.65015 7.13272 7.65015C6.07256 7.65015 5.05328 7.98934 4.2101 8.62109L4.07212 8.72448C3.95351 8.81334 3.78742 8.80164 3.68252 8.69703L2.55216 7.56981C2.42623 7.44423 2.43819 7.23727 2.57774 7.12694L2.75259 6.98871C3.99984 6.00267 5.53421 5.46979 7.13272 5.46979ZM7.13272 8.93959C7.77222 8.93959 8.3936 9.10763 8.94112 9.42805L9.16295 9.55788C9.33114 9.65631 9.36071 9.88666 9.22282 10.0242L7.32874 11.913C7.2124 12.029 7.02377 12.029 6.90743 11.913L5.02552 10.0363C4.88824 9.8994 4.91685 9.67022 5.08361 9.57107L5.30296 9.44065C5.8555 9.11212 6.48478 8.93959 7.13272 8.93959Z"
                        fill="white"
                      />
                      </svg>
                    </div>
                    <div className="flex bg-white h-2 w-4 mr-2">
                      
                      
                    </div>
                  </div>

                  

                  

                  
                </div>
                <div className="mt-6 overflow-y-scroll h-full  phone-contenido w-full ">
                {children}  
                
                </div>
                <div className="flex justify-center gap-16 text-xs p-5  absolute bg-black bottom-0 w-full rounded-b-3xl h-10 z-50  ">
                    <BsFillTriangleFill className="text-white -rotate-90"/>
                    <BsFillCircleFill className="text-white"/>
                    <BsFillSquareFill className="text-white"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
