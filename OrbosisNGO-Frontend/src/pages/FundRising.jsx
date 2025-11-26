import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card.jsx';
import { Button } from "@/components/ui/button";
function FundRising({name,city,image,description,tags = [],progress = 0,onDonate = () => {},})
 {
    
    
    return (<div className="w-full flex justify-center " >
        {/* Back to Home Link */}
        <div className="mb-4 sm:mb-6 ">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-medium">Back to Home</span>
            </Link>
        </div> <Card className="mt-10 max-w-3xl p-6 w-full bg-white shadow-2xl rounded-xl border"
>

  {/* LEFT SIDE */}
  <div className="flex gap-6 w-full">

    {/* IMAGE + NAME BOX */}
    <div className="w-40">
      <img
        src={image}
        alt={name}
        className="w-40 h-40 object-cover rounded-xl shadow-sm"
      />

      <CardHeader className="p-0 mt-3 text-center">
        <CardTitle className="text-xl font-semibold">Name- {name}</CardTitle>
        <p className="text-gray-500 text-sm">city- {city}</p>
      </CardHeader>
    </div>

    {/* RIGHT SIDE CONTENT */}
    <div className="flex flex-col justify-between flex-1">

      {/* DESCRIPTION */}
      <CardContent className="p-0 mt-2">
        <textarea  defaultValue={description} placeholder="description" className="w-130 h-20 text-gray-700 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg shadow-sm border">
            </textarea>
      </CardContent>
 {/* TAGS */}
          <CardContent className="p-0 mt-4">
            <div className="flex gap-3 flex-wrap justify-center">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="py-1 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs rounded-full shadow-sm cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

        {/* DONATE BUTTON */}
        <div className="flex justify-center mt-5">
          <Button onClick={onDonate}  className="w-60 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg shadow-md transition-all">
            Donate
          </Button>
        </div>

        {/* PROGRESS BAR */}
         <div className="mt-5">
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-center mt-1 font-medium text-gray-600">
                {progress}% Completed
              </p>
            </div>
      </CardContent>

    </div>
  </div>

</Card>

    </div>

    )

}
export default FundRising